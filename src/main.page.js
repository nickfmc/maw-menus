// Admin2 plugin page `maw-menus`.
//
// Admin2 prepends `window.__GRAV_PAGE_TAG = "..."` to this module, evaluates it from a blob URL, waits
// for that custom element to be defined, creates it and appends it. It sets NO properties — the
// component fetches its own data — and listens for one event, `page-state`, whose detail it merges into
// {dirty, valid, busy}; `dirty` drives the unsaved-changes route guard.

import { mount, unmount } from 'svelte';
import './styles/base.css';
import App from './components/App.svelte';
import { MenusStore } from './lib/store.svelte.js';

const CSS = "__MAW_CSS__"; // replaced by scripts/finalize.mjs
const TAG = window.__GRAV_PAGE_TAG || 'grav-maw-menus--page';

class MenusPage extends HTMLElement {
  #app = null;
  #store = null;

  connectedCallback() {
    if (this.#app) return;

    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    root.appendChild(style);

    const target = document.createElement('div');
    target.className = 'mm-root';
    root.appendChild(target);

    this.#store = new MenusStore({
      onState: (state) => this.dispatchEvent(new CustomEvent('page-state', { detail: state, bubbles: true })),
    });
    this.#app = mount(App, { target, props: { store: this.#store } });
    this.#store.load();
  }

  // Admin2 can detach and re-attach the same element, so confirm it is really gone before tearing down.
  disconnectedCallback() {
    queueMicrotask(() => {
      if (this.isConnected) return;
      if (this.#app) unmount(this.#app);
      this.#app = null;
      this.#store = null;
      if (this.shadowRoot) this.shadowRoot.innerHTML = '';
    });
  }
}

if (!customElements.get(TAG)) customElements.define(TAG, MenusPage);
