<?php
/**
 * MAW Menus PHP tests: zero dependencies, boots Grav like bin/grav.
 *
 *   php user/plugins/maw-menus/tests/php/run.php
 *
 * The store writes to a temp folder; the real user/data is never touched.
 */

declare(strict_types=1);

use Grav\Common\Grav;
use Grav\Common\Processors\InitializeProcessor;
use Grav\Plugin\MawMenus\MenuConflict;
use Grav\Plugin\MawMenus\MenuResolver;
use Grav\Plugin\MawMenus\MenuStore;

define('GRAV_CLI', true);
define('GRAV_REQUEST_TIME', microtime(true));

// Walk up for the Grav root rather than counting directories: in the dev sandbox the plugin is a
// junction to its own repo, so __DIR__ resolves outside the site and a fixed depth lands nowhere.
$root = null;
foreach ([__DIR__, getcwd()] as $start) {
    $dir = $start;
    while ($dir && $dir !== dirname($dir)) {
        if (is_file($dir . '/system/defines.php') && is_file($dir . '/vendor/autoload.php')) {
            $root = $dir;
            break 2;
        }
        $dir = dirname($dir);
    }
}
if (!$root) {
    fwrite(STDERR, "Could not find the Grav root. Run this from a site: php user/plugins/maw-menus/tests/php/run.php\n");
    exit(1);
}
chdir($root);
$loader = require $root . '/vendor/autoload.php';
require $root . '/user/plugins/api/vendor/autoload.php';
$loader->addPsr4('Grav\\Plugin\\MawMenus\\', dirname(__DIR__, 2) . '/classes/');

$grav = Grav::instance(['loader' => $loader]);
InitializeProcessor::initializeCli($grav);
// The resolver looks pages up by route, so the page tree has to be indexed before the resolver tests.
$grav['pages']->init();

/* ---------------------------------------------------------------- tiny runner */

$tests = [];
$failures = 0;
function test(string $name, callable $fn): void { $GLOBALS['tests'][$name] = $fn; }
function eq(mixed $expected, mixed $actual, string $msg = ''): void
{
    if ($expected !== $actual) {
        throw new RuntimeException(($msg ? "$msg: " : '') . 'expected ' . var_export($expected, true) . ', got ' . var_export($actual, true));
    }
}
function ok(mixed $value, string $msg = 'expected truthy'): void { if (!$value) { throw new RuntimeException($msg); } }
function throws(string $class, callable $fn): void
{
    try { $fn(); } catch (Throwable $e) { if ($e instanceof $class) { return; } throw new RuntimeException("expected $class, got " . get_class($e) . ': ' . $e->getMessage()); }
    throw new RuntimeException("expected $class, nothing thrown");
}
function tmpdir(): string
{
    $dir = sys_get_temp_dir() . '/maw-menus-tests-' . bin2hex(random_bytes(4));
    mkdir($dir, 0775, true);
    register_shutdown_function(fn () => rrmdir($dir));
    return $dir;
}
function rrmdir(string $dir): void
{
    if (!is_dir($dir)) { return; }
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST) as $f) {
        $f->isDir() ? rmdir($f->getPathname()) : unlink($f->getPathname());
    }
    rmdir($dir);
}
function store(Grav $grav, string $dir): MenuStore
{
    MenuStore::flushCache();
    return new MenuStore($grav, $dir);
}

/* ---------------------------------------------------------------- ids */

test('validId accepts slugs and refuses everything else', function () {
    ok(MenuStore::validId('header'));
    ok(MenuStore::validId('footer-col-1'));
    ok(MenuStore::validId('a'));
    ok(MenuStore::validId(str_repeat('a', 63)), '63 chars is the limit');
    ok(!MenuStore::validId(str_repeat('a', 64)));
    ok(!MenuStore::validId('Header'), 'uppercase');
    ok(!MenuStore::validId('-leading'));
    ok(!MenuStore::validId('has space'));
    ok(!MenuStore::validId('../escape'));
    ok(!MenuStore::validId(''));
});

/* ---------------------------------------------------------------- store */

test('create then get round trips, rev starts at 1', function () use ($grav) {
    $s = store($grav, tmpdir());
    $menu = $s->create('Header', [['type' => 'page', 'route' => '/about']], 'nick');

    eq('header', $menu['id']);
    eq('Header', $menu['title']);
    eq(1, $menu['rev']);
    eq(1, $menu['count']);

    $read = $s->get('header');
    eq('/about', $read['items'][0]['route']);
    eq('page', $read['items'][0]['type']);
    ok($read['items'][0]['key'] !== '', 'a key is assigned');
});

test('create de-duplicates ids and honours an explicit one', function () use ($grav) {
    $s = store($grav, tmpdir());
    eq('header', $s->create('Header', [], 'nick')['id']);
    eq('header-2', $s->create('Header', [], 'nick')['id']);
    eq('utility-nav', $s->create('Anything', [], 'nick', 'utility-nav')['id']);
});

test('update bumps rev, a stale base_rev conflicts, null forces', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [], 'nick');

    eq(2, $s->update('header', null, [['type' => 'url', 'url' => '/x']], 'nick', 1)['rev']);
    throws(MenuConflict::class, fn () => $s->update('header', null, [], 'someone', 1));
    eq(3, $s->update('header', null, [], 'nick', null)['rev'], 'null base_rev forces');

    try {
        $s->update('header', null, [], 'someone', 1);
    } catch (MenuConflict $e) {
        eq(3, $e->record()['rev'], 'the conflict carries the current record');
    }
    eq(null, $s->update('nope', null, [], 'nick'));
});

test('delete removes the file and clears the cache', function () use ($grav) {
    $s = store($grav, $dir = tmpdir());
    $s->create('Header', [], 'nick');
    ok($s->get('header') !== null);
    ok($s->delete('header'));
    eq(null, $s->get('header'));
    ok(!$s->delete('header'), 'deleting twice is false, not an error');
    ok(!is_file($dir . '/header.yaml'));
});

test('all() returns summaries without items, sorted by title', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Zebra', [['type' => 'url', 'url' => '/z']], 'nick');
    $s->create('Alpha', [], 'nick');

    $all = $s->all();
    eq(2, count($all));
    eq('Alpha', $all[0]['title']);
    ok(!array_key_exists('items', $all[0]), 'summaries carry no items');
    eq(1, $all[1]['count']);
});

/* ---------------------------------------------------------------- normalizeItems */

test('normalizeItems defaults keys, coerces a map to a list and drops junk', function () {
    $items = MenuStore::normalizeItems([
        3 => ['type' => 'page', 'route' => 'about/'],   // map key, unslashed route
        7 => 'not an array',
        9 => ['type' => 'url', 'url' => '/x', 'style' => ['button', '']],
    ]);

    eq(2, count($items), 'non-array entries are dropped');
    eq('/about', $items[0]['route'], 'routes are normalized to a leading slash, no trailing');
    eq(['button'], $items[1]['style'], 'empty style flags are dropped');
    eq(false, $items[0]['nofollow']);
    eq([], $items[0]['children']);
});

test('normalizeItems clamps nesting at MAX_DEPTH', function () {
    $deep = ['type' => 'url', 'url' => '/a'];
    for ($i = 0; $i < 10; $i++) {
        $deep = ['type' => 'url', 'url' => '/a', 'children' => [$deep]];
    }
    $items = MenuStore::normalizeItems([$deep]);

    $depth = 0;
    $node = $items[0];
    while (!empty($node['children'])) { $depth++; $node = $node['children'][0]; }
    eq(MenuStore::MAX_DEPTH - 1, $depth, 'nesting stops at the storage ceiling');
});

test('an item type this version does not know survives a full round trip', function () use ($grav) {
    // The forward-compatibility guarantee: a file written by a newer version (mega menus, say) must come
    // back byte-identical after an older install reads and rewrites it.
    $s = store($grav, tmpdir());
    $future = [
        'key' => 'abc123',
        'type' => 'mega',
        'route' => '/services',
        'mega' => ['layout' => 'columns-3', 'featured' => ['image' => 'promo.jpg']],
        'some_future_flag' => true,
    ];
    $s->create('Header', [$future], 'nick');
    $s->update('header', null, $s->get('header')['items'], 'nick', 1);

    $item = $s->get('header')['items'][0];
    eq('mega', $item['type']);
    eq(['layout' => 'columns-3', 'featured' => ['image' => 'promo.jpg']], $item['mega']);
    eq(true, $item['some_future_flag']);
    eq('abc123', $item['key'], 'existing keys are kept');
});

test('countItems counts the whole tree', function () {
    eq(4, MenuStore::countItems(MenuStore::normalizeItems([
        ['type' => 'url', 'url' => '/a', 'children' => [
            ['type' => 'url', 'url' => '/b'],
            ['type' => 'url', 'url' => '/c', 'children' => [['type' => 'url', 'url' => '/d']]],
        ]],
    ])));
});

/* ---------------------------------------------------------------- rewriteRoute */

test('rewriteRoute follows descendants but respects the path boundary', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [
        ['type' => 'page', 'route' => '/about', 'children' => [
            ['type' => 'page', 'route' => '/about/team'],
            ['type' => 'page', 'route' => '/about-us'],
        ]],
        ['type' => 'url', 'url' => '/about'],
    ], 'nick');

    eq(['header'], $s->rewriteRoute('/about', '/company'));

    $items = $s->get('header')['items'];
    eq('/company', $items[0]['route']);
    eq('/company/team', $items[0]['children'][0]['route']);
    eq('/about-us', $items[0]['children'][1]['route'], '/about-us is NOT a descendant of /about');
    eq('/about', $items[1]['url'], 'custom URLs are left alone');
});

test('rewriteRoute is a no-op when nothing matches', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [['type' => 'page', 'route' => '/contact']], 'nick');
    eq([], $s->rewriteRoute('/about', '/company'));
    eq(1, $s->get('header')['rev'], 'no write, so no rev bump');
});

/* ---------------------------------------------------------------- resolver statics */

test('isExternal distinguishes hosts, schemes and relative links', function () {
    ok(!MenuResolver::isExternal('/about', 'example.com'));
    ok(!MenuResolver::isExternal('#anchor', 'example.com'));
    ok(!MenuResolver::isExternal('', 'example.com'));
    ok(!MenuResolver::isExternal('https://example.com/x', 'example.com'));
    ok(!MenuResolver::isExternal('https://EXAMPLE.com/x', 'example.com'), 'host compare is case-insensitive');
    ok(MenuResolver::isExternal('https://other.com/x', 'example.com'));
    ok(MenuResolver::isExternal('//other.com/x', 'example.com'), 'protocol-relative');
    ok(MenuResolver::isExternal('mailto:a@b.com', 'example.com'));
    ok(MenuResolver::isExternal('tel:+15550000000', 'example.com'));
});

test('rel covers nofollow and new-tab combinations', function () {
    eq('', MenuResolver::rel(false, ''));
    eq('noopener', MenuResolver::rel(false, '_blank'));
    eq('nofollow', MenuResolver::rel(true, ''));
    eq('noopener nofollow', MenuResolver::rel(true, '_blank'));
});

test('classes builds the theme contract and sanitizes style flags', function () {
    eq('menu-item', MenuResolver::classes([], false, false, false));
    eq('menu-item menu-item--button', MenuResolver::classes(['button'], false, false, false));
    eq('menu-item has-children', MenuResolver::classes([], false, false, true));
    eq('menu-item is-active', MenuResolver::classes([], true, false, false));
    eq('menu-item is-active', MenuResolver::classes([], false, true, false), 'an active child highlights the parent');
    eq('menu-item menu-item--button', MenuResolver::classes(['BUT TON<>'], false, false, false), 'flags are sanitized');
});

/* ---------------------------------------------------------------- resolver against the page tree */

test('resolve reads labels from the page and honours an override', function () use ($grav) {
    $dir = tmpdir();
    $s = store($grav, $dir);
    $s->create('Header', [
        ['type' => 'page', 'route' => '/about'],
        ['type' => 'page', 'route' => '/about', 'label' => 'Our story'],
    ], 'nick');

    MenuResolver::flushCache();
    $nodes = (new MenuResolver($grav, $s))->nodes('header');

    eq(2, count($nodes), 'the sandbox has an /about page');
    eq('link', $nodes[0]['kind']);
    ok($nodes[0]['label'] !== '', 'label resolved from the page');
    eq('Our story', $nodes[1]['label'], 'an explicit label wins');
});

test('a route that does not exist is dropped, or flagged when asked for', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [['type' => 'page', 'route' => '/no-such-page', 'label' => 'Ghost']], 'nick');
    $r = new MenuResolver($grav, $s);

    MenuResolver::flushCache();
    eq([], $r->nodes('header'), 'visitors never see a link to a missing page');

    MenuResolver::flushCache();
    $admin = $r->nodes('header', ['include_broken' => true]);
    eq(1, count($admin));
    eq(true, $admin[0]['broken']);
    eq('Ghost', $admin[0]['label'], 'the stored label survives so the item can be re-pointed');
});

test('a custom URL item resolves, marks external and opens a new tab', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [['type' => 'url', 'url' => 'https://other.example/x', 'label' => 'Portal', 'nofollow' => true]], 'nick');

    MenuResolver::flushCache();
    $node = (new MenuResolver($grav, $s))->nodes('header')[0];

    eq('link', $node['kind']);
    eq(true, $node['external']);
    eq('_blank', $node['target']);
    eq('noopener nofollow', $node['rel']);
});

test('a heading is text, and an empty one with no children disappears', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Footer', [
        ['type' => 'heading', 'label' => 'Services'],
        ['type' => 'heading', 'label' => ''],
    ], 'nick');

    MenuResolver::flushCache();
    $nodes = (new MenuResolver($grav, $s))->nodes('footer');

    eq(1, count($nodes));
    eq('text', $nodes[0]['kind']);
    eq('', $nodes[0]['url']);
});

test('an unknown type still renders as a link when it has somewhere to point', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [['type' => 'mega', 'url' => '/services', 'label' => 'Services']], 'nick');

    MenuResolver::flushCache();
    $node = (new MenuResolver($grav, $s))->nodes('header')[0];
    eq('link', $node['kind'], 'a future type degrades to an ordinary link, never an error');
    eq('/services', $node['url']);
});

test('max_depth drops deeper levels rather than flattening them', function () use ($grav) {
    $s = store($grav, tmpdir());
    $s->create('Header', [
        ['type' => 'url', 'url' => '/a', 'label' => 'A', 'children' => [
            ['type' => 'url', 'url' => '/b', 'label' => 'B', 'children' => [
                ['type' => 'url', 'url' => '/c', 'label' => 'C'],
            ]],
        ]],
    ], 'nick');
    $r = new MenuResolver($grav, $s);

    MenuResolver::flushCache();
    $two = $r->nodes('header', ['max_depth' => 2]);
    eq('B', $two[0]['children'][0]['label']);
    eq([], $two[0]['children'][0]['children'], 'the third level is dropped, not lifted');

    MenuResolver::flushCache();
    $three = $r->nodes('header', ['max_depth' => 3]);
    eq('C', $three[0]['children'][0]['children'][0]['label']);
});

test('exists distinguishes a missing menu from an empty one', function () use ($grav) {
    $s = store($grav, tmpdir());
    $r = new MenuResolver($grav, $s);

    ok(!$r->exists('header'), 'nothing built yet: a theme falls back to the page tree');
    $s->create('Header', [], 'nick');
    MenuResolver::flushCache();
    ok($r->exists('header'), 'built but empty: a theme renders nothing');
    eq([], $r->nodes('header'));
});

/* ---------------------------------------------------------------- run */

foreach ($tests as $name => $fn) {
    try {
        $fn();
        fwrite(STDOUT, "  ok   $name\n");
    } catch (Throwable $e) {
        $failures++;
        fwrite(STDOUT, "  FAIL $name\n       " . $e->getMessage() . "\n");
    }
}
fwrite(STDOUT, sprintf("\n%d tests, %d failed\n", count($tests), $failures));
exit($failures ? 1 : 0);
