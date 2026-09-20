// Pure tree operations. No Svelte, no DOM — so node --test covers them with zero dependencies, and the
// drag path and the keyboard path can share exactly one model of what a move means.

/** Item keys the editor knows. Anything else on an item rides along untouched (see the PHP store). */
export const ITEM_TYPES = ['page', 'url', 'heading'];

export function newKey() {
  // Short and collision-resistant enough for one menu; the server assigns its own on save anyway.
  return Math.random().toString(36).slice(2, 8);
}

export function newItem(type = 'url', fields = {}) {
  return {
    key: newKey(),
    type,
    label: '',
    icon: '',
    description: '',
    target: '',
    nofollow: false,
    style: [],
    children: [],
    ...fields,
  };
}

/** Deep copy that keeps unknown keys — used before every mutation so nothing is shared by reference. */
export function clone(items) {
  return items.map((item) => ({ ...item, children: clone(item.children || []) }));
}

/**
 * Depth-first order, as the rows appear on screen.
 * @returns {Array<{key: string, depth: number, parentKey: string|null, item: object}>}
 */
export function flatten(items, collapsed = new Set(), depth = 0, parentKey = null, out = []) {
  for (const item of items) {
    out.push({ key: item.key, depth, parentKey, item });
    if (item.children?.length && !collapsed.has(item.key)) {
      flatten(item.children, collapsed, depth + 1, item.key, out);
    }
  }
  return out;
}

/** Rebuild a tree from flat rows. Rows must be in visual order and depths must be reachable. */
export function unflatten(rows) {
  const roots = [];
  const stack = [];
  for (const row of rows) {
    const node = { ...row.item, children: [] };
    stack.length = row.depth;
    if (row.depth === 0) {
      roots.push(node);
    } else {
      const parent = stack[row.depth - 1];
      if (!parent) {
        // Unreachable depth: treat it as a root rather than dropping the item.
        roots.push(node);
      } else {
        parent.children.push(node);
      }
    }
    stack[row.depth] = node;
  }
  return roots;
}

export function findItem(items, key) {
  for (const item of items) {
    if (item.key === key) return item;
    const hit = findItem(item.children || [], key);
    if (hit) return hit;
  }
  return null;
}

export function countItems(items) {
  return items.reduce((n, item) => n + 1 + countItems(item.children || []), 0);
}

export function maxDepthOf(items, depth = 1) {
  return items.reduce(
    (max, item) => Math.max(max, item.children?.length ? maxDepthOf(item.children, depth + 1) : depth),
    0
  );
}

/** Remove an item and everything under it. @returns {{items: Array, removed: object|null}} */
export function removeSubtree(items, key) {
  let removed = null;
  const walk = (list) =>
    list.flatMap((item) => {
      if (item.key === key) {
        removed = item;
        return [];
      }
      return [{ ...item, children: walk(item.children || []) }];
    });
  const next = walk(items);
  return { items: next, removed };
}

/**
 * Insert a node under parentKey, immediately before beforeKey (or at the end when that is null).
 * parentKey null means top level.
 */
export function insertAt(items, node, parentKey, beforeKey) {
  const place = (list) => {
    const at = beforeKey ? list.findIndex((i) => i.key === beforeKey) : -1;
    const next = [...list];
    next.splice(at === -1 ? next.length : at, 0, node);
    return next;
  };

  if (parentKey === null) return place(items);

  return items.map((item) => {
    if (item.key === parentKey) {
      return { ...item, children: place(item.children || []) };
    }
    return { ...item, children: insertAt(item.children || [], node, parentKey, beforeKey) };
  });
}

/** Apply a projection from lib/dnd.js — the single entry point for a completed drag. */
export function applyProjection(items, dragKey, projection) {
  if (!projection || !dragKey) return items;
  const { items: without, removed } = removeSubtree(items, dragKey);
  if (!removed) return items;
  return insertAt(without, removed, projection.parentKey, projection.beforeKey);
}

/** True when `key` is `ancestorKey` or sits below it — used to refuse impossible moves. */
export function isWithin(items, ancestorKey, key) {
  const ancestor = findItem(items, ancestorKey);
  if (!ancestor) return false;
  if (ancestorKey === key) return true;
  return findItem(ancestor.children || [], key) !== null;
}

/* ---------------------------------------------------------------- keyboard moves */

/** Previous position in visual order, keeping depth where that is legal. */
export function moveUp(items, key) {
  const rows = flatten(items);
  const i = rows.findIndex((r) => r.key === key);
  if (i <= 0) return items;

  const row = rows[i];
  const siblings = siblingsOf(items, row.parentKey);
  const at = siblings.findIndex((s) => s.key === key);

  if (at > 0) {
    // Swap with the previous sibling.
    const next = [...siblings];
    next.splice(at, 1);
    next.splice(at - 1, 0, siblings[at]);
    return replaceChildren(items, row.parentKey, next);
  }
  // First child: step out and land just before the parent.
  return outdentBefore(items, key, row.parentKey);
}

/** Next position in visual order. */
export function moveDown(items, key) {
  const row = flatten(items).find((r) => r.key === key);
  if (!row) return items;

  const siblings = siblingsOf(items, row.parentKey);
  const at = siblings.findIndex((s) => s.key === key);

  if (at < siblings.length - 1) {
    const next = [...siblings];
    next.splice(at, 1);
    next.splice(at + 1, 0, siblings[at]);
    return replaceChildren(items, row.parentKey, next);
  }
  // Last child: step out and land just after the parent.
  if (row.parentKey === null) return items;
  const { items: without, removed } = removeSubtree(items, key);
  const parentRow = flatten(without).find((r) => r.key === row.parentKey);
  const parentSiblings = siblingsOf(without, parentRow?.parentKey ?? null);
  const parentAt = parentSiblings.findIndex((s) => s.key === row.parentKey);
  const after = parentSiblings[parentAt + 1]?.key ?? null;
  return insertAt(without, removed, parentRow?.parentKey ?? null, after);
}

/** Become the last child of the previous sibling. Refused with no previous sibling or at maxDepth. */
export function indent(items, key, maxDepth = 5) {
  const row = flatten(items).find((r) => r.key === key);
  if (!row) return items;

  const siblings = siblingsOf(items, row.parentKey);
  const at = siblings.findIndex((s) => s.key === key);
  if (at <= 0) return items;

  const target = siblings[at - 1];
  const subtreeDepth = maxDepthOf([findItem(items, key)]);
  if (row.depth + 1 + subtreeDepth > maxDepth) return items;

  const { items: without, removed } = removeSubtree(items, key);
  return insertAt(without, removed, target.key, null);
}

/** Become the next sibling of the parent. No-op at the top level. */
export function outdent(items, key) {
  const row = flatten(items).find((r) => r.key === key);
  if (!row || row.parentKey === null) return items;

  const { items: without, removed } = removeSubtree(items, key);
  const parentRow = flatten(without).find((r) => r.key === row.parentKey);
  const grandParent = parentRow?.parentKey ?? null;
  const parentSiblings = siblingsOf(without, grandParent);
  const parentAt = parentSiblings.findIndex((s) => s.key === row.parentKey);
  const after = parentSiblings[parentAt + 1]?.key ?? null;
  return insertAt(without, removed, grandParent, after);
}

export function remove(items, key) {
  return removeSubtree(items, key).items;
}

export function duplicate(items, key) {
  const item = findItem(items, key);
  if (!item) return items;
  const rekey = (node) => ({ ...node, key: newKey(), children: (node.children || []).map(rekey) });
  const row = flatten(items).find((r) => r.key === key);
  const siblings = siblingsOf(items, row.parentKey);
  const at = siblings.findIndex((s) => s.key === key);
  const before = siblings[at + 1]?.key ?? null;
  return insertAt(items, rekey(item), row.parentKey, before);
}

/** Give every item a key and a children array; never produces a duplicate key. */
export function normalize(items, seen = new Set()) {
  return (items || []).map((item) => {
    let key = item.key;
    if (!key || seen.has(key)) key = newKey();
    seen.add(key);
    return { ...item, key, children: normalize(item.children || [], seen) };
  });
}

/* ---------------------------------------------------------------- internals */

function siblingsOf(items, parentKey) {
  if (parentKey === null) return items;
  return findItem(items, parentKey)?.children || [];
}

function replaceChildren(items, parentKey, children) {
  if (parentKey === null) return children;
  return items.map((item) =>
    item.key === parentKey
      ? { ...item, children }
      : { ...item, children: replaceChildren(item.children || [], parentKey, children) }
  );
}

function outdentBefore(items, key, parentKey) {
  const { items: without, removed } = removeSubtree(items, key);
  const parentRow = flatten(without).find((r) => r.key === parentKey);
  return insertAt(without, removed, parentRow?.parentKey ?? null, parentKey);
}
