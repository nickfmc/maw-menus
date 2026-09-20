// PHASE 0 PROBE — hand-written, not built from src/. Replaced by the compiled Svelte app in phase 2.
//
// It proves three things about the Admin2 standalone-page mechanism before anything is built on it:
//   1. Admin2 injects window.__GRAV_PAGE_TAG and mounts the element it names.
//   2. The API globals (__GRAV_API_SERVER_URL / __GRAV_API_PREFIX / __GRAV_API_TOKEN) are set before
//      this module is evaluated, so an authenticated fetch works straight away.
//   3. A `page-state` event with {dirty: true} arms Admin2's unsaved-changes route guard.
//
// Admin2 evaluates this file as ONE self-contained ES module from a blob URL: no relative imports.

const TAG = window.__GRAV_PAGE_TAG || 'grav-maw-menus--page';

function apiBase() {
  const server = (window.__GRAV_API_SERVER_URL || '').replace(/\/$/, '');
  const prefix = window.__GRAV_API_PREFIX || '/api/v1';
  return server + prefix;
}

class MenusPage extends HTMLElement {
  #root = null;

  connectedCallback() {
    if (this.#root) return;
    this.#root = this.attachShadow({ mode: 'open' });
    this.#root.innerHTML = `
      <style>
        .box { font: 14px/1.5 system-ui, sans-serif; padding: 1.5rem; }
        h2 { margin: 0 0 .5rem; font-size: 1.1rem; }
        dt { font-weight: 600; margin-top: .75rem; }
        dd { margin: 0; font-family: ui-monospace, monospace; }
        button { margin-top: 1.25rem; padding: .5rem .9rem; cursor: pointer; }
        .ok { color: #15803d; } .bad { color: #b91c1c; }
      </style>
      <div class="box">
        <h2>Menus works</h2>
        <p>Phase 0 probe for the Admin2 plugin-page mechanism.</p>
        <dl>
          <dt>Page tag</dt><dd>${TAG}</dd>
          <dt>API token present</dt>
          <dd class="${window.__GRAV_API_TOKEN ? 'ok' : 'bad'}">${window.__GRAV_API_TOKEN ? 'yes' : 'no'}</dd>
          <dt>GET /maw-menus/menus</dt><dd id="api">…</dd>
        </dl>
        <button type="button" id="dirty">Mark dirty (arms the route guard)</button>
      </div>
    `;

    this.#root.getElementById('dirty').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('page-state', { detail: { dirty: true }, bubbles: true }));
      this.#root.getElementById('dirty').textContent = 'Dirty — now try leaving the page';
    });

    this.#probe();
  }

  async #probe() {
    const out = this.#root.getElementById('api');
    try {
      const headers = { Accept: 'application/json' };
      if (window.__GRAV_API_TOKEN) headers['X-API-Token'] = window.__GRAV_API_TOKEN;
      const res = await fetch(apiBase() + '/maw-menus/menus', { headers, credentials: 'same-origin' });
      const body = await res.text();
      out.textContent = `${res.status} ${body.slice(0, 120)}`;
      out.className = res.ok ? 'ok' : 'bad';
    } catch (e) {
      out.textContent = String(e);
      out.className = 'bad';
    }
  }
}

if (!customElements.get(TAG)) customElements.define(TAG, MenusPage);
