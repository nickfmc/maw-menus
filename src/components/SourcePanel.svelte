<script>
  // Where new items come from: the page tree, a typed URL, a plain heading, or a one-click seed.
  import { api } from '../lib/api.js';
  import { newItem } from '../lib/tree.js';

  let { store } = $props();

  let tab = $state('pages');
  let pages = $state([]);
  let search = $state('');
  let chosen = $state(new Set());
  let loading = $state(false);
  let loadError = $state('');

  let url = $state('');
  let label = $state('');
  let headingLabel = $state('');

  async function loadPages() {
    loading = true;
    loadError = '';
    try {
      pages = (await api.pages(search)) || [];
    } catch (e) {
      loadError = e.message;
    } finally {
      loading = false;
    }
  }

  // Load once the panel first shows the pages tab, and again whenever the search changes.
  $effect(() => {
    if (tab === 'pages') {
      const term = search;
      const t = setTimeout(() => { search === term && loadPages(); }, 200);
      return () => clearTimeout(t);
    }
  });

  function toggle(route) {
    const next = new Set(chosen);
    next.has(route) ? next.delete(route) : next.add(route);
    chosen = next;
  }

  function addPages() {
    const items = pages
      .filter((p) => chosen.has(p.route))
      // Label stays empty on purpose: the item then follows the page's own menu label for ever.
      .map((p) => newItem('page', { route: p.route }));
    if (items.length) {
      store.addMany(items);
      store.flash(`Added ${items.length} item${items.length === 1 ? '' : 's'}`);
    }
    chosen = new Set();
  }

  function addLink() {
    if (!url.trim()) return;
    store.add(newItem('url', { url: url.trim(), label: label.trim() }));
    url = '';
    label = '';
  }

  function addHeading() {
    if (!headingLabel.trim()) return;
    store.add(newItem('heading', { label: headingLabel.trim() }));
    headingLabel = '';
  }
</script>

<div class="panel">
  <div class="tabs">
    <button class="tab" class:on={tab === 'pages'} type="button" onclick={() => (tab = 'pages')}>Pages</button>
    <button class="tab" class:on={tab === 'link'} type="button" onclick={() => (tab = 'link')}>Link</button>
    <button class="tab" class:on={tab === 'seed'} type="button" onclick={() => (tab = 'seed')}>Build</button>
  </div>

  {#if tab === 'pages'}
    <div class="body mm-scroll">
      <input class="mm-input" placeholder="Search pages" bind:value={search} />
      {#if loadError}
        <div class="mm-banner error">{loadError}</div>
      {:else if loading}
        <p class="muted">Loading…</p>
      {:else if !pages.length}
        <p class="muted">No pages match.</p>
      {:else}
        <ul class="pages">
          {#each pages as page (page.route)}
            <li style="padding-inline-start: calc(var(--mm-indent) * {page.depth})">
              <label class="page">
                <input type="checkbox" checked={chosen.has(page.route)} onchange={() => toggle(page.route)} />
                <span class="name">{page.menu || page.title}</span>
                {#if !page.visible}<span class="mm-tag" title="Not in the automatic page-tree nav">Hidden</span>{/if}
                {#if !page.published}<span class="mm-tag broken">Draft</span>{/if}
              </label>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="foot">
      <button class="mm-btn primary" type="button" disabled={!chosen.size} onclick={addPages}>
        Add {chosen.size || ''} selected
      </button>
    </div>
  {:else if tab === 'link'}
    <div class="body mm-scroll">
      <label class="mm-label" for="mm-new-url">URL</label>
      <input id="mm-new-url" class="mm-input" placeholder="https://example.com or /a/page" bind:value={url} />
      <label class="mm-label" for="mm-new-label">Label</label>
      <input id="mm-new-label" class="mm-input" bind:value={label} onkeydown={(e) => e.key === 'Enter' && addLink()} />
      <button class="mm-btn primary wide" type="button" onclick={addLink}>Add link</button>

      <hr />

      <label class="mm-label" for="mm-new-heading">Heading</label>
      <input
        id="mm-new-heading"
        class="mm-input"
        placeholder="Services"
        bind:value={headingLabel}
        onkeydown={(e) => e.key === 'Enter' && addHeading()}
      />
      <p class="mm-help">A label that groups the items under it. Not a link.</p>
      <button class="mm-btn wide" type="button" onclick={addHeading}>Add heading</button>
    </div>
  {:else}
    <div class="body mm-scroll">
      <p>Build this menu from the page tree, exactly as the theme's automatic navigation would: visible,
        linkable pages and one level of children.</p>
      <p class="mm-help">Labels are left empty so each item keeps following its page's own menu label.</p>
      <button class="mm-btn wide" type="button" onclick={() => store.seed(false)}>Add to this menu</button>
      <button class="mm-btn wide danger" type="button" onclick={() => store.seed(true)}>Replace everything</button>
    </div>
  {/if}
</div>

<style>
  .panel { display: flex; flex-direction: column; height: 100%; }
  .tabs { display: flex; gap: 2px; padding: 8px 8px 0; border-bottom: 1px solid var(--mm-border); }
  .tab {
    flex: 1; height: 30px; border: 0; background: transparent; border-radius: 6px 6px 0 0;
    font-weight: 550; color: var(--mm-muted-fg);
  }
  .tab.on { background: var(--mm-muted); color: var(--mm-fg); }

  .body { flex: 1; padding: 12px; min-height: 0; }
  .body > .mm-label { margin-top: 12px; }
  .body > .mm-label:first-child { margin-top: 0; }
  .foot { padding: 10px 12px; border-top: 1px solid var(--mm-border); }

  .wide { width: 100%; margin-top: 10px; }
  .muted { color: var(--mm-muted-fg); }
  hr { border: 0; border-top: 1px solid var(--mm-border); margin: 16px 0; }

  .pages { list-style: none; margin: 10px 0 0; padding: 0; }
  .page { display: flex; align-items: center; gap: 7px; padding: 4px 2px; border-radius: 4px; }
  .page:hover { background: var(--mm-muted); }
  .name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
