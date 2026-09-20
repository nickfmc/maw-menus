// Editor state. The only file in src/lib that uses Svelte reactivity — every structural decision lives
// in tree.js / dnd.js so it can be tested without a browser.

import { api } from './api.js';
import * as tree from './tree.js';

export class MenusStore {
  /** @type {Array<object>} summaries from GET /menus */
  menus = $state([]);
  /** @type {object|null} the full record being edited */
  current = $state(null);
  /** @type {Array<object>} the item tree being edited */
  items = $state([]);
  /** @type {Set<string>} collapsed rows */
  collapsed = $state(new Set());
  /** @type {string|null} selected row key */
  selected = $state(null);

  /** Resolved nodes keyed by item key, for broken badges. */
  resolved = $state({});

  loading = $state(true);
  saving = $state(false);
  dirty = $state(false);
  error = $state('');
  notice = $state('');

  /** The rev the editor loaded, sent as base_rev so a concurrent save is refused rather than lost. */
  baseRev = $state(null);

  constructor({ onState } = {}) {
    this.onState = onState || (() => {});
  }

  get maxDepth() {
    return this.current?.max_depth || 2;
  }

  get rows() {
    return tree.flatten(this.items, this.collapsed);
  }

  get selectedItem() {
    return this.selected ? tree.findItem(this.items, this.selected) : null;
  }

  get count() {
    return tree.countItems(this.items);
  }

  /** Admin2 merges this into its own {dirty, valid, busy} and uses `dirty` for the route guard. */
  #publish() {
    this.onState({ dirty: this.dirty, busy: this.saving, valid: true });
  }

  #setDirty(value) {
    this.dirty = value;
    this.#publish();
  }

  flash(message) {
    this.notice = message;
    setTimeout(() => {
      if (this.notice === message) this.notice = '';
    }, 2500);
  }

  async load(preferId = null) {
    this.loading = true;
    this.error = '';
    try {
      this.menus = (await api.list()) || [];
      const id = preferId || this.current?.id || this.menus[0]?.id || null;
      if (id) {
        await this.open(id);
      } else {
        this.current = null;
        this.items = [];
      }
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
      this.#publish();
    }
  }

  async open(id) {
    this.error = '';
    try {
      const menu = await api.get(id, true);
      this.current = menu;
      this.items = tree.normalize(menu.items || []);
      this.baseRev = menu.rev;
      this.selected = null;
      this.collapsed = new Set();
      this.#indexResolved(menu.resolved || []);
      this.#setDirty(false);
    } catch (e) {
      this.error = e.message;
    }
  }

  /** Flatten the resolved tree into {key: node} so a row can show its resolved label and broken state. */
  #indexResolved(nodes, out = {}) {
    for (const node of nodes) {
      if (node.key) out[node.key] = node;
      this.#indexResolved(node.children || [], out);
    }
    this.resolved = out;
    return out;
  }

  /** Every mutation goes through here, so dirty tracking can never be forgotten. */
  mutate(fn) {
    const next = fn(this.items);
    if (next === this.items) return;
    this.items = next;
    this.#setDirty(true);
  }

  select(key) {
    this.selected = key;
  }

  toggleCollapse(key) {
    const next = new Set(this.collapsed);
    next.has(key) ? next.delete(key) : next.add(key);
    this.collapsed = next;
  }

  /* -------------------------------------------------- item operations */

  add(item) {
    const node = tree.normalize([item])[0];
    this.mutate((items) => [...items, node]);
    this.selected = node.key;
    return node;
  }

  addMany(list) {
    const nodes = tree.normalize(list);
    this.mutate((items) => [...items, ...nodes]);
    return nodes;
  }

  replaceAll(list) {
    this.mutate(() => tree.normalize(list));
    this.selected = null;
  }

  update(key, patch) {
    this.mutate((items) => {
      const walk = (list) =>
        list.map((item) =>
          item.key === key ? { ...item, ...patch } : { ...item, children: walk(item.children || []) }
        );
      return walk(items);
    });
  }

  moveUp(key) { this.mutate((items) => tree.moveUp(items, key)); }
  moveDown(key) { this.mutate((items) => tree.moveDown(items, key)); }
  indent(key) { this.mutate((items) => tree.indent(items, key, this.maxDepth)); }
  outdent(key) { this.mutate((items) => tree.outdent(items, key)); }
  duplicate(key) { this.mutate((items) => tree.duplicate(items, key)); }

  remove(key) {
    this.mutate((items) => tree.remove(items, key));
    if (this.selected === key) this.selected = null;
  }

  applyDrop(dragKey, projection) {
    this.mutate((items) => tree.applyProjection(items, dragKey, projection));
  }

  /* -------------------------------------------------- persistence */

  async save() {
    if (!this.current || this.saving) return false;
    this.saving = true;
    this.error = '';
    this.#publish();
    try {
      const menu = await api.update(this.current.id, {
        items: this.items,
        base_rev: this.baseRev,
      });
      this.current = menu;
      this.baseRev = menu.rev;
      this.#setDirty(false);
      this.flash('Saved');
      // Re-read so broken badges reflect what the server actually resolved.
      await this.refreshResolved();
      return true;
    } catch (e) {
      this.error = e.status === 409
        ? `${e.message} Reload to see their version, or save again to overwrite it.`
        : e.message;
      // After a conflict the next save force-writes, which is what "save again" above promises.
      if (e.status === 409) this.baseRev = null;
      return false;
    } finally {
      this.saving = false;
      this.#publish();
    }
  }

  async refreshResolved() {
    if (!this.current) return;
    try {
      const menu = await api.get(this.current.id, true);
      this.#indexResolved(menu.resolved || []);
    } catch {
      // Badges are a nicety; a failure here must not disturb the editor.
    }
  }

  async createMenu(title, id) {
    const menu = await api.create({ title, id: id || undefined, items: [], max_depth: 2 });
    this.menus = [...this.menus, menu].sort((a, b) => a.title.localeCompare(b.title));
    await this.open(menu.id);
    return menu;
  }

  async deleteMenu(id) {
    await api.remove(id);
    this.menus = this.menus.filter((m) => m.id !== id);
    this.current = null;
    this.items = [];
    this.#setDirty(false);
    await this.load();
  }

  async setMaxDepth(depth) {
    if (!this.current) return;
    this.current = { ...this.current, max_depth: depth };
    this.#setDirty(true);
  }

  async seed(replace) {
    if (!this.current) return;
    const { items } = await api.seed(this.current.id, { include_site_menu: true });
    replace ? this.replaceAll(items) : this.addMany(items);
    this.flash(replace ? 'Rebuilt from the page tree' : 'Added from the page tree');
  }
}
