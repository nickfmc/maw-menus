<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus\Controllers;

use Grav\Common\Cache;
use Grav\Common\Page\Interfaces\PageInterface;
use Grav\Plugin\Api\Controllers\AbstractApiController;
use Grav\Plugin\Api\Exceptions\ConflictException;
use Grav\Plugin\Api\Exceptions\ForbiddenException;
use Grav\Plugin\Api\Exceptions\NotFoundException;
use Grav\Plugin\Api\Exceptions\ValidationException;
use Grav\Plugin\Api\Response\ApiResponse;
use Grav\Plugin\MawMenus\MenuConflict;
use Grav\Plugin\MawMenus\MenuResolver;
use Grav\Plugin\MawMenus\MenuStore;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * /api/v1/maw-menus/*
 *
 * Every write invalidates Grav's page cache. Without that a saved menu appears on the front end only
 * after the next page save, because nothing in the page files changed.
 */
class MenusController extends AbstractApiController
{
    private const READ  = 'api.menus.read';
    private const WRITE = 'api.menus.write';

    /** A picker response stays small; above this, the admin searches instead of browsing. */
    private const MAX_PICKER_PAGES = 2000;

    /**
     * Menus are site structure rather than page content, so they get their own permission. But no account
     * that exists today has been granted api.menus.*, and a hard cut would lock every one of them out on
     * the day the plugin is installed — so page-write is accepted as well. Drop the fallback in 1.1.0,
     * once sites have had a release in which to assign the new permission.
     */
    private function requireMenus(ServerRequestInterface $request, string $permission): void
    {
        try {
            $this->requirePermission($request, $permission);
        } catch (ForbiddenException) {
            $this->requirePermission($request, 'api.pages.write');
        }
    }

    private function store(): MenuStore
    {
        return new MenuStore($this->grav);
    }

    /**
     * An API request doesn't build the page tree, so anything that reads routes has to ask for it first.
     * Pages::enablePages() flips the flag and runs init(); it is safe to call more than once.
     */
    private function pageTree(): \Grav\Common\Page\Pages
    {
        $pages = $this->grav['pages'];
        $pages->enablePages();

        return $pages;
    }

    /** GET /maw-menus/menus */
    public function index(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::READ);

        return ApiResponse::create($this->store()->all());
    }

    /** GET /maw-menus/menus/{id}?resolve=1 */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::READ);
        $id = (string) $this->getRouteParam($request, 'id');

        $menu = $this->store()->get($id);
        if (!$menu) {
            throw new NotFoundException("Menu '{$id}' not found");
        }

        if (!empty($request->getQueryParams()['resolve'])) {
            // The resolver looks pages up by route, and an API request has no page tree until asked —
            // without this every page item would come back flagged broken.
            $this->pageTree();
            // include_broken so the admin can show which items point at a page that no longer exists.
            $menu['resolved'] = (new MenuResolver($this->grav))->nodes($id, ['include_broken' => true]);
        }

        return ApiResponse::create($menu);
    }

    /** POST /maw-menus/menus */
    public function create(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::WRITE);
        $body = $this->getRequestBody($request);

        $title = trim((string) ($body['title'] ?? ''));
        if ($title === '') {
            throw new ValidationException('A menu needs a title', ['title' => 'Required']);
        }
        $id = isset($body['id']) ? trim((string) $body['id']) : null;
        if ($id !== null && $id !== '' && !MenuStore::validId($id)) {
            throw new ValidationException('Invalid menu id', ['id' => 'Lowercase letters, numbers and hyphens only']);
        }

        $items = $this->validItems($body['items'] ?? []);
        $menu = $this->store()->create($title, $items, $this->userName($request), $id ?: null, $this->validDepth($body));
        $this->invalidate();

        return ApiResponse::create($menu, 201);
    }

    /** PATCH /maw-menus/menus/{id} */
    public function update(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::WRITE);
        $id = (string) $this->getRouteParam($request, 'id');
        $body = $this->getRequestBody($request);

        $items = array_key_exists('items', $body) ? $this->validItems($body['items']) : null;
        $title = array_key_exists('title', $body) ? trim((string) $body['title']) : null;
        if ($title === '') {
            throw new ValidationException('A menu needs a title', ['title' => 'Required']);
        }
        $baseRev = isset($body['base_rev']) ? (int) $body['base_rev'] : null;

        try {
            $menu = $this->store()->update($id, $title, $items, $this->userName($request), $baseRev, $this->validDepth($body));
        } catch (MenuConflict $e) {
            // ConflictException carries no structured payload, so the message has to stand on its own —
            // it already names who saved and when. The admin re-fetches the menu to show the current state.
            throw new ConflictException($e->getMessage());
        }

        if (!$menu) {
            throw new NotFoundException("Menu '{$id}' not found");
        }
        $this->invalidate();

        return ApiResponse::create($menu);
    }

    /** DELETE /maw-menus/menus/{id} */
    public function destroy(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::WRITE);
        $id = (string) $this->getRouteParam($request, 'id');

        if (!$this->store()->delete($id)) {
            throw new NotFoundException("Menu '{$id}' not found");
        }
        $this->invalidate();

        return ApiResponse::noContent();
    }

    /**
     * GET /maw-menus/pages?search=&limit=
     *
     * A picker needs a tree of labels, not the full page payload the core /pages endpoint returns.
     */
    public function pages(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::READ);
        $query = $request->getQueryParams();
        $search = trim((string) ($query['search'] ?? ''));
        $limit = max(1, min(self::MAX_PICKER_PAGES, (int) ($query['limit'] ?? self::MAX_PICKER_PAGES)));

        $out = [];
        $this->walk($this->pageTree()->root(), 0, $search, $limit, $out);

        return ApiResponse::create($out);
    }

    /**
     * POST /maw-menus/menus/{id}/seed
     *
     * Builds items from the page tree using the same rules maw-starter's automatic navigation uses, so a
     * seeded menu starts out looking exactly like the nav it replaces. Returns them; saving is the
     * editor's decision.
     */
    public function seed(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::WRITE);
        $body = $this->getRequestBody($request);

        $items = $this->seedFrom($this->pageTree()->root(), 1);

        if (!empty($body['include_site_menu'])) {
            foreach ((array) $this->grav['config']->get('site.menu', []) as $entry) {
                if (!empty($entry['url'])) {
                    $items[] = [
                        'key' => MenuStore::newKey(),
                        'type' => 'url',
                        'url' => (string) $entry['url'],
                        'label' => (string) ($entry['text'] ?? $entry['url']),
                        'target' => !empty($entry['external']) ? '_blank' : '',
                    ];
                }
            }
        }

        return ApiResponse::create(['items' => MenuStore::normalizeItems($items)]);
    }

    /** @return list<array> */
    private function seedFrom(PageInterface $parent, int $level): array
    {
        $items = [];
        foreach ($parent->children()->visible() as $page) {
            if (!$page->visible() || !$page->routable()) {
                continue;
            }
            $children = [];
            // Same two suppressors the theme macro uses: an explicit opt-out, and blog listings whose
            // children are posts rather than navigation.
            // The parentheses matter: ?? binds looser than &&, so without them PHP evaluates the
            // property access as part of the && and warns when nav_children isn't set.
            $navChildren = ($page->header()->nav_children ?? true) !== false;
            if ($level < 2 && $navChildren && $page->template() !== 'blog') {
                $children = $this->seedFrom($page, $level + 1);
            }
            $items[] = [
                'key' => MenuStore::newKey(),
                'type' => 'page',
                'route' => $page->route(),
                // Left empty on purpose: the label then follows the page's own `menu:` / `title:` for ever.
                'label' => '',
                'children' => $children,
            ];
        }

        return $items;
    }

    private function walk(PageInterface $parent, int $depth, string $search, int $limit, array &$out): void
    {
        if (count($out) >= $limit || $depth > 6) {
            return;
        }
        foreach ($parent->children() as $page) {
            if (count($out) >= $limit) {
                return;
            }
            $route = (string) $page->route();
            if ($route === '') {
                continue;
            }
            $title = (string) $page->title();
            $menu = (string) $page->menu();
            $matches = $search === ''
                || stripos($title, $search) !== false
                || stripos($menu, $search) !== false
                || stripos($route, $search) !== false;

            if ($matches) {
                $out[] = [
                    'route' => $route,
                    'title' => $title,
                    'menu' => $menu,
                    'depth' => $depth,
                    'visible' => (bool) $page->visible(),
                    'routable' => (bool) $page->routable(),
                    'published' => (bool) $page->published(),
                    'has_children' => count($page->children()) > 0,
                ];
            }
            $this->walk($page, $depth + 1, $search, $limit, $out);
        }
    }

    private function validItems(mixed $items): array
    {
        if (!is_array($items)) {
            throw new ValidationException('Items must be a list', ['items' => 'Expected a list']);
        }
        $normalized = MenuStore::normalizeItems($items);
        if (MenuStore::countItems($normalized) > MenuStore::MAX_ITEMS) {
            throw new ValidationException('That menu is too large', ['items' => 'At most ' . MenuStore::MAX_ITEMS . ' items']);
        }

        return $normalized;
    }

    private function validDepth(array $body): ?int
    {
        if (!isset($body['max_depth'])) {
            return null;
        }

        return max(1, min(MenuStore::MAX_DEPTH, (int) $body['max_depth']));
    }

    private function userName(ServerRequestInterface $request): string
    {
        $user = $this->getUser($request);

        return (string) ($user->username ?? '');
    }

    /**
     * Menus live outside the page files, so nothing else marks the rendered pages stale.
     * 'invalidate' only bumps the cache key — it deletes nothing, so this is cheap.
     */
    private function invalidate(): void
    {
        try {
            Cache::clearCache('invalidate');
        } catch (\Throwable $e) {
            $this->grav['log']->warning('maw-menus: cache invalidation failed: ' . $e->getMessage());
        }
    }
}
