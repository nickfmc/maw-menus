<script>
  import MenuTree from './MenuTree.svelte';
  import Inspector from './Inspector.svelte';
  import SourcePanel from './SourcePanel.svelte';

  let { store, onClose = null } = $props();

  let creating = $state(false);
  let newTitle = $state('');
  let newId = $state('');
  let confirmingDelete = $state(false);

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

  async function create() {
    const title = newTitle.trim();
    if (!title) return;
    try {
      await store.createMenu(title, newId.trim() || slug(title));
      creating = false;
      newTitle = '';
      newId = '';
    } catch (e) {
      store.error = e.message;
    }
  }

  async function remove() {
    try {
      await store.deleteMenu(store.current.id);
      confirmingDelete = false;
    } catch (e) {
      store.error = e.message;
    }
  }

  function keydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      store.save();
    }
    if (e.key === 'Escape') {
      creating = false;
      confirmingDelete = false;
    }
  }

  /** Close only on the backdrop itself, so a click inside the dialog doesn't need to stop propagation. */
  function backdrop(e, close) {
    if (e.target === e.currentTarget) close();
  }
</script>

<svelte:window onkeydown={keydown} />

<div class="app">
  <header>
    <select
      class="mm-input picker"
      value={store.current?.id ?? ''}
      onchange={(e) => store.open(e.target.value)}
      disabled={!store.menus.length}
    >
      {#each store.menus as menu (menu.id)}
        <option value={menu.id}>{menu.title} ({menu.id}){menu.is_default ? ' — main' : ''}</option>
      {/each}
      {#if !store.menus.length}<option value="">No menus yet</option>{/if}
    </select>

    <button class="mm-btn" type="button" onclick={() => (creating = true)}>New menu</button>

    {#if store.current}
      <label class="depth">
        Levels
        <select
          class="mm-input"
          value={store.maxDepth}
          onchange={(e) => store.setMaxDepth(Number(e.target.value))}
        >
          {#each [1, 2, 3, 4, 5] as n}<option value={n}>{n}</option>{/each}
        </select>
      </label>
      <span class="count">{store.count} item{store.count === 1 ? '' : 's'}</span>
      {#if store.current && !store.menus.find((m) => m.id === store.current.id)?.is_default}
        <span class="count" title="A theme that doesn't name a menu gets the main one. Change which that is in Plugins → MAW Menus.">
          Not the main menu
        </span>
      {/if}
    {/if}

    <span class="spacer"></span>

    {#if store.dirty}<span class="unsaved">Unsaved changes</span>{/if}
    <button class="mm-btn primary" type="button" disabled={!store.current || store.saving || !store.dirty} onclick={() => store.save()}>
      {store.saving ? 'Saving…' : 'Save'}
    </button>
    {#if store.current}
      <button class="mm-btn danger" type="button" onclick={() => (confirmingDelete = true)}>Delete</button>
    {/if}
    {#if onClose}
      <button class="mm-btn ghost" type="button" onclick={onClose}>Close</button>
    {/if}
  </header>

  {#if store.error}<div class="mm-banner error">{store.error}</div>{/if}
  {#if store.notice}<div class="mm-banner ok">{store.notice}</div>{/if}

  {#if store.loading}
    <p class="muted pad">Loading…</p>
  {:else if !store.current}
    <div class="pad">
      <p class="muted">No menus yet.</p>
      <p class="muted">
        A theme looks for one named <code>header</code>. Until that exists, the site keeps using its
        automatic page-tree navigation — so nothing changes until you are ready.
      </p>
    </div>
  {:else}
    <div class="cols">
      <aside class="left">
        <SourcePanel {store} />
      </aside>
      <main class="middle">
        <MenuTree {store} />
      </main>
      <aside class="right">
        <Inspector {store} />
      </aside>
    </div>
  {/if}
</div>

{#if creating}
  <div class="scrim" role="presentation" onclick={(e) => backdrop(e, () => (creating = false))}>
    <div class="dialog" role="dialog" aria-modal="true" aria-label="New menu">
      <h2>New menu</h2>
      <label class="mm-label" for="mm-title">Name</label>
      <input id="mm-title" class="mm-input" bind:value={newTitle} onkeydown={(e) => e.key === 'Enter' && create()} />
      <label class="mm-label" for="mm-id">Id</label>
      <input id="mm-id" class="mm-input" placeholder={slug(newTitle) || 'header'} bind:value={newId} />
      <p class="mm-help">
        The name a template asks for, as in <code>maw_menu('header')</code>. It cannot be changed later,
        because renaming it would empty the nav with no error anywhere.
      </p>
      <div class="dialog-actions">
        <button class="mm-btn ghost" type="button" onclick={() => (creating = false)}>Cancel</button>
        <button class="mm-btn primary" type="button" disabled={!newTitle.trim()} onclick={create}>Create</button>
      </div>
    </div>
  </div>
{/if}

{#if confirmingDelete}
  <div class="scrim" role="presentation" onclick={(e) => backdrop(e, () => (confirmingDelete = false))}>
    <div class="dialog" role="dialog" aria-modal="true" aria-label="Delete menu">
      <h2>Delete "{store.current.title}"?</h2>
      <p>
        Any template asking for <code>{store.current.id}</code> falls back to the automatic page-tree
        navigation. This cannot be undone.
      </p>
      <div class="dialog-actions">
        <button class="mm-btn ghost" type="button" onclick={() => (confirmingDelete = false)}>Cancel</button>
        <button class="mm-btn danger" type="button" onclick={remove}>Delete</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .app { display: flex; flex-direction: column; height: 100%; min-height: 520px; }

  header { display: flex; align-items: center; gap: 8px; padding: 0 0 12px; flex-wrap: wrap; }
  .picker { width: auto; min-width: 190px; }
  .spacer { flex: 1; }
  .depth { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--mm-muted-fg); }
  .depth select { width: auto; min-height: 28px; }
  .count { color: var(--mm-muted-fg); font-size: 12px; }
  .unsaved { color: var(--mm-warn); font-size: 12px; font-weight: 600; }

  .cols {
    flex: 1; min-height: 0;
    display: grid; grid-template-columns: 260px minmax(0, 1fr) 260px;
    border: 1px solid var(--mm-border); border-radius: var(--mm-radius); overflow: hidden;
    background: var(--mm-bg);
  }
  .left { border-right: 1px solid var(--mm-border); min-height: 0; }
  .right { border-left: 1px solid var(--mm-border); min-height: 0; }
  .middle { min-height: 0; overflow: hidden; }

  @media (max-width: 980px) {
    .cols { grid-template-columns: 1fr; }
    .left, .right { border: 0; border-top: 1px solid var(--mm-border); }
  }

  .pad { padding: 16px 2px; }
  .muted { color: var(--mm-muted-fg); max-width: 60ch; }
  code { font-size: 11.5px; background: var(--mm-muted); padding: 0 3px; border-radius: 3px; }

  .scrim {
    position: fixed; inset: 0; background: rgb(0 0 0 / 0.45);
    display: grid; place-items: center; z-index: 10;
  }
  .dialog {
    width: min(420px, calc(100vw - 32px)); padding: 18px;
    background: var(--mm-card); border: 1px solid var(--mm-border); border-radius: var(--mm-radius);
    box-shadow: 0 20px 50px rgb(0 0 0 / 0.3);
  }
  .dialog h2 { margin: 0 0 12px; font-size: 15px; }
  .dialog .mm-label { margin-top: 10px; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
</style>
