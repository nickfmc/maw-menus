<?php
namespace Grav\Plugin;

use Composer\Autoload\ClassLoader;
use Grav\Common\Plugin;
use Grav\Plugin\MawMenus\Controllers\MenusController;
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
    /** Container flag: tells maw-starter the Twig functions below are already registered. */
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
        ];
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
