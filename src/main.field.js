// Admin2 custom field `menus` — a launcher, not a data field.
//
// Insurance for an Admin2 that cannot render a plugin's own page: the field renders one button and
// mounts the same app full screen, talking to the same API. Its own value stays unused, but the
// field/value/change contract is honoured so Admin2's form machinery is satisfied.

import { mount, unmount } from 'svelte';
import './styles/base.css';
import App from './components/App.svelte';
import { MenusStore } from './lib/store.svelte.js';

const CSS = "__MAW_CSS__"; // replaced by scripts/finalize.mjs
const TAG = window.__GRAV_FIELD_TAG || 'grav-maw-menus--menus';
const HOST_TAG = 'maw-menus-host';

class MenusField extends HTMLElement {
  #field = null;
  #value = null;
  #lastEmitted = null;
  #host = null;
  #app = null;
  #store = null;

  set field(value) { this.#field = value; }
  get field() { return this.#field; }

  set value(value) {
    // Ignore the echo of our own change event.
    const serialized = JSON.stringify(value ?? null);
    if (serialized === this.#lastEmitted) return;
    this.#value = value ?? null;
  }
  get value() { return this.#value; }

  connectedCallback() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    if (root.childElementCount) return;

    const style = document.createElement('style');
    style.textContent = CSS + `
      .launch { display: flex; align-items: center; gap: 10px; }
      .launch p { margin: 0; color: var(--mm-muted-fg); }
    `;
    root.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'mm-root launch';
    wrap.style.position = 'static';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mm-btn primary';
    button.textContent = 'Open the menu builder';
    button.addEventListener('click', () => this.#open());

    const note = document.createElement('p');
    note.textContent = 'Menus are stored separately from this form and save on their own.';

    wrap.append(button, note);
    root.appendChild(wrap);
  }

  #open() {
    if (this.#host) return;

    // A second shadow root on <body>, beyond the reach of any admin overflow or transform.
    this.#host = document.createElement(HOST_TAG);
    this.#host.style.cssText = 'position: fixed; inset: 0; z-index: 2147483000;';
    document.body.appendChild(this.#host);

    const root = this.#host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS + `
      .mm-root { position: fixed; inset: 0; background: var(--mm-bg); padding: 16px; overflow: auto; }
    `;
    root.appendChild(style);

    const target = document.createElement('div');
    target.className = 'mm-root';
    root.appendChild(target);

    this.#store = new MenusStore({});
    this.#app = mount(App, { target, props: { store: this.#store, onClose: () => this.#close() } });
    this.#store.load();
  }

  #close() {
    if (this.#app) unmount(this.#app);
    this.#host?.remove();
    this.#app = null;
    this.#host = null;
    this.#store = null;
  }

  disconnectedCallback() {
    queueMicrotask(() => {
      if (this.isConnected) return;
      this.#close();
    });
  }
}

if (!customElements.get(TAG)) customElements.define(TAG, MenusField);
