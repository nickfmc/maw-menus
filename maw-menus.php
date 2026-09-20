<?php
namespace Grav\Plugin;

use Composer\Autoload\ClassLoader;
use Grav\Common\Cache;
use Grav\Common\Plugin;
use Grav\Plugin\MawMenus\Controllers\MenusController;
use Grav\Plugin\MawMenus\MenuResolver;
use Grav\Plugin\MawMenus\MenuStore;
use Grav\Plugin\MawMenus\TwigFunctions;
use RocketTheme\Toolbox\Event\Event;

/**
 * MAW Menus: drag-and-drop navigation menus for Admin2.
 *
 * - Registers `/api/v1/maw-menus/*` (menu CRUD, a page picker, and seeding from the page tree).
 * - Adds a "Menus" item to the Admin2 sidebar, pointing at the standalone screen in admin-next/pages/.
 * - Gives themes `maw_menu(id)` and `maw_menu_exists(id)`; a theme falls back to its own navigation
 *   when the named menu does not exist, so installing or removing this plugin never breaks a site.
 *
 * Deliberately ships no front-end Twig templates: the plugin supplies data, the theme supplies markup.
 * maw-starter's onTwigTemplatePaths array_unshift()s the per-site template layer at priority 100, so a
 * plugin that unshifted its own directory would end up in front of it and steal every site override.
 *
 * Events are subscribed statically — never gate on isAdmin() here, Admin2 sets admin context later.
 */
class MawMenusPlugin extends Plugin
{
    /**
     * Container flag: tells a theme the Twig functions below are already registered, so it skips its own
     * stubs (Twig throws on a duplicate function name).
     *
     * Spelled out rather than aliased to TwigFunctions::REGISTERED: Grav loads this file before
     * autoload() has registered the PSR-4 loader for classes/, so a constant expression referencing a
     * class in there is a fatal error on boot.
     */
    public const REGISTERED = 'maw_menus';

    public function autoload(): ClassLoader
    {
        $loader = new ClassLoader();
        $loader->addPsr4('Grav\\Plugin\\MawMenus\\', __DIR__ . '/classes/');
        $loader->register();

        return $loader;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'onApiRegisterRoutes' => ['onApiRegisterRoutes', 0],
            'onApiSidebarItems'   => ['onApiSidebarItems', 0],
            'onApiPageMoved'      => ['onApiPageMoved', 0],
            // Ahead of a theme's own onTwigInitialized (priority 0), so it can see these are claimed and
            // skip its no-op stubs. Twig throws on a duplicate function name.
            'onTwigInitialized'   => ['onTwigInitialized', 10],
        ];
    }

    /**
     * maw_menu(id, options) → render-ready nodes
     * maw_menu_exists(id)   → whether that menu has been built
     */
    public function onTwigInitialized(): void
    {
        TwigFunctions::register($this->grav['twig']->twig, new MenuResolver($this->grav));
        $this->grav[self::REGISTERED] = true;
    }

    /**
     * A page was moved or renamed in the admin: follow it, so menu links don't quietly 404.
     *
     * Wrapped in try/catch because a failure here must never break the move itself — a stale menu link
     * shows a broken badge in the admin, which is recoverable; a failed page move is not.
     */
    public function onApiPageMoved(Event $event): void
    {
        if (!$this->config->get('plugins.maw-menus.rewrite_routes', true)) {
            return;
        }
        try {
            $changed = (new MenuStore($this->grav))->rewriteRoute(
                (string) $event['old_route'],
                (string) $event['new_route']
            );
            if ($changed) {
                Cache::clearCache('invalidate');
            }
        } catch (\Throwable $e) {
            $this->grav['log']->warning('maw-menus: route rewrite failed: ' . $e->getMessage());
        }
    }

    /**
     * Routes land under /api/v1/maw-menus/*.
     *
     * This event only fires while the API plugin builds its FastRoute dispatcher, and that dispatcher is
     * cached against each plugin's blueprints.yaml mtime — so bump `version` there after changing routes.
     */
    public function onApiRegisterRoutes(Event $event): void
    {
        $routes = $event['routes'];

        $routes->group('/maw-menus', function ($r) {
            $r->get('/menus', [MenusController::class, 'index']);
            $r->post('/menus', [MenusController::class, 'create']);
            $r->get('/menus/{id}', [MenusController::class, 'show']);
            $r->patch('/menus/{id}', [MenusController::class, 'update']);
            $r->delete('/menus/{id}', [MenusController::class, 'destroy']);
            $r->post('/menus/{id}/seed', [MenusController::class, 'seed']);
            $r->get('/pages', [MenusController::class, 'pages']);
        });
    }

    /**
     * The "Menus" entry in the Admin2 sidebar. `authorize` is an any-of list: api.menus.read is the real
     * permission, api.pages.write is the compatibility grace so existing accounts keep working.
     */
    public function onApiSidebarItems(Event $event): void
    {
        $items = $event['items'];
        $items[] = [
            'id'        => 'maw-menus',
            'plugin'    => 'maw-menus',
            'label'     => 'Menus',
            'icon'      => 'fa-bars',
            'route'     => '/plugin/maw-menus',
            'priority'  => 40,
            'authorize' => ['api.menus.read', 'api.pages.write'],
        ];
        $event['items'] = $items;
    }
}
