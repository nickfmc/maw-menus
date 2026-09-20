# MAW Menus

Drag-and-drop navigation menus for Grav 2.1 and Admin2. Build any number of named menus out of pages and
custom links, nest them, and render them from a theme with one Twig call.

Grav has no menu concept: navigation comes from the page tree, so ordering means renaming folders and a
hidden page can never appear in the nav. This plugin adds menus as data, without taking the page tree away.

> **Status: in development.** Usable end to end — build menus on the Admin2 **Menus** screen and a theme
> renders them. Mega-menu panels are planned; the data model already accepts them.

## Features

- **Any number of named menus.** A theme asks for one by name: `maw_menu('header')`.
- **Pages or custom links.** A page item stores only its route, so the label follows the page's `menu:` /
  `title:` for ever, and a moved page is followed automatically.
- **Nesting**, with a per-menu depth limit.
- **Per item:** label override, icon, short description, open in a new tab, nofollow, and style flags
  (`button`, `highlight`) that become CSS classes.
- **Hidden pages can be linked.** Anything in the tree can go in a menu, `visible: false` or not.
- **Falls back cleanly.** No menu of that name, or plugin removed, and the theme's own navigation returns.

## Requirements

- Grav 2.1+, PHP 8.3+
- [api](https://github.com/getgrav/grav-plugin-api) >= 1.0.30 and [admin2](https://github.com/getgrav/grav-plugin-admin2) >= 2.1
- A theme that calls `maw_menu()` — [maw-starter](https://github.com/nickfmc/grav-theme-maw-starter) 1.5.0+ does

## Install

```bash
git submodule add https://github.com/nickfmc/grav-plugin-maw-menus.git user/plugins/maw-menus
php bin/grav clearcache
```

## Using it

**Menus** in the Admin2 sidebar. Drag a row by its grip to reorder it, and drag sideways to nest it —
the drop indicator is drawn at the depth you would land at. Every move also has a button and an
`Alt`+arrow shortcut, and `Ctrl/Cmd+S` saves.

Add items from the panel on the left: **Pages** (searchable, including pages hidden from the automatic
nav), **Link** for a custom URL or a grouping heading, or **Build** to seed the whole menu from the page
tree the way the theme's automatic navigation would.

## What a theme provides

The plugin supplies data; the theme supplies markup. It deliberately ships **no front-end templates**, so it
can never win over a theme's or a site's own.

| Function | Returns |
|---|---|
| `maw_menu_exists(id)` | whether a menu of that name exists |
| `maw_menu(id, options = {})` | a list of render-ready nodes, `[]` when the menu is missing |

`options`: `max_depth` (defaults to the menu's own), `include_broken` (the admin passes true),
`current` (the page to compute active state against; defaults to the current one).

Each node:

| Key | Meaning |
|---|---|
| `kind` | `link` or `text` — **switch on this, never on the stored item type** |
| `label` | resolved text |
| `url` | href; `''` for a text node |
| `icon` | the raw stored token; pipe it through your own icon filter |
| `description` | optional one-liner |
| `target`, `rel` | `_blank` and `noopener` / `nofollow` as needed |
| `external` | host differs from the site's, or a `mailto:` / `tel:` link |
| `active`, `activeChild` | the current page, or an ancestor of it |
| `classes` | `menu-item`, plus `menu-item--<flag>`, `has-children`, `is-active` |
| `broken` | only with `include_broken`: the page is missing or unpublished |
| `children` | nested nodes |

Switching on `kind` is what keeps a future item type from breaking an older theme: an unknown type with a
usable href arrives as a `link`, and without one as `text`.

A theme should use `maw_menu_exists()` for the fallback decision rather than checking whether `maw_menu()`
is empty — a menu that exists and is empty is a deliberate "show nothing".

## Storage

Menus live in `user/data/maw-menus/menus/<id>.yaml` — **commit them**, they are site content.

```yaml
schema: 1
id: header
title: Header
max_depth: 2
rev: 7
items:
  - { key: a1b2c3, type: page, route: /about }
  - key: s1t2u3
    type: page
    route: /contact
    label: 'Book a call'
    style: [button]
```

A menu's **id is the template contract**, so there is no rename: changing it would empty a nav with no
error anywhere. Pick it when you create the menu.

Item types are `page`, `url` and `heading` (a non-link grouping label). Keys this version doesn't know are
written back untouched, so a newer version's file survives a round trip through an older install.

## API

All under `/api/v1/maw-menus`. Reads need `api.menus.read`, writes `api.menus.write`; `api.pages.write` is
accepted as a fallback for now so existing accounts keep working.

| Method | Path | Purpose |
|---|---|---|
| GET | `/menus` | summaries |
| POST | `/menus` | `{id?, title, items?, max_depth?}` |
| GET | `/menus/{id}` | one menu; `?resolve=1` adds resolved nodes including broken ones |
| PATCH | `/menus/{id}` | `{title?, items?, max_depth?, base_rev?}`; 409 on a stale `base_rev` |
| DELETE | `/menus/{id}` | remove it (the theme falls back) |
| POST | `/menus/{id}/seed` | build items from the page tree; returns them, saves nothing |
| GET | `/pages` | `?search=&limit=` — the page picker |

## Rollback

Delete the menu file, or disable the plugin, and the site goes back to the theme's own navigation.

## Develop

```bash
php user/plugins/maw-menus/tests/php/run.php    # PHP tests, no dependencies
npm test                                        # tree and drag-projection logic
npm run build                                   # rebuild the admin bundles after editing src/
```

The compiled bundles are committed, so a site never needs Node. `src/lib/tree.js` and `src/lib/dnd.js`
hold every structural decision and contain no Svelte, which is what keeps them testable with
`node --test` and no dependencies — keep it that way.

The same app also builds as an Admin2 custom field (`type: menus`), which opens it full screen. That is
insurance for an Admin2 that cannot render a plugin's own page; the sidebar screen is the normal route.

**After adding or changing an API route, bump `version` in `blueprints.yaml`.** The API plugin caches its
route table and only rebuilds it when a plugin blueprint changes; otherwise the new endpoint 404s (or keeps
answering with the old method set).

MIT © Mountain Air Web
