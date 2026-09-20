<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus;

use Grav\Common\Grav;
use Grav\Common\Yaml;

/**
 * A named menu: a nested list of items, each pointing at a page or a URL.
 *
 * Storage: user://data/maw-menus/menus/<id>.yaml (committed to git — menus are site content).
 * Every write bumps `rev`; update() refuses a stale `rev` so two editors can't silently overwrite each other.
 *
 * The id is the template contract — a theme asks for a menu by name, `maw_menu('header')` — so there is
 * deliberately no rename(): renaming would silently empty a nav with no error anywhere. Pick the id once,
 * at creation.
 *
 * normalizeItems() defaults the keys this version knows about and merges everything else back untouched.
 * That is what lets a future version add an item type (a mega-menu panel, say) and still have an older
 * install round-trip the file without discarding data. Do not "tidy" that behaviour away.
 */
class MenuStore
{
    /** Storage ceiling. What a theme actually renders is clamped separately, by MenuResolver. */
    public const MAX_DEPTH = 5;
    public const MAX_ITEMS = 500;

    /** Item keys this version understands. Anything else in an item is preserved verbatim. */
    private const KNOWN = ['key', 'type', 'route', 'url', 'label', 'icon', 'description', 'target', 'nofollow', 'style', 'children'];

    /** @var array<string, array|null> request-level cache */
    private static array $cache = [];

    /** @param string|null $baseDir storage folder override (tests); default user://data/maw-menus/menus */
    public function __construct(private readonly Grav $grav, private readonly ?string $baseDir = null)
    {
    }

    public static function flushCache(): void
    {
        self::$cache = [];
    }

    public static function validId(string $id): bool
    {
        return preg_match('/^[a-z0-9][a-z0-9-]{0,62}$/', $id) === 1;
    }

    /** @return list<array> summaries (no items) */
    public function all(): array
    {
        $out = [];
        foreach (glob($this->dir(false) . '/*.yaml') ?: [] as $file) {
            $data = $this->read($file);
            if ($data) {
                unset($data['items']);
                $out[] = $data;
            }
        }
        usort($out, fn ($a, $b) => strcasecmp($a['title'], $b['title']));

        return $out;
    }

    public function get(string $id): ?array
    {
        if (!self::validId($id)) {
            return null;
        }
        if (!array_key_exists($id, self::$cache)) {
            $file = $this->dir(false) . '/' . $id . '.yaml';
            self::$cache[$id] = is_file($file) ? $this->read($file) : null;
        }

        return self::$cache[$id];
    }

    public function exists(string $id): bool
    {
        return self::validId($id) && ($this->get($id) !== null);
    }

    /** @param string|null $id an explicit id; otherwise one is derived from the title and de-duplicated */
    public function create(string $title, array $items, string $user, ?string $id = null, ?int $maxDepth = null): array
    {
        $base = $id && self::validId($id)
            ? $id
            : substr(trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-') ?: 'menu', 0, 50);

        return $this->locked(function () use ($base, $title, $items, $user, $maxDepth) {
            $id = $base;
            for ($i = 2; is_file($this->dir(true) . '/' . $id . '.yaml'); $i++) {
                $id = $base . '-' . $i;
            }

            return $this->write($id, $title, self::normalizeItems($items), $user, null, 0, $maxDepth ?? 2);
        });
    }

    /**
     * @param int|null $baseRev the `rev` the editor started from; null skips the check (force)
     * @throws MenuConflict when the menu was saved by someone else since $baseRev
     */
    public function update(string $id, ?string $title, ?array $items, string $user, ?int $baseRev = null, ?int $maxDepth = null): ?array
    {
        return $this->locked(function () use ($id, $title, $items, $user, $baseRev, $maxDepth) {
            unset(self::$cache[$id]);
            $current = $this->get($id);
            if (!$current) {
                return null;
            }
            if ($baseRev !== null && $baseRev !== $current['rev']) {
                throw new MenuConflict($current);
            }

            return $this->write(
                $id,
                $title ?? $current['title'],
                $items === null ? $current['items'] : self::normalizeItems($items),
                $user,
                $current['created'] ?: null,
                $current['rev'],
                $maxDepth ?? $current['max_depth']
            );
        });
    }

    public function delete(string $id): bool
    {
        if (!self::validId($id)) {
            return false;
        }
        unset(self::$cache[$id]);
        $file = $this->dir(false) . '/' . $id . '.yaml';

        return is_file($file) && unlink($file);
    }

    /**
     * Follow a page that moved. Prefix-aware, so renaming /about to /company also fixes /about/team —
     * but the boundary check stops /about-us being caught by the /about prefix.
     *
     * @return list<string> ids of the menus that changed
     */
    public function rewriteRoute(string $oldRoute, string $newRoute): array
    {
        $old = '/' . trim($oldRoute, '/');
        $new = '/' . trim($newRoute, '/');
        if ($old === '/' || $old === $new) {
            return [];
        }

        $changed = [];
        foreach ($this->all() as $summary) {
            $menu = $this->get($summary['id']);
            if (!$menu) {
                continue;
            }
            $hit = false;
            $items = self::mapRoutes($menu['items'], $old, $new, $hit);
            if ($hit) {
                $this->update($summary['id'], null, $items, $menu['updated_by'] ?: '', null);
                $changed[] = $summary['id'];
            }
        }

        return $changed;
    }

    /** @param bool $hit set to true when at least one route was rewritten */
    private static function mapRoutes(array $items, string $old, string $new, bool &$hit): array
    {
        foreach ($items as $i => $item) {
            $route = (string) ($item['route'] ?? '');
            if ($route !== '') {
                $route = '/' . trim($route, '/');
                // Exact match, or a descendant — never a route that merely starts with the same characters.
                if ($route === $old || str_starts_with($route, $old . '/')) {
                    $items[$i]['route'] = $new . substr($route, strlen($old));
                    $hit = true;
                }
            }
            if (!empty($item['children']) && is_array($item['children'])) {
                $items[$i]['children'] = self::mapRoutes($item['children'], $old, $new, $hit);
            }
        }

        return $items;
    }

    /**
     * Coerce stored items into shape without discarding anything.
     *
     * Known keys get defaults and types; unknown keys ride along untouched so a file written by a newer
     * version survives a round trip through an older one.
     */
    public static function normalizeItems(mixed $items, int $depth = 0): array
    {
        if (!is_array($items) || $depth >= self::MAX_DEPTH) {
            return [];
        }

        $out = [];
        // Admin form encodings sometimes turn a list into a map keyed by index: take the values.
        foreach (array_values($items) as $item) {
            if (!is_array($item)) {
                continue;
            }
            $known = [
                'key'         => (string) ($item['key'] ?? '') ?: self::newKey(),
                'type'        => (string) ($item['type'] ?? 'page'),
                'label'       => (string) ($item['label'] ?? ''),
                'icon'        => (string) ($item['icon'] ?? ''),
                'description' => (string) ($item['description'] ?? ''),
                'target'      => (string) ($item['target'] ?? ''),
                'nofollow'    => (bool) ($item['nofollow'] ?? false),
                'style'       => array_values(array_filter(array_map('strval', (array) ($item['style'] ?? [])))),
                'children'    => self::normalizeItems($item['children'] ?? [], $depth + 1),
            ];
            // route and url are only written when they carry something, to keep files readable.
            if (isset($item['route']) && $item['route'] !== '') {
                $known['route'] = '/' . trim((string) $item['route'], '/');
            }
            if (isset($item['url']) && $item['url'] !== '') {
                $known['url'] = (string) $item['url'];
            }

            $extra = array_diff_key($item, array_flip(self::KNOWN));
            $out[] = $known + $extra;
        }

        return $out;
    }

    /**
     * Strip the optional keys that are empty, for a readable file on disk.
     *
     * Only the keys this version owns are considered: anything it does not recognise is left exactly as
     * written, so a newer version's data is never trimmed away by an older one.
     */
    private static function forStorage(array $items): array
    {
        $optional = ['label', 'icon', 'description', 'target', 'route', 'url'];

        foreach ($items as $i => $item) {
            foreach ($optional as $key) {
                if (($item[$key] ?? '') === '') {
                    unset($item[$key]);
                }
            }
            if (empty($item['nofollow'])) {
                unset($item['nofollow']);
            }
            if (empty($item['style'])) {
                unset($item['style']);
            }
            if (empty($item['children'])) {
                unset($item['children']);
            } else {
                $item['children'] = self::forStorage($item['children']);
            }
            $items[$i] = $item;
        }

        return $items;
    }

    public static function countItems(array $items): int
    {
        $n = 0;
        foreach ($items as $item) {
            $n++;
            if (!empty($item['children']) && is_array($item['children'])) {
                $n += self::countItems($item['children']);
            }
        }

        return $n;
    }

    public static function newKey(): string
    {
        return substr(bin2hex(random_bytes(4)), 0, 6);
    }

    private function write(string $id, string $title, array $items, string $user, ?int $created, int $rev, int $maxDepth): array
    {
        $data = [
            'schema' => 1,
            'id' => $id,
            'title' => $title,
            'max_depth' => max(1, min(self::MAX_DEPTH, $maxDepth)),
            'rev' => $rev + 1,
            'created' => $created ?? time(),
            'updated' => time(),
            'updated_by' => $user,
            'items' => array_values($items),
        ];
        // Stored files drop the keys that carry nothing, so a menu stays readable in a diff. Reading puts
        // the full shape back, so the API and the admin always see every key.
        $onDisk = $data;
        $onDisk['items'] = self::forStorage($data['items']);
        Files::write($this->dir(true) . '/' . $id . '.yaml', Yaml::dump($onDisk, 20, 2));
        $data['count'] = self::countItems($data['items']);
        self::$cache[$id] = $data;

        return $data;
    }

    private function read(string $file): ?array
    {
        try {
            $data = Yaml::parse((string) file_get_contents($file)) ?: [];
        } catch (\Throwable) {
            return null;
        }
        $id = basename($file, '.yaml');
        $items = self::normalizeItems($data['items'] ?? []);

        return [
            'schema' => (int) ($data['schema'] ?? 1),
            'id' => $id,
            'title' => (string) ($data['title'] ?? $id),
            'max_depth' => (int) ($data['max_depth'] ?? 2),
            'rev' => (int) ($data['rev'] ?? 1),
            'created' => (int) ($data['created'] ?? 0),
            'updated' => (int) ($data['updated'] ?? filemtime($file)),
            'updated_by' => (string) ($data['updated_by'] ?? ''),
            'count' => self::countItems($items),
            'items' => $items,
        ];
    }

    /** Serialize read-check-write sequences across requests. */
    private function locked(callable $fn): mixed
    {
        $lock = fopen($this->dir(true) . '/.lock', 'c');
        try {
            if ($lock) {
                flock($lock, LOCK_EX);
            }

            return $fn();
        } finally {
            if ($lock) {
                flock($lock, LOCK_UN);
                fclose($lock);
            }
        }
    }

    private function dir(bool $create): string
    {
        $dir = $this->baseDir ?? (string) $this->grav['locator']->findResource('user://data', true, $create) . '/maw-menus/menus';
        if ($create && !is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
