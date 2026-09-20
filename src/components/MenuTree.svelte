<script>
  // The drag-and-drop nesting tree.
  //
  // The tree is flattened for the duration of a drag, with the dragged subtree removed, so a row can
  // never be dropped inside itself. Depth comes from horizontal travel rather than absolute x, which
  // makes it behave the same wherever the drag started. All of that maths is in lib/dnd.js.

  import MenuNode from './MenuNode.svelte';
  import { project, slotAt, depthFromTravel, INDENT } from '../lib/dnd.js';
  import { flatten, removeSubtree } from '../lib/tree.js';

  let { store } = $props();

  let listEl = $state(null);
  let dragKey = $state(null);
  let startX = 0;
  let startDepth = 0;
  /** Rows without the dragged subtree, measured once at dragstart. */
  let flatDuringDrag = [];
  let rects = [];
  let projection = $state(null);
  let slot = $state(-1);

  const rows = $derived(store.rows);

  function measure() {
    if (!listEl) return;
    const listTop = listEl.getBoundingClientRect().top;
    rects = [...listEl.querySelectorAll('[data-row]')]
      .filter((el) => el.dataset.row !== dragKey)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - listTop + listEl.scrollTop, height: r.height };
      });
  }

  function onDragStart(e, row) {
    dragKey = row.key;
    startX = e.clientX;
    startDepth = row.depth;

    // Firefox refuses to start a drag with no data attached.
    e.dataTransfer.setData('text/plain', row.key);
    e.dataTransfer.effectAllowed = 'move';

    const { items } = removeSubtree(store.items, row.key);
    flatDuringDrag = flatten(items, store.collapsed).map((r) => ({ key: r.key, depth: r.depth }));

    // Measure after the browser has taken its drag snapshot: changing layout synchronously inside
    // dragstart cancels the drag in Chrome.
    requestAnimationFrame(measure);
  }

  function onDragOver(e) {
    if (!dragKey) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const listTop = listEl.getBoundingClientRect().top;
    const y = e.clientY - listTop + listEl.scrollTop;
    slot = slotAt(rects, y);
    projection = project(
      flatDuringDrag,
      startDepth,
      slot,
      depthFromTravel(e.clientX, startX),
      store.maxDepth
    );

    autoScroll(e.clientY);
  }

  let scrollTimer = null;
  function autoScroll(clientY) {
    const box = listEl.getBoundingClientRect();
    const margin = 40;
    const delta = clientY < box.top + margin ? -8 : clientY > box.bottom - margin ? 8 : 0;
    clearTimeout(scrollTimer);
    if (delta) {
      listEl.scrollBy(0, delta);
      // Rows move under the pointer while auto-scrolling, so the cached rectangles go stale.
      measure();
      scrollTimer = setTimeout(() => autoScroll(clientY), 40);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    if (dragKey && projection) store.applyDrop(dragKey, projection);
    reset();
  }

  function reset() {
    clearTimeout(scrollTimer);
    dragKey = null;
    projection = null;
    slot = -1;
    rects = [];
    flatDuringDrag = [];
  }

  /** Where to draw the indicator: the top of the row at `slot`, or the bottom of the list. */
  const indicatorTop = $derived.by(() => {
    if (!projection || slot < 0 || !rects.length) return 0;
    if (slot >= rects.length) {
      const last = rects[rects.length - 1];
      return last.top + last.height;
    }
    return rects[slot].top;
  });
</script>

<div
  class="tree mm-scroll"
  bind:this={listEl}
  role="tree"
  aria-label="Menu items"
  tabindex="-1"
  ondragover={onDragOver}
  ondrop={onDrop}
  ondragleave={() => { projection = null; slot = -1; }}
  ondragend={reset}
  onscroll={() => dragKey && measure()}
>
  {#if !rows.length}
    <p class="empty">This menu is empty. Add pages or a custom link from the panel on the left.</p>
  {/if}

  {#each rows as row (row.key)}
    <div data-row={row.key}>
      <MenuNode {row} {store} dragging={dragKey === row.key} {onDragStart} />
    </div>
  {/each}

  {#if projection}
    <!-- The indent on the indicator IS the interaction: without it nobody can tell what depth they
         are about to drop at. -->
    <div
      class="indicator"
      class:clamped={projection.clamped}
      style="top: {indicatorTop}px; margin-inline-start: calc(var(--mm-indent) * {projection.depth})"
    >
      {#if projection.clamped}
        <span class="hint">
          {#if projection.depth >= store.maxDepth - 1}
            This menu renders {store.maxDepth} level{store.maxDepth === 1 ? '' : 's'}
          {:else}
            Can't skip a level
          {/if}
        </span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .tree { position: relative; padding: 4px; height: 100%; }
  .empty { color: var(--mm-muted-fg); padding: 24px 12px; text-align: center; }

  .indicator {
    position: absolute; left: 4px; right: 4px; height: 2px;
    background: var(--mm-primary); border-radius: 2px; pointer-events: none;
  }
  .indicator::before {
    content: ''; position: absolute; left: -3px; top: -3px;
    width: 8px; height: 8px; border-radius: 50%; background: var(--mm-primary);
  }
  .indicator.clamped { background: var(--mm-warn); }
  .indicator.clamped::before { background: var(--mm-warn); }

  .hint {
    position: absolute; top: -9px; left: 12px;
    background: var(--mm-warn); color: #fff;
    font-size: 10.5px; font-weight: 600; padding: 1px 6px; border-radius: 999px; white-space: nowrap;
  }
</style>
