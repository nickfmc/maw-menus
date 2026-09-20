import test from 'node:test';
import assert from 'node:assert/strict';
import { project, findParent, slotAt, depthFromTravel, INDENT } from '../../src/lib/dnd.js';

/**
 * Rows as they appear while dragging, with the dragged subtree already removed:
 *   a
 *     b
 *       c
 *   d
 */
const FLAT = [
  { key: 'a', depth: 0 },
  { key: 'b', depth: 1 },
  { key: 'c', depth: 2 },
  { key: 'd', depth: 0 },
];

test('dropping above the first row is always top level', () => {
  const p = project(FLAT, 0, 0, 0);
  assert.equal(p.depth, 0);
  assert.equal(p.parentKey, null);
  assert.equal(p.beforeKey, 'a');
});

test('no sideways travel keeps the dragged row at its own depth', () => {
  // Slot 1 sits between a and b; b is at depth 1, so the floor holds it there.
  const p = project(FLAT, 1, 1, 0);
  assert.equal(p.depth, 1);
  assert.equal(p.parentKey, 'a');
  assert.equal(p.clamped, false);
});

test('travelling right one indent below a row makes it that row’s child', () => {
  // Slot 4 is the end of the list, after d (depth 0).
  const p = project(FLAT, 0, 4, 1);
  assert.equal(p.depth, 1);
  assert.equal(p.parentKey, 'd');
  assert.equal(p.beforeKey, null);
  assert.equal(p.clamped, false);
});

test('you cannot skip a level: depth is clamped to one below the row above', () => {
  const p = project(FLAT, 0, 4, 3);
  assert.equal(p.depth, 1, 'd is at depth 0, so the deepest legal drop is 1');
  assert.equal(p.parentKey, 'd');
  assert.equal(p.clamped, true, 'the UI shows a warning when the wanted depth was refused');
});

test('the row below sets a floor, so it is never orphaned', () => {
  // Slot 2 sits between b (depth 1) and c (depth 2). Landing shallower than c would orphan it.
  const p = project(FLAT, 0, 2, -5);
  assert.equal(p.depth, 2);
  assert.equal(p.parentKey, 'b');
  assert.equal(p.clamped, true);
});

test('maxDepth clamps and reports it', () => {
  const deep = project(FLAT, 0, 3, 5, 5);
  assert.equal(deep.depth, 3, 'c is at depth 2, so 3 is the deepest legal drop');

  const flatMenu = project(FLAT, 0, 4, 5, 1);
  assert.equal(flatMenu.depth, 0, 'a one-level menu never nests');
  assert.equal(flatMenu.clamped, true);
});

test('travelling left outdents, down to the top level', () => {
  const p = project(FLAT, 2, 4, -2);
  assert.equal(p.depth, 0);
  assert.equal(p.parentKey, null);
});

test('an out-of-range slot is clamped rather than throwing', () => {
  assert.equal(project(FLAT, 0, -3, 0).depth, 0);
  assert.equal(project(FLAT, 0, 99, 0).beforeKey, null);
});

test('project handles an empty list', () => {
  const p = project([], 0, 0, 2);
  assert.deepEqual(p, { depth: 0, parentKey: null, beforeKey: null, clamped: true });
});

test('findParent walks back to the right ancestor, several rows up', () => {
  const rows = [
    { key: 'a', depth: 0 },
    { key: 'b', depth: 1 },
    { key: 'c', depth: 2 },
    { key: 'd', depth: 2 },
  ];
  assert.equal(findParent(rows, 4, 1), 'a');
  assert.equal(findParent(rows, 4, 2), 'b');
  assert.equal(findParent(rows, 4, 3), 'd');
  assert.equal(findParent(rows, 0, 1), null, 'nothing above the first slot');
});

test('slotAt picks the gap nearest the pointer', () => {
  const rects = [
    { top: 0, height: 40 },
    { top: 40, height: 40 },
    { top: 80, height: 40 },
  ];
  assert.equal(slotAt(rects, 5), 0, 'above the middle of row 0');
  assert.equal(slotAt(rects, 35), 1, 'below the middle of row 0');
  assert.equal(slotAt(rects, 75), 2);
  assert.equal(slotAt(rects, 200), 3, 'past the end');
});

test('depthFromTravel rounds horizontal travel to whole indents', () => {
  assert.equal(depthFromTravel(100, 100), 0);
  assert.equal(depthFromTravel(100 + INDENT, 100), 1);
  assert.equal(depthFromTravel(100 + INDENT * 2.6, 100), 3);
  assert.equal(depthFromTravel(100 - INDENT, 100), -1);
  assert.equal(depthFromTravel(110, 100), 0, 'less than half an indent does not change depth');
});
