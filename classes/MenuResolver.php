<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus;

use Grav\Common\Grav;
use Grav\Common\Page\Interfaces\PageInterface;

/**
 * Turns stored menu items into render-ready nodes for a theme.
 *
 * The node shape is the theme contract (documented in the README):
 *
 *   kind        'link' | 'text'   — a theme switches on this, never on the stored `type`
 *   label       resolved text
 *   url         href, '' for text nodes
 *   icon        the RAW stored token; the theme pipes it through its own |fa_icon
 *   description, target, rel, external, active, activeChild, classes, broken?, children[]
 *
 * Switching on `kind` rather than `type` is what keeps a future item type from breaking an older theme:
 * an unrecognised type with a usable href still renders as an ordinary link, and without one as text.
 *
 * Page items store only a route. Labels and URLs are resolved live, every request, because a cached copy
 * goes stale silently on a title edit — whereas a missing page is visible (flagged in the admin, dropped
 * on the front end).
 */
class MenuResolver
{
    /** @var array<string, array|null> request-level cache: a nav is resolved once per page render */
    private static array $cache = [];

    private readonly MenuStore $store;

    public function __construct(private readonly Grav $grav, ?MenuStore $store = null)
    {
        $this->store = $store ?? new MenuStore($grav);
    }

    public static function flushCache(): void
    {
        self::$cache = [];
    }

    /**
     * Whether a menu of this name exists at all.
     *
     * Deliberately distinct from "has items": a theme falls back to its own navigation when no menu has
     * been built, but must render nothing when an editor has built one and emptied it on purpose.
     */
    public function exists(string $id = ''): bool
    {
        return $this->store->exists($this->id($id));
    }

    /**
     * An empty id means "the main menu", which is a plugin setting rather than a theme one — a theme
     * that has no opinion about names still gets whichever menu the site considers its primary nav.
     */
    public function id(string $id = ''): string
    {
        $id = trim($id);

        return $id !== '' ? $id : (string) $this->grav['config']->get('plugins.maw-menus.default_menu', 'header');
    }

    public function defaultId(): string
    {
        return $this->id('');
    }

    /** @return array{id: string, title: string, items: list<array>}|null */
    public function resolve(string $id = '', array $options = []): ?array
    {
        $id = $this->id($id);
        $current = $options['current'] ?? ($this->grav['page'] ?? null);
        // route() is null on the CLI and during early boot, so never hand it straight to a string parameter.
        $currentRoute = $this->normalizeRoute($current instanceof PageInterface ? (string) $current->route() : '');

        $cacheKey = md5($id . '|' . $currentRoute . '|' . serialize(array_diff_key($options, ['current' => null])));
        if (array_key_exists($cacheKey, self::$cache)) {
            return self::$cache[$cacheKey];
        }

        $menu = $this->store->get($id);
        if (!$menu) {
            return self::$cache[$cacheKey] = null;
        }

        $config = $this->grav['config'];
        $ctx = [
            'current' => $currentRoute,
            'include_broken' => (bool) ($options['include_broken'] ?? false),
            'external_new_tab' => (bool) $config->get('plugins.maw-menus.external_new_tab', true),
            'host' => (string) parse_url((string) $this->grav['base_url_absolute'], PHP_URL_HOST),
        ];
        $maxDepth = (int) ($options['max_depth'] ?? $menu['max_depth'] ?? $config->get('plugins.maw-menus.max_depth', 3));

        $resolved = [
            'id' => $menu['id'],
            'title' => $menu['title'],
            'items' => $this->resolveItems($menu['items'], 1, max(1, $maxDepth), $ctx),
        ];

        return self::$cache[$cacheKey] = $resolved;
    }

    /** Convenience for Twig: just the nodes, [] when the menu is missing. */
    public function nodes(string $id = '', array $options = []): array
    {
        return $this->resolve($id, $options)['items'] ?? [];
    }

    /** @return list<array> */
    private function resolveItems(array $items, int $level, int $maxDepth, array $ctx): array
    {
        $out = [];
        foreach ($items as $item) {
            $node = $this->resolveItem($item, $level, $maxDepth, $ctx);
            if ($node !== null) {
                $out[] = $node;
            }
        }

        return $out;
    }

    private function resolveItem(array $item, int $level, int $maxDepth, array $ctx): ?array
    {
        $type = (string) ($item['type'] ?? 'page');
        $label = (string) ($item['label'] ?? '');
        $url = '';
        $broken = false;
        $itemRoute = '';

        if ($type === 'heading') {
            // A grouping label: never a link, and pointless with neither text nor children.
            $url = '';
        } elseif (isset($item['route']) && $item['route'] !== '') {
            $itemRoute = $this->normalizeRoute((string) $item['route']);
            $page = $this->grav['pages']->find($itemRoute);

            if (!$page instanceof PageInterface || !$page->published()) {
                $broken = true;
            } elseif (!$page->routable()) {
                // A deliberate grouping page (routable: false) is text, not a broken link.
                $url = '';
                $label = $label ?: ($page->menu() ?: $page->title());
            } else {
                $url = (string) $page->url();
                $label = $label ?: ($page->menu() ?: $page->title());
            }
        } elseif (isset($item['url']) && $item['url'] !== '') {
            $url = (string) $item['url'];
            $label = $label ?: $url;
        }

        $children = ($level < $maxDepth && !empty($item['children']) && is_array($item['children']))
            ? $this->resolveItems($item['children'], $level + 1, $maxDepth, $ctx)
            : [];

        if ($broken) {
            // Never show a visitor a link to a page that isn't there; the admin asks for them explicitly.
            if (!$ctx['include_broken']) {
                return null;
            }
            $label = $label ?: $itemRoute;
        }

        if ($label === '' && !$children) {
            return null;
        }

        $external = $url !== '' && self::isExternal($url, $ctx['host']);
        $target = (string) ($item['target'] ?? '');
        if ($target === '' && $external && $ctx['external_new_tab']) {
            $target = '_blank';
        }

        $active = $url !== '' && $itemRoute !== '' && $itemRoute === $ctx['current'];
        $activeChild = !$active && (
            ($itemRoute !== '' && $ctx['current'] !== '' && str_starts_with($ctx['current'] . '/', $itemRoute . '/'))
            // A custom-URL parent has no route of its own, so inherit from whatever resolved below it.
            || self::hasActive($children)
        );

        $node = [
            'kind' => $url === '' ? 'text' : 'link',
            'label' => $label,
            'url' => $url,
            'icon' => (string) ($item['icon'] ?? ''),
            'description' => (string) ($item['description'] ?? ''),
            'target' => $target,
            'rel' => self::rel((bool) ($item['nofollow'] ?? false), $target),
            'external' => $external,
            'active' => $active,
            'activeChild' => $activeChild,
            'classes' => self::classes((array) ($item['style'] ?? []), $active, $activeChild, (bool) $children),
            'children' => $children,
        ];

        if ($ctx['include_broken']) {
            $node['broken'] = $broken;
            $node['key'] = (string) ($item['key'] ?? '');
        }

        return $node;
    }

    private static function hasActive(array $nodes): bool
    {
        foreach ($nodes as $node) {
            if (!empty($node['active']) || !empty($node['activeChild'])) {
                return true;
            }
        }

        return false;
    }

    /** Home is reachable as both '/' and its alias, and they must compare equal. */
    private function normalizeRoute(string $route): string
    {
        $route = '/' . trim($route, '/');
        $home = '/' . trim((string) $this->grav['config']->get('system.home.alias', '/'), '/');

        return ($route === '/' || $route === $home) ? '/' : $route;
    }

    public static function isExternal(string $href, string $baseHost): bool
    {
        if ($href === '' || str_starts_with($href, '#')) {
            return false;
        }
        if (preg_match('~^(mailto|tel|sms|ftp):~i', $href)) {
            return true;
        }
        // Protocol-relative (//example.com) has to be tested before the leading-slash check, which would
        // otherwise read it as a site-relative path.
        $protocolRelative = str_starts_with($href, '//');
        if (!$protocolRelative && str_starts_with($href, '/')) {
            return false;
        }
        $host = (string) parse_url($protocolRelative ? 'https:' . $href : $href, PHP_URL_HOST);

        return $host !== '' && strcasecmp($host, $baseHost) !== 0;
    }

    public static function rel(bool $nofollow, string $target): string
    {
        $rel = [];
        if ($target === '_blank') {
            $rel[] = 'noopener';
        }
        if ($nofollow) {
            $rel[] = 'nofollow';
        }

        return implode(' ', $rel);
    }

    /** @param array $style open vocabulary: 'button' => .menu-item--button */
    public static function classes(array $style, bool $active, bool $activeChild, bool $hasChildren): string
    {
        $classes = ['menu-item'];
        foreach ($style as $flag) {
            $flag = preg_replace('/[^a-z0-9-]/', '', strtolower((string) $flag));
            if ($flag !== '') {
                $classes[] = 'menu-item--' . $flag;
            }
        }
        if ($hasChildren) {
            $classes[] = 'has-children';
        }
        // `.is-active` is what maw-starter's CSS already highlights, for the item and its ancestors alike.
        if ($active || $activeChild) {
            $classes[] = 'is-active';
        }

        return implode(' ', $classes);
    }
}
