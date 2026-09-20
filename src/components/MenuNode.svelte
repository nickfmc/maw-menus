<script>
  // One row of the tree. Dumb on purpose: every structural decision is in lib/tree.js and lib/dnd.js.
  let { row, store, dragging, onDragStart } = $props();

  const item = $derived(row.item);
  const node = $derived(store.resolved[item.key] || null);
  const selected = $derived(store.selected === item.key);
  const hasChildren = $derived((item.children?.length ?? 0) > 0);
  const collapsed = $derived(store.collapsed.has(item.key));

  // The label an editor typed wins; otherwise show what the server resolved, so a page item reads as
  // the page's own menu label rather than a bare route.
  const label = $derived(item.label || node?.label || item.url || item.route || 'Untitled');
  const target = $derived(item.type === 'page' ? item.route : item.type === 'url' ? item.url : '');

  function keydown(e) {
    if (!e.altKey) return;
    const moves = {
      ArrowUp: () => store.moveUp(item.key),
      ArrowDown: () => store.moveDown(item.key),
      ArrowRight: () => store.indent(item.key),
      ArrowLeft: () => store.outdent(item.key),
    };
    if (moves[e.key]) {
      e.preventDefault();
      moves[e.key]();
    }
  }
</script>

<div
  class="row"
  class:selected
  class:dragging
  style="margin-inline-start: calc(var(--mm-indent) * {row.depth})"
  role="treeitem"
  aria-selected={selected}
  aria-level={row.depth + 1}
  tabindex="0"
  onclick={() => store.select(item.key)}
  onkeydown={keydown}
>
  <!-- The grip is the drag source, the row is the drop target: the same split ListControl uses in
       maw-builder, so text inside the row stays selectable. -->
  <span
    class="grip"
    draggable="true"
    role="presentation"
    aria-hidden="true"
    ondragstart={(e) => onDragStart(e, row)}
  >⠿</span>

  {#if hasChildren}
    <button
      class="mm-btn ghost icon sm twisty"
      type="button"
      aria-label={collapsed ? 'Expand' : 'Collapse'}
      onclick={(e) => { e.stopPropagation(); store.toggleCollapse(item.key); }}
    >{collapsed ? '▸' : '▾'}</button>
  {:else}
    <span class="twisty-spacer"></span>
  {/if}

  <span class="label">{label}</span>

  {#if item.type === 'heading'}
    <span class="mm-tag">Heading</span>
  {:else if node?.broken}
    <span class="mm-tag broken" title="That page is missing or unpublished, so this item is not shown on the site">Broken</span>
  {:else if item.type === 'url'}
    <span class="mm-tag">Link</span>
  {/if}
  {#if item.style?.includes('button')}<span class="mm-tag button">Button</span>{/if}

  <span class="target">{target}</span>

  <span class="actions">
    <button class="mm-btn ghost icon sm" type="button" title="Out one level (Alt+←)" onclick={(e) => { e.stopPropagation(); store.outdent(item.key); }}>←</button>
    <button class="mm-btn ghost icon sm" type="button" title="Up (Alt+↑)" onclick={(e) => { e.stopPropagation(); store.moveUp(item.key); }}>↑</button>
    <button class="mm-btn ghost icon sm" type="button" title="Down (Alt+↓)" onclick={(e) => { e.stopPropagation(); store.moveDown(item.key); }}>↓</button>
    <button class="mm-btn ghost icon sm" type="button" title="In one level (Alt+→)" onclick={(e) => { e.stopPropagation(); store.indent(item.key); }}>→</button>
    <button class="mm-btn ghost icon sm" type="button" title="Duplicate" onclick={(e) => { e.stopPropagation(); store.duplicate(item.key); }}>⧉</button>
    <button class="mm-btn ghost icon sm danger" type="button" title="Remove" onclick={(e) => { e.stopPropagation(); store.remove(item.key); }}>✕</button>
  </span>
</div>

<style>
  .row {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 8px; margin-bottom: 4px;
    border: 1px solid var(--mm-border); border-radius: calc(var(--mm-radius) - 2px);
    background: var(--mm-card);
  }
  .row:hover { border-color: color-mix(in srgb, var(--mm-primary) 40%, var(--mm-border)); }
  .row:focus-visible { outline: 2px solid var(--mm-primary); outline-offset: 1px; }
  .row.selected { border-color: var(--mm-primary); box-shadow: 0 0 0 1px var(--mm-primary) inset; }
  .row.dragging { opacity: 0.4; }

  .grip { cursor: grab; padding: 0 2px; color: var(--mm-muted-fg); user-select: none; }
  .grip:active { cursor: grabbing; }
  .twisty { flex: none; }
  .twisty-spacer { width: 26px; flex: none; }

  .label { font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .target {
    margin-left: auto; color: var(--mm-muted-fg); font-size: 11.5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 40%;
  }

  .actions { display: flex; gap: 2px; flex: none; opacity: 0; transition: opacity 120ms; }
  .row:hover .actions, .row:focus-within .actions, .row.selected .actions { opacity: 1; }
</style>
