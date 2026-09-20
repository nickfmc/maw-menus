// Thin client for the Grav API, using the globals Admin2 injects before evaluating a plugin page or
// custom field. Adapted from maw-builder's client — same contract, different routes.

function base() {
  const server = (window.__GRAV_API_SERVER_URL || '').replace(/\/$/, '');
  const prefix = window.__GRAV_API_PREFIX || '/api/v1';
  return server + prefix;
}

function headers() {
  const h = { Accept: 'application/json' };
  if (window.__GRAV_API_TOKEN) h['X-API-Token'] = window.__GRAV_API_TOKEN;
  if (window.__GRAV_ENVIRONMENT) h['X-Grav-Environment'] = window.__GRAV_ENVIRONMENT;
  return h;
}

async function request(method, path, body) {
  const init = { method, headers: headers(), credentials: 'same-origin' };
  if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  const res = await fetch(base() + path, init);
  if (res.status === 204) return null;

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.detail || json?.error?.message || json?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.errors = json?.errors || null;
    throw err;
  }
  return json && typeof json === 'object' && 'data' in json ? json.data : json;
}

export const api = {
  list: () => request('GET', '/maw-menus/menus'),
  get: (id, resolve = false) => request('GET', `/maw-menus/menus/${encodeURIComponent(id)}${resolve ? '?resolve=1' : ''}`),
  create: (payload) => request('POST', '/maw-menus/menus', payload),
  update: (id, payload) => request('PATCH', `/maw-menus/menus/${encodeURIComponent(id)}`, payload),
  remove: (id) => request('DELETE', `/maw-menus/menus/${encodeURIComponent(id)}`),
  seed: (id, payload = {}) => request('POST', `/maw-menus/menus/${encodeURIComponent(id)}/seed`, payload),

  /**
   * The page picker. Kept as one function so it can be swapped for the core /pages endpoint
   * without touching the component.
   */
  pages: (search = '') => request('GET', `/maw-menus/pages${search ? `?search=${encodeURIComponent(search)}` : ''}`),
};
