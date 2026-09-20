// Where a dragged row would land. Pure: given the flattened rows, the drop slot and how far the pointer
// has travelled sideways, work out the depth, the parent and the row to insert before.
//
// The approach is the one WordPress menus use: flatten the tree for the duration of the drag, then
// express the drop as (depth, parentKey, beforeKey). Depth comes from horizontal travel, not absolute x,
// so it behaves the same wherever the drag started and whatever the indent size is.

/** Pixels of horizontal travel per level. Must match --mm-indent in the tree CSS. */
export const INDENT = 24;

/**
 * @param {Array<{key: string, depth: number}>} flat rows WITHOUT the dragged subtree
 * @param {number} startDepth depth the dragged row had when the drag began
 * @param {number} overIndex slot index in `flat`: 0 = above the first row, flat.length = below the last
 * @param {number} dragDepth levels of horizontal travel (positive = right)
 * @param {number} maxDepth how many levels the menu allows (1 = flat)
 * @returns {{depth: number, parentKey: string|null, beforeKey: string|null, clamped: boolean}}
 */
export function project(flat, startDepth, overIndex, dragDepth, maxDepth = 5) {
  const index = Math.max(0, Math.min(overIndex, flat.length));
  const prev = index > 0 ? flat[index - 1] : null;
  const next = index < flat.length ? flat[index] : null;

  const wanted = startDepth + dragDepth;
  // You may only become a child of the row directly above — never skip a level and orphan yourself.
  const maxAbove = prev ? prev.depth + 1 : 0;
  // Never go shallower than the row below, which would leave it with no parent.
  const minBelow = next ? next.depth : 0;

  const ceiling = Math.min(maxAbove, maxDepth - 1);
  const depth = Math.max(0, Math.max(minBelow, Math.min(wanted, ceiling)));

  return {
    depth,
    parentKey: depth === 0 ? null : findParent(flat, index, depth),
    beforeKey: next ? next.key : null,
    clamped: depth !== wanted,
  };
}

/** The nearest row above the slot sitting one level shallower — that is the new parent. */
export function findParent(flat, index, depth) {
  for (let i = index - 1; i >= 0; i--) {
    if (flat[i].depth === depth - 1) return flat[i].key;
    // A shallower row than the one we need means there is no valid parent above.
    if (flat[i].depth < depth - 1) return null;
  }
  return null;
}

/**
 * Which slot the pointer is over, from row rectangles measured once at dragstart.
 * The slot is a gap between rows, so it returns 0..rects.length.
 * @param {Array<{top: number, height: number}>} rects
 */
export function slotAt(rects, clientY) {
  for (let i = 0; i < rects.length; i++) {
    const middle = rects[i].top + rects[i].height / 2;
    if (clientY < middle) return i;
  }
  return rects.length;
}

/** Levels of horizontal travel, rounded to the nearest whole indent. */
export function depthFromTravel(clientX, startX, indent = INDENT) {
  return Math.round((clientX - startX) / indent);
}
