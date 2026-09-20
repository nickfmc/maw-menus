<script>
  let { store } = $props();

  const item = $derived(store.selectedItem);
  const node = $derived(item ? store.resolved[item.key] : null);

  function set(patch) {
    store.update(item.key, patch);
  }

  function toggleStyle(flag, on) {
    const style = new Set(item.style || []);
    on ? style.add(flag) : style.delete(flag);
    set({ style: [...style] });
  }
</script>

{#if !item}
  <p class="empty">Select an item to edit it.</p>
{:else}
  <div class="fields mm-scroll">
    {#if node?.broken}
      <div class="mm-banner error">
        This points at <code>{item.route}</code>, which is missing or unpublished. It is not shown on the
        site. Fix the page, or point this item somewhere else.
      </div>
    {/if}

    <label class="mm-label" for="mm-label-field">Label</label>
    <input
      id="mm-label-field"
      class="mm-input"
      value={item.label || ''}
      placeholder={item.type === 'page' ? node?.label || 'Follows the page title' : ''}
      oninput={(e) => set({ label: e.target.value })}
    />
    {#if item.type === 'page'}
      <p class="mm-help">Leave this empty and the item follows the page's own menu label.</p>
    {/if}

    {#if item.type === 'page'}
      <label class="mm-label" for="mm-route-field">Page</label>
      <input id="mm-route-field" class="mm-input" value={item.route || ''} oninput={(e) => set({ route: e.target.value })} />
    {:else if item.type === 'url'}
      <label class="mm-label" for="mm-url-field">URL</label>
      <input id="mm-url-field" class="mm-input" value={item.url || ''} oninput={(e) => set({ url: e.target.value })} />
    {/if}

    {#if item.type !== 'heading'}
      <label class="mm-label" for="mm-icon-field">Icon</label>
      <input id="mm-icon-field" class="mm-input" value={item.icon || ''} placeholder="fa-user" oninput={(e) => set({ icon: e.target.value })} />

      <label class="mm-label" for="mm-desc-field">Description</label>
      <input id="mm-desc-field" class="mm-input" value={item.description || ''} oninput={(e) => set({ description: e.target.value })} />
      <p class="mm-help">Shown under the label. Best on items inside a dropdown.</p>

      <label class="check">
        <input type="checkbox" checked={item.target === '_blank'} onchange={(e) => set({ target: e.target.checked ? '_blank' : '' })} />
        Open in a new tab
      </label>
      <label class="check">
        <input type="checkbox" checked={!!item.nofollow} onchange={(e) => set({ nofollow: e.target.checked })} />
        Add <code>nofollow</code>
      </label>

      <p class="mm-label" style="margin-top: 14px">Style</p>
      <label class="check">
        <input type="checkbox" checked={item.style?.includes('button')} onchange={(e) => toggleStyle('button', e.target.checked)} />
        Show as a button
      </label>
      <label class="check">
        <input type="checkbox" checked={item.style?.includes('highlight')} onchange={(e) => toggleStyle('highlight', e.target.checked)} />
        Highlight
      </label>
    {/if}
  </div>
{/if}

<style>
  .empty { color: var(--mm-muted-fg); padding: 20px 14px; }
  .fields { padding: 14px; height: 100%; }
  .fields .mm-label { margin-top: 12px; }
  .fields .mm-label:first-of-type { margin-top: 0; }
  .check { display: flex; align-items: center; gap: 7px; margin-top: 8px; }
  code { font-size: 11.5px; background: var(--mm-muted); padding: 0 3px; border-radius: 3px; }
</style>
