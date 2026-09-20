# Changelog

## v0.4.0 (2026-09-20)
Support for themes other than maw-starter.

- **A "Main menu" setting.** `maw_menu()` and `maw_menu_exists()` now take no id at all, and resolve to whichever menu the plugin is set to treat as the main one. A theme no longer has to invent a naming convention, and a site can repoint its navigation without editing a template. The admin marks that menu "main" in the picker.
- **A ready-made renderer**, `maw-menus/menu.html.twig`, so adding menus to a theme is one include rather than writing markup. It takes `menu`, `nodes`, `class`, `depth`, `aria` and `icons`. Icons are off by default: the stored value is a raw token and only the theme knows its icon set.
- The plugin's template path is **appended**, never prepended, so a theme or a per-site layer always wins.
- README now documents both integration routes and the full node shape.
- Fix: the renderer's own doc comment nested a Twig comment inside another. Comments do not nest, so the block ended early and the usage example became live code — a template that included itself.

## v0.3.0 (2026-09-20)
The menu builder itself: a drag-and-drop nesting tree on the Admin2 **Menus** screen.

- **Drag to nest.** The tree flattens while dragging, so an item can never be dropped inside itself. Depth follows how far the pointer travels sideways, and the drop indicator is drawn at the depth you would land at — without that nobody can tell what is about to happen.
- **Refuses impossible drops, and says why.** You cannot skip a level or orphan the row below; past the menu's level limit the indicator turns amber and reads "This menu renders 2 levels".
- **Keyboard equivalent for every move.** `Alt`+arrows, or the per-row buttons, run the same operations as a drag. `Ctrl/Cmd+S` saves.
- **Add items** from a searchable page list (hidden and draft pages included — something the page tree could never do), a custom URL, or a plain heading that groups the items under it.
- **Build from the page tree** in one click, using the same rules the theme's automatic navigation uses.
- **Inspector** for label, page/URL, icon, description, new tab, nofollow and the button/highlight style flags.
- Items pointing at a missing or unpublished page are badged **Broken** — they are kept in the file so they can be re-pointed, and never rendered to a visitor.
- Unsaved changes arm Admin2's own "leave page?" guard, and a concurrent save is reported rather than silently overwritten.
- 31 JS tests cover the tree and drop-projection logic, which is deliberately plain JavaScript with no Svelte in it.

## v0.2.0 (2026-09-20)
First working end to end: menus are stored, served and rendered. The admin screen is still the phase 0 probe.

- **Storage.** `user/data/maw-menus/menus/<id>.yaml`, one file per menu, committed to git. Every write bumps `rev`; saving against a stale `rev` is refused with 409 so two editors can't overwrite each other silently.
- **Nothing is discarded.** Item keys this version doesn't recognise are written back untouched, so a file from a future version (mega-menu panels, say) survives a round trip through this one.
- **API.** `/api/v1/maw-menus/*`: list, create, read (with `?resolve=1`), update, delete, a page picker, and seeding a menu from the page tree.
- **Twig.** `maw_menu(id, options)` and `maw_menu_exists(id)` for themes. Separate on purpose: a theme has to tell "no menu built" (fall back to its own nav) from "menu built and emptied" (render nothing).
- **Page moves are followed.** `onApiPageMoved` rewrites stored routes, prefix-aware — renaming `/about` fixes `/about/team` and leaves `/about-us` alone.
- **Caches.** Every write invalidates Grav's page cache; nothing in the page files changes when a menu does, so without it edits wouldn't appear.
- Sidebar entry and the standalone Admin2 screen at `/plugin/maw-menus`.

## v0.1.0 (2026-09-20)
- Scaffold: plugin bootstrap, sidebar item, and a probe for the Admin2 standalone-page mechanism.
