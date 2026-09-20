var Mi = Object.defineProperty;
var ks = (e) => {
  throw TypeError(e);
};
var Ci = (e, t, n) => t in e ? Mi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Te = (e, t, n) => Ci(e, typeof t != "symbol" ? t + "" : t, n), Dr = (e, t, n) => t.has(e) || ks("Cannot " + n);
var o = (e, t, n) => (Dr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), x = (e, t, n) => t.has(e) ? ks("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), D = (e, t, n, r) => (Dr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), j = (e, t, n) => (Dr(e, t, "access private method"), n);
var Sr = Array.isArray, Ii = Array.prototype.indexOf, dr = Array.prototype.includes, xr = Array.from, Hs = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, Ni = Object.getOwnPropertyDescriptors, Pi = Object.prototype, Oi = Array.prototype, Ks = Object.getPrototypeOf, Es = Object.isExtensible;
const Li = () => {
};
function Fi(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function qs() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const _e = 2, rn = 4, Tr = 8, zs = 1 << 24, Ye = 16, Be = 32, dt = 64, Br = 128, ls = 256, We = 512, oe = 1024, se = 2048, Fe = 4096, ye = 8192, we = 16384, fn = 32768, vr = 1 << 25, sn = 65536, hr = 1 << 17, Ui = 1 << 18, cn = 1 << 19, Bi = 1 << 20, nt = 1 << 25, pr = 1 << 21, Xt = 1 << 22, yt = 1 << 23, Ot = Symbol("$state"), Ys = Symbol("component"), Vi = Symbol("legacy props"), Gi = Symbol(""), lr = Symbol("attributes"), Vr = Symbol("class"), Gr = Symbol("style"), yn = Symbol("text"), ar = Symbol("form reset"), er = new class extends Error {
  constructor() {
    super(...arguments);
    Te(this, "name", "StaleReactionError");
    Te(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Bs;
const Hi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Bs = globalThis.document) != null && Bs.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), Ki = 1, qi = 2, Xs = 4, zi = 8, Yi = 16, Xi = 1, Wi = 4, Zi = 8, Ji = 16, Qi = 1, $i = 2, ae = Symbol("uninitialized"), el = "http://www.w3.org/1999/xhtml";
function tl() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function nl() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function rl() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ws(e) {
  return e === this.v;
}
function sl(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Zs(e) {
  return !sl(e, this.v);
}
function il() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ll(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function al(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function ol() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ul(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function fl() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function cl(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function dl() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function vl() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function hl() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function pl() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
let ke = null;
function ln(e) {
  ke = e;
}
function dn(e, t = !1, n) {
  ke = {
    p: ke,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      q
    ),
    l: null
  };
}
function vn(e) {
  var t = (
    /** @type {ComponentContext} */
    ke
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      _i(r);
  }
  return t.i = !0, ke = t.p, as(e);
}
function as(e = {}) {
  return Hs(e, Ys, { value: !0 }), e;
}
function Js() {
  return !0;
}
let Tt = [];
function Qs() {
  var e = Tt;
  Tt = [], Fi(e);
}
function ft(e) {
  if (Tt.length === 0 && !Dn) {
    var t = Tt;
    queueMicrotask(() => {
      t === Tt && Qs();
    });
  }
  Tt.push(e);
}
function _l() {
  for (; Tt.length > 0; )
    Qs();
}
const ml = -7169;
function re(e, t) {
  e.f = e.f & ml | t;
}
function os(e) {
  (e.f & We) !== 0 || e.deps === null ? re(e, oe) : re(e, Fe);
}
function $s(e, t, n) {
  (e.f & se) !== 0 ? t.add(e) : (e.f & Fe) !== 0 && n.add(e), re(e, oe);
}
let Ss = !1;
function gl() {
  Ss || (Ss = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        var t;
        if (!e.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            (t = n[ar]) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function hn(e) {
  var t = U, n = q;
  Ve(null), it(null);
  try {
    return e();
  } finally {
    Ve(t), it(n);
  }
}
function bl(e, t, n, r = n) {
  e.addEventListener(t, () => hn(n));
  const s = (
    /** @type {any} */
    e[ar]
  );
  s ? e[ar] = () => {
    s(), r(!0);
  } : e[ar] = () => r(!0), gl();
}
function yl(e, t, n, r) {
  const s = Nn;
  var i = e.filter((p) => !p.settled), l = t.map(s);
  if (n.length === 0 && i.length === 0) {
    r(l);
    return;
  }
  var a = (
    /** @type {Effect} */
    q
  ), u = wl(), c = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((p) => p.promise)) : null;
  function d(p) {
    if ((a.f & we) === 0) {
      u();
      try {
        r([...l, ...p]);
      } catch (m) {
        tt(m, a);
      }
      _r();
    }
  }
  var v = ei();
  if (n.length === 0) {
    c.then(() => d([])).finally(v);
    return;
  }
  function _() {
    Promise.all(n.map((p) => /* @__PURE__ */ kl(p))).then(d).catch((p) => tt(p, a)).finally(v);
  }
  c ? c.then(() => {
    u(), _(), _r();
  }) : _();
}
function wl() {
  var e = (
    /** @type {Effect} */
    q
  ), t = U, n = ke, r = (
    /** @type {Batch} */
    A
  );
  return function(i = !0) {
    it(e), Ve(t), ln(n), i && (e.f & we) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function _r(e = !0) {
  it(null), Ve(null), ln(null), e && (A == null || A.deactivate());
}
function ei() {
  var e = (
    /** @type {Effect} */
    q
  ), t = e.b, n = (
    /** @type {Batch} */
    A
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Nn(e) {
  var t = _e | se;
  return q !== null && (q.f |= cn), {
    ctx: ke,
    deps: null,
    effects: null,
    equals: Ws,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      ae
    ),
    wv: 0,
    parent: q,
    ac: null
  };
}
const wn = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function kl(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    q
  );
  r === null && il();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = Bt(
    /** @type {V} */
    ae
  ), l = !U, a = /* @__PURE__ */ new Set();
  return Bl(() => {
    var p, m;
    var u = (
      /** @type {Effect} */
      q
    ), c = qs();
    s = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (y) => {
        y !== er && c.reject(y);
      }).finally(_r);
    } catch (y) {
      c.reject(y), _r();
    }
    var d = (
      /** @type {Batch} */
      A
    );
    if (l) {
      if ((u.f & fn) !== 0)
        var v = ei();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (m = d.async_deriveds.get(u)) == null || m.reject(wn);
      else
        for (const y of a.values())
          y.reject(wn);
      a.add(c), d.async_deriveds.set(u, c);
    }
    const _ = (y, h = void 0) => {
      v == null || v(), a.delete(c), h !== wn && (d.activate(), h ? (i.f |= yt, an(i, h)) : ((i.f & yt) !== 0 && (i.f ^= yt), an(i, y)), d.deactivate());
    };
    c.promise.then(_, (y) => _(null, y || "unknown"));
  }), vs(() => {
    for (const u of a)
      u.reject(wn);
  }), new Promise((u) => {
    function c(d) {
      function v() {
        d === s ? u(i) : c(s);
      }
      d.then(v, v);
    }
    c(s);
  });
}
// @__NO_SIDE_EFFECTS__
function Me(e) {
  const t = /* @__PURE__ */ Nn(e);
  return wi(t), t;
}
// @__NO_SIDE_EFFECTS__
function ti(e) {
  const t = /* @__PURE__ */ Nn(e);
  return t.equals = Zs, t;
}
function El(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Se(
        /** @type {Effect} */
        t[n]
      );
  }
}
function us(e) {
  var t, n = q, r = e.parent;
  if (!vt && r !== null && e.v !== ae && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (we | ye)) !== 0)
    return tl(), e.v;
  it(r);
  try {
    El(e), t = xi(e);
  } finally {
    it(n);
  }
  return t;
}
function ni(e) {
  var t = us(e);
  if (!e.equals(t) && (e.wv = Ei(), (!(A != null && A.is_fork) || e.deps === null) && (A !== null ? (A.capture(e, t, !0), jn == null || jn.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    re(e, oe);
    return;
  }
  vt || (de !== null ? (ds() || A != null && A.is_fork) && de.set(e, t) : os(e));
}
function Sl(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && hn(() => {
        n.ac.abort(er), n.ac = null;
      }), n.fn !== null && (n.teardown = Li), On(n, 0), _s(n));
}
function ri(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && on(t);
}
let Mr = null, Ht = null, A = null, jn = null, de = null, Hr = null, Dn = !1, Cr = !1, Mn = null, or = null;
var xs = 0;
let xl = 1;
var Zt, mt, Dt, Jt, Qt, $t, at, en, Ae, Ln, ot, qe, Qe, tn, Mt, Y, Kr, qr, kn, zr, si, ii, Kt, Tl, En;
const wr = class wr {
  constructor() {
    x(this, Y);
    Te(this, "id", xl++);
    /** True as soon as `#process` was called */
    x(this, Zt, !1);
    Te(this, "linked", !0);
    /** @type {Batch | null} */
    x(this, mt, null);
    /** @type {Batch | null} */
    x(this, Dt, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Te(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Te(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Te(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    x(this, Jt, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    x(this, Qt, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    x(this, $t, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    x(this, at, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    x(this, en, null);
    /**
     * Effects that were scheduled in this batch but not yet 'resolved' into the
     * root effects that need to be flushed. Resolving — the upwards traversal that
     * marks the path to each effect on the shared effect tree (see #resolve) — is
     * deferred until the batch is processed, so that the markers are created and
     * consumed within a single traversal. Scheduling into other batches (which can
     * happen concurrently, e.g. while a batch is committed) can therefore never
     * observe (and be confused by) this batch's markers.
     * May contain duplicates — deduplication happens during resolving
     * @type {Effect[]}
     */
    x(this, Ae, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    x(this, Ln, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    x(this, ot, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    x(this, qe, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    x(this, Qe, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    x(this, tn, /* @__PURE__ */ new Set());
    Te(this, "is_fork", !1);
    x(this, Mt, !1);
    Ht === null ? Mr = Ht = this : (D(Ht, Dt, this), D(this, mt, Ht)), Ht = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    o(this, Qe).has(t) || o(this, Qe).set(t, { d: [], m: [] }), o(this, tn).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = o(this, Qe).get(t);
    if (r) {
      o(this, Qe).delete(t);
      for (var s of r.d)
        re(s, se), n(s);
      for (s of r.m)
        re(s, Fe), n(s);
    }
    o(this, tn).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== ae && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & yt) === 0 && (this.current.set(t, [n, r]), de == null || de.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    A = this;
  }
  deactivate() {
    A = null, de = null;
  }
  flush() {
    try {
      Cr = !0, A = this, j(this, Y, kn).call(this);
    } finally {
      xs = 0, Hr = null, Mn = null, or = null, Cr = !1, A = null, de = null, rt.clear();
    }
  }
  discard() {
    var t;
    for (const n of o(this, Qt)) n(this);
    o(this, Qt).clear();
    for (const n of this.async_deriveds.values())
      n.reject(wn);
    j(this, Y, En).call(this), (t = o(this, en)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    o(this, Ln).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (D(this, $t, o(this, $t) + 1), t) {
      let r = o(this, at).get(n) ?? 0;
      o(this, at).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (D(this, $t, o(this, $t) - 1), t) {
      let r = o(this, at).get(n) ?? 0;
      r === 1 ? o(this, at).delete(n) : o(this, at).set(n, r - 1);
    }
    o(this, Mt) || (D(this, Mt, !0), ft(() => {
      D(this, Mt, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      o(this, ot).add(r);
    for (const r of n)
      o(this, qe).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    o(this, Jt).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    o(this, Qt).add(t);
  }
  settled() {
    return (o(this, en) ?? D(this, en, qs())).promise;
  }
  static ensure() {
    if (A === null) {
      const t = A = new wr();
      !Cr && !Dn && ft(() => {
        o(t, Zt) || t.flush();
      });
    }
    return A;
  }
  apply() {
    {
      de = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var n;
    if (Hr = t, (n = t.b) != null && n.is_pending && (t.f & (rn | Tr | zs)) !== 0 && (t.f & fn) === 0) {
      t.b.defer_effect(t);
      return;
    }
    o(this, Ae).push(t);
  }
};
Zt = new WeakMap(), mt = new WeakMap(), Dt = new WeakMap(), Jt = new WeakMap(), Qt = new WeakMap(), $t = new WeakMap(), at = new WeakMap(), en = new WeakMap(), Ae = new WeakMap(), Ln = new WeakMap(), ot = new WeakMap(), qe = new WeakMap(), Qe = new WeakMap(), tn = new WeakMap(), Mt = new WeakMap(), Y = new WeakSet(), Kr = function() {
  if (this.is_fork) return !0;
  for (const r of o(this, at).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (o(this, Qe).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, /**
 * Convert the effects that were scheduled in this batch into the root effects
 * that need to be traversed, marking the path to each effect (by clearing the
 * `CLEAN` flag on ancestor branches) so that the traversal can find them.
 * This happens right before traversal rather than at scheduling time, so that
 * the markers left on the (shared) effect tree are created and consumed within
 * a single traversal — scheduling into other batches can never observe them
 * @returns {Effect[]}
 */
qr = function() {
  var t = [];
  for (const i of o(this, Ae))
    if (!((i.f & we) !== 0 || (i.f & (se | Fe)) === 0)) {
      for (var n = i, r = !1; n.parent !== null; ) {
        n = n.parent;
        var s = n.f;
        if ((s & (dt | Be)) !== 0) {
          if ((s & oe) === 0) {
            r = !0;
            break;
          }
          n.f ^= oe;
        }
      }
      r || t.push(n);
    }
  return D(this, Ae, []), t;
}, kn = function() {
  var a, u, c, d;
  D(this, Zt, !0);
  for (const v of o(this, ot))
    o(this, qe).delete(v), re(v, se), this.schedule(v);
  for (const v of o(this, qe))
    re(v, Fe), this.schedule(v);
  this.apply();
  for (var t = Mn = [], n = [], r = or = []; o(this, Ae).length > 0; ) {
    xs++ > 1e3 && (j(this, Y, En).call(this), Rl());
    for (const v of j(this, Y, qr).call(this))
      try {
        j(this, Y, zr).call(this, v, t, n);
      } catch (_) {
        throw oi(v), j(this, Y, Kr).call(this) || this.discard(), _;
      }
  }
  if (A = null, r.length > 0) {
    var s = wr.ensure();
    for (const v of r)
      s.schedule(v);
  }
  if (Mn = null, or = null, j(this, Y, Kr).call(this)) {
    j(this, Y, Kt).call(this, n), j(this, Y, Kt).call(this, t);
    for (const [v, _] of o(this, Qe))
      ai(v, _);
    r.length > 0 && /** @type {unknown} */
    j(a = A, Y, kn).call(a);
    return;
  }
  const i = j(this, Y, si).call(this);
  if (i) {
    j(this, Y, Kt).call(this, n), j(this, Y, Kt).call(this, t), j(u = i, Y, ii).call(u, this);
    return;
  }
  o(this, ot).clear(), o(this, qe).clear();
  for (const v of o(this, Jt)) v(this);
  o(this, Jt).clear(), jn = this, Ts(n), Ts(t), jn = null, (c = o(this, en)) == null || c.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    A
  );
  if (o(this, $t) === 0 && (o(this, Ae).length === 0 || l !== null) && j(this, Y, En).call(this), o(this, Ae).length > 0)
    if (l !== null) {
      for (const v of o(this, Ae))
        o(l, Ae).push(v);
      D(this, Ae, []);
    } else
      l = this;
  l !== null && (rt.clear(), j(d = l, Y, kn).call(d));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
zr = function(t, n, r) {
  t.f ^= oe;
  for (var s = t.first; s !== null; ) {
    var i = s.f, l = (i & (Be | dt)) !== 0, a = l && (i & oe) !== 0, u = a || (i & ye) !== 0 || o(this, Qe).has(s);
    if (!u && s.fn !== null) {
      l ? s.f ^= oe : (i & rn) !== 0 ? n.push(s) : nr(s) && ((i & Ye) !== 0 && o(this, qe).add(s), on(s));
      var c = s.first;
      if (c !== null) {
        s = c;
        continue;
      }
    }
    for (; s !== null; ) {
      var d = s.next;
      if (d !== null) {
        s = d;
        break;
      }
      s = s.parent;
    }
  }
}, si = function() {
  for (var t = o(this, mt); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = o(t, mt);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
ii = function(t) {
  var r;
  for (const [s, i] of t.current)
    !this.previous.has(s) && t.previous.has(s) && this.previous.set(s, t.previous.get(s)), this.current.set(s, i);
  for (const [s, i] of t.async_deriveds) {
    const l = this.async_deriveds.get(s);
    l && i.promise.then(l.resolve).catch(l.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(o(t, ot), o(t, qe));
  const n = (s) => {
    var i = s.reactions;
    if (i !== null && !((s.f & _e) !== 0 && (s.f & (se | Fe)) === 0))
      for (const u of i) {
        var l = u.f;
        if ((l & _e) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var a = (
            /** @type {Effect} */
            u
          );
          l & (Xt | Ye) && !this.async_deriveds.has(a) && (o(this, qe).delete(a), re(a, se), this.schedule(a));
        }
      }
  };
  for (const s of this.current.keys())
    n(s);
  this.oncommit(() => t.discard()), j(r = t, Y, En).call(r), A = this, j(this, Y, kn).call(this);
}, /**
 * @param {Effect[]} effects
 */
Kt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    $s(t[n], o(this, ot), o(this, qe));
}, Tl = function() {
  var v, _;
  for (let p = Mr; p !== null; p = o(p, Dt)) {
    var t = p.id < this.id, n = [];
    for (const [m, [y, h]] of this.current) {
      if (p.current.has(m)) {
        var r = (
          /** @type {[any, boolean]} */
          p.current.get(m)[0]
        );
        if (t && y !== r)
          p.current.set(m, [y, h]);
        else
          continue;
      }
      n.push(m);
    }
    if (t)
      for (const [m, y] of this.async_deriveds) {
        const h = p.async_deriveds.get(m);
        h && y.promise.then(h.resolve).catch(h.reject);
      }
    var s = [...p.current.keys()].filter(
      (m) => !/** @type {[any, boolean]} */
      p.current.get(m)[1]
    );
    if (!(!o(p, Zt) || s.length === 0)) {
      var i = s.filter((m) => !this.current.has(m));
      if (i.length === 0)
        t && p.discard();
      else if (n.length > 0) {
        if (t)
          for (const m of o(this, tn))
            p.unskip_effect(m, (y) => {
              var h;
              (y.f & (Ye | Xt)) !== 0 ? p.schedule(y) : j(h = p, Y, Kt).call(h, [y]);
            });
        p.activate();
        var l = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
        for (var u of n)
          li(u, i, l, a);
        a = /* @__PURE__ */ new Map();
        var c = [...p.current].filter(([m, y]) => {
          const h = this.current.get(m);
          return h ? h[0] !== y[0] || h[1] !== y[1] : !0;
        }).map(([m]) => m);
        if (c.length > 0)
          for (const m of o(this, Ln))
            (m.f & (we | ye | hr)) === 0 && fs(m, c, a) && ((m.f & (Xt | Ye)) !== 0 ? (re(m, se), p.schedule(m)) : o(p, ot).add(m));
        if (o(p, Ae).length > 0 && !o(p, Mt)) {
          p.apply();
          for (var d of j(v = p, Y, qr).call(v))
            j(_ = p, Y, zr).call(_, d, [], []);
        }
        p.deactivate();
      }
    }
  }
}, En = function() {
  if (this.linked) {
    var t = o(this, mt), n = o(this, Dt);
    t === null ? Mr = n : D(t, Dt, n), n === null ? Ht = t : D(n, mt, t), this.linked = !1;
  }
};
let Ut = wr;
function Al(e) {
  var t = Dn;
  Dn = !0;
  try {
    for (var n; ; ) {
      if (_l(), A === null)
        return (
          /** @type {T} */
          n
        );
      A.flush();
    }
  } finally {
    Dn = t;
  }
}
function Rl() {
  try {
    fl();
  } catch (e) {
    tt(e, Hr);
  }
}
let Ke = null;
function Ts(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (we | ye)) === 0 && nr(r) && (Ke = /* @__PURE__ */ new Set(), on(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && gi(r), (Ke == null ? void 0 : Ke.size) > 0)) {
        rt.clear();
        for (const s of Ke) {
          if ((s.f & (we | ye)) !== 0) continue;
          const i = [s];
          let l = s.parent;
          for (; l !== null; )
            Ke.has(l) && (Ke.delete(l), i.push(l)), l = l.parent;
          for (let a = i.length - 1; a >= 0; a--) {
            const u = i[a];
            (u.f & (we | ye)) === 0 && on(u);
          }
        }
        Ke.clear();
      }
    }
    Ke = null;
  }
}
function li(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & _e) !== 0 ? li(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (Xt | Ye)) !== 0 && (i & se) === 0 && fs(s, t, r) && (re(s, se), cs(
        /** @type {Effect} */
        s
      ));
    }
}
function fs(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (dr.call(t, s))
        return !0;
      if ((s.f & _e) !== 0 && fs(
        /** @type {Derived} */
        s,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function cs(e) {
  A.schedule(e);
}
function ai(e, t) {
  if (!((e.f & Be) !== 0 && (e.f & oe) !== 0)) {
    (e.f & se) !== 0 ? t.d.push(e) : (e.f & Fe) !== 0 && t.m.push(e), re(e, oe);
    for (var n = e.first; n !== null; )
      ai(n, t), n = n.next;
  }
}
function oi(e) {
  re(e, oe);
  for (var t = e.first; t !== null; )
    oi(t), t = t.next;
}
let mr = /* @__PURE__ */ new Set();
const rt = /* @__PURE__ */ new Map();
let ui = !1;
function Bt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Ws,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
  const n = Bt(e);
  return wi(n), n;
}
// @__NO_SIDE_EFFECTS__
function jl(e, t = !1, n = !0) {
  const r = Bt(e);
  return t || (r.equals = Zs), r;
}
function k(e, t, n = !1) {
  U !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Xe || (U.f & hr) !== 0) && Js() && (U.f & (_e | Ye | Xt | hr)) !== 0 && (st === null || !st.has(e)) && hl();
  let r = n ? Ue(t) : t;
  return an(e, r, or);
}
var St = null, Yr = 0;
function an(e, t, n = null) {
  if (!e.equals(t)) {
    vt ? rt.set(e, t) : rt.has(e) || rt.set(e, e.v);
    var r = Ut.ensure();
    if (r.capture(e, t), (e.f & _e) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & se) !== 0 && us(s), de === null && os(s);
    }
    e.wv = Ei(), St = null, Yr = 0, fi(e, se, n), St = null, q !== null && (q.f & oe) !== 0 && (q.f & (Be | dt)) === 0 && (Ne === null ? Hl([e]) : Ne.push(e)), !r.is_fork && mr.size > 0 && !ui && Dl();
  }
  return t;
}
function Dl() {
  ui = !1;
  for (const e of mr) {
    (e.f & oe) !== 0 && re(e, Fe);
    let t;
    try {
      t = nr(e);
    } catch {
      t = !0;
    }
    t && on(e);
  }
  mr.clear();
}
function Cn(e) {
  k(e, e.v + 1);
}
function fi(e, t, n) {
  var r = e.reactions;
  if (r !== null) {
    var s = r.length;
    if (Yr += s, Yr > 1e5 && St === null && (St = /* @__PURE__ */ new Set()), St !== null) {
      if (St.has(e)) return;
      St.add(e);
    }
    for (var i = 0; i < s; i++) {
      var l = r[i], a = l.f, u = (a & se) === 0;
      if (u && re(l, t), (a & hr) !== 0)
        mr.add(
          /** @type {Effect} */
          l
        );
      else if ((a & _e) !== 0) {
        var c = (
          /** @type {Derived} */
          l
        );
        de == null || de.delete(c), fi(c, Fe, n);
      } else if (u) {
        var d = (
          /** @type {Effect} */
          l
        );
        (a & Ye) !== 0 && Ke !== null && Ke.add(d), n !== null ? n.push(d) : cs(d);
      }
    }
  }
}
function Ue(e) {
  if (typeof e != "object" || e === null || Ot in e || Ys in e)
    return e;
  const t = Ks(e);
  if (t !== Pi && t !== Oi)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Sr(e), s = /* @__PURE__ */ B(0), i = Ft, l = (a) => {
    if (Ft === i)
      return a();
    var u = U, c = Ft;
    Ve(null), js(i);
    var d = a();
    return Ve(u), js(c), d;
  };
  return r && n.set("length", /* @__PURE__ */ B(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && dl();
        var d = n.get(u);
        return d === void 0 ? l(() => {
          var v = /* @__PURE__ */ B(c.value);
          return n.set(u, v), v;
        }) : k(d, c.value, !0), !0;
      },
      deleteProperty(a, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in a) {
            const d = l(() => /* @__PURE__ */ B(ae));
            n.set(u, d), Cn(s);
          }
        } else
          k(c, ae), Cn(s);
        return !0;
      },
      get(a, u, c) {
        var p;
        if (u === Ot)
          return e;
        var d = n.get(u), v = u in a;
        if (d === void 0 && (!v || (p = Yt(a, u)) != null && p.writable) && (d = l(() => {
          var m = Ue(v ? a[u] : ae), y = /* @__PURE__ */ B(m);
          return y;
        }), n.set(u, d)), d !== void 0) {
          var _ = f(d);
          return _ === ae ? void 0 : _;
        }
        return Reflect.get(a, u, c);
      },
      getOwnPropertyDescriptor(a, u) {
        var _;
        (_ = this.has) == null || _.call(this, a, u);
        var c = Reflect.getOwnPropertyDescriptor(a, u), d = n.get(u);
        if (d !== void 0) {
          var v = f(d);
          if (v === ae)
            return;
          if (c && "value" in c)
            c.value = v;
          else
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return c;
      },
      has(a, u) {
        var _;
        if (u === Ot)
          return !0;
        var c = n.get(u), d = c !== void 0 && c.v !== ae || Reflect.has(a, u);
        if (c !== void 0 || q !== null && (!d || (_ = Yt(a, u)) != null && _.writable)) {
          c === void 0 && (c = l(() => {
            var p = d ? Ue(a[u]) : ae, m = /* @__PURE__ */ B(p);
            return m;
          }), n.set(u, c));
          var v = f(c);
          if (v === ae)
            return !1;
        }
        return d;
      },
      set(a, u, c, d) {
        var P;
        var v = n.get(u), _ = u in a;
        if (r && u === "length")
          for (var p = c; p < /** @type {Source<number>} */
          v.v; p += 1) {
            var m = n.get(p + "");
            m !== void 0 ? k(m, ae) : p in a && (m = l(() => /* @__PURE__ */ B(ae)), n.set(p + "", m));
          }
        if (v === void 0)
          (!_ || (P = Yt(a, u)) != null && P.writable) && (v = l(() => /* @__PURE__ */ B(void 0)), k(v, Ue(c)), n.set(u, v));
        else {
          _ = v.v !== ae;
          var y = l(() => Ue(c));
          k(v, y);
        }
        var h = Reflect.getOwnPropertyDescriptor(a, u);
        if (h != null && h.set && h.set.call(d, c), !_) {
          if (r && typeof u == "string") {
            var E = (
              /** @type {Source<number>} */
              n.get("length")
            ), G = Number(u);
            Number.isInteger(G) && G >= E.v && k(E, G + 1);
          }
          Cn(s);
        }
        return !0;
      },
      ownKeys(a) {
        f(s);
        var u = Reflect.ownKeys(a).filter((v) => {
          var _ = n.get(v);
          return _ === void 0 || _.v !== ae;
        });
        for (var [c, d] of n)
          d.v !== ae && !(c in a) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        vl();
      }
    }
  );
}
function As(e) {
  try {
    if (e !== null && typeof e == "object" && Ot in e)
      return e[Ot];
  } catch {
  }
  return e;
}
function ci(e, t) {
  return Object.is(As(e), As(t));
}
var Xr, di, vi, hi;
function Ml() {
  if (Xr === void 0) {
    Xr = window, di = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    vi = Yt(t, "firstChild").get, hi = Yt(t, "nextSibling").get, Es(e) && (e[Vr] = void 0, e[lr] = null, e[Gr] = void 0, e.__e = void 0), Es(n) && (n[yn] = void 0);
  }
}
function ct(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Pn(e) {
  return (
    /** @type {TemplateNode | null} */
    vi.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function tr(e) {
  return (
    /** @type {TemplateNode | null} */
    hi.call(e)
  );
}
function V(e, t) {
  return /* @__PURE__ */ Pn(e);
}
function At(e, t = !1) {
  {
    var n = /* @__PURE__ */ Pn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ tr(n) : n;
  }
}
function be(e, t = !1) {
  return /* @__PURE__ */ Pn(e);
}
function w(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ tr(r);
  return r;
}
function Cl(e) {
  e.textContent = "";
}
function pi() {
  return !1;
}
function Il(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Nl(e) {
  var t = q;
  if (t === null)
    return U.f |= yt, e;
  if ((t.f & fn) === 0 && (t.f & rn) === 0)
    throw e;
  tt(e, t);
}
function tt(e, t) {
  if (!(t !== null && (t.f & we) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & Br) !== 0 && (t.f & (we | vr)) === 0) {
        if ((t.f & fn) === 0)
          throw e;
        try {
          t.b.error(e);
          return;
        } catch (n) {
          e = n;
        }
      }
      t = t.parent;
    }
    throw e;
  }
}
function Pl(e) {
  q === null && (U === null && ul(), ol()), vt && al();
}
function Ol(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ht(e, t) {
  var n = q;
  n !== null && (n.f & ye) !== 0 && (e |= ye);
  var r = {
    ctx: ke,
    deps: null,
    nodes: null,
    f: e | se | We,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  A == null || A.register_created_effect(r);
  var s = r;
  if ((e & rn) !== 0)
    Mn !== null ? Mn.push(r) : Ut.ensure().schedule(r);
  else if (t !== null) {
    try {
      on(r);
    } catch (l) {
      throw Se(r), l;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & cn) === 0 && (s = s.first, (e & Ye) !== 0 && (e & sn) !== 0 && s !== null && (s.f |= sn));
  }
  if (s !== null && (s.parent = n, n !== null && Ol(s, n), U !== null && (U.f & _e) !== 0 && (e & dt) === 0)) {
    var i = (
      /** @type {Derived} */
      U
    );
    (i.effects ?? (i.effects = [])).push(s);
  }
  return r;
}
function ds() {
  return U !== null && !Xe;
}
function vs(e) {
  const t = ht(Tr, null);
  return re(t, oe), t.teardown = e, t;
}
function Ll(e) {
  Pl();
  var t = (
    /** @type {Effect} */
    q.f
  ), n = !U && (t & Be) !== 0 && ke !== null && !ke.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      ke
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return _i(e);
}
function _i(e) {
  return ht(rn | Bi, e);
}
function Fl(e) {
  Ut.ensure();
  const t = ht(dt | cn, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Lt(t, () => {
      Se(t), r(void 0);
    }) : (Se(t), r(void 0));
  });
}
function Ul(e) {
  return ht(rn, e);
}
function Bl(e) {
  return ht(Xt | cn, e);
}
function hs(e, t = 0) {
  return ht(Tr | t, e);
}
function ne(e, t = [], n = [], r = []) {
  yl(r, t, n, (s) => {
    ht(Tr, () => {
      e(...s.map(f));
    });
  });
}
function ps(e, t = 0) {
  var n = ht(Ye | t, e);
  return n;
}
function Le(e) {
  return ht(Be | cn, e);
}
function mi(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = vt, r = U;
    Rs(!0), Ve(null);
    try {
      t.call(null);
    } catch (s) {
      tt(s, e.parent);
    } finally {
      Rs(n), Ve(r);
    }
  }
}
function _s(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && hn(() => {
      s.abort(er);
    });
    var r = n.next;
    (n.f & dt) !== 0 ? n.parent = null : Se(n, t), n = r;
  }
}
function Vl(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Be) === 0 && Se(t), t = n;
  }
}
function Se(e, t = !0) {
  var n = !1;
  (t || (e.f & Ui) !== 0) && e.nodes !== null && e.nodes.end !== null && (Gl(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= vr, _s(e, t && !n), On(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  mi(e), e.f ^= vr, e.f |= we;
  var s = e.parent;
  s !== null && s.first !== null && gi(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Gl(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ tr(e);
    e.remove(), e = n;
  }
}
function gi(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Lt(e, t, n = !0) {
  var r = [];
  e.f |= ls, bi(e, r, !0);
  var s = () => {
    n && Se(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var l = () => --i || s();
    for (var a of r)
      a.out(l);
  } else
    s();
}
function bi(e, t, n) {
  if ((e.f & ye) === 0) {
    e.f ^= ye;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var s = e.first; s !== null; ) {
      var i = s.next;
      if ((s.f & dt) === 0) {
        var l = (s.f & sn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Be) !== 0 && (e.f & Ye) !== 0;
        bi(s, t, l ? n : !1);
      }
      s = i;
    }
  }
}
function gr(e) {
  e.f &= ~ls, yi(e, !0);
}
function yi(e, t) {
  if ((e.f & ls) === 0 && (e.f & ye) !== 0) {
    e.f ^= ye, (e.f & oe) === 0 && (re(e, se), Ut.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & sn) !== 0 || (n.f & Be) !== 0;
      yi(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || t) && l.in();
  }
}
function ms(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ tr(n);
      t.append(n), n = s;
    }
}
let ur = !1, vt = !1;
function Rs(e) {
  vt = e;
}
let U = null, Xe = !1;
function Ve(e) {
  U = e;
}
let q = null;
function it(e) {
  q = e;
}
let st = null;
function wi(e) {
  U !== null && ((U.f & pr) !== 0 || (U.f & _e) !== 0) && (st ?? (st = /* @__PURE__ */ new Set())).add(e);
}
let Ee = null, Ce = 0, Ne = null;
function Hl(e) {
  Ne = e;
}
let ki = 1, Rt = 0, Ft = Rt;
function js(e) {
  Ft = e;
}
function Ei() {
  return ++ki;
}
function nr(e) {
  var t = e.f;
  if ((t & se) !== 0)
    return !0;
  if ((t & Fe) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (nr(
        /** @type {Derived} */
        i
      ) && ni(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & We) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    de === null && re(e, oe);
  }
  return !1;
}
function Si(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(st !== null && st.has(e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & _e) !== 0 ? Si(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? re(i, se) : (i.f & oe) !== 0 && re(i, Fe), cs(
        /** @type {Effect} */
        i
      ));
    }
}
function xi(e) {
  var t = Ee, n = Ce, r = Ne, s = U, i = st, l = ke, a = Xe, u = Ft, c = e.f;
  Ee = /** @type {null | Value[]} */
  null, Ce = 0, Ne = null, U = (c & (Be | dt)) === 0 ? e : null, st = null, ln(e.ctx), Xe = !1, Ft = ++Rt, e.ac !== null && (hn(() => {
    e.ac.abort(er);
  }), e.ac = null);
  try {
    e.f |= pr;
    var d = (
      /** @type {Function} */
      e.fn
    ), v = d();
    e.f |= fn;
    var _ = Ds(e);
    if (Js() && Ne !== null && !Xe && _ !== null && (e.f & (_e | Fe | se)) === 0)
      for (var p = 0; p < /** @type {Source[]} */
      Ne.length; p++)
        Si(
          Ne[p],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (Rt++, s.deps !== null)
        for (let m = 0; m < n; m += 1)
          s.deps[m].rv = Rt;
      if (t !== null)
        for (const m of t)
          m.rv = Rt;
      Ne !== null && (r === null ? r = Ne : r.push(.../** @type {Source[]} */
      Ne));
    }
    return (e.f & yt) !== 0 && (e.f ^= yt), v;
  } catch (m) {
    return Ds(e), Nl(m);
  } finally {
    e.f ^= pr, Ee = t, Ce = n, Ne = r, U = s, st = i, ln(l), Xe = a, Ft = u;
  }
}
function Ds(e) {
  var s;
  var t = e.deps, n = A == null ? void 0 : A.is_fork;
  if (Ee !== null) {
    var r;
    if (n || On(e, Ce), t !== null && Ce > 0)
      for (t.length = Ce + Ee.length, r = 0; r < Ee.length; r++)
        t[Ce + r] = Ee[r];
    else
      e.deps = t = Ee;
    if (ds() && (e.f & We) !== 0)
      for (r = Ce; r < t.length; r++)
        ((s = t[r]).reactions ?? (s.reactions = [])).push(e);
  } else !n && t !== null && Ce < t.length && (On(e, Ce), t.length = Ce);
  return t;
}
function Kl(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Ii.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & _e) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Ee === null || !dr.call(Ee, t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & We) !== 0 && (i.f ^= We), i.v !== ae && os(i), i.ac !== null && hn(() => {
      i.ac.abort(er), i.ac = null, re(i, se);
    }), Sl(i), On(i, 0);
  }
}
function On(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Kl(e, n[r]);
}
function on(e) {
  var t = e.f;
  if ((t & we) === 0) {
    re(e, oe);
    var n = q, r = ur;
    q = e, ur = (t & (Be | dt)) === 0;
    try {
      (t & (Ye | zs)) !== 0 ? Vl(e) : _s(e), mi(e);
      var s = xi(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = ki;
      var i;
    } finally {
      ur = r, q = n;
    }
  }
}
async function ql() {
  await Promise.resolve(), Al();
}
function f(e) {
  var t = e.f, n = (t & _e) !== 0;
  if (U !== null && !Xe) {
    var r = q !== null && (q.f & we) !== 0;
    if (!r && (st === null || !st.has(e))) {
      var s = U.deps;
      if ((U.f & pr) !== 0)
        e.rv < Rt && (e.rv = Rt, Ee === null && s !== null && s[Ce] === e ? Ce++ : Ee === null ? Ee = [e] : Ee.push(e));
      else {
        U.deps ?? (U.deps = []), dr.call(U.deps, e) || U.deps.push(e);
        var i = e.reactions;
        i === null ? e.reactions = [U] : dr.call(i, U) || i.push(U);
      }
    }
  }
  if (vt && rt.has(e))
    return rt.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (vt) {
      var a = l.v;
      return ((l.f & oe) === 0 && l.reactions !== null || Ai(l)) && (a = us(l)), rt.set(l, a), a;
    }
    var u = (l.f & We) === 0 && !Xe && U !== null && (ur || (U.f & We) !== 0), c = (l.f & fn) === 0;
    nr(l) && (u && (l.f |= We), ni(l)), u && !c && (ri(l), Ti(l));
  }
  if (de != null && de.has(e))
    return de.get(e);
  if ((e.f & yt) !== 0)
    throw e.v;
  return e.v;
}
function Ti(e) {
  if (e.f |= We, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & _e) !== 0 && (t.f & We) === 0 && (ri(
        /** @type {Derived} */
        t
      ), Ti(
        /** @type {Derived} */
        t
      ));
}
function Ai(e) {
  if (e.v === ae) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (rt.has(t) || (t.f & _e) !== 0 && Ai(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Ar(e) {
  var t = Xe;
  try {
    return Xe = !0, e();
  } finally {
    Xe = t;
  }
}
const zl = ["touchstart", "touchmove"];
function Yl(e) {
  return zl.includes(e);
}
const jt = Symbol("events"), Ri = /* @__PURE__ */ new Set(), Wr = /* @__PURE__ */ new Set();
function Xl(e, t, n, r = {}) {
  function s(i) {
    if (r.capture || Zr.call(t, i), !i.cancelBubble)
      return hn(() => n == null ? void 0 : n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (s.__removed = !1, ft(() => {
    s.__removed || t.addEventListener(e, s, r);
  })) : t.addEventListener(e, s, r), s;
}
function xt(e, t, n, r, s) {
  var i = { capture: r, passive: s }, l = Xl(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && vs(() => {
    l.__removed = !0, t.removeEventListener(e, l, i);
  });
}
function F(e, t, n) {
  (t[jt] ?? (t[jt] = {}))[e] = n;
}
function Rr(e) {
  for (var t = 0; t < e.length; t++)
    Ri.add(e[t]);
  for (var n of Wr)
    n(e);
}
let Ir = null, Nr = !1;
function Zr(e) {
  var y, h;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = ((y = e.composedPath) == null ? void 0 : y.call(e)) || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Ir = e, Nr || (Nr = !0, setTimeout(() => {
    Nr = !1, Ir = null;
  }));
  var l = 0, a = Ir === e && e[jt];
  if (a) {
    var u = s.indexOf(a);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[jt] = t;
      return;
    }
    var c = s.indexOf(t);
    if (c === -1)
      return;
    u <= c && (l = u);
  }
  if (i = /** @type {Element} */
  s[l] || e.target, i !== t) {
    Hs(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var d = U, v = q;
    Ve(null), it(null);
    try {
      for (var _, p = []; i !== null && i !== t; ) {
        try {
          var m = (h = i[jt]) == null ? void 0 : h[r];
          m != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && m.call(i, e);
        } catch (E) {
          _ ? p.push(E) : _ = E;
        }
        if (e.cancelBubble) break;
        l++, i = l < s.length ? (
          /** @type {Element} */
          s[l]
        ) : null;
      }
      if (_) {
        for (let E of p)
          queueMicrotask(() => {
            throw E;
          });
        throw _;
      }
    } finally {
      e[jt] = t, delete e.currentTarget, Ve(d), it(v);
    }
  }
}
var Vs;
const Pr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Vs = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Vs.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Wl(e) {
  return (
    /** @type {string} */
    (Pr == null ? void 0 : Pr.createHTML(e)) ?? e
  );
}
function Zl(e) {
  var t = Il("template");
  return t.innerHTML = Wl(e.replaceAll("<!>", "<!---->")), t.content;
}
function br(e, t) {
  var n = (
    /** @type {Effect} */
    q
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function O(e, t) {
  var n = (t & Qi) !== 0, r = (t & $i) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    s === void 0 && (s = Zl(i ? e : "<!>" + e), n || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ Pn(s)));
    var l = (
      /** @type {TemplateNode} */
      r || di ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (n) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Pn(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      br(a, u);
    } else
      br(l, l);
    return l;
  };
}
function Ms(e = "") {
  {
    var t = ct(e + "");
    return br(t, t), t;
  }
}
function Jl() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = ct();
  return e.append(t, n), br(t, n), e;
}
function M(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Ql(e) {
  let t = 0, n = Bt(0), r;
  return () => {
    ds() && (f(n), hs(() => (t === 0 && (r = Ar(() => e(() => Cn(n)))), t += 1, () => {
      ft(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Cn(n));
      });
    })));
  };
}
var $l = sn | cn;
function ea(e, t, n, r) {
  new ta(e, t, n, r);
}
var Pe, is, Oe, Ct, me, Re, ge, je, $e, It, gt, nn, Fn, Un, ut, kr, J, na, ra, Jr, sa, Qr, Sn, fr, $r, es;
class ta {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, s) {
    x(this, J);
    /** @type {Boundary | null} */
    Te(this, "parent");
    Te(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Te(this, "transform_error");
    /** @type {TemplateNode} */
    x(this, Pe);
    /** @type {TemplateNode | null} */
    x(this, is, null);
    /** @type {BoundaryProps} */
    x(this, Oe);
    /** @type {((anchor: Node) => void)} */
    x(this, Ct);
    /** @type {Effect} */
    x(this, me);
    /** @type {Effect | null} */
    x(this, Re, null);
    /** @type {Effect | null} */
    x(this, ge, null);
    /** @type {Effect | null} */
    x(this, je, null);
    /** @type {DocumentFragment | null} */
    x(this, $e, null);
    x(this, It, 0);
    x(this, gt, 0);
    x(this, nn, !1);
    /** @type {Set<Effect>} */
    x(this, Fn, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    x(this, Un, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    x(this, ut, null);
    x(this, kr, Ql(() => (D(this, ut, Bt(o(this, It))), () => {
      D(this, ut, null);
    })));
    var i;
    D(this, Pe, t), D(this, Oe, n), D(this, Ct, (l) => {
      var a = (
        /** @type {Effect} */
        q
      );
      a.b = this, a.f |= Br, r(l);
    }), this.parent = /** @type {Effect} */
    q.b, this.transform_error = s ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((l) => l), D(this, me, ps(() => {
      j(this, J, Qr).call(this);
    }, $l));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    $s(t, o(this, Fn), o(this, Un));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!o(this, Oe).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    j(this, J, $r).call(this, t, n), D(this, It, o(this, It) + t), !(!o(this, ut) || o(this, nn)) && (D(this, nn, !0), ft(() => {
      D(this, nn, !1), o(this, ut) && an(o(this, ut), o(this, It));
    }));
  }
  get_effect_pending() {
    return o(this, kr).call(this), f(
      /** @type {Source<number>} */
      o(this, ut)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!o(this, Oe).onerror && !o(this, Oe).failed)
      throw t;
    A != null && A.is_fork ? (o(this, Re) && A.skip_effect(o(this, Re)), o(this, ge) && A.skip_effect(o(this, ge)), o(this, je) && A.skip_effect(o(this, je)), A.oncommit(() => {
      j(this, J, es).call(this, t);
    })) : j(this, J, es).call(this, t);
  }
}
Pe = new WeakMap(), is = new WeakMap(), Oe = new WeakMap(), Ct = new WeakMap(), me = new WeakMap(), Re = new WeakMap(), ge = new WeakMap(), je = new WeakMap(), $e = new WeakMap(), It = new WeakMap(), gt = new WeakMap(), nn = new WeakMap(), Fn = new WeakMap(), Un = new WeakMap(), ut = new WeakMap(), kr = new WeakMap(), J = new WeakSet(), na = function() {
  try {
    D(this, Re, Le(() => o(this, Ct).call(this, o(this, Pe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
ra = function(t) {
  const n = o(this, Oe).failed, { reset: r, invoke_onerror: s } = j(this, J, Jr).call(this, t);
  ft(s), n && D(this, je, Le(() => {
    n(
      o(this, Pe),
      () => t,
      () => r
    );
  }));
}, /**
 * Creates the `reset` function for a failed boundary, along with a function
 * that invokes `onerror` with it (if provided)
 * @param {unknown} error
 * @returns {{ reset: () => void, invoke_onerror: () => void }}
 */
Jr = function(t) {
  var n = !1, r = !1;
  const s = () => {
    if (n) {
      rl();
      return;
    }
    n = !0, r && pl(), o(this, je) !== null && Lt(o(this, je), () => {
      D(this, je, null);
    }), j(this, J, fr).call(this, () => {
      j(this, J, Qr).call(this);
    });
  };
  return { reset: s, invoke_onerror: () => {
    var l, a;
    try {
      r = !0, (a = (l = o(this, Oe)).onerror) == null || a.call(l, t, s), r = !1;
    } catch (u) {
      tt(u, o(this, me) && o(this, me).parent);
    }
  } };
}, sa = function() {
  const t = o(this, Oe).pending;
  t && (this.is_pending = !0, D(this, ge, Le(() => t(o(this, Pe)))), ft(() => {
    var n = D(this, $e, document.createDocumentFragment()), r = ct(), s = !1;
    if (n.append(r), D(this, Re, j(this, J, fr).call(this, () => {
      try {
        return Le(() => o(this, Ct).call(this, r));
      } catch (i) {
        try {
          this.error(i), s = !0;
        } catch (l) {
          tt(l, o(this, me).parent);
        }
        return null;
      }
    })), o(this, Re) === null) {
      D(this, $e, null), s && j(this, J, Sn).call(
        this,
        /** @type {Batch} */
        A
      );
      return;
    }
    o(this, gt) === 0 && (o(this, Pe).before(n), D(this, $e, null), Lt(
      /** @type {Effect} */
      o(this, ge),
      () => {
        D(this, ge, null);
      }
    ), j(this, J, Sn).call(
      this,
      /** @type {Batch} */
      A
    ));
  }));
}, Qr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), D(this, gt, 0), D(this, It, 0), D(this, Re, Le(() => {
      o(this, Ct).call(this, o(this, Pe));
    })), o(this, gt) > 0) {
      var t = D(this, $e, document.createDocumentFragment());
      ms(o(this, Re), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        o(this, Oe).pending
      );
      D(this, ge, Le(() => n(o(this, Pe))));
    } else
      j(this, J, Sn).call(
        this,
        /** @type {Batch} */
        A
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
Sn = function(t) {
  this.is_pending = !1, t.transfer_effects(o(this, Fn), o(this, Un));
}, /**
 * @template T
 * @param {() => T} fn
 */
fr = function(t) {
  var n = q, r = U, s = ke;
  it(o(this, me)), Ve(o(this, me)), ln(o(this, me).ctx);
  try {
    return Ut.ensure(), t();
  } finally {
    it(n), Ve(r), ln(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
$r = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && j(r = this.parent, J, $r).call(r, t, n);
    return;
  }
  D(this, gt, o(this, gt) + t), o(this, gt) === 0 && (j(this, J, Sn).call(this, n), o(this, ge) && Lt(o(this, ge), () => {
    D(this, ge, null);
  }), o(this, $e) && (o(this, Pe).before(o(this, $e)), D(this, $e, null)));
}, /**
 * @param {unknown} error
 */
es = function(t) {
  o(this, Re) && (Se(o(this, Re)), D(this, Re, null)), o(this, ge) && (Se(o(this, ge)), D(this, ge, null)), o(this, je) && (Se(o(this, je)), D(this, je, null));
  let n = o(this, Oe).failed;
  const r = (s) => {
    const { reset: i, invoke_onerror: l } = j(this, J, Jr).call(this, s);
    l(), n && D(this, je, j(this, J, fr).call(this, () => {
      try {
        return Le(() => {
          var a = (
            /** @type {Effect} */
            q
          );
          a.b = this, a.f |= Br, n(
            o(this, Pe),
            () => s,
            () => i
          );
        });
      } catch (a) {
        return tt(
          a,
          /** @type {Effect} */
          o(this, me).parent
        ), null;
      }
    }));
  };
  ft(() => {
    var s;
    try {
      s = this.transform_error(t);
    } catch (i) {
      tt(i, o(this, me) && o(this, me).parent);
      return;
    }
    s !== null && typeof s == "object" && typeof /** @type {any} */
    s.then == "function" ? s.then(
      r,
      /** @param {unknown} e */
      (i) => tt(i, o(this, me) && o(this, me).parent)
    ) : r(s);
  });
};
function pe(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[yn] ?? (e[yn] = e.nodeValue)) && (e[yn] = n, e.nodeValue = `${n}`);
}
function ia(e, t) {
  return la(e, t);
}
const sr = /* @__PURE__ */ new Map();
function la(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: l = !0, transformError: a }) {
  Ml();
  var u = void 0, c = Fl(() => {
    var d = n ?? t.appendChild(ct());
    ea(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (p) => {
        dn({});
        var m = (
          /** @type {ComponentContext} */
          ke
        );
        i && (m.c = i), s && (r.$$events = s), u = e(p, r) || as(), vn();
      },
      a
    );
    var v = /* @__PURE__ */ new Set(), _ = (p) => {
      for (var m = 0; m < p.length; m++) {
        var y = p[m];
        if (!v.has(y)) {
          v.add(y);
          var h = Yl(y);
          for (const P of [t, document]) {
            var E = sr.get(P);
            E === void 0 && (E = /* @__PURE__ */ new Map(), sr.set(P, E));
            var G = E.get(y);
            G === void 0 ? (P.addEventListener(y, Zr, { passive: h }), E.set(y, 1)) : E.set(y, G + 1);
          }
        }
      }
    };
    return _(xr(Ri)), Wr.add(_), () => {
      var h;
      for (var p of v)
        for (const E of [t, document]) {
          var m = (
            /** @type {Map<string, number>} */
            sr.get(E)
          ), y = (
            /** @type {number} */
            m.get(p)
          );
          --y == 0 ? (E.removeEventListener(p, Zr), m.delete(p), m.size === 0 && sr.delete(E)) : m.set(p, y);
        }
      Wr.delete(_), d !== n && ((h = d.parentNode) == null || h.removeChild(d));
    };
  });
  return ts.set(u, c), u;
}
let ts = /* @__PURE__ */ new WeakMap();
function aa(e, t) {
  const n = ts.get(e);
  return n ? (ts.delete(e), n(t)) : Promise.resolve();
}
var ze, et, De, Nt, Bn, Vn, Er;
class oa {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    Te(this, "anchor");
    /** @type {Map<Batch, Key>} */
    x(this, ze, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    x(this, et, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    x(this, De, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    x(this, Nt, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    x(this, Bn, !0);
    /**
     * @param {Batch} batch
     */
    x(this, Vn, (t) => {
      if (o(this, ze).has(t)) {
        var n = (
          /** @type {Key} */
          o(this, ze).get(t)
        ), r = o(this, et).get(n);
        if (r)
          gr(r), o(this, Nt).delete(n);
        else {
          var s = o(this, De).get(n);
          s && (gr(s.effect), o(this, et).set(n, s.effect), o(this, De).delete(n), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), r = s.effect);
        }
        for (const [i, l] of o(this, ze)) {
          if (o(this, ze).delete(i), i === t)
            break;
          const a = o(this, De).get(l);
          a && (Se(a.effect), o(this, De).delete(l));
        }
        for (const [i, l] of o(this, et)) {
          if (i === n || o(this, Nt).has(i)) continue;
          const a = () => {
            if (Array.from(o(this, ze).values()).includes(i)) {
              var c = document.createDocumentFragment();
              ms(l, c), c.append(ct()), o(this, De).set(i, { effect: l, fragment: c });
            } else
              Se(l);
            o(this, Nt).delete(i), o(this, et).delete(i);
          };
          o(this, Bn) || !r ? (o(this, Nt).add(i), Lt(l, a, !1)) : a();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    x(this, Er, (t) => {
      o(this, ze).delete(t);
      const n = Array.from(o(this, ze).values());
      for (const [r, s] of o(this, De))
        n.includes(r) || (Se(s.effect), o(this, De).delete(r));
    });
    this.anchor = t, D(this, Bn, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      A
    ), s = pi();
    if (n && !o(this, et).has(t) && !o(this, De).has(t))
      if (s) {
        var i = document.createDocumentFragment(), l = ct();
        i.append(l), o(this, De).set(t, {
          effect: Le(() => n(l)),
          fragment: i
        });
      } else
        o(this, et).set(
          t,
          Le(() => n(this.anchor))
        );
    if (o(this, ze).set(r, t), s) {
      for (const [a, u] of o(this, et))
        a === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [a, u] of o(this, De))
        a === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(o(this, Vn)), r.ondiscard(o(this, Er));
    } else
      o(this, Vn).call(this, r);
  }
}
ze = new WeakMap(), et = new WeakMap(), De = new WeakMap(), Nt = new WeakMap(), Bn = new WeakMap(), Vn = new WeakMap(), Er = new WeakMap();
function Z(e, t, n = !1) {
  var r = new oa(e), s = n ? sn : 0;
  function i(l, a) {
    r.ensure(l, a);
  }
  ps(() => {
    var l = !1;
    t((a, u = 0) => {
      l = !0, i(u, a);
    }), l || i(-1, null);
  }, s);
}
function ua(e, t) {
  return t;
}
function fa(e, t, n) {
  for (var r = [], s = t.length, i, l = t.length, a = 0; a < s; a++) {
    let v = t[a];
    Lt(
      v,
      () => {
        if (i) {
          if (i.pending.delete(v), i.done.add(v), i.pending.size === 0) {
            var _ = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            ns(e, xr(i.done)), _.delete(i), _.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var u = r.length === 0 && n !== null && e.pending.size === 0;
    if (u) {
      var c = (
        /** @type {Element} */
        n
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      Cl(d), d.append(c), e.items.clear();
    }
    ns(e, t, !u);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function ns(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const l of e.pending.values())
      for (const a of l)
        r.add(
          /** @type {EachItem} */
          e.items.get(a).e
        );
  }
  for (var s = 0; s < t.length; s++) {
    var i = t[s];
    if (r != null && r.has(i)) {
      i.f |= nt;
      const l = document.createDocumentFragment();
      ms(i, l);
    } else
      Se(t[s], n);
  }
}
var Cs;
function yr(e, t, n, r, s, i = null) {
  var l = e, a = /* @__PURE__ */ new Map(), u = (t & Xs) !== 0;
  if (u) {
    var c = (
      /** @type {Element} */
      e
    );
    l = c.appendChild(ct());
  }
  var d = null, v = /* @__PURE__ */ ti(() => {
    var P = n();
    return (
      /** @type {V[]} */
      Sr(P) ? P : P == null ? [] : xr(P)
    );
  }), _, p = /* @__PURE__ */ new Map(), m = !0;
  function y(P) {
    (G.effect.f & we) === 0 && (G.pending.delete(P), G.fallback = d, ca(G, _, l, t, r), d !== null && (_.length === 0 ? (d.f & nt) === 0 ? gr(d) : (d.f ^= nt, xn(d, null, l)) : Lt(d, () => {
      d = null;
    })));
  }
  function h(P) {
    G.pending.delete(P);
  }
  var E = ps(() => {
    _ = /** @type {V[]} */
    f(v);
    for (var P = _.length, z = /* @__PURE__ */ new Set(), K = (
      /** @type {Batch} */
      A
    ), C = pi(), L = 0; L < P; L += 1) {
      var W = _[L], S = r(W, L), R = m ? null : a.get(S);
      R ? (R.v && an(R.v, W), R.i && an(R.i, L), C && K.unskip_effect(R.e)) : (R = da(
        a,
        m ? l : Cs ?? (Cs = ct()),
        W,
        S,
        L,
        s,
        t,
        n
      ), m || (R.e.f |= nt), a.set(S, R)), z.add(S);
    }
    if (P === 0 && i && !d && (m ? d = Le(() => i(l)) : (d = Le(() => i(Cs ?? (Cs = ct()))), d.f |= nt)), P > z.size && ll(), !m)
      if (p.set(K, z), C) {
        for (const [X, I] of a)
          z.has(X) || K.skip_effect(I.e);
        K.oncommit(y), K.ondiscard(h);
      } else
        y(K);
    f(v);
  }), G = { effect: E, items: a, pending: p, outrogroups: null, fallback: d };
  m = !1;
}
function gn(e) {
  for (; e !== null && (e.f & Be) === 0; )
    e = e.next;
  return e;
}
function ca(e, t, n, r, s) {
  var R, X, I, H, $, te, ue, fe, g;
  var i = (r & zi) !== 0, l = t.length, a = e.items, u = gn(e.effect.first), c, d = null, v, _ = [], p = [], m, y, h, E;
  if (i)
    for (E = 0; E < l; E += 1)
      m = t[E], y = s(m, E), h = /** @type {EachItem} */
      a.get(y).e, (h.f & nt) === 0 && ((X = (R = h.nodes) == null ? void 0 : R.a) == null || X.measure(), (v ?? (v = /* @__PURE__ */ new Set())).add(h));
  for (E = 0; E < l; E += 1) {
    if (m = t[E], y = s(m, E), h = /** @type {EachItem} */
    a.get(y).e, e.outrogroups !== null)
      for (const T of e.outrogroups)
        T.pending.delete(h), T.done.delete(h);
    if ((h.f & ye) !== 0 && (gr(h), i && ((H = (I = h.nodes) == null ? void 0 : I.a) == null || H.unfix(), (v ?? (v = /* @__PURE__ */ new Set())).delete(h))), (h.f & nt) !== 0)
      if (h.f ^= nt, h === u)
        xn(h, null, n);
      else {
        var G = d ? d.next : u;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), pt(e, d, h), pt(e, h, G), xn(h, G, n), d = h, _ = [], p = [], u = gn(d.next);
        continue;
      }
    if (h !== u) {
      if (c !== void 0 && c.has(h)) {
        if (_.length < p.length) {
          var P = p[0], z;
          d = P.prev;
          var K = _[0], C = _[_.length - 1];
          for (z = 0; z < _.length; z += 1)
            xn(_[z], P, n);
          for (z = 0; z < p.length; z += 1)
            c.delete(p[z]);
          pt(e, K.prev, C.next), pt(e, d, K), pt(e, C, P), u = P, d = C, E -= 1, _ = [], p = [];
        } else
          c.delete(h), xn(h, u, n), pt(e, h.prev, h.next), pt(e, h, d === null ? e.effect.first : d.next), pt(e, d, h), d = h;
        continue;
      }
      for (_ = [], p = []; u !== null && u !== h; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(u), p.push(u), u = gn(u.next);
      if (u === null)
        continue;
    }
    (h.f & nt) === 0 && _.push(h), d = h, u = gn(h.next);
  }
  if (e.outrogroups !== null) {
    for (const T of e.outrogroups)
      T.pending.size === 0 && (ns(e, xr(T.done)), ($ = e.outrogroups) == null || $.delete(T));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (u !== null || c !== void 0) {
    var L = [];
    if (c !== void 0)
      for (h of c)
        (h.f & ye) === 0 && L.push(h);
    for (; u !== null; )
      (u.f & ye) === 0 && u !== e.fallback && L.push(u), u = gn(u.next);
    var W = L.length;
    if (W > 0) {
      var S = (r & Xs) !== 0 && l === 0 ? n : null;
      if (i) {
        for (E = 0; E < W; E += 1)
          (ue = (te = L[E].nodes) == null ? void 0 : te.a) == null || ue.measure();
        for (E = 0; E < W; E += 1)
          (g = (fe = L[E].nodes) == null ? void 0 : fe.a) == null || g.fix();
      }
      fa(e, L, S);
    }
  }
  i && ft(() => {
    var T, xe;
    if (v !== void 0)
      for (h of v)
        (xe = (T = h.nodes) == null ? void 0 : T.a) == null || xe.apply();
  });
}
function da(e, t, n, r, s, i, l, a) {
  var u = (l & Ki) !== 0 ? (l & Yi) === 0 ? /* @__PURE__ */ jl(n, !1, !1) : Bt(n) : null, c = (l & qi) !== 0 ? Bt(s) : null;
  return {
    v: u,
    i: c,
    e: Le(() => (i(t, u ?? n, c ?? s, a), () => {
      e.delete(r);
    }))
  };
}
function xn(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, s = e.nodes.end, i = t && (t.f & nt) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ tr(r)
      );
      if (i.before(r), r === s)
        return;
      r = l;
    }
}
function pt(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Is = [...` 	
\r\f \v\uFEFF`];
function va(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var s of Object.keys(n))
      if (n[s])
        r = r ? r + " " + s : s;
      else if (r.length)
        for (var i = s.length, l = 0; (l = r.indexOf(s, l)) >= 0; ) {
          var a = l + i;
          (l === 0 || Is.includes(r[l - 1])) && (a === r.length || Is.includes(r[a])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(a + 1) : l = a;
        }
  }
  return r === "" ? null : r;
}
function ha(e, t) {
  return e == null ? null : String(e);
}
function In(e, t, n, r, s, i) {
  var l = (
    /** @type {any} */
    e[Vr]
  );
  if (l !== n || l === void 0) {
    var a = va(n, r, i);
    a == null ? e.removeAttribute("class") : e.className = a, e[Vr] = n;
  } else if (i && s !== i)
    for (var u in i) {
      var c = !!i[u];
      (s == null || c !== !!s[u]) && e.classList.toggle(u, c);
    }
  return i;
}
function gs(e, t, n, r) {
  var s = (
    /** @type {any} */
    e[Gr]
  );
  if (s !== t) {
    var i = ha(t);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e[Gr] = t;
  }
  return r;
}
function pa(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function _a(e, t) {
  var n = e.__defaultValue, r = e.multiple, s = r ? n ?? [] : null;
  if (!(r && !Sr(s))) {
    e.selectedIndex;
    for (var i of e.options) {
      var l = ss(i);
      pa(
        i,
        r ? (
          /** @type {any[]} */
          s.includes(l)
        ) : ci(l, n)
      );
    }
  }
}
function rs(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Sr(t))
      return nl();
    for (var r of e.options)
      r.selected = t.includes(ss(r));
    return;
  }
  for (r of e.options) {
    var s = ss(r);
    if (ci(s, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function Ns(e) {
  var t = new MutationObserver((n) => {
    n.every(ma) || ("__defaultValue" in e && _a(e), "__value" in e && rs(e, e.__value));
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), vs(() => {
    t.disconnect();
  });
}
function ss(e) {
  return "__value" in e ? e.__value : e.value;
}
function ma(e) {
  if (
    /** @type {Element} */
    e.target.closest("selectedcontent") !== null
  )
    return !0;
  if (e.type === "childList") {
    var t = [...e.addedNodes, ...e.removedNodes];
    return t.length > 0 && t.every((n) => n.nodeName === "SELECTEDCONTENT");
  }
  return !1;
}
const ga = Symbol("is custom element"), ba = Symbol("is html"), ya = Hi ? "progress" : "PROGRESS";
function bn(e, t) {
  var n = bs(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== ya) || (e.value = t ?? "");
}
function Tn(e, t) {
  var n = bs(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function Wt(e, t, n, r) {
  var s = bs(e);
  s[t] !== (s[t] = n) && (t === "loading" && (e[Gi] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && wa(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function bs(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[lr] ?? (e[lr] = {
      [ga]: e.nodeName.includes("-"),
      [ba]: e.namespaceURI === el
    })
  );
}
var Ps = /* @__PURE__ */ new Map();
function wa(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Ps.get(t);
  if (n) return n;
  Ps.set(t, n = /* @__PURE__ */ new Set());
  for (var r, s = e, i = Element.prototype; i !== s; ) {
    r = Ni(s);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    s = Ks(s);
  }
  return n;
}
function zt(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  bl(e, "input", async (s) => {
    var i = s ? e.defaultValue : e.value;
    if (i = Or(e) ? Lr(i) : i, n(i), A !== null && r.add(A), await ql(), i !== (i = t())) {
      var l = e.selectionStart, a = e.selectionEnd, u = e.value.length;
      if (e.value = i ?? "", a !== null) {
        var c = e.value.length;
        l === a && a === u && c > u ? (e.selectionStart = c, e.selectionEnd = c) : (e.selectionStart = l, e.selectionEnd = Math.min(a, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Ar(t) == null && e.value && (n(Or(e) ? Lr(e.value) : e.value), A !== null && r.add(A)), hs(() => {
    var s = t();
    if (e === document.activeElement) {
      var i = (
        /** @type {Batch} */
        A
      );
      if (r.has(i))
        return;
    }
    Or(e) && s === Lr(e.value) || e.type === "date" && !s && !e.value || s !== e.value && (e.value = s ?? "");
  });
}
function Or(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Lr(e) {
  return e === "" ? null : +e;
}
function Fr(e, t) {
  return e === t || (e == null ? void 0 : e[Ot]) === t;
}
function ka(e = as(), t, n, r) {
  var s = (
    /** @type {ComponentContext} */
    ke.r
  ), i = (
    /** @type {Effect} */
    q
  );
  return Ul(() => {
    var l, a;
    return hs(() => {
      l = a, a = [], Ar(() => {
        Fr(n(...a), e) || (t(e, ...a), l && Fr(n(...l), e) && t(null, ...l));
      });
    }), () => {
      let u = i;
      for (; u !== s && u.parent !== null && u.parent.f & vr; )
        u = u.parent;
      const c = () => {
        a && Fr(n(...a), e) && t(null, ...a);
      }, d = u.teardown;
      u.teardown = () => {
        c(), d == null || d();
      };
    };
  }), e;
}
let ir = !1;
function Ea(e) {
  var t = ir;
  try {
    return ir = !1, [e(), ir];
  } finally {
    ir = t;
  }
}
function Os(e, t, n, r) {
  var z;
  var s = !0, i = (n & Zi) !== 0, l = (n & Ji) !== 0, a = (
    /** @type {V} */
    r
  ), u = !0, c = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), d = () => l && s ? (c ?? (c = /* @__PURE__ */ Nn(
    /** @type {() => V} */
    r
  )), f(c)) : (u && (u = !1, a = l ? Ar(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), a);
  let v;
  if (i) {
    var _ = Ot in e || Vi in e;
    v = ((z = Yt(e, t)) == null ? void 0 : z.set) ?? (_ && t in e ? (K) => e[t] = K : void 0);
  }
  var p, m = !1;
  i ? [p, m] = Ea(() => (
    /** @type {V} */
    e[t]
  )) : p = /** @type {V} */
  e[t], p === void 0 && r !== void 0 && (p = d(), v && (cl(), v(p)));
  var y;
  if (y = () => {
    var K = (
      /** @type {V} */
      e[t]
    );
    return K === void 0 ? d() : (u = !0, K);
  }, (n & Wi) === 0)
    return y;
  if (v) {
    var h = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(K, C) {
        return arguments.length > 0 ? ((!C || h || m) && v(C ? y() : K), K) : y();
      })
    );
  }
  var E = !1, G = ((n & Xi) !== 0 ? Nn : ti)(() => (E = !1, y()));
  i && f(G);
  var P = (
    /** @type {Effect} */
    q
  );
  return (
    /** @type {() => V} */
    (function(K, C) {
      if (arguments.length > 0) {
        const L = C ? f(G) : i ? Ue(K) : K;
        return k(G, L), E = !0, a !== void 0 && (a = L), K;
      }
      return vt && E || (P.f & we) !== 0 ? G.v : f(G);
    })
  );
}
const Sa = "5";
var Gs;
typeof window < "u" && ((Gs = window.__svelte ?? (window.__svelte = {})).v ?? (Gs.v = /* @__PURE__ */ new Set())).add(Sa);
var xa = /* @__PURE__ */ O('<button class="mm-btn ghost icon sm twisty svelte-3r6i99" type="button"> </button>'), Ta = /* @__PURE__ */ O('<span class="twisty-spacer svelte-3r6i99"></span>'), Aa = /* @__PURE__ */ O('<span class="mm-tag">Heading</span>'), Ra = /* @__PURE__ */ O('<span class="mm-tag broken" title="That page is missing or unpublished, so this item is not shown on the site">Broken</span>'), ja = /* @__PURE__ */ O('<span class="mm-tag">Link</span>'), Da = /* @__PURE__ */ O('<span class="mm-tag button">Button</span>'), Ma = /* @__PURE__ */ O('<div role="treeitem" tabindex="0"><span class="grip svelte-3r6i99" draggable="true" role="presentation" aria-hidden="true">⠿</span> <!> <span class="label svelte-3r6i99"> </span> <!> <!> <span class="target svelte-3r6i99"> </span> <span class="actions svelte-3r6i99"><button class="mm-btn ghost icon sm" type="button" title="Out one level (Alt+←)">←</button> <button class="mm-btn ghost icon sm" type="button" title="Up (Alt+↑)">↑</button> <button class="mm-btn ghost icon sm" type="button" title="Down (Alt+↓)">↓</button> <button class="mm-btn ghost icon sm" type="button" title="In one level (Alt+→)">→</button> <button class="mm-btn ghost icon sm" type="button" title="Duplicate">⧉</button> <button class="mm-btn ghost icon sm danger" type="button" title="Remove">✕</button></span></div>');
function Ca(e, t) {
  dn(t, !0);
  const n = /* @__PURE__ */ Me(() => t.row.item), r = /* @__PURE__ */ Me(() => t.store.resolved[f(n).key] || null), s = /* @__PURE__ */ Me(() => t.store.selected === f(n).key), i = /* @__PURE__ */ Me(() => {
    var g;
    return (((g = f(n).children) == null ? void 0 : g.length) ?? 0) > 0;
  }), l = /* @__PURE__ */ Me(() => t.store.collapsed.has(f(n).key)), a = /* @__PURE__ */ Me(() => {
    var g;
    return f(n).label || ((g = f(r)) == null ? void 0 : g.label) || f(n).url || f(n).route || "Untitled";
  }), u = /* @__PURE__ */ Me(() => f(n).type === "page" ? f(n).route : f(n).type === "url" ? f(n).url : "");
  function c(g) {
    if (!g.altKey) return;
    const T = {
      ArrowUp: () => t.store.moveUp(f(n).key),
      ArrowDown: () => t.store.moveDown(f(n).key),
      ArrowRight: () => t.store.indent(f(n).key),
      ArrowLeft: () => t.store.outdent(f(n).key)
    };
    T[g.key] && (g.preventDefault(), T[g.key]());
  }
  var d = Ma();
  let v;
  var _ = V(d), p = w(_, 2);
  {
    var m = (g) => {
      var T = xa(), xe = be(T, !0);
      ne(() => {
        Wt(T, "aria-label", f(l) ? "Expand" : "Collapse"), pe(xe, f(l) ? "▸" : "▾");
      }), F("click", T, (pn) => {
        pn.stopPropagation(), t.store.toggleCollapse(f(n).key);
      }), M(g, T);
    }, y = (g) => {
      var T = Ta();
      M(g, T);
    };
    Z(p, (g) => {
      f(i) ? g(m) : g(y, -1);
    });
  }
  var h = w(p, 2), E = be(h, !0), G = w(h, 2);
  {
    var P = (g) => {
      var T = Aa();
      M(g, T);
    }, z = (g) => {
      var T = Ra();
      M(g, T);
    }, K = (g) => {
      var T = ja();
      M(g, T);
    };
    Z(G, (g) => {
      var T;
      f(n).type === "heading" ? g(P) : (T = f(r)) != null && T.broken ? g(z, 1) : f(n).type === "url" && g(K, 2);
    });
  }
  var C = w(G, 2);
  {
    var L = (g) => {
      var T = Da();
      M(g, T);
    }, W = /* @__PURE__ */ Me(() => {
      var g;
      return (g = f(n).style) == null ? void 0 : g.includes("button");
    });
    Z(C, (g) => {
      f(W) && g(L);
    });
  }
  var S = w(C, 2), R = be(S, !0), X = w(S, 2), I = V(X), H = w(I, 2), $ = w(H, 2), te = w($, 2), ue = w(te, 2), fe = w(ue, 2);
  ne(() => {
    v = In(d, 1, "row svelte-3r6i99", null, v, { selected: f(s), dragging: t.dragging }), gs(d, `margin-inline-start: calc(var(--mm-indent) * ${t.row.depth ?? ""})`), Wt(d, "aria-selected", f(s)), Wt(d, "aria-level", t.row.depth + 1), pe(E, f(a)), pe(R, f(u));
  }), F("click", d, () => t.store.select(f(n).key)), F("keydown", d, c), xt("dragstart", _, (g) => t.onDragStart(g, t.row)), F("click", I, (g) => {
    g.stopPropagation(), t.store.outdent(f(n).key);
  }), F("click", H, (g) => {
    g.stopPropagation(), t.store.moveUp(f(n).key);
  }), F("click", $, (g) => {
    g.stopPropagation(), t.store.moveDown(f(n).key);
  }), F("click", te, (g) => {
    g.stopPropagation(), t.store.indent(f(n).key);
  }), F("click", ue, (g) => {
    g.stopPropagation(), t.store.duplicate(f(n).key);
  }), F("click", fe, (g) => {
    g.stopPropagation(), t.store.remove(f(n).key);
  }), M(e, d), vn();
}
Rr(["click", "keydown"]);
const Ia = 24;
function Na(e, t, n, r, s = 5) {
  const i = Math.max(0, Math.min(n, e.length)), l = i > 0 ? e[i - 1] : null, a = i < e.length ? e[i] : null, u = t + r, c = l ? l.depth + 1 : 0, d = a ? a.depth : 0, v = Math.min(c, s - 1), _ = Math.max(0, Math.max(d, Math.min(u, v)));
  return {
    depth: _,
    parentKey: _ === 0 ? null : Pa(e, i, _),
    beforeKey: a ? a.key : null,
    clamped: _ !== u
  };
}
function Pa(e, t, n) {
  for (let r = t - 1; r >= 0; r--) {
    if (e[r].depth === n - 1) return e[r].key;
    if (e[r].depth < n - 1) return null;
  }
  return null;
}
function Oa(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n].top + e[n].height / 2;
    if (t < r) return n;
  }
  return e.length;
}
function La(e, t, n = Ia) {
  return Math.round((e - t) / n);
}
function ys() {
  return Math.random().toString(36).slice(2, 8);
}
function Ur(e = "url", t = {}) {
  return {
    key: ys(),
    type: e,
    label: "",
    icon: "",
    description: "",
    target: "",
    nofollow: !1,
    style: [],
    children: [],
    ...t
  };
}
function Ze(e, t = /* @__PURE__ */ new Set(), n = 0, r = null, s = []) {
  var i;
  for (const l of e)
    s.push({ key: l.key, depth: n, parentKey: r, item: l }), (i = l.children) != null && i.length && !t.has(l.key) && Ze(l.children, t, n + 1, l.key, s);
  return s;
}
function rr(e, t) {
  for (const n of e) {
    if (n.key === t) return n;
    const r = rr(n.children || [], t);
    if (r) return r;
  }
  return null;
}
function ji(e) {
  return e.reduce((t, n) => t + 1 + ji(n.children || []), 0);
}
function Di(e, t = 1) {
  return e.reduce(
    (n, r) => {
      var s;
      return Math.max(n, (s = r.children) != null && s.length ? Di(r.children, t + 1) : t);
    },
    0
  );
}
function Vt(e, t) {
  let n = null;
  const r = (i) => i.flatMap((l) => l.key === t ? (n = l, []) : [{ ...l, children: r(l.children || []) }]);
  return { items: r(e), removed: n };
}
function Gt(e, t, n, r) {
  const s = (i) => {
    const l = r ? i.findIndex((u) => u.key === r) : -1, a = [...i];
    return a.splice(l === -1 ? a.length : l, 0, t), a;
  };
  return n === null ? s(e) : e.map((i) => i.key === n ? { ...i, children: s(i.children || []) } : { ...i, children: Gt(i.children || [], t, n, r) });
}
function Fa(e, t, n) {
  if (!n || !t) return e;
  const { items: r, removed: s } = Vt(e, t);
  return s ? Gt(r, s, n.parentKey, n.beforeKey) : e;
}
function Ua(e, t) {
  const n = Ze(e), r = n.findIndex((a) => a.key === t);
  if (r <= 0) return e;
  const s = n[r], i = un(e, s.parentKey), l = i.findIndex((a) => a.key === t);
  if (l > 0) {
    const a = [...i];
    return a.splice(l, 1), a.splice(l - 1, 0, i[l]), ws(e, s.parentKey, a);
  }
  return qa(e, t, s.parentKey);
}
function Ba(e, t) {
  var v;
  const n = Ze(e).find((_) => _.key === t);
  if (!n) return e;
  const r = un(e, n.parentKey), s = r.findIndex((_) => _.key === t);
  if (s < r.length - 1) {
    const _ = [...r];
    return _.splice(s, 1), _.splice(s + 1, 0, r[s]), ws(e, n.parentKey, _);
  }
  if (n.parentKey === null) return e;
  const { items: i, removed: l } = Vt(e, t), a = Ze(i).find((_) => _.key === n.parentKey), u = un(i, (a == null ? void 0 : a.parentKey) ?? null), c = u.findIndex((_) => _.key === n.parentKey), d = ((v = u[c + 1]) == null ? void 0 : v.key) ?? null;
  return Gt(i, l, (a == null ? void 0 : a.parentKey) ?? null, d);
}
function Va(e, t, n = 5) {
  const r = Ze(e).find((d) => d.key === t);
  if (!r) return e;
  const s = un(e, r.parentKey), i = s.findIndex((d) => d.key === t);
  if (i <= 0) return e;
  const l = s[i - 1], a = Di([rr(e, t)]);
  if (r.depth + 1 + a > n) return e;
  const { items: u, removed: c } = Vt(e, t);
  return Gt(u, c, l.key, null);
}
function Ga(e, t) {
  var d;
  const n = Ze(e).find((v) => v.key === t);
  if (!n || n.parentKey === null) return e;
  const { items: r, removed: s } = Vt(e, t), i = Ze(r).find((v) => v.key === n.parentKey), l = (i == null ? void 0 : i.parentKey) ?? null, a = un(r, l), u = a.findIndex((v) => v.key === n.parentKey), c = ((d = a[u + 1]) == null ? void 0 : d.key) ?? null;
  return Gt(r, s, l, c);
}
function Ha(e, t) {
  return Vt(e, t).items;
}
function Ka(e, t) {
  var u;
  const n = rr(e, t);
  if (!n) return e;
  const r = (c) => ({ ...c, key: ys(), children: (c.children || []).map(r) }), s = Ze(e).find((c) => c.key === t), i = un(e, s.parentKey), l = i.findIndex((c) => c.key === t), a = ((u = i[l + 1]) == null ? void 0 : u.key) ?? null;
  return Gt(e, r(n), s.parentKey, a);
}
function An(e, t = /* @__PURE__ */ new Set()) {
  return (e || []).map((n) => {
    let r = n.key;
    return (!r || t.has(r)) && (r = ys()), t.add(r), { ...n, key: r, children: An(n.children || [], t) };
  });
}
function un(e, t) {
  var n;
  return t === null ? e : ((n = rr(e, t)) == null ? void 0 : n.children) || [];
}
function ws(e, t, n) {
  return t === null ? n : e.map(
    (r) => r.key === t ? { ...r, children: n } : { ...r, children: ws(r.children || [], t, n) }
  );
}
function qa(e, t, n) {
  const { items: r, removed: s } = Vt(e, t), i = Ze(r).find((l) => l.key === n);
  return Gt(r, s, (i == null ? void 0 : i.parentKey) ?? null, n);
}
var za = /* @__PURE__ */ O('<p class="empty svelte-d2e7rp">This menu is empty. Add pages or a custom link from the panel on the left.</p>'), Ls = /* @__PURE__ */ O("<div><!></div>"), Ya = /* @__PURE__ */ O('<span class="hint svelte-d2e7rp"><!></span>'), Xa = /* @__PURE__ */ O('<div class="tree mm-scroll svelte-d2e7rp" role="tree" aria-label="Menu items" tabindex="-1"><!> <!> <!></div>');
function Wa(e, t) {
  dn(t, !0);
  let n = /* @__PURE__ */ B(null), r = /* @__PURE__ */ B(null), s = 0, i = 0, l = [], a = [], u = /* @__PURE__ */ B(null), c = /* @__PURE__ */ B(-1);
  const d = /* @__PURE__ */ Me(() => t.store.rows);
  function v() {
    if (!f(n)) return;
    const S = f(n).getBoundingClientRect().top;
    a = [...f(n).querySelectorAll("[data-row]")].filter((R) => R.dataset.row !== f(r)).map((R) => {
      const X = R.getBoundingClientRect();
      return {
        top: X.top - S + f(n).scrollTop,
        height: X.height
      };
    });
  }
  function _(S, R) {
    k(r, R.key, !0), s = S.clientX, i = R.depth, S.dataTransfer.setData("text/plain", R.key), S.dataTransfer.effectAllowed = "move";
    const { items: X } = Vt(t.store.items, R.key);
    l = Ze(X, t.store.collapsed).map((I) => ({ key: I.key, depth: I.depth })), requestAnimationFrame(v);
  }
  function p(S) {
    if (!f(r)) return;
    S.preventDefault(), S.dataTransfer.dropEffect = "move";
    const R = f(n).getBoundingClientRect().top, X = S.clientY - R + f(n).scrollTop;
    k(c, Oa(a, X), !0), k(u, Na(l, i, f(c), La(S.clientX, s), t.store.maxDepth), !0), y(S.clientY);
  }
  let m = null;
  function y(S) {
    const R = f(n).getBoundingClientRect(), X = 40, I = S < R.top + X ? -8 : S > R.bottom - X ? 8 : 0;
    clearTimeout(m), I && (f(n).scrollBy(0, I), v(), m = setTimeout(() => y(S), 40));
  }
  function h(S) {
    S.preventDefault(), f(r) && f(u) && t.store.applyDrop(f(r), f(u)), E();
  }
  function E() {
    clearTimeout(m), k(r, null), k(u, null), k(c, -1), a = [], l = [];
  }
  const G = /* @__PURE__ */ Me(() => {
    if (!f(u) || f(c) < 0 || !a.length) return 0;
    if (f(c) >= a.length) {
      const S = a[a.length - 1];
      return S.top + S.height;
    }
    return a[f(c)].top;
  });
  var P = Xa(), z = V(P);
  {
    var K = (S) => {
      var R = za();
      M(S, R);
    };
    Z(z, (S) => {
      f(d).length || S(K);
    });
  }
  var C = w(z, 2);
  yr(C, 17, () => f(d), (S) => S.key, (S, R) => {
    var X = Ls(), I = V(X);
    {
      let H = /* @__PURE__ */ Me(() => f(r) === f(R).key);
      Ca(I, {
        get row() {
          return f(R);
        },
        get store() {
          return t.store;
        },
        get dragging() {
          return f(H);
        },
        onDragStart: _
      });
    }
    ne(() => Wt(X, "data-row", f(R).key)), M(S, X);
  });
  var L = w(C, 2);
  {
    var W = (S) => {
      var R = Ls();
      let X;
      var I = V(R);
      {
        var H = ($) => {
          var te = Ya(), ue = V(te);
          {
            var fe = (T) => {
              var xe = Ms();
              ne(() => pe(xe, `This menu renders ${t.store.maxDepth ?? ""} level${t.store.maxDepth === 1 ? "" : "s"}`)), M(T, xe);
            }, g = (T) => {
              var xe = Ms("Can't skip a level");
              M(T, xe);
            };
            Z(ue, (T) => {
              f(u).depth >= t.store.maxDepth - 1 ? T(fe) : T(g, -1);
            });
          }
          M($, te);
        };
        Z(I, ($) => {
          f(u).clamped && $(H);
        });
      }
      ne(() => {
        X = In(R, 1, "indicator svelte-d2e7rp", null, X, { clamped: f(u).clamped }), gs(R, `top: ${f(G) ?? ""}px; margin-inline-start: calc(var(--mm-indent) * ${f(u).depth ?? ""})`);
      }), M(S, R);
    };
    Z(L, (S) => {
      f(u) && S(W);
    });
  }
  ka(P, (S) => k(n, S), () => f(n)), xt("dragover", P, p), xt("drop", P, h), xt("dragleave", P, () => {
    k(u, null), k(c, -1);
  }), xt("dragend", P, E), xt("scroll", P, () => f(r) && v()), M(e, P), vn();
}
var Za = /* @__PURE__ */ O('<p class="empty svelte-17w6cpd">Select an item to edit it.</p>'), Ja = /* @__PURE__ */ O(`<div class="mm-banner error">This points at <code class="svelte-17w6cpd"> </code>, which is missing or unpublished. It is not shown on the
        site. Fix the page, or point this item somewhere else.</div>`), Qa = /* @__PURE__ */ O(`<p class="mm-help">Leave this empty and the item follows the page's own menu label.</p>`), $a = /* @__PURE__ */ O('<label class="mm-label svelte-17w6cpd" for="mm-route-field">Page</label> <input id="mm-route-field" class="mm-input"/>', 1), eo = /* @__PURE__ */ O('<label class="mm-label svelte-17w6cpd" for="mm-url-field">URL</label> <input id="mm-url-field" class="mm-input"/>', 1), to = /* @__PURE__ */ O('<label class="mm-label svelte-17w6cpd" for="mm-icon-field">Icon</label> <input id="mm-icon-field" class="mm-input" placeholder="fa-user"/> <label class="mm-label svelte-17w6cpd" for="mm-desc-field">Description</label> <input id="mm-desc-field" class="mm-input"/> <p class="mm-help">Shown under the label. Best on items inside a dropdown.</p> <label class="check svelte-17w6cpd"><input type="checkbox"/> Open in a new tab</label> <label class="check svelte-17w6cpd"><input type="checkbox"/> Add <code class="svelte-17w6cpd">nofollow</code></label> <p class="mm-label svelte-17w6cpd" style="margin-top: 14px">Style</p> <label class="check svelte-17w6cpd"><input type="checkbox"/> Show as a button</label> <label class="check svelte-17w6cpd"><input type="checkbox"/> Highlight</label>', 1), no = /* @__PURE__ */ O('<div class="fields mm-scroll svelte-17w6cpd"><!> <label class="mm-label svelte-17w6cpd" for="mm-label-field">Label</label> <input id="mm-label-field" class="mm-input"/> <!> <!> <!></div>');
function ro(e, t) {
  dn(t, !0);
  const n = /* @__PURE__ */ Me(() => t.store.selectedItem), r = /* @__PURE__ */ Me(() => f(n) ? t.store.resolved[f(n).key] : null);
  function s(d) {
    t.store.update(f(n).key, d);
  }
  function i(d, v) {
    const _ = new Set(f(n).style || []);
    v ? _.add(d) : _.delete(d), s({ style: [..._] });
  }
  var l = Jl(), a = At(l);
  {
    var u = (d) => {
      var v = Za();
      M(d, v);
    }, c = (d) => {
      var v = no(), _ = V(v);
      {
        var p = (C) => {
          var L = Ja(), W = w(V(L)), S = be(W, !0);
          ne(() => pe(S, f(n).route)), M(C, L);
        };
        Z(_, (C) => {
          var L;
          (L = f(r)) != null && L.broken && C(p);
        });
      }
      var m = w(_, 4), y = w(m, 2);
      {
        var h = (C) => {
          var L = Qa();
          M(C, L);
        };
        Z(y, (C) => {
          f(n).type === "page" && C(h);
        });
      }
      var E = w(y, 2);
      {
        var G = (C) => {
          var L = $a(), W = w(At(L), 2);
          ne(() => bn(W, f(n).route || "")), F("input", W, (S) => s({ route: S.target.value })), M(C, L);
        }, P = (C) => {
          var L = eo(), W = w(At(L), 2);
          ne(() => bn(W, f(n).url || "")), F("input", W, (S) => s({ url: S.target.value })), M(C, L);
        };
        Z(E, (C) => {
          f(n).type === "page" ? C(G) : f(n).type === "url" && C(P, 1);
        });
      }
      var z = w(E, 2);
      {
        var K = (C) => {
          var L = to(), W = w(At(L), 2), S = w(W, 4), R = w(S, 4), X = V(R), I = w(R, 2), H = V(I), $ = w(I, 4), te = V($), ue = w($, 2), fe = V(ue);
          ne(
            (g, T) => {
              bn(W, f(n).icon || ""), bn(S, f(n).description || ""), Tn(X, f(n).target === "_blank"), Tn(H, !!f(n).nofollow), Tn(te, g), Tn(fe, T);
            },
            [
              () => {
                var g;
                return (g = f(n).style) == null ? void 0 : g.includes("button");
              },
              () => {
                var g;
                return (g = f(n).style) == null ? void 0 : g.includes("highlight");
              }
            ]
          ), F("input", W, (g) => s({ icon: g.target.value })), F("input", S, (g) => s({ description: g.target.value })), F("change", X, (g) => s({ target: g.target.checked ? "_blank" : "" })), F("change", H, (g) => s({ nofollow: g.target.checked })), F("change", te, (g) => i("button", g.target.checked)), F("change", fe, (g) => i("highlight", g.target.checked)), M(C, L);
        };
        Z(z, (C) => {
          f(n).type !== "heading" && C(K);
        });
      }
      ne(() => {
        var C;
        bn(m, f(n).label || ""), Wt(m, "placeholder", f(n).type === "page" ? ((C = f(r)) == null ? void 0 : C.label) || "Follows the page title" : "");
      }), F("input", m, (C) => s({ label: C.target.value })), M(d, v);
    };
    Z(a, (d) => {
      f(n) ? d(c, -1) : d(u);
    });
  }
  M(e, l), vn();
}
Rr(["input", "change"]);
function so() {
  const e = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), t = window.__GRAV_API_PREFIX || "/api/v1";
  return e + t;
}
function io() {
  const e = { Accept: "application/json" };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function Et(e, t, n) {
  var l;
  const r = { method: e, headers: io(), credentials: "same-origin" };
  n !== void 0 && (r.headers["Content-Type"] = "application/json", r.body = JSON.stringify(n));
  const s = await fetch(so() + t, r);
  if (s.status === 204) return null;
  const i = await s.json().catch(() => ({}));
  if (!s.ok) {
    const a = (i == null ? void 0 : i.detail) || ((l = i == null ? void 0 : i.error) == null ? void 0 : l.message) || (i == null ? void 0 : i.message) || `Request failed (${s.status})`, u = new Error(a);
    throw u.status = s.status, u.errors = (i == null ? void 0 : i.errors) || null, u;
  }
  return i && typeof i == "object" && "data" in i ? i.data : i;
}
const _t = {
  list: () => Et("GET", "/maw-menus/menus"),
  get: (e, t = !1) => Et("GET", `/maw-menus/menus/${encodeURIComponent(e)}${t ? "?resolve=1" : ""}`),
  create: (e) => Et("POST", "/maw-menus/menus", e),
  update: (e, t) => Et("PATCH", `/maw-menus/menus/${encodeURIComponent(e)}`, t),
  remove: (e) => Et("DELETE", `/maw-menus/menus/${encodeURIComponent(e)}`),
  seed: (e, t = {}) => Et("POST", `/maw-menus/menus/${encodeURIComponent(e)}/seed`, t),
  /**
   * The page picker. Kept as one function so it can be swapped for the core /pages endpoint
   * without touching the component.
   */
  pages: (e = "") => Et("GET", `/maw-menus/pages${e ? `?search=${encodeURIComponent(e)}` : ""}`)
};
var lo = /* @__PURE__ */ O('<div class="mm-banner error"> </div>'), ao = /* @__PURE__ */ O('<p class="muted svelte-1jjp3gp">Loading…</p>'), oo = /* @__PURE__ */ O('<p class="muted svelte-1jjp3gp">No pages match.</p>'), uo = /* @__PURE__ */ O('<span class="mm-tag" title="Not in the automatic page-tree nav">Hidden</span>'), fo = /* @__PURE__ */ O('<span class="mm-tag broken">Draft</span>'), co = /* @__PURE__ */ O('<li><label class="page svelte-1jjp3gp"><input type="checkbox"/> <span class="name svelte-1jjp3gp"> </span> <!> <!></label></li>'), vo = /* @__PURE__ */ O('<ul class="pages svelte-1jjp3gp"></ul>'), ho = /* @__PURE__ */ O('<div class="body mm-scroll svelte-1jjp3gp"><input class="mm-input" placeholder="Search pages"/> <!></div> <div class="foot svelte-1jjp3gp"><button class="mm-btn primary" type="button"> </button></div>', 1), po = /* @__PURE__ */ O('<div class="body mm-scroll svelte-1jjp3gp"><label class="mm-label svelte-1jjp3gp" for="mm-new-url">URL</label> <input id="mm-new-url" class="mm-input" placeholder="https://example.com or /a/page"/> <label class="mm-label svelte-1jjp3gp" for="mm-new-label">Label</label> <input id="mm-new-label" class="mm-input"/> <button class="mm-btn primary wide svelte-1jjp3gp" type="button">Add link</button> <hr class="svelte-1jjp3gp"/> <label class="mm-label svelte-1jjp3gp" for="mm-new-heading">Heading</label> <input id="mm-new-heading" class="mm-input" placeholder="Services"/> <p class="mm-help">A label that groups the items under it. Not a link.</p> <button class="mm-btn wide svelte-1jjp3gp" type="button">Add heading</button></div>'), _o = /* @__PURE__ */ O(`<div class="body mm-scroll svelte-1jjp3gp"><p>Build this menu from the page tree, exactly as the theme's automatic navigation would: visible,
        linkable pages and one level of children.</p> <p class="mm-help">Labels are left empty so each item keeps following its page's own menu label.</p> <button class="mm-btn wide svelte-1jjp3gp" type="button">Add to this menu</button> <button class="mm-btn wide danger svelte-1jjp3gp" type="button">Replace everything</button></div>`), mo = /* @__PURE__ */ O('<div class="panel svelte-1jjp3gp"><div class="tabs svelte-1jjp3gp"><button type="button">Pages</button> <button type="button">Link</button> <button type="button">Build</button></div> <!></div>');
function go(e, t) {
  dn(t, !0);
  let n = /* @__PURE__ */ B("pages"), r = /* @__PURE__ */ B(Ue([])), s = /* @__PURE__ */ B(""), i = /* @__PURE__ */ B(Ue(/* @__PURE__ */ new Set())), l = /* @__PURE__ */ B(!1), a = /* @__PURE__ */ B(""), u = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B(""), d = /* @__PURE__ */ B("");
  async function v() {
    k(l, !0), k(a, "");
    try {
      k(r, await _t.pages(f(s)) || [], !0);
    } catch (I) {
      k(a, I.message, !0);
    } finally {
      k(l, !1);
    }
  }
  Ll(() => {
    if (f(n) === "pages") {
      const I = f(s), H = setTimeout(
        () => {
          f(s) === I && v();
        },
        200
      );
      return () => clearTimeout(H);
    }
  });
  function _(I) {
    const H = new Set(f(i));
    H.has(I) ? H.delete(I) : H.add(I), k(i, H, !0);
  }
  function p() {
    const I = f(r).filter((H) => f(i).has(H.route)).map((H) => Ur("page", { route: H.route }));
    I.length && (t.store.addMany(I), t.store.flash(`Added ${I.length} item${I.length === 1 ? "" : "s"}`)), k(i, /* @__PURE__ */ new Set(), !0);
  }
  function m() {
    f(u).trim() && (t.store.add(Ur("url", { url: f(u).trim(), label: f(c).trim() })), k(u, ""), k(c, ""));
  }
  function y() {
    f(d).trim() && (t.store.add(Ur("heading", { label: f(d).trim() })), k(d, ""));
  }
  var h = mo(), E = V(h), G = V(E);
  let P;
  var z = w(G, 2);
  let K;
  var C = w(z, 2);
  let L;
  var W = w(E, 2);
  {
    var S = (I) => {
      var H = ho(), $ = At(H), te = V($), ue = w(te, 2);
      {
        var fe = (ce) => {
          var Ge = lo(), wt = be(Ge, !0);
          ne(() => pe(wt, f(a))), M(ce, Ge);
        }, g = (ce) => {
          var Ge = ao();
          M(ce, Ge);
        }, T = (ce) => {
          var Ge = oo();
          M(ce, Ge);
        }, xe = (ce) => {
          var Ge = vo();
          yr(Ge, 21, () => f(r), (wt) => wt.route, (wt, lt) => {
            var b = co(), N = V(b), Q = V(N), ee = w(Q, 2), ie = be(ee, !0), He = w(ee, 2);
            {
              var Je = (le) => {
                var kt = uo();
                M(le, kt);
              };
              Z(He, (le) => {
                f(lt).visible || le(Je);
              });
            }
            var Ie = w(He, 2);
            {
              var he = (le) => {
                var kt = fo();
                M(le, kt);
              };
              Z(Ie, (le) => {
                f(lt).published || le(he);
              });
            }
            ne(
              (le) => {
                gs(b, `padding-inline-start: calc(var(--mm-indent) * ${f(lt).depth ?? ""})`), Tn(Q, le), pe(ie, f(lt).menu || f(lt).title);
              },
              [() => f(i).has(f(lt).route)]
            ), F("change", Q, () => _(f(lt).route)), M(wt, b);
          }), M(ce, Ge);
        };
        Z(ue, (ce) => {
          f(a) ? ce(fe) : f(l) ? ce(g, 1) : f(r).length ? ce(xe, -1) : ce(T, 2);
        });
      }
      var pn = w($, 2), _n = V(pn), jr = be(_n);
      ne(() => {
        _n.disabled = !f(i).size, pe(jr, `Add ${(f(i).size || "") ?? ""} selected`);
      }), zt(te, () => f(s), (ce) => k(s, ce)), F("click", _n, p), M(I, H);
    }, R = (I) => {
      var H = po(), $ = w(V(H), 2), te = w($, 4), ue = w(te, 2), fe = w(ue, 6), g = w(fe, 4);
      zt($, () => f(u), (T) => k(u, T)), F("keydown", te, (T) => T.key === "Enter" && m()), zt(te, () => f(c), (T) => k(c, T)), F("click", ue, m), F("keydown", fe, (T) => T.key === "Enter" && y()), zt(fe, () => f(d), (T) => k(d, T)), F("click", g, y), M(I, H);
    }, X = (I) => {
      var H = _o(), $ = w(V(H), 4), te = w($, 2);
      F("click", $, () => t.store.seed(!1)), F("click", te, () => t.store.seed(!0)), M(I, H);
    };
    Z(W, (I) => {
      f(n) === "pages" ? I(S) : f(n) === "link" ? I(R, 1) : I(X, -1);
    });
  }
  ne(() => {
    P = In(G, 1, "tab svelte-1jjp3gp", null, P, { on: f(n) === "pages" }), K = In(z, 1, "tab svelte-1jjp3gp", null, K, { on: f(n) === "link" }), L = In(C, 1, "tab svelte-1jjp3gp", null, L, { on: f(n) === "seed" });
  }), F("click", G, () => k(n, "pages")), F("click", z, () => k(n, "link")), F("click", C, () => k(n, "seed")), M(e, h), vn();
}
Rr(["click", "change", "keydown"]);
var Fs = /* @__PURE__ */ O("<option> </option>"), bo = /* @__PURE__ */ O("<option>No menus yet</option>"), yo = /* @__PURE__ */ O('<label class="depth svelte-nejbyb">Levels <select class="mm-input svelte-nejbyb"></select></label> <span class="count svelte-nejbyb"> </span>', 1), wo = /* @__PURE__ */ O('<span class="unsaved svelte-nejbyb">Unsaved changes</span>'), ko = /* @__PURE__ */ O('<button class="mm-btn danger" type="button">Delete</button>'), Eo = /* @__PURE__ */ O('<button class="mm-btn ghost" type="button">Close</button>'), So = /* @__PURE__ */ O('<div class="mm-banner error"> </div>'), xo = /* @__PURE__ */ O('<div class="mm-banner ok"> </div>'), To = /* @__PURE__ */ O('<p class="muted pad svelte-nejbyb">Loading…</p>'), Ao = /* @__PURE__ */ O(`<div class="pad svelte-nejbyb"><p class="muted svelte-nejbyb">No menus yet.</p> <p class="muted svelte-nejbyb">A theme looks for one named <code class="svelte-nejbyb">header</code>. Until that exists, the site keeps using its
        automatic page-tree navigation — so nothing changes until you are ready.</p></div>`), Ro = /* @__PURE__ */ O('<div class="cols svelte-nejbyb"><aside class="left svelte-nejbyb"><!></aside> <main class="middle svelte-nejbyb"><!></main> <aside class="right svelte-nejbyb"><!></aside></div>'), jo = /* @__PURE__ */ O(`<div class="scrim svelte-nejbyb" role="presentation"><div class="dialog svelte-nejbyb" role="dialog" aria-modal="true" aria-label="New menu"><h2 class="svelte-nejbyb">New menu</h2> <label class="mm-label svelte-nejbyb" for="mm-title">Name</label> <input id="mm-title" class="mm-input"/> <label class="mm-label svelte-nejbyb" for="mm-id">Id</label> <input id="mm-id" class="mm-input"/> <p class="mm-help">The name a template asks for, as in <code class="svelte-nejbyb">maw_menu('header')</code>. It cannot be changed later,
        because renaming it would empty the nav with no error anywhere.</p> <div class="dialog-actions svelte-nejbyb"><button class="mm-btn ghost" type="button">Cancel</button> <button class="mm-btn primary" type="button">Create</button></div></div></div>`), Do = /* @__PURE__ */ O(`<div class="scrim svelte-nejbyb" role="presentation"><div class="dialog svelte-nejbyb" role="dialog" aria-modal="true" aria-label="Delete menu"><h2 class="svelte-nejbyb"> </h2> <p>Any template asking for <code class="svelte-nejbyb"> </code> falls back to the automatic page-tree
        navigation. This cannot be undone.</p> <div class="dialog-actions svelte-nejbyb"><button class="mm-btn ghost" type="button">Cancel</button> <button class="mm-btn danger" type="button">Delete</button></div></div></div>`), Mo = /* @__PURE__ */ O('<div class="app svelte-nejbyb"><header class="svelte-nejbyb"><select class="mm-input picker svelte-nejbyb"><!><!></select> <button class="mm-btn" type="button">New menu</button> <!> <span class="spacer svelte-nejbyb"></span> <!> <button class="mm-btn primary" type="button"> </button> <!> <!></header> <!> <!> <!></div> <!> <!>', 1);
function Co(e, t) {
  dn(t, !0);
  let n = Os(t, "store", 7), r = Os(t, "onClose", 3, null), s = /* @__PURE__ */ B(!1), i = /* @__PURE__ */ B(""), l = /* @__PURE__ */ B(""), a = /* @__PURE__ */ B(!1);
  const u = (b) => b.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
  async function c() {
    const b = f(i).trim();
    if (b)
      try {
        await n().createMenu(b, f(l).trim() || u(b)), k(s, !1), k(i, ""), k(l, "");
      } catch (N) {
        n().error = N.message;
      }
  }
  async function d() {
    try {
      await n().deleteMenu(n().current.id), k(a, !1);
    } catch (b) {
      n().error = b.message;
    }
  }
  function v(b) {
    (b.ctrlKey || b.metaKey) && b.key === "s" && (b.preventDefault(), n().save()), b.key === "Escape" && (k(s, !1), k(a, !1));
  }
  function _(b, N) {
    b.target === b.currentTarget && N();
  }
  var p = Mo();
  xt("keydown", Xr, v);
  var m = At(p), y = V(m), h = V(y), E = V(h);
  yr(E, 17, () => n().menus, (b) => b.id, (b, N) => {
    var Q = Fs(), ee = be(Q), ie = {};
    ne(() => {
      pe(ee, `${f(N).title ?? ""} (${f(N).id ?? ""})`), ie !== (ie = f(N).id) && (Q.value = (Q.__value = ie) ?? "");
    }), M(b, Q);
  });
  var G = w(E);
  {
    var P = (b) => {
      var N = bo();
      N.value = N.__value = "", M(b, N);
    };
    Z(G, (b) => {
      n().menus.length || b(P);
    });
  }
  var z;
  Ns(h);
  var K = w(h, 2), C = w(K, 2);
  {
    var L = (b) => {
      var N = yo(), Q = At(N), ee = w(V(Q));
      yr(ee, 20, () => [1, 2, 3, 4, 5], ua, (Ie, he) => {
        var le = Fs(), kt = be(le, !0), mn = {};
        ne(() => {
          pe(kt, he), mn !== (mn = he) && (le.value = (le.__value = mn) ?? "");
        }), M(Ie, le);
      });
      var ie;
      Ns(ee);
      var He = w(Q, 2), Je = be(He);
      ne(() => {
        ie !== (ie = n().maxDepth) && (ee.value = (ee.__value = ie) ?? "", rs(ee, ie)), pe(Je, `${n().count ?? ""} item${n().count === 1 ? "" : "s"}`);
      }), F("change", ee, (Ie) => n().setMaxDepth(Number(Ie.target.value))), M(b, N);
    };
    Z(C, (b) => {
      n().current && b(L);
    });
  }
  var W = w(C, 4);
  {
    var S = (b) => {
      var N = wo();
      M(b, N);
    };
    Z(W, (b) => {
      n().dirty && b(S);
    });
  }
  var R = w(W, 2), X = be(R, !0), I = w(R, 2);
  {
    var H = (b) => {
      var N = ko();
      F("click", N, () => k(a, !0)), M(b, N);
    };
    Z(I, (b) => {
      n().current && b(H);
    });
  }
  var $ = w(I, 2);
  {
    var te = (b) => {
      var N = Eo();
      F("click", N, function(...Q) {
        var ee;
        (ee = r()) == null || ee.apply(this, Q);
      }), M(b, N);
    };
    Z($, (b) => {
      r() && b(te);
    });
  }
  var ue = w(y, 2);
  {
    var fe = (b) => {
      var N = So(), Q = be(N, !0);
      ne(() => pe(Q, n().error)), M(b, N);
    };
    Z(ue, (b) => {
      n().error && b(fe);
    });
  }
  var g = w(ue, 2);
  {
    var T = (b) => {
      var N = xo(), Q = be(N, !0);
      ne(() => pe(Q, n().notice)), M(b, N);
    };
    Z(g, (b) => {
      n().notice && b(T);
    });
  }
  var xe = w(g, 2);
  {
    var pn = (b) => {
      var N = To();
      M(b, N);
    }, _n = (b) => {
      var N = Ao();
      M(b, N);
    }, jr = (b) => {
      var N = Ro(), Q = V(N), ee = V(Q);
      go(ee, {
        get store() {
          return n();
        }
      });
      var ie = w(Q, 2), He = V(ie);
      Wa(He, {
        get store() {
          return n();
        }
      });
      var Je = w(ie, 2), Ie = V(Je);
      ro(Ie, {
        get store() {
          return n();
        }
      }), M(b, N);
    };
    Z(xe, (b) => {
      n().loading ? b(pn) : n().current ? b(jr, -1) : b(_n, 1);
    });
  }
  var ce = w(m, 2);
  {
    var Ge = (b) => {
      var N = jo(), Q = V(N), ee = w(V(Q), 4), ie = w(ee, 4), He = w(ie, 4), Je = V(He), Ie = w(Je, 2);
      ne(
        (he, le) => {
          Wt(ie, "placeholder", he), Ie.disabled = le;
        },
        [
          () => u(f(i)) || "header",
          () => !f(i).trim()
        ]
      ), F("click", N, (he) => _(he, () => k(s, !1))), F("keydown", ee, (he) => he.key === "Enter" && c()), zt(ee, () => f(i), (he) => k(i, he)), zt(ie, () => f(l), (he) => k(l, he)), F("click", Je, () => k(s, !1)), F("click", Ie, c), M(b, N);
    };
    Z(ce, (b) => {
      f(s) && b(Ge);
    });
  }
  var wt = w(ce, 2);
  {
    var lt = (b) => {
      var N = Do(), Q = V(N), ee = V(Q), ie = be(ee), He = w(ee, 2), Je = w(V(He)), Ie = be(Je, !0), he = w(He, 2), le = V(he), kt = w(le, 2);
      ne(() => {
        pe(ie, `Delete "${n().current.title ?? ""}"?`), pe(Ie, n().current.id);
      }), F("click", N, (mn) => _(mn, () => k(a, !1))), F("click", le, () => k(a, !1)), F("click", kt, d), M(b, N);
    };
    Z(wt, (b) => {
      f(a) && b(lt);
    });
  }
  ne(() => {
    var b;
    h.disabled = !n().menus.length, z !== (z = ((b = n().current) == null ? void 0 : b.id) ?? "") && (h.value = (h.__value = z) ?? "", rs(h, z)), R.disabled = !n().current || n().saving || !n().dirty, pe(X, n().saving ? "Saving…" : "Save");
  }), F("change", h, (b) => n().open(b.target.value)), F("click", K, () => k(s, !0)), F("click", R, () => n().save()), M(e, p), vn();
}
Rr(["change", "click", "keydown"]);
var Gn, Hn, Kn, qn, zn, Yn, Xn, Wn, Zn, Jn, Qn, $n, ve, Rn, qt, cr;
class Io {
  constructor({ onState: t } = {}) {
    x(this, ve);
    x(
      this,
      Gn,
      /** @type {Array<object>} summaries from GET /menus */
      /* @__PURE__ */ B(Ue([]))
    );
    x(this, Hn, /* @__PURE__ */ B(null));
    x(this, Kn, /* @__PURE__ */ B(Ue([])));
    x(this, qn, /* @__PURE__ */ B(Ue(/* @__PURE__ */ new Set())));
    x(this, zn, /* @__PURE__ */ B(null));
    x(this, Yn, /* @__PURE__ */ B(Ue({})));
    x(this, Xn, /* @__PURE__ */ B(!0));
    x(this, Wn, /* @__PURE__ */ B(!1));
    x(this, Zn, /* @__PURE__ */ B(!1));
    x(this, Jn, /* @__PURE__ */ B(""));
    x(this, Qn, /* @__PURE__ */ B(""));
    x(this, $n, /* @__PURE__ */ B(null));
    this.onState = t || (() => {
    });
  }
  get menus() {
    return f(o(this, Gn));
  }
  set menus(t) {
    k(o(this, Gn), t, !0);
  }
  get current() {
    return f(o(this, Hn));
  }
  set current(t) {
    k(o(this, Hn), t, !0);
  }
  get items() {
    return f(o(this, Kn));
  }
  set items(t) {
    k(o(this, Kn), t, !0);
  }
  get collapsed() {
    return f(o(this, qn));
  }
  set collapsed(t) {
    k(o(this, qn), t, !0);
  }
  get selected() {
    return f(o(this, zn));
  }
  set selected(t) {
    k(o(this, zn), t, !0);
  }
  get resolved() {
    return f(o(this, Yn));
  }
  set resolved(t) {
    k(o(this, Yn), t, !0);
  }
  get loading() {
    return f(o(this, Xn));
  }
  set loading(t) {
    k(o(this, Xn), t, !0);
  }
  get saving() {
    return f(o(this, Wn));
  }
  set saving(t) {
    k(o(this, Wn), t, !0);
  }
  get dirty() {
    return f(o(this, Zn));
  }
  set dirty(t) {
    k(o(this, Zn), t, !0);
  }
  get error() {
    return f(o(this, Jn));
  }
  set error(t) {
    k(o(this, Jn), t, !0);
  }
  get notice() {
    return f(o(this, Qn));
  }
  set notice(t) {
    k(o(this, Qn), t, !0);
  }
  get baseRev() {
    return f(o(this, $n));
  }
  set baseRev(t) {
    k(o(this, $n), t, !0);
  }
  get maxDepth() {
    var t;
    return ((t = this.current) == null ? void 0 : t.max_depth) || 2;
  }
  get rows() {
    return Ze(this.items, this.collapsed);
  }
  get selectedItem() {
    return this.selected ? rr(this.items, this.selected) : null;
  }
  get count() {
    return ji(this.items);
  }
  flash(t) {
    this.notice = t, setTimeout(
      () => {
        this.notice === t && (this.notice = "");
      },
      2500
    );
  }
  async load(t = null) {
    var n, r;
    this.loading = !0, this.error = "";
    try {
      this.menus = await _t.list() || [];
      const s = t || ((n = this.current) == null ? void 0 : n.id) || ((r = this.menus[0]) == null ? void 0 : r.id) || null;
      s ? await this.open(s) : (this.current = null, this.items = []);
    } catch (s) {
      this.error = s.message;
    } finally {
      this.loading = !1, j(this, ve, Rn).call(this);
    }
  }
  async open(t) {
    this.error = "";
    try {
      const n = await _t.get(t, !0);
      this.current = n, this.items = An(n.items || []), this.baseRev = n.rev, this.selected = null, this.collapsed = /* @__PURE__ */ new Set(), j(this, ve, cr).call(this, n.resolved || []), j(this, ve, qt).call(this, !1);
    } catch (n) {
      this.error = n.message;
    }
  }
  /** Every mutation goes through here, so dirty tracking can never be forgotten. */
  mutate(t) {
    const n = t(this.items);
    n !== this.items && (this.items = n, j(this, ve, qt).call(this, !0));
  }
  select(t) {
    this.selected = t;
  }
  toggleCollapse(t) {
    const n = new Set(this.collapsed);
    n.has(t) ? n.delete(t) : n.add(t), this.collapsed = n;
  }
  /* -------------------------------------------------- item operations */
  add(t) {
    const n = An([t])[0];
    return this.mutate((r) => [...r, n]), this.selected = n.key, n;
  }
  addMany(t) {
    const n = An(t);
    return this.mutate((r) => [...r, ...n]), n;
  }
  replaceAll(t) {
    this.mutate(() => An(t)), this.selected = null;
  }
  update(t, n) {
    this.mutate((r) => {
      const s = (i) => i.map((l) => l.key === t ? { ...l, ...n } : { ...l, children: s(l.children || []) });
      return s(r);
    });
  }
  moveUp(t) {
    this.mutate((n) => Ua(n, t));
  }
  moveDown(t) {
    this.mutate((n) => Ba(n, t));
  }
  indent(t) {
    this.mutate((n) => Va(n, t, this.maxDepth));
  }
  outdent(t) {
    this.mutate((n) => Ga(n, t));
  }
  duplicate(t) {
    this.mutate((n) => Ka(n, t));
  }
  remove(t) {
    this.mutate((n) => Ha(n, t)), this.selected === t && (this.selected = null);
  }
  applyDrop(t, n) {
    this.mutate((r) => Fa(r, t, n));
  }
  /* -------------------------------------------------- persistence */
  async save() {
    if (!this.current || this.saving) return !1;
    this.saving = !0, this.error = "", j(this, ve, Rn).call(this);
    try {
      const t = await _t.update(this.current.id, { items: this.items, base_rev: this.baseRev });
      return this.current = t, this.baseRev = t.rev, j(this, ve, qt).call(this, !1), this.flash("Saved"), await this.refreshResolved(), !0;
    } catch (t) {
      return this.error = t.status === 409 ? `${t.message} Reload to see their version, or save again to overwrite it.` : t.message, t.status === 409 && (this.baseRev = null), !1;
    } finally {
      this.saving = !1, j(this, ve, Rn).call(this);
    }
  }
  async refreshResolved() {
    if (this.current)
      try {
        const t = await _t.get(this.current.id, !0);
        j(this, ve, cr).call(this, t.resolved || []);
      } catch {
      }
  }
  async createMenu(t, n) {
    const r = await _t.create({ title: t, id: n || void 0, items: [], max_depth: 2 });
    return this.menus = [...this.menus, r].sort((s, i) => s.title.localeCompare(i.title)), await this.open(r.id), r;
  }
  async deleteMenu(t) {
    await _t.remove(t), this.menus = this.menus.filter((n) => n.id !== t), this.current = null, this.items = [], j(this, ve, qt).call(this, !1), await this.load();
  }
  async setMaxDepth(t) {
    this.current && (this.current = { ...this.current, max_depth: t }, j(this, ve, qt).call(this, !0));
  }
  async seed(t) {
    if (!this.current) return;
    const { items: n } = await _t.seed(this.current.id, { include_site_menu: !0 });
    t ? this.replaceAll(n) : this.addMany(n), this.flash(t ? "Rebuilt from the page tree" : "Added from the page tree");
  }
}
Gn = new WeakMap(), Hn = new WeakMap(), Kn = new WeakMap(), qn = new WeakMap(), zn = new WeakMap(), Yn = new WeakMap(), Xn = new WeakMap(), Wn = new WeakMap(), Zn = new WeakMap(), Jn = new WeakMap(), Qn = new WeakMap(), $n = new WeakMap(), ve = new WeakSet(), /** Admin2 merges this into its own {dirty, valid, busy} and uses `dirty` for the route guard. */
Rn = function() {
  this.onState({ dirty: this.dirty, busy: this.saving, valid: !0 });
}, qt = function(t) {
  this.dirty = t, j(this, ve, Rn).call(this);
}, /** Flatten the resolved tree into {key: node} so a row can show its resolved label and broken state. */
cr = function(t, n = {}) {
  for (const r of t)
    r.key && (n[r.key] = r), j(this, ve, cr).call(this, r.children || [], n);
  return this.resolved = n, n;
};
const No = "__MAW_CSS__", Us = window.__GRAV_PAGE_TAG || "grav-maw-menus--page";
var bt, Pt;
class Po extends HTMLElement {
  constructor() {
    super(...arguments);
    x(this, bt, null);
    x(this, Pt, null);
  }
  connectedCallback() {
    if (o(this, bt)) return;
    const n = this.shadowRoot || this.attachShadow({ mode: "open" }), r = document.createElement("style");
    r.textContent = No, n.appendChild(r);
    const s = document.createElement("div");
    s.className = "mm-root", n.appendChild(s), D(this, Pt, new Io({
      onState: (i) => this.dispatchEvent(new CustomEvent("page-state", { detail: i, bubbles: !0 }))
    })), D(this, bt, ia(Co, { target: s, props: { store: o(this, Pt) } })), o(this, Pt).load();
  }
  // Admin2 can detach and re-attach the same element, so confirm it is really gone before tearing down.
  disconnectedCallback() {
    queueMicrotask(() => {
      this.isConnected || (o(this, bt) && aa(o(this, bt)), D(this, bt, null), D(this, Pt, null), this.shadowRoot && (this.shadowRoot.innerHTML = ""));
    });
  }
}
bt = new WeakMap(), Pt = new WeakMap();
customElements.get(Us) || customElements.define(Us, Po);
