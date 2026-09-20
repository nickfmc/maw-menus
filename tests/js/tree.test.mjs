import test from 'node:test';
import assert from 'node:assert/strict';
import {
  flatten,
  unflatten,
  removeSubtree,
  insertAt,
  applyProjection,
  moveUp,
  moveDown,
  indent,
  outdent,
  duplicate,
  normalize,
  countItems,
  maxDepthOf,
  isWithin,
} from '../../src/lib/tree.js';

/** Compact tree fixture: a > (b, c > (d)), e */
function fixture() {
  return [
    {
      key: 'a',
      label: 'A',
      children: [
        { key: 'b', label: 'B', children: [] },
        { key: 'c', label: 'C', children: [{ key: 'd', label: 'D', children: [] }] },
      ],
    },
    { key: 'e', label: 'E', children: [] },
  ];
}

/** "a b c>d e" style shorthand for asserting structure. */
function shape(items) {
  return flatten(items)
    .map((r) => '  '.repeat(r.depth) + r.key)
    .join('\n');
}

test('flatten walks depth-first with depth and parent', () => {
  const rows = flatten(fixture());
  assert.deepEqual(
    rows.map((r) => [r.key, r.depth, r.parentKey]),
    [
      ['a', 0, null],
      ['b', 1, 'a'],
      ['c', 1, 'a'],
      ['d', 2, 'c'],
      ['e', 0, null],
    ]
  );
});

test('flatten hides the children of a collapsed item', () => {
  const rows = flatten(fixture(), new Set(['a']));
  assert.deepEqual(rows.map((r) => r.key), ['a', 'e']);
});

test('unflatten round trips flatten', () => {
  const items = fixture();
  assert.equal(shape(unflatten(flatten(items))), shape(items));
});

test('unflatten treats an unreachable depth as a root instead of dropping the item', () => {
  const rows = [
    { key: 'a', depth: 0, parentKey: null, item: { key: 'a', children: [] } },
    { key: 'x', depth: 3, parentKey: null, item: { key: 'x', children: [] } },
  ];
  assert.deepEqual(unflatten(rows).map((i) => i.key), ['a', 'x']);
});

test('removeSubtree takes descendants with it', () => {
  const { items, removed } = removeSubtree(fixture(), 'c');
  assert.equal(shape(items), 'a\n  b\ne');
  assert.deepEqual(removed.children.map((i) => i.key), ['d']);
});

test('insertAt places under a parent, before a key, and at the end', () => {
  const node = { key: 'z', children: [] };
  assert.equal(shape(insertAt(fixture(), node, null, 'e')), 'a\n  b\n  c\n    d\nz\ne');
  assert.equal(shape(insertAt(fixture(), node, 'a', 'b')), 'a\n  z\n  b\n  c\n    d\ne');
  assert.equal(shape(insertAt(fixture(), node, 'a', null)), 'a\n  b\n  c\n    d\n  z\ne');
});

test('applyProjection moves a subtree in one step', () => {
  const next = applyProjection(fixture(), 'c', { depth: 0, parentKey: null, beforeKey: 'e' });
  assert.equal(shape(next), 'a\n  b\nc\n  d\ne');
});

test('applyProjection is a no-op for an unknown key', () => {
  const items = fixture();
  assert.equal(shape(applyProjection(items, 'nope', { parentKey: null, beforeKey: null })), shape(items));
});

test('moveUp swaps siblings, then steps out of the parent', () => {
  assert.equal(shape(moveUp(fixture(), 'c')), 'a\n  c\n    d\n  b\ne');
  // b is the first child: it lands just above its parent.
  assert.equal(shape(moveUp(fixture(), 'b')), 'b\na\n  c\n    d\ne');
  // The very first row has nowhere to go.
  assert.equal(shape(moveUp(fixture(), 'a')), shape(fixture()));
});

test('moveDown swaps siblings, then steps out after the parent', () => {
  assert.equal(shape(moveDown(fixture(), 'b')), 'a\n  c\n    d\n  b\ne');
  // c is the last child: it lands after its parent.
  assert.equal(shape(moveDown(fixture(), 'c')), 'a\n  b\nc\n  d\ne');
  assert.equal(shape(moveDown(fixture(), 'e')), shape(fixture()));
});

test('indent makes an item the last child of its previous sibling', () => {
  assert.equal(shape(indent(fixture(), 'c')), 'a\n  b\n    c\n      d\ne');
});

test('indent is refused with no previous sibling', () => {
  assert.equal(shape(indent(fixture(), 'b')), shape(fixture()));
  assert.equal(shape(indent(fixture(), 'a')), shape(fixture()));
});

test('indent is refused when the subtree would exceed maxDepth', () => {
  // c carries d with it: landing under b puts them at levels 3 and 4, so a 3-level menu refuses.
  assert.equal(shape(indent(fixture(), 'c', 2)), shape(fixture()));
  assert.equal(shape(indent(fixture(), 'c', 3)), shape(fixture()));
  assert.equal(shape(indent(fixture(), 'c', 4)), 'a\n  b\n    c\n      d\ne');
  // A leaf only needs one level of its own, so the same menu accepts e under a.
  assert.equal(shape(indent(fixture(), 'e', 2)), 'a\n  b\n  c\n    d\n  e');
});

test('outdent makes an item the next sibling of its parent', () => {
  assert.equal(shape(outdent(fixture(), 'b')), 'a\n  c\n    d\nb\ne');
  assert.equal(shape(outdent(fixture(), 'd')), 'a\n  b\n  c\n  d\ne');
});

test('outdent at the top level is a no-op', () => {
  assert.equal(shape(outdent(fixture(), 'a')), shape(fixture()));
});

test('duplicate copies the subtree with fresh keys, right after the original', () => {
  const next = duplicate(fixture(), 'c');
  const rows = flatten(next);
  assert.deepEqual(rows.map((r) => r.depth), [0, 1, 1, 2, 1, 2, 0]);
  const keys = rows.map((r) => r.key);
  assert.equal(new Set(keys).size, keys.length, 'every key is unique');
  assert.equal(countItems(next), 7);
});

test('normalize assigns missing keys and never leaves a duplicate', () => {
  const items = normalize([
    { key: 'dup', children: [{ key: 'dup', children: [] }, { children: [] }] },
    { key: '', children: [] },
  ]);
  const keys = flatten(items).map((r) => r.key);
  assert.equal(keys.length, 4);
  assert.ok(keys.every((k) => k && k.length > 0));
  assert.equal(new Set(keys).size, keys.length);
});

test('countItems and maxDepthOf cover the whole tree', () => {
  assert.equal(countItems(fixture()), 5);
  assert.equal(maxDepthOf(fixture()), 3);
  assert.equal(maxDepthOf([]), 0);
});

test('isWithin spots a descendant, which is how a drag into itself is refused', () => {
  assert.equal(isWithin(fixture(), 'a', 'd'), true);
  assert.equal(isWithin(fixture(), 'a', 'a'), true);
  assert.equal(isWithin(fixture(), 'c', 'b'), false);
  assert.equal(isWithin(fixture(), 'e', 'a'), false);
});
