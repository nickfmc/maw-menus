# Changelog

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
