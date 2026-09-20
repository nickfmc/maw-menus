# MAW Menus

Drag-and-drop navigation menus for Grav 2.1 and Admin2. Build any number of named menus out of pages and
custom links, nest them, and render them from a theme with one Twig call.

Grav has no menu concept: navigation comes from the page tree, so ordering means renaming folders and a
hidden page can never appear in the nav. This plugin adds menus as data, without taking the page tree away.

> **Status: in development.** Phase 0 (proving the Admin2 standalone-page mechanism) only.

## Requirements

- Grav 2.1+, PHP 8.3+
- [api](https://github.com/getgrav/grav-plugin-api) >= 1.0.30 and [admin2](https://github.com/getgrav/grav-plugin-admin2) >= 2.1
- A theme that calls `maw_menu()` — [maw-starter](https://github.com/nickfmc/grav-theme-maw-starter) 1.5.0+ does

## Install

```bash
git submodule add https://github.com/nickfmc/grav-plugin-maw-menus.git user/plugins/maw-menus
php bin/grav clearcache
```

## What a theme provides

The plugin supplies data; the theme supplies markup. Two Twig functions:

| Function | Returns |
|---|---|
| `maw_menu_exists(id)` | whether a menu of that name exists |
| `maw_menu(id, options = {})` | a list of render-ready nodes, `[]` when the menu is missing |

They are separate so a theme can tell *"there is no menu named header"* (fall back to its own navigation)
from *"the header menu exists and is empty"* (render nothing).

## Storage

Menus live in `user/data/maw-menus/menus/<id>.yaml` — **commit them**, they are site content.

## Develop

```bash
php user/plugins/maw-menus/tests/php/run.php    # PHP tests, no dependencies
```

**After adding or changing an API route, bump `version` in `blueprints.yaml`.** The API plugin caches its
route table and only rebuilds it when a plugin blueprint changes; otherwise the new endpoint returns 404.

MIT © Mountain Air Web
