var Gi = Object.defineProperty;
var Rs = (e) => {
  throw TypeError(e);
};
var Hi = (e, t, n) => t in e ? Gi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ce = (e, t, n) => Hi(e, typeof t != "symbol" ? t + "" : t, n), Lr = (e, t, n) => t.has(e) || Rs("Cannot " + n);
var o = (e, t, n) => (Lr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), k = (e, t, n) => t.has(e) ? Rs("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), A = (e, t, n, r) => (Lr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), C = (e, t, n) => (Lr(e, t, "access private method"), n);
var Rr = Array.isArray, Ki = Array.prototype.indexOf, mr = Array.prototype.includes, Mr = Array.from, Qs = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, zi = Object.getOwnPropertyDescriptors, qi = Object.prototype, Yi = Array.prototype, $s = Object.getPrototypeOf, Ms = Object.isExtensible;
const Wi = () => {
};
function Xi(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ei() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const _e = 2, an = 4, Dr = 8, ti = 1 << 24, Ye = 16, Ve = 32, ht = 64, Yr = 128, hs = 256, Xe = 512, ae = 1024, se = 2048, Ue = 4096, we = 8192, ke = 16384, vn = 32768, gr = 1 << 25, on = 65536, br = 1 << 17, Ji = 1 << 18, hn = 1 << 19, Zi = 1 << 20, st = 1 << 25, yr = 1 << 21, Zt = 1 << 22, kt = 1 << 23, Ft = Symbol("$state"), ni = Symbol("component"), Qi = Symbol("legacy props"), $i = Symbol(""), cr = Symbol("attributes"), Wr = Symbol("class"), Xr = Symbol("style"), kn = Symbol("text"), dr = Symbol("form reset"), sr = new class extends Error {
  constructor() {
    super(...arguments);
    Ce(this, "name", "StaleReactionError");
    Ce(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Xs;
const el = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Xs = globalThis.document) != null && Xs.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), tl = 1, nl = 2, ri = 4, rl = 8, sl = 16, il = 1, ll = 4, al = 8, ol = 16, ul = 1, fl = 2, le = Symbol("uninitialized"), cl = "http://www.w3.org/1999/xhtml";
function dl() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function vl() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function hl() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function si(e) {
  return e === this.v;
}
function pl(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function ii(e) {
  return !pl(e, this.v);
}
function _l() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ml(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function gl(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function bl() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function yl(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function wl() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function kl(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function El() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function xl() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Sl() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Tl() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
let Ee = null;
function un(e) {
  Ee = e;
}
function pn(e, t = !1, n) {
  Ee = {
    p: Ee,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      z
    ),
    l: null
  };
}
function _n(e) {
  var t = (
    /** @type {ComponentContext} */
    Ee
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Si(r);
  }
  return t.i = !0, Ee = t.p, ps(e);
}
function ps(e = {}) {
  return Qs(e, ni, { value: !0 }), e;
}
function li() {
  return !0;
}
let At = [];
function ai() {
  var e = At;
  At = [], Xi(e);
}
function dt(e) {
  if (At.length === 0 && !Dn) {
    var t = At;
    queueMicrotask(() => {
      t === At && ai();
    });
  }
  At.push(e);
}
function Al() {
  for (; At.length > 0; )
    ai();
}
const Cl = -7169;
function re(e, t) {
  e.f = e.f & Cl | t;
}
function _s(e) {
  (e.f & Xe) !== 0 || e.deps === null ? re(e, ae) : re(e, Ue);
}
function oi(e, t, n) {
  (e.f & se) !== 0 ? t.add(e) : (e.f & Ue) !== 0 && n.add(e), re(e, ae);
}
let Ds = !1;
function jl() {
  Ds || (Ds = !0, document.addEventListener(
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
            (t = n[dr]) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function mn(e) {
  var t = U, n = z;
  Ge(null), at(null);
  try {
    return e();
  } finally {
    Ge(t), at(n);
  }
}
function Rl(e, t, n, r = n) {
  e.addEventListener(t, () => mn(n));
  const s = (
    /** @type {any} */
    e[dr]
  );
  s ? e[dr] = () => {
    s(), r(!0);
  } : e[dr] = () => r(!0), jl();
}
function Ml(e, t, n, r) {
  const s = On;
  var i = e.filter((p) => !p.settled), l = t.map(s);
  if (n.length === 0 && i.length === 0) {
    r(l);
    return;
  }
  var a = (
    /** @type {Effect} */
    z
  ), u = Dl(), c = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((p) => p.promise)) : null;
  function d(p) {
    if ((a.f & ke) === 0) {
      u();
      try {
        r([...l, ...p]);
      } catch (m) {
        rt(m, a);
      }
      wr();
    }
  }
  var v = ui();
  if (n.length === 0) {
    c.then(() => d([])).finally(v);
    return;
  }
  function _() {
    Promise.all(n.map((p) => /* @__PURE__ */ Il(p))).then(d).catch((p) => rt(p, a)).finally(v);
  }
  c ? c.then(() => {
    u(), _(), wr();
  }) : _();
}
function Dl() {
  var e = (
    /** @type {Effect} */
    z
  ), t = U, n = Ee, r = (
    /** @type {Batch} */
    j
  );
  return function(i = !0) {
    at(e), Ge(t), un(n), i && (e.f & ke) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function wr(e = !0) {
  at(null), Ge(null), un(null), e && (j == null || j.deactivate());
}
function ui() {
  var e = (
    /** @type {Effect} */
    z
  ), t = e.b, n = (
    /** @type {Batch} */
    j
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function On(e) {
  var t = _e | se;
  return z !== null && (z.f |= hn), {
    ctx: Ee,
    deps: null,
    effects: null,
    equals: si,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      le
    ),
    wv: 0,
    parent: z,
    ac: null
  };
}
const En = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Il(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    z
  );
  r === null && _l();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = Gt(
    /** @type {V} */
    le
  ), l = !U, a = /* @__PURE__ */ new Set();
  return Zl(() => {
    var p, m;
    var u = (
      /** @type {Effect} */
      z
    ), c = ei();
    s = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (y) => {
        y !== sr && c.reject(y);
      }).finally(wr);
    } catch (y) {
      c.reject(y), wr();
    }
    var d = (
      /** @type {Batch} */
      j
    );
    if (l) {
      if ((u.f & vn) !== 0)
        var v = ui();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (m = d.async_deriveds.get(u)) == null || m.reject(En);
      else
        for (const y of a.values())
          y.reject(En);
      a.add(c), d.async_deriveds.set(u, c);
    }
    const _ = (y, h = void 0) => {
      v == null || v(), a.delete(c), h !== En && (d.activate(), h ? (i.f |= kt, fn(i, h)) : ((i.f & kt) !== 0 && (i.f ^= kt), fn(i, y)), d.deactivate());
    };
    c.promise.then(_, (y) => _(null, y || "unknown"));
  }), ws(() => {
    for (const u of a)
      u.reject(En);
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
function xe(e) {
  const t = /* @__PURE__ */ On(e);
  return Ri(t), t;
}
// @__NO_SIDE_EFFECTS__
function fi(e) {
  const t = /* @__PURE__ */ On(e);
  return t.equals = ii, t;
}
function Nl(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Te(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ms(e) {
  var t, n = z, r = e.parent;
  if (!pt && r !== null && e.v !== le && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (ke | we)) !== 0)
    return dl(), e.v;
  at(r);
  try {
    Nl(e), t = Ni(e);
  } finally {
    at(n);
  }
  return t;
}
function ci(e) {
  var t = ms(e);
  if (!e.equals(t) && (e.wv = Di(), (!(j != null && j.is_fork) || e.deps === null) && (j !== null ? (j.capture(e, t, !0), Mn == null || Mn.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    re(e, ae);
    return;
  }
  pt || (ce !== null ? (ys() || j != null && j.is_fork) && ce.set(e, t) : _s(e));
}
function Pl(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && mn(() => {
        n.ac.abort(sr), n.ac = null;
      }), n.fn !== null && (n.teardown = Wi), Fn(n, 0), xs(n));
}
function di(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && cn(t);
}
let Fr = null, qt = null, j = null, Mn = null, ce = null, Jr = null, Dn = !1, Ur = !1, In = null, vr = null;
var Is = 0;
let Ol = 1;
var $t, yt, Mt, en, tn, nn, ut, rn, je, Un, ft, ze, $e, sn, Dt, Y, Zr, Qr, xn, $r, vi, hi, Yt, Ll, Sn;
const Tr = class Tr {
  constructor() {
    k(this, Y);
    Ce(this, "id", Ol++);
    /** True as soon as `#process` was called */
    k(this, $t, !1);
    Ce(this, "linked", !0);
    /** @type {Batch | null} */
    k(this, yt, null);
    /** @type {Batch | null} */
    k(this, Mt, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Ce(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Ce(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Ce(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, en, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, tn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    k(this, nn, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    k(this, ut, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    k(this, rn, null);
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
    k(this, je, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    k(this, Un, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    k(this, ft, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    k(this, ze, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    k(this, $e, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    k(this, sn, /* @__PURE__ */ new Set());
    Ce(this, "is_fork", !1);
    k(this, Dt, !1);
    qt === null ? Fr = qt = this : (A(qt, Mt, this), A(this, yt, qt)), qt = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    o(this, $e).has(t) || o(this, $e).set(t, { d: [], m: [] }), o(this, sn).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = o(this, $e).get(t);
    if (r) {
      o(this, $e).delete(t);
      for (var s of r.d)
        re(s, se), n(s);
      for (s of r.m)
        re(s, Ue), n(s);
    }
    o(this, sn).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== le && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & kt) === 0 && (this.current.set(t, [n, r]), ce == null || ce.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    j = this;
  }
  deactivate() {
    j = null, ce = null;
  }
  flush() {
    try {
      Ur = !0, j = this, C(this, Y, xn).call(this);
    } finally {
      Is = 0, Jr = null, In = null, vr = null, Ur = !1, j = null, ce = null, it.clear();
    }
  }
  discard() {
    var t;
    for (const n of o(this, tn)) n(this);
    o(this, tn).clear();
    for (const n of this.async_deriveds.values())
      n.reject(En);
    C(this, Y, Sn).call(this), (t = o(this, rn)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    o(this, Un).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (A(this, nn, o(this, nn) + 1), t) {
      let r = o(this, ut).get(n) ?? 0;
      o(this, ut).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (A(this, nn, o(this, nn) - 1), t) {
      let r = o(this, ut).get(n) ?? 0;
      r === 1 ? o(this, ut).delete(n) : o(this, ut).set(n, r - 1);
    }
    o(this, Dt) || (A(this, Dt, !0), dt(() => {
      A(this, Dt, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      o(this, ft).add(r);
    for (const r of n)
      o(this, ze).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    o(this, en).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    o(this, tn).add(t);
  }
  settled() {
    return (o(this, rn) ?? A(this, rn, ei())).promise;
  }
  static ensure() {
    if (j === null) {
      const t = j = new Tr();
      !Ur && !Dn && dt(() => {
        o(t, $t) || t.flush();
      });
    }
    return j;
  }
  apply() {
    {
      ce = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var n;
    if (Jr = t, (n = t.b) != null && n.is_pending && (t.f & (an | Dr | ti)) !== 0 && (t.f & vn) === 0) {
      t.b.defer_effect(t);
      return;
    }
    o(this, je).push(t);
  }
};
$t = new WeakMap(), yt = new WeakMap(), Mt = new WeakMap(), en = new WeakMap(), tn = new WeakMap(), nn = new WeakMap(), ut = new WeakMap(), rn = new WeakMap(), je = new WeakMap(), Un = new WeakMap(), ft = new WeakMap(), ze = new WeakMap(), $e = new WeakMap(), sn = new WeakMap(), Dt = new WeakMap(), Y = new WeakSet(), Zr = function() {
  if (this.is_fork) return !0;
  for (const r of o(this, ut).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (o(this, $e).has(t)) {
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
Qr = function() {
  var t = [];
  for (const i of o(this, je))
    if (!((i.f & ke) !== 0 || (i.f & (se | Ue)) === 0)) {
      for (var n = i, r = !1; n.parent !== null; ) {
        n = n.parent;
        var s = n.f;
        if ((s & (ht | Ve)) !== 0) {
          if ((s & ae) === 0) {
            r = !0;
            break;
          }
          n.f ^= ae;
        }
      }
      r || t.push(n);
    }
  return A(this, je, []), t;
}, xn = function() {
  var a, u, c, d;
  A(this, $t, !0);
  for (const v of o(this, ft))
    o(this, ze).delete(v), re(v, se), this.schedule(v);
  for (const v of o(this, ze))
    re(v, Ue), this.schedule(v);
  this.apply();
  for (var t = In = [], n = [], r = vr = []; o(this, je).length > 0; ) {
    Is++ > 1e3 && (C(this, Y, Sn).call(this), Ul());
    for (const v of C(this, Y, Qr).call(this))
      try {
        C(this, Y, $r).call(this, v, t, n);
      } catch (_) {
        throw mi(v), C(this, Y, Zr).call(this) || this.discard(), _;
      }
  }
  if (j = null, r.length > 0) {
    var s = Tr.ensure();
    for (const v of r)
      s.schedule(v);
  }
  if (In = null, vr = null, C(this, Y, Zr).call(this)) {
    C(this, Y, Yt).call(this, n), C(this, Y, Yt).call(this, t);
    for (const [v, _] of o(this, $e))
      _i(v, _);
    r.length > 0 && /** @type {unknown} */
    C(a = j, Y, xn).call(a);
    return;
  }
  const i = C(this, Y, vi).call(this);
  if (i) {
    C(this, Y, Yt).call(this, n), C(this, Y, Yt).call(this, t), C(u = i, Y, hi).call(u, this);
    return;
  }
  o(this, ft).clear(), o(this, ze).clear();
  for (const v of o(this, en)) v(this);
  o(this, en).clear(), Mn = this, Ns(n), Ns(t), Mn = null, (c = o(this, rn)) == null || c.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    j
  );
  if (o(this, nn) === 0 && (o(this, je).length === 0 || l !== null) && C(this, Y, Sn).call(this), o(this, je).length > 0)
    if (l !== null) {
      for (const v of o(this, je))
        o(l, je).push(v);
      A(this, je, []);
    } else
      l = this;
  l !== null && (it.clear(), C(d = l, Y, xn).call(d));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
$r = function(t, n, r) {
  t.f ^= ae;
  for (var s = t.first; s !== null; ) {
    var i = s.f, l = (i & (Ve | ht)) !== 0, a = l && (i & ae) !== 0, u = a || (i & we) !== 0 || o(this, $e).has(s);
    if (!u && s.fn !== null) {
      l ? s.f ^= ae : (i & an) !== 0 ? n.push(s) : lr(s) && ((i & Ye) !== 0 && o(this, ze).add(s), cn(s));
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
}, vi = function() {
  for (var t = o(this, yt); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = o(t, yt);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
hi = function(t) {
  var r;
  for (const [s, i] of t.current)
    !this.previous.has(s) && t.previous.has(s) && this.previous.set(s, t.previous.get(s)), this.current.set(s, i);
  for (const [s, i] of t.async_deriveds) {
    const l = this.async_deriveds.get(s);
    l && i.promise.then(l.resolve).catch(l.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(o(t, ft), o(t, ze));
  const n = (s) => {
    var i = s.reactions;
    if (i !== null && !((s.f & _e) !== 0 && (s.f & (se | Ue)) === 0))
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
          l & (Zt | Ye) && !this.async_deriveds.has(a) && (o(this, ze).delete(a), re(a, se), this.schedule(a));
        }
      }
  };
  for (const s of this.current.keys())
    n(s);
  this.oncommit(() => t.discard()), C(r = t, Y, Sn).call(r), j = this, C(this, Y, xn).call(this);
}, /**
 * @param {Effect[]} effects
 */
Yt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    oi(t[n], o(this, ft), o(this, ze));
}, Ll = function() {
  var v, _;
  for (let p = Fr; p !== null; p = o(p, Mt)) {
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
    if (!(!o(p, $t) || s.length === 0)) {
      var i = s.filter((m) => !this.current.has(m));
      if (i.length === 0)
        t && p.discard();
      else if (n.length > 0) {
        if (t)
          for (const m of o(this, sn))
            p.unskip_effect(m, (y) => {
              var h;
              (y.f & (Ye | Zt)) !== 0 ? p.schedule(y) : C(h = p, Y, Yt).call(h, [y]);
            });
        p.activate();
        var l = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
        for (var u of n)
          pi(u, i, l, a);
        a = /* @__PURE__ */ new Map();
        var c = [...p.current].filter(([m, y]) => {
          const h = this.current.get(m);
          return h ? h[0] !== y[0] || h[1] !== y[1] : !0;
        }).map(([m]) => m);
        if (c.length > 0)
          for (const m of o(this, Un))
            (m.f & (ke | we | br)) === 0 && gs(m, c, a) && ((m.f & (Zt | Ye)) !== 0 ? (re(m, se), p.schedule(m)) : o(p, ft).add(m));
        if (o(p, je).length > 0 && !o(p, Dt)) {
          p.apply();
          for (var d of C(v = p, Y, Qr).call(v))
            C(_ = p, Y, $r).call(_, d, [], []);
        }
        p.deactivate();
      }
    }
  }
}, Sn = function() {
  if (this.linked) {
    var t = o(this, yt), n = o(this, Mt);
    t === null ? Fr = n : A(t, Mt, n), n === null ? qt = t : A(n, yt, t), this.linked = !1;
  }
};
let Vt = Tr;
function Fl(e) {
  var t = Dn;
  Dn = !0;
  try {
    for (var n; ; ) {
      if (Al(), j === null)
        return (
          /** @type {T} */
          n
        );
      j.flush();
    }
  } finally {
    Dn = t;
  }
}
function Ul() {
  try {
    wl();
  } catch (e) {
    rt(e, Jr);
  }
}
let Ke = null;
function Ns(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (ke | we)) === 0 && lr(r) && (Ke = /* @__PURE__ */ new Set(), cn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ai(r), (Ke == null ? void 0 : Ke.size) > 0)) {
        it.clear();
        for (const s of Ke) {
          if ((s.f & (ke | we)) !== 0) continue;
          const i = [s];
          let l = s.parent;
          for (; l !== null; )
            Ke.has(l) && (Ke.delete(l), i.push(l)), l = l.parent;
          for (let a = i.length - 1; a >= 0; a--) {
            const u = i[a];
            (u.f & (ke | we)) === 0 && cn(u);
          }
        }
        Ke.clear();
      }
    }
    Ke = null;
  }
}
function pi(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & _e) !== 0 ? pi(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (Zt | Ye)) !== 0 && (i & se) === 0 && gs(s, t, r) && (re(s, se), bs(
        /** @type {Effect} */
        s
      ));
    }
}
function gs(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (mr.call(t, s))
        return !0;
      if ((s.f & _e) !== 0 && gs(
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
function bs(e) {
  j.schedule(e);
}
function _i(e, t) {
  if (!((e.f & Ve) !== 0 && (e.f & ae) !== 0)) {
    (e.f & se) !== 0 ? t.d.push(e) : (e.f & Ue) !== 0 && t.m.push(e), re(e, ae);
    for (var n = e.first; n !== null; )
      _i(n, t), n = n.next;
  }
}
function mi(e) {
  re(e, ae);
  for (var t = e.first; t !== null; )
    mi(t), t = t.next;
}
let kr = /* @__PURE__ */ new Set();
const it = /* @__PURE__ */ new Map();
let gi = !1;
function Gt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: si,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
  const n = Gt(e);
  return Ri(n), n;
}
// @__NO_SIDE_EFFECTS__
function Bl(e, t = !1, n = !0) {
  const r = Gt(e);
  return t || (r.equals = ii), r;
}
function E(e, t, n = !1) {
  U !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!We || (U.f & br) !== 0) && li() && (U.f & (_e | Ye | Zt | br)) !== 0 && (lt === null || !lt.has(e)) && Sl();
  let r = n ? Be(t) : t;
  return fn(e, r, vr);
}
var St = null, es = 0;
function fn(e, t, n = null) {
  if (!e.equals(t)) {
    pt ? it.set(e, t) : it.has(e) || it.set(e, e.v);
    var r = Vt.ensure();
    if (r.capture(e, t), (e.f & _e) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & se) !== 0 && ms(s), ce === null && _s(s);
    }
    e.wv = Di(), St = null, es = 0, bi(e, se, n), St = null, z !== null && (z.f & ae) !== 0 && (z.f & (Ve | ht)) === 0 && (Pe === null ? ea([e]) : Pe.push(e)), !r.is_fork && kr.size > 0 && !gi && Vl();
  }
  return t;
}
function Vl() {
  gi = !1;
  for (const e of kr) {
    (e.f & ae) !== 0 && re(e, Ue);
    let t;
    try {
      t = lr(e);
    } catch {
      t = !0;
    }
    t && cn(e);
  }
  kr.clear();
}
function Nn(e) {
  E(e, e.v + 1);
}
function bi(e, t, n) {
  var r = e.reactions;
  if (r !== null) {
    var s = r.length;
    if (es += s, es > 1e5 && St === null && (St = /* @__PURE__ */ new Set()), St !== null) {
      if (St.has(e)) return;
      St.add(e);
    }
    for (var i = 0; i < s; i++) {
      var l = r[i], a = l.f, u = (a & se) === 0;
      if (u && re(l, t), (a & br) !== 0)
        kr.add(
          /** @type {Effect} */
          l
        );
      else if ((a & _e) !== 0) {
        var c = (
          /** @type {Derived} */
          l
        );
        ce == null || ce.delete(c), bi(c, Ue, n);
      } else if (u) {
        var d = (
          /** @type {Effect} */
          l
        );
        (a & Ye) !== 0 && Ke !== null && Ke.add(d), n !== null ? n.push(d) : bs(d);
      }
    }
  }
}
function Be(e) {
  if (typeof e != "object" || e === null || Ft in e || ni in e)
    return e;
  const t = $s(e);
  if (t !== qi && t !== Yi)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Rr(e), s = /* @__PURE__ */ B(0), i = Bt, l = (a) => {
    if (Bt === i)
      return a();
    var u = U, c = Bt;
    Ge(null), Ls(i);
    var d = a();
    return Ge(u), Ls(c), d;
  };
  return r && n.set("length", /* @__PURE__ */ B(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && El();
        var d = n.get(u);
        return d === void 0 ? l(() => {
          var v = /* @__PURE__ */ B(c.value);
          return n.set(u, v), v;
        }) : E(d, c.value, !0), !0;
      },
      deleteProperty(a, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in a) {
            const d = l(() => /* @__PURE__ */ B(le));
            n.set(u, d), Nn(s);
          }
        } else
          E(c, le), Nn(s);
        return !0;
      },
      get(a, u, c) {
        var p;
        if (u === Ft)
          return e;
        var d = n.get(u), v = u in a;
        if (d === void 0 && (!v || (p = Jt(a, u)) != null && p.writable) && (d = l(() => {
          var m = Be(v ? a[u] : le), y = /* @__PURE__ */ B(m);
          return y;
        }), n.set(u, d)), d !== void 0) {
          var _ = f(d);
          return _ === le ? void 0 : _;
        }
        return Reflect.get(a, u, c);
      },
      getOwnPropertyDescriptor(a, u) {
        var _;
        (_ = this.has) == null || _.call(this, a, u);
        var c = Reflect.getOwnPropertyDescriptor(a, u), d = n.get(u);
        if (d !== void 0) {
          var v = f(d);
          if (v === le)
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
        if (u === Ft)
          return !0;
        var c = n.get(u), d = c !== void 0 && c.v !== le || Reflect.has(a, u);
        if (c !== void 0 || z !== null && (!d || (_ = Jt(a, u)) != null && _.writable)) {
          c === void 0 && (c = l(() => {
            var p = d ? Be(a[u]) : le, m = /* @__PURE__ */ B(p);
            return m;
          }), n.set(u, c));
          var v = f(c);
          if (v === le)
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
            m !== void 0 ? E(m, le) : p in a && (m = l(() => /* @__PURE__ */ B(le)), n.set(p + "", m));
          }
        if (v === void 0)
          (!_ || (P = Jt(a, u)) != null && P.writable) && (v = l(() => /* @__PURE__ */ B(void 0)), E(v, Be(c)), n.set(u, v));
        else {
          _ = v.v !== le;
          var y = l(() => Be(c));
          E(v, y);
        }
        var h = Reflect.getOwnPropertyDescriptor(a, u);
        if (h != null && h.set && h.set.call(d, c), !_) {
          if (r && typeof u == "string") {
            var x = (
              /** @type {Source<number>} */
              n.get("length")
            ), G = Number(u);
            Number.isInteger(G) && G >= x.v && E(x, G + 1);
          }
          Nn(s);
        }
        return !0;
      },
      ownKeys(a) {
        f(s);
        var u = Reflect.ownKeys(a).filter((v) => {
          var _ = n.get(v);
          return _ === void 0 || _.v !== le;
        });
        for (var [c, d] of n)
          d.v !== le && !(c in a) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        xl();
      }
    }
  );
}
function Ps(e) {
  try {
    if (e !== null && typeof e == "object" && Ft in e)
      return e[Ft];
  } catch {
  }
  return e;
}
function yi(e, t) {
  return Object.is(Ps(e), Ps(t));
}
var ts, wi, ki, Ei;
function Gl() {
  if (ts === void 0) {
    ts = window, wi = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    ki = Jt(t, "firstChild").get, Ei = Jt(t, "nextSibling").get, Ms(e) && (e[Wr] = void 0, e[cr] = null, e[Xr] = void 0, e.__e = void 0), Ms(n) && (n[kn] = void 0);
  }
}
function vt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Ln(e) {
  return (
    /** @type {TemplateNode | null} */
    ki.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function ir(e) {
  return (
    /** @type {TemplateNode | null} */
    Ei.call(e)
  );
}
function V(e, t) {
  return /* @__PURE__ */ Ln(e);
}
function Ct(e, t = !1) {
  {
    var n = /* @__PURE__ */ Ln(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ir(n) : n;
  }
}
function ye(e, t = !1) {
  return /* @__PURE__ */ Ln(e);
}
function w(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ ir(r);
  return r;
}
function Hl(e) {
  e.textContent = "";
}
function xi() {
  return !1;
}
function Kl(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function zl(e) {
  var t = z;
  if (t === null)
    return U.f |= kt, e;
  if ((t.f & vn) === 0 && (t.f & an) === 0)
    throw e;
  rt(e, t);
}
function rt(e, t) {
  if (!(t !== null && (t.f & ke) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & Yr) !== 0 && (t.f & (ke | gr)) === 0) {
        if ((t.f & vn) === 0)
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
function ql(e) {
  z === null && (U === null && yl(), bl()), pt && gl();
}
function Yl(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _t(e, t) {
  var n = z;
  n !== null && (n.f & we) !== 0 && (e |= we);
  var r = {
    ctx: Ee,
    deps: null,
    nodes: null,
    f: e | se | Xe,
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
  j == null || j.register_created_effect(r);
  var s = r;
  if ((e & an) !== 0)
    In !== null ? In.push(r) : Vt.ensure().schedule(r);
  else if (t !== null) {
    try {
      cn(r);
    } catch (l) {
      throw Te(r), l;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & hn) === 0 && (s = s.first, (e & Ye) !== 0 && (e & on) !== 0 && s !== null && (s.f |= on));
  }
  if (s !== null && (s.parent = n, n !== null && Yl(s, n), U !== null && (U.f & _e) !== 0 && (e & ht) === 0)) {
    var i = (
      /** @type {Derived} */
      U
    );
    (i.effects ?? (i.effects = [])).push(s);
  }
  return r;
}
function ys() {
  return U !== null && !We;
}
function ws(e) {
  const t = _t(Dr, null);
  return re(t, ae), t.teardown = e, t;
}
function Wl(e) {
  ql();
  var t = (
    /** @type {Effect} */
    z.f
  ), n = !U && (t & Ve) !== 0 && Ee !== null && !Ee.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      Ee
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return Si(e);
}
function Si(e) {
  return _t(an | Zi, e);
}
function Xl(e) {
  Vt.ensure();
  const t = _t(ht | hn, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Ut(t, () => {
      Te(t), r(void 0);
    }) : (Te(t), r(void 0));
  });
}
function Jl(e) {
  return _t(an, e);
}
function Zl(e) {
  return _t(Zt | hn, e);
}
function ks(e, t = 0) {
  return _t(Dr | t, e);
}
function ne(e, t = [], n = [], r = []) {
  Ml(r, t, n, (s) => {
    _t(Dr, () => {
      e(...s.map(f));
    });
  });
}
function Es(e, t = 0) {
  var n = _t(Ye | t, e);
  return n;
}
function Fe(e) {
  return _t(Ve | hn, e);
}
function Ti(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = pt, r = U;
    Os(!0), Ge(null);
    try {
      t.call(null);
    } catch (s) {
      rt(s, e.parent);
    } finally {
      Os(n), Ge(r);
    }
  }
}
function xs(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && mn(() => {
      s.abort(sr);
    });
    var r = n.next;
    (n.f & ht) !== 0 ? n.parent = null : Te(n, t), n = r;
  }
}
function Ql(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ve) === 0 && Te(t), t = n;
  }
}
function Te(e, t = !0) {
  var n = !1;
  (t || (e.f & Ji) !== 0) && e.nodes !== null && e.nodes.end !== null && ($l(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= gr, xs(e, t && !n), Fn(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  Ti(e), e.f ^= gr, e.f |= ke;
  var s = e.parent;
  s !== null && s.first !== null && Ai(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function $l(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ ir(e);
    e.remove(), e = n;
  }
}
function Ai(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ut(e, t, n = !0) {
  var r = [];
  e.f |= hs, Ci(e, r, !0);
  var s = () => {
    n && Te(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var l = () => --i || s();
    for (var a of r)
      a.out(l);
  } else
    s();
}
function Ci(e, t, n) {
  if ((e.f & we) === 0) {
    e.f ^= we;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var s = e.first; s !== null; ) {
      var i = s.next;
      if ((s.f & ht) === 0) {
        var l = (s.f & on) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Ve) !== 0 && (e.f & Ye) !== 0;
        Ci(s, t, l ? n : !1);
      }
      s = i;
    }
  }
}
function Er(e) {
  e.f &= ~hs, ji(e, !0);
}
function ji(e, t) {
  if ((e.f & hs) === 0 && (e.f & we) !== 0) {
    e.f ^= we, (e.f & ae) === 0 && (re(e, se), Vt.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & on) !== 0 || (n.f & Ve) !== 0;
      ji(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || t) && l.in();
  }
}
function Ss(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ ir(n);
      t.append(n), n = s;
    }
}
let hr = !1, pt = !1;
function Os(e) {
  pt = e;
}
let U = null, We = !1;
function Ge(e) {
  U = e;
}
let z = null;
function at(e) {
  z = e;
}
let lt = null;
function Ri(e) {
  U !== null && ((U.f & yr) !== 0 || (U.f & _e) !== 0) && (lt ?? (lt = /* @__PURE__ */ new Set())).add(e);
}
let Se = null, Ie = 0, Pe = null;
function ea(e) {
  Pe = e;
}
let Mi = 1, jt = 0, Bt = jt;
function Ls(e) {
  Bt = e;
}
function Di() {
  return ++Mi;
}
function lr(e) {
  var t = e.f;
  if ((t & se) !== 0)
    return !0;
  if ((t & Ue) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (lr(
        /** @type {Derived} */
        i
      ) && ci(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & Xe) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    ce === null && re(e, ae);
  }
  return !1;
}
function Ii(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(lt !== null && lt.has(e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & _e) !== 0 ? Ii(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? re(i, se) : (i.f & ae) !== 0 && re(i, Ue), bs(
        /** @type {Effect} */
        i
      ));
    }
}
function Ni(e) {
  var t = Se, n = Ie, r = Pe, s = U, i = lt, l = Ee, a = We, u = Bt, c = e.f;
  Se = /** @type {null | Value[]} */
  null, Ie = 0, Pe = null, U = (c & (Ve | ht)) === 0 ? e : null, lt = null, un(e.ctx), We = !1, Bt = ++jt, e.ac !== null && (mn(() => {
    e.ac.abort(sr);
  }), e.ac = null);
  try {
    e.f |= yr;
    var d = (
      /** @type {Function} */
      e.fn
    ), v = d();
    e.f |= vn;
    var _ = Fs(e);
    if (li() && Pe !== null && !We && _ !== null && (e.f & (_e | Ue | se)) === 0)
      for (var p = 0; p < /** @type {Source[]} */
      Pe.length; p++)
        Ii(
          Pe[p],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (jt++, s.deps !== null)
        for (let m = 0; m < n; m += 1)
          s.deps[m].rv = jt;
      if (t !== null)
        for (const m of t)
          m.rv = jt;
      Pe !== null && (r === null ? r = Pe : r.push(.../** @type {Source[]} */
      Pe));
    }
    return (e.f & kt) !== 0 && (e.f ^= kt), v;
  } catch (m) {
    return Fs(e), zl(m);
  } finally {
    e.f ^= yr, Se = t, Ie = n, Pe = r, U = s, lt = i, un(l), We = a, Bt = u;
  }
}
function Fs(e) {
  var s;
  var t = e.deps, n = j == null ? void 0 : j.is_fork;
  if (Se !== null) {
    var r;
    if (n || Fn(e, Ie), t !== null && Ie > 0)
      for (t.length = Ie + Se.length, r = 0; r < Se.length; r++)
        t[Ie + r] = Se[r];
    else
      e.deps = t = Se;
    if (ys() && (e.f & Xe) !== 0)
      for (r = Ie; r < t.length; r++)
        ((s = t[r]).reactions ?? (s.reactions = [])).push(e);
  } else !n && t !== null && Ie < t.length && (Fn(e, Ie), t.length = Ie);
  return t;
}
function ta(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Ki.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & _e) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Se === null || !mr.call(Se, t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & Xe) !== 0 && (i.f ^= Xe), i.v !== le && _s(i), i.ac !== null && mn(() => {
      i.ac.abort(sr), i.ac = null, re(i, se);
    }), Pl(i), Fn(i, 0);
  }
}
function Fn(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      ta(e, n[r]);
}
function cn(e) {
  var t = e.f;
  if ((t & ke) === 0) {
    re(e, ae);
    var n = z, r = hr;
    z = e, hr = (t & (Ve | ht)) === 0;
    try {
      (t & (Ye | ti)) !== 0 ? Ql(e) : xs(e), Ti(e);
      var s = Ni(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = Mi;
      var i;
    } finally {
      hr = r, z = n;
    }
  }
}
async function na() {
  await Promise.resolve(), Fl();
}
function f(e) {
  var t = e.f, n = (t & _e) !== 0;
  if (U !== null && !We) {
    var r = z !== null && (z.f & ke) !== 0;
    if (!r && (lt === null || !lt.has(e))) {
      var s = U.deps;
      if ((U.f & yr) !== 0)
        e.rv < jt && (e.rv = jt, Se === null && s !== null && s[Ie] === e ? Ie++ : Se === null ? Se = [e] : Se.push(e));
      else {
        U.deps ?? (U.deps = []), mr.call(U.deps, e) || U.deps.push(e);
        var i = e.reactions;
        i === null ? e.reactions = [U] : mr.call(i, U) || i.push(U);
      }
    }
  }
  if (pt && it.has(e))
    return it.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (pt) {
      var a = l.v;
      return ((l.f & ae) === 0 && l.reactions !== null || Oi(l)) && (a = ms(l)), it.set(l, a), a;
    }
    var u = (l.f & Xe) === 0 && !We && U !== null && (hr || (U.f & Xe) !== 0), c = (l.f & vn) === 0;
    lr(l) && (u && (l.f |= Xe), ci(l)), u && !c && (di(l), Pi(l));
  }
  if (ce != null && ce.has(e))
    return ce.get(e);
  if ((e.f & kt) !== 0)
    throw e.v;
  return e.v;
}
function Pi(e) {
  if (e.f |= Xe, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & _e) !== 0 && (t.f & Xe) === 0 && (di(
        /** @type {Derived} */
        t
      ), Pi(
        /** @type {Derived} */
        t
      ));
}
function Oi(e) {
  if (e.v === le) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (it.has(t) || (t.f & _e) !== 0 && Oi(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Ir(e) {
  var t = We;
  try {
    return We = !0, e();
  } finally {
    We = t;
  }
}
const ra = ["touchstart", "touchmove"];
function sa(e) {
  return ra.includes(e);
}
const Rt = Symbol("events"), Li = /* @__PURE__ */ new Set(), ns = /* @__PURE__ */ new Set();
function ia(e, t, n, r = {}) {
  function s(i) {
    if (r.capture || rs.call(t, i), !i.cancelBubble)
      return mn(() => n == null ? void 0 : n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (s.__removed = !1, dt(() => {
    s.__removed || t.addEventListener(e, s, r);
  })) : t.addEventListener(e, s, r), s;
}
function Tt(e, t, n, r, s) {
  var i = { capture: r, passive: s }, l = ia(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && ws(() => {
    l.__removed = !0, t.removeEventListener(e, l, i);
  });
}
function F(e, t, n) {
  (t[Rt] ?? (t[Rt] = {}))[e] = n;
}
function Nr(e) {
  for (var t = 0; t < e.length; t++)
    Li.add(e[t]);
  for (var n of ns)
    n(e);
}
let Br = null, Vr = !1;
function rs(e) {
  var y, h;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = ((y = e.composedPath) == null ? void 0 : y.call(e)) || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Br = e, Vr || (Vr = !0, setTimeout(() => {
    Vr = !1, Br = null;
  }));
  var l = 0, a = Br === e && e[Rt];
  if (a) {
    var u = s.indexOf(a);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Rt] = t;
      return;
    }
    var c = s.indexOf(t);
    if (c === -1)
      return;
    u <= c && (l = u);
  }
  if (i = /** @type {Element} */
  s[l] || e.target, i !== t) {
    Qs(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var d = U, v = z;
    Ge(null), at(null);
    try {
      for (var _, p = []; i !== null && i !== t; ) {
        try {
          var m = (h = i[Rt]) == null ? void 0 : h[r];
          m != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && m.call(i, e);
        } catch (x) {
          _ ? p.push(x) : _ = x;
        }
        if (e.cancelBubble) break;
        l++, i = l < s.length ? (
          /** @type {Element} */
          s[l]
        ) : null;
      }
      if (_) {
        for (let x of p)
          queueMicrotask(() => {
            throw x;
          });
        throw _;
      }
    } finally {
      e[Rt] = t, delete e.currentTarget, Ge(d), at(v);
    }
  }
}
var Js;
const Gr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Js = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Js.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function la(e) {
  return (
    /** @type {string} */
    (Gr == null ? void 0 : Gr.createHTML(e)) ?? e
  );
}
function aa(e) {
  var t = Kl("template");
  return t.innerHTML = la(e.replaceAll("<!>", "<!---->")), t.content;
}
function xr(e, t) {
  var n = (
    /** @type {Effect} */
    z
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function O(e, t) {
  var n = (t & ul) !== 0, r = (t & fl) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    s === void 0 && (s = aa(i ? e : "<!>" + e), n || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ Ln(s)));
    var l = (
      /** @type {TemplateNode} */
      r || wi ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (n) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ln(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      xr(a, u);
    } else
      xr(l, l);
    return l;
  };
}
function Us(e = "") {
  {
    var t = vt(e + "");
    return xr(t, t), t;
  }
}
function oa() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = vt();
  return e.append(t, n), xr(t, n), e;
}
function M(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ua(e) {
  let t = 0, n = Gt(0), r;
  return () => {
    ys() && (f(n), ks(() => (t === 0 && (r = Ir(() => e(() => Nn(n)))), t += 1, () => {
      dt(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Nn(n));
      });
    })));
  };
}
var fa = on | hn;
function ca(e, t, n, r) {
  new da(e, t, n, r);
}
var Oe, vs, Le, It, ge, Re, be, Me, et, Nt, wt, ln, Bn, Vn, ct, Ar, Z, va, ha, ss, pa, is, Tn, pr, ls, as;
class da {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, s) {
    k(this, Z);
    /** @type {Boundary | null} */
    Ce(this, "parent");
    Ce(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Ce(this, "transform_error");
    /** @type {TemplateNode} */
    k(this, Oe);
    /** @type {TemplateNode | null} */
    k(this, vs, null);
    /** @type {BoundaryProps} */
    k(this, Le);
    /** @type {((anchor: Node) => void)} */
    k(this, It);
    /** @type {Effect} */
    k(this, ge);
    /** @type {Effect | null} */
    k(this, Re, null);
    /** @type {Effect | null} */
    k(this, be, null);
    /** @type {Effect | null} */
    k(this, Me, null);
    /** @type {DocumentFragment | null} */
    k(this, et, null);
    k(this, Nt, 0);
    k(this, wt, 0);
    k(this, ln, !1);
    /** @type {Set<Effect>} */
    k(this, Bn, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    k(this, Vn, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    k(this, ct, null);
    k(this, Ar, ua(() => (A(this, ct, Gt(o(this, Nt))), () => {
      A(this, ct, null);
    })));
    var i;
    A(this, Oe, t), A(this, Le, n), A(this, It, (l) => {
      var a = (
        /** @type {Effect} */
        z
      );
      a.b = this, a.f |= Yr, r(l);
    }), this.parent = /** @type {Effect} */
    z.b, this.transform_error = s ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((l) => l), A(this, ge, Es(() => {
      C(this, Z, is).call(this);
    }, fa));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    oi(t, o(this, Bn), o(this, Vn));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!o(this, Le).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    C(this, Z, ls).call(this, t, n), A(this, Nt, o(this, Nt) + t), !(!o(this, ct) || o(this, ln)) && (A(this, ln, !0), dt(() => {
      A(this, ln, !1), o(this, ct) && fn(o(this, ct), o(this, Nt));
    }));
  }
  get_effect_pending() {
    return o(this, Ar).call(this), f(
      /** @type {Source<number>} */
      o(this, ct)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!o(this, Le).onerror && !o(this, Le).failed)
      throw t;
    j != null && j.is_fork ? (o(this, Re) && j.skip_effect(o(this, Re)), o(this, be) && j.skip_effect(o(this, be)), o(this, Me) && j.skip_effect(o(this, Me)), j.oncommit(() => {
      C(this, Z, as).call(this, t);
    })) : C(this, Z, as).call(this, t);
  }
}
Oe = new WeakMap(), vs = new WeakMap(), Le = new WeakMap(), It = new WeakMap(), ge = new WeakMap(), Re = new WeakMap(), be = new WeakMap(), Me = new WeakMap(), et = new WeakMap(), Nt = new WeakMap(), wt = new WeakMap(), ln = new WeakMap(), Bn = new WeakMap(), Vn = new WeakMap(), ct = new WeakMap(), Ar = new WeakMap(), Z = new WeakSet(), va = function() {
  try {
    A(this, Re, Fe(() => o(this, It).call(this, o(this, Oe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
ha = function(t) {
  const n = o(this, Le).failed, { reset: r, invoke_onerror: s } = C(this, Z, ss).call(this, t);
  dt(s), n && A(this, Me, Fe(() => {
    n(
      o(this, Oe),
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
ss = function(t) {
  var n = !1, r = !1;
  const s = () => {
    if (n) {
      hl();
      return;
    }
    n = !0, r && Tl(), o(this, Me) !== null && Ut(o(this, Me), () => {
      A(this, Me, null);
    }), C(this, Z, pr).call(this, () => {
      C(this, Z, is).call(this);
    });
  };
  return { reset: s, invoke_onerror: () => {
    var l, a;
    try {
      r = !0, (a = (l = o(this, Le)).onerror) == null || a.call(l, t, s), r = !1;
    } catch (u) {
      rt(u, o(this, ge) && o(this, ge).parent);
    }
  } };
}, pa = function() {
  const t = o(this, Le).pending;
  t && (this.is_pending = !0, A(this, be, Fe(() => t(o(this, Oe)))), dt(() => {
    var n = A(this, et, document.createDocumentFragment()), r = vt(), s = !1;
    if (n.append(r), A(this, Re, C(this, Z, pr).call(this, () => {
      try {
        return Fe(() => o(this, It).call(this, r));
      } catch (i) {
        try {
          this.error(i), s = !0;
        } catch (l) {
          rt(l, o(this, ge).parent);
        }
        return null;
      }
    })), o(this, Re) === null) {
      A(this, et, null), s && C(this, Z, Tn).call(
        this,
        /** @type {Batch} */
        j
      );
      return;
    }
    o(this, wt) === 0 && (o(this, Oe).before(n), A(this, et, null), Ut(
      /** @type {Effect} */
      o(this, be),
      () => {
        A(this, be, null);
      }
    ), C(this, Z, Tn).call(
      this,
      /** @type {Batch} */
      j
    ));
  }));
}, is = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), A(this, wt, 0), A(this, Nt, 0), A(this, Re, Fe(() => {
      o(this, It).call(this, o(this, Oe));
    })), o(this, wt) > 0) {
      var t = A(this, et, document.createDocumentFragment());
      Ss(o(this, Re), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        o(this, Le).pending
      );
      A(this, be, Fe(() => n(o(this, Oe))));
    } else
      C(this, Z, Tn).call(
        this,
        /** @type {Batch} */
        j
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
Tn = function(t) {
  this.is_pending = !1, t.transfer_effects(o(this, Bn), o(this, Vn));
}, /**
 * @template T
 * @param {() => T} fn
 */
pr = function(t) {
  var n = z, r = U, s = Ee;
  at(o(this, ge)), Ge(o(this, ge)), un(o(this, ge).ctx);
  try {
    return Vt.ensure(), t();
  } finally {
    at(n), Ge(r), un(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
ls = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && C(r = this.parent, Z, ls).call(r, t, n);
    return;
  }
  A(this, wt, o(this, wt) + t), o(this, wt) === 0 && (C(this, Z, Tn).call(this, n), o(this, be) && Ut(o(this, be), () => {
    A(this, be, null);
  }), o(this, et) && (o(this, Oe).before(o(this, et)), A(this, et, null)));
}, /**
 * @param {unknown} error
 */
as = function(t) {
  o(this, Re) && (Te(o(this, Re)), A(this, Re, null)), o(this, be) && (Te(o(this, be)), A(this, be, null)), o(this, Me) && (Te(o(this, Me)), A(this, Me, null));
  let n = o(this, Le).failed;
  const r = (s) => {
    const { reset: i, invoke_onerror: l } = C(this, Z, ss).call(this, s);
    l(), n && A(this, Me, C(this, Z, pr).call(this, () => {
      try {
        return Fe(() => {
          var a = (
            /** @type {Effect} */
            z
          );
          a.b = this, a.f |= Yr, n(
            o(this, Oe),
            () => s,
            () => i
          );
        });
      } catch (a) {
        return rt(
          a,
          /** @type {Effect} */
          o(this, ge).parent
        ), null;
      }
    }));
  };
  dt(() => {
    var s;
    try {
      s = this.transform_error(t);
    } catch (i) {
      rt(i, o(this, ge) && o(this, ge).parent);
      return;
    }
    s !== null && typeof s == "object" && typeof /** @type {any} */
    s.then == "function" ? s.then(
      r,
      /** @param {unknown} e */
      (i) => rt(i, o(this, ge) && o(this, ge).parent)
    ) : r(s);
  });
};
function pe(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[kn] ?? (e[kn] = e.nodeValue)) && (e[kn] = n, e.nodeValue = `${n}`);
}
function _a(e, t) {
  return ma(e, t);
}
const ur = /* @__PURE__ */ new Map();
function ma(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: l = !0, transformError: a }) {
  Gl();
  var u = void 0, c = Xl(() => {
    var d = n ?? t.appendChild(vt());
    ca(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (p) => {
        pn({});
        var m = (
          /** @type {ComponentContext} */
          Ee
        );
        i && (m.c = i), s && (r.$$events = s), u = e(p, r) || ps(), _n();
      },
      a
    );
    var v = /* @__PURE__ */ new Set(), _ = (p) => {
      for (var m = 0; m < p.length; m++) {
        var y = p[m];
        if (!v.has(y)) {
          v.add(y);
          var h = sa(y);
          for (const P of [t, document]) {
            var x = ur.get(P);
            x === void 0 && (x = /* @__PURE__ */ new Map(), ur.set(P, x));
            var G = x.get(y);
            G === void 0 ? (P.addEventListener(y, rs, { passive: h }), x.set(y, 1)) : x.set(y, G + 1);
          }
        }
      }
    };
    return _(Mr(Li)), ns.add(_), () => {
      var h;
      for (var p of v)
        for (const x of [t, document]) {
          var m = (
            /** @type {Map<string, number>} */
            ur.get(x)
          ), y = (
            /** @type {number} */
            m.get(p)
          );
          --y == 0 ? (x.removeEventListener(p, rs), m.delete(p), m.size === 0 && ur.delete(x)) : m.set(p, y);
        }
      ns.delete(_), d !== n && ((h = d.parentNode) == null || h.removeChild(d));
    };
  });
  return os.set(u, c), u;
}
let os = /* @__PURE__ */ new WeakMap();
function ga(e, t) {
  const n = os.get(e);
  return n ? (os.delete(e), n(t)) : Promise.resolve();
}
var qe, tt, De, Pt, Gn, Hn, Cr;
class ba {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    Ce(this, "anchor");
    /** @type {Map<Batch, Key>} */
    k(this, qe, /* @__PURE__ */ new Map());
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
    k(this, tt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    k(this, De, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    k(this, Pt, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    k(this, Gn, !0);
    /**
     * @param {Batch} batch
     */
    k(this, Hn, (t) => {
      if (o(this, qe).has(t)) {
        var n = (
          /** @type {Key} */
          o(this, qe).get(t)
        ), r = o(this, tt).get(n);
        if (r)
          Er(r), o(this, Pt).delete(n);
        else {
          var s = o(this, De).get(n);
          s && (Er(s.effect), o(this, tt).set(n, s.effect), o(this, De).delete(n), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), r = s.effect);
        }
        for (const [i, l] of o(this, qe)) {
          if (o(this, qe).delete(i), i === t)
            break;
          const a = o(this, De).get(l);
          a && (Te(a.effect), o(this, De).delete(l));
        }
        for (const [i, l] of o(this, tt)) {
          if (i === n || o(this, Pt).has(i)) continue;
          const a = () => {
            if (Array.from(o(this, qe).values()).includes(i)) {
              var c = document.createDocumentFragment();
              Ss(l, c), c.append(vt()), o(this, De).set(i, { effect: l, fragment: c });
            } else
              Te(l);
            o(this, Pt).delete(i), o(this, tt).delete(i);
          };
          o(this, Gn) || !r ? (o(this, Pt).add(i), Ut(l, a, !1)) : a();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    k(this, Cr, (t) => {
      o(this, qe).delete(t);
      const n = Array.from(o(this, qe).values());
      for (const [r, s] of o(this, De))
        n.includes(r) || (Te(s.effect), o(this, De).delete(r));
    });
    this.anchor = t, A(this, Gn, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      j
    ), s = xi();
    if (n && !o(this, tt).has(t) && !o(this, De).has(t))
      if (s) {
        var i = document.createDocumentFragment(), l = vt();
        i.append(l), o(this, De).set(t, {
          effect: Fe(() => n(l)),
          fragment: i
        });
      } else
        o(this, tt).set(
          t,
          Fe(() => n(this.anchor))
        );
    if (o(this, qe).set(r, t), s) {
      for (const [a, u] of o(this, tt))
        a === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [a, u] of o(this, De))
        a === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(o(this, Hn)), r.ondiscard(o(this, Cr));
    } else
      o(this, Hn).call(this, r);
  }
}
qe = new WeakMap(), tt = new WeakMap(), De = new WeakMap(), Pt = new WeakMap(), Gn = new WeakMap(), Hn = new WeakMap(), Cr = new WeakMap();
function J(e, t, n = !1) {
  var r = new ba(e), s = n ? on : 0;
  function i(l, a) {
    r.ensure(l, a);
  }
  Es(() => {
    var l = !1;
    t((a, u = 0) => {
      l = !0, i(u, a);
    }), l || i(-1, null);
  }, s);
}
function ya(e, t) {
  return t;
}
function wa(e, t, n) {
  for (var r = [], s = t.length, i, l = t.length, a = 0; a < s; a++) {
    let v = t[a];
    Ut(
      v,
      () => {
        if (i) {
          if (i.pending.delete(v), i.done.add(v), i.pending.size === 0) {
            var _ = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            us(e, Mr(i.done)), _.delete(i), _.size === 0 && (e.outrogroups = null);
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
      Hl(d), d.append(c), e.items.clear();
    }
    us(e, t, !u);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function us(e, t, n = !0) {
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
      i.f |= st;
      const l = document.createDocumentFragment();
      Ss(i, l);
    } else
      Te(t[s], n);
  }
}
var Bs;
function Sr(e, t, n, r, s, i = null) {
  var l = e, a = /* @__PURE__ */ new Map(), u = (t & ri) !== 0;
  if (u) {
    var c = (
      /** @type {Element} */
      e
    );
    l = c.appendChild(vt());
  }
  var d = null, v = /* @__PURE__ */ fi(() => {
    var P = n();
    return (
      /** @type {V[]} */
      Rr(P) ? P : P == null ? [] : Mr(P)
    );
  }), _, p = /* @__PURE__ */ new Map(), m = !0;
  function y(P) {
    (G.effect.f & ke) === 0 && (G.pending.delete(P), G.fallback = d, ka(G, _, l, t, r), d !== null && (_.length === 0 ? (d.f & st) === 0 ? Er(d) : (d.f ^= st, An(d, null, l)) : Ut(d, () => {
      d = null;
    })));
  }
  function h(P) {
    G.pending.delete(P);
  }
  var x = Es(() => {
    _ = /** @type {V[]} */
    f(v);
    for (var P = _.length, q = /* @__PURE__ */ new Set(), K = (
      /** @type {Batch} */
      j
    ), D = xi(), L = 0; L < P; L += 1) {
      var X = _[L], S = r(X, L), R = m ? null : a.get(S);
      R ? (R.v && fn(R.v, X), R.i && fn(R.i, L), D && K.unskip_effect(R.e)) : (R = Ea(
        a,
        m ? l : Bs ?? (Bs = vt()),
        X,
        S,
        L,
        s,
        t,
        n
      ), m || (R.e.f |= st), a.set(S, R)), q.add(S);
    }
    if (P === 0 && i && !d && (m ? d = Fe(() => i(l)) : (d = Fe(() => i(Bs ?? (Bs = vt()))), d.f |= st)), P > q.size && ml(), !m)
      if (p.set(K, q), D) {
        for (const [W, I] of a)
          q.has(W) || K.skip_effect(I.e);
        K.oncommit(y), K.ondiscard(h);
      } else
        y(K);
    f(v);
  }), G = { effect: x, items: a, pending: p, outrogroups: null, fallback: d };
  m = !1;
}
function yn(e) {
  for (; e !== null && (e.f & Ve) === 0; )
    e = e.next;
  return e;
}
function ka(e, t, n, r, s) {
  var R, W, I, H, $, te, oe, ue, g;
  var i = (r & rl) !== 0, l = t.length, a = e.items, u = yn(e.effect.first), c, d = null, v, _ = [], p = [], m, y, h, x;
  if (i)
    for (x = 0; x < l; x += 1)
      m = t[x], y = s(m, x), h = /** @type {EachItem} */
      a.get(y).e, (h.f & st) === 0 && ((W = (R = h.nodes) == null ? void 0 : R.a) == null || W.measure(), (v ?? (v = /* @__PURE__ */ new Set())).add(h));
  for (x = 0; x < l; x += 1) {
    if (m = t[x], y = s(m, x), h = /** @type {EachItem} */
    a.get(y).e, e.outrogroups !== null)
      for (const T of e.outrogroups)
        T.pending.delete(h), T.done.delete(h);
    if ((h.f & we) !== 0 && (Er(h), i && ((H = (I = h.nodes) == null ? void 0 : I.a) == null || H.unfix(), (v ?? (v = /* @__PURE__ */ new Set())).delete(h))), (h.f & st) !== 0)
      if (h.f ^= st, h === u)
        An(h, null, n);
      else {
        var G = d ? d.next : u;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), gt(e, d, h), gt(e, h, G), An(h, G, n), d = h, _ = [], p = [], u = yn(d.next);
        continue;
      }
    if (h !== u) {
      if (c !== void 0 && c.has(h)) {
        if (_.length < p.length) {
          var P = p[0], q;
          d = P.prev;
          var K = _[0], D = _[_.length - 1];
          for (q = 0; q < _.length; q += 1)
            An(_[q], P, n);
          for (q = 0; q < p.length; q += 1)
            c.delete(p[q]);
          gt(e, K.prev, D.next), gt(e, d, K), gt(e, D, P), u = P, d = D, x -= 1, _ = [], p = [];
        } else
          c.delete(h), An(h, u, n), gt(e, h.prev, h.next), gt(e, h, d === null ? e.effect.first : d.next), gt(e, d, h), d = h;
        continue;
      }
      for (_ = [], p = []; u !== null && u !== h; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(u), p.push(u), u = yn(u.next);
      if (u === null)
        continue;
    }
    (h.f & st) === 0 && _.push(h), d = h, u = yn(h.next);
  }
  if (e.outrogroups !== null) {
    for (const T of e.outrogroups)
      T.pending.size === 0 && (us(e, Mr(T.done)), ($ = e.outrogroups) == null || $.delete(T));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (u !== null || c !== void 0) {
    var L = [];
    if (c !== void 0)
      for (h of c)
        (h.f & we) === 0 && L.push(h);
    for (; u !== null; )
      (u.f & we) === 0 && u !== e.fallback && L.push(u), u = yn(u.next);
    var X = L.length;
    if (X > 0) {
      var S = (r & ri) !== 0 && l === 0 ? n : null;
      if (i) {
        for (x = 0; x < X; x += 1)
          (oe = (te = L[x].nodes) == null ? void 0 : te.a) == null || oe.measure();
        for (x = 0; x < X; x += 1)
          (g = (ue = L[x].nodes) == null ? void 0 : ue.a) == null || g.fix();
      }
      wa(e, L, S);
    }
  }
  i && dt(() => {
    var T, Ae;
    if (v !== void 0)
      for (h of v)
        (Ae = (T = h.nodes) == null ? void 0 : T.a) == null || Ae.apply();
  });
}
function Ea(e, t, n, r, s, i, l, a) {
  var u = (l & tl) !== 0 ? (l & sl) === 0 ? /* @__PURE__ */ Bl(n, !1, !1) : Gt(n) : null, c = (l & nl) !== 0 ? Gt(s) : null;
  return {
    v: u,
    i: c,
    e: Fe(() => (i(t, u ?? n, c ?? s, a), () => {
      e.delete(r);
    }))
  };
}
function An(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, s = e.nodes.end, i = t && (t.f & st) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ir(r)
      );
      if (i.before(r), r === s)
        return;
      r = l;
    }
}
function gt(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Vs = [...` 	
\r\f \v\uFEFF`];
function xa(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var s of Object.keys(n))
      if (n[s])
        r = r ? r + " " + s : s;
      else if (r.length)
        for (var i = s.length, l = 0; (l = r.indexOf(s, l)) >= 0; ) {
          var a = l + i;
          (l === 0 || Vs.includes(r[l - 1])) && (a === r.length || Vs.includes(r[a])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(a + 1) : l = a;
        }
  }
  return r === "" ? null : r;
}
function Sa(e, t) {
  return e == null ? null : String(e);
}
function Pn(e, t, n, r, s, i) {
  var l = (
    /** @type {any} */
    e[Wr]
  );
  if (l !== n || l === void 0) {
    var a = xa(n, r, i);
    a == null ? e.removeAttribute("class") : e.className = a, e[Wr] = n;
  } else if (i && s !== i)
    for (var u in i) {
      var c = !!i[u];
      (s == null || c !== !!s[u]) && e.classList.toggle(u, c);
    }
  return i;
}
function Ts(e, t, n, r) {
  var s = (
    /** @type {any} */
    e[Xr]
  );
  if (s !== t) {
    var i = Sa(t);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e[Xr] = t;
  }
  return r;
}
function Ta(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Aa(e, t) {
  var n = e.__defaultValue, r = e.multiple, s = r ? n ?? [] : null;
  if (!(r && !Rr(s))) {
    e.selectedIndex;
    for (var i of e.options) {
      var l = cs(i);
      Ta(
        i,
        r ? (
          /** @type {any[]} */
          s.includes(l)
        ) : yi(l, n)
      );
    }
  }
}
function fs(e, t, n = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Rr(t))
      return vl();
    for (var r of e.options)
      r.selected = t.includes(cs(r));
    return;
  }
  for (r of e.options) {
    var s = cs(r);
    if (yi(s, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function Gs(e) {
  var t = new MutationObserver((n) => {
    n.every(Ca) || ("__defaultValue" in e && Aa(e), "__value" in e && fs(e, e.__value));
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
  }), ws(() => {
    t.disconnect();
  });
}
function cs(e) {
  return "__value" in e ? e.__value : e.value;
}
function Ca(e) {
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
const ja = Symbol("is custom element"), Ra = Symbol("is html"), Ma = el ? "progress" : "PROGRESS";
function wn(e, t) {
  var n = As(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== Ma) || (e.value = t ?? "");
}
function Cn(e, t) {
  var n = As(e);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function Qt(e, t, n, r) {
  var s = As(e);
  s[t] !== (s[t] = n) && (t === "loading" && (e[$i] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Da(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function As(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[cr] ?? (e[cr] = {
      [ja]: e.nodeName.includes("-"),
      [Ra]: e.namespaceURI === cl
    })
  );
}
var Hs = /* @__PURE__ */ new Map();
function Da(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Hs.get(t);
  if (n) return n;
  Hs.set(t, n = /* @__PURE__ */ new Set());
  for (var r, s = e, i = Element.prototype; i !== s; ) {
    r = zi(s);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    s = $s(s);
  }
  return n;
}
function Xt(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  Rl(e, "input", async (s) => {
    var i = s ? e.defaultValue : e.value;
    if (i = Hr(e) ? Kr(i) : i, n(i), j !== null && r.add(j), await na(), i !== (i = t())) {
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
  Ir(t) == null && e.value && (n(Hr(e) ? Kr(e.value) : e.value), j !== null && r.add(j)), ks(() => {
    var s = t();
    if (e === document.activeElement) {
      var i = (
        /** @type {Batch} */
        j
      );
      if (r.has(i))
        return;
    }
    Hr(e) && s === Kr(e.value) || e.type === "date" && !s && !e.value || s !== e.value && (e.value = s ?? "");
  });
}
function Hr(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Kr(e) {
  return e === "" ? null : +e;
}
function zr(e, t) {
  return e === t || (e == null ? void 0 : e[Ft]) === t;
}
function Ia(e = ps(), t, n, r) {
  var s = (
    /** @type {ComponentContext} */
    Ee.r
  ), i = (
    /** @type {Effect} */
    z
  );
  return Jl(() => {
    var l, a;
    return ks(() => {
      l = a, a = [], Ir(() => {
        zr(n(...a), e) || (t(e, ...a), l && zr(n(...l), e) && t(null, ...l));
      });
    }), () => {
      let u = i;
      for (; u !== s && u.parent !== null && u.parent.f & gr; )
        u = u.parent;
      const c = () => {
        a && zr(n(...a), e) && t(null, ...a);
      }, d = u.teardown;
      u.teardown = () => {
        c(), d == null || d();
      };
    };
  }), e;
}
let fr = !1;
function Na(e) {
  var t = fr;
  try {
    return fr = !1, [e(), fr];
  } finally {
    fr = t;
  }
}
function Ks(e, t, n, r) {
  var q;
  var s = !0, i = (n & al) !== 0, l = (n & ol) !== 0, a = (
    /** @type {V} */
    r
  ), u = !0, c = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), d = () => l && s ? (c ?? (c = /* @__PURE__ */ On(
    /** @type {() => V} */
    r
  )), f(c)) : (u && (u = !1, a = l ? Ir(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), a);
  let v;
  if (i) {
    var _ = Ft in e || Qi in e;
    v = ((q = Jt(e, t)) == null ? void 0 : q.set) ?? (_ && t in e ? (K) => e[t] = K : void 0);
  }
  var p, m = !1;
  i ? [p, m] = Na(() => (
    /** @type {V} */
    e[t]
  )) : p = /** @type {V} */
  e[t], p === void 0 && r !== void 0 && (p = d(), v && (kl(), v(p)));
  var y;
  if (y = () => {
    var K = (
      /** @type {V} */
      e[t]
    );
    return K === void 0 ? d() : (u = !0, K);
  }, (n & ll) === 0)
    return y;
  if (v) {
    var h = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(K, D) {
        return arguments.length > 0 ? ((!D || h || m) && v(D ? y() : K), K) : y();
      })
    );
  }
  var x = !1, G = ((n & il) !== 0 ? On : fi)(() => (x = !1, y()));
  i && f(G);
  var P = (
    /** @type {Effect} */
    z
  );
  return (
    /** @type {() => V} */
    (function(K, D) {
      if (arguments.length > 0) {
        const L = D ? f(G) : i ? Be(K) : K;
        return E(G, L), x = !0, a !== void 0 && (a = L), K;
      }
      return pt && x || (P.f & ke) !== 0 ? G.v : f(G);
    })
  );
}
const Pa = "5";
var Zs;
typeof window < "u" && ((Zs = window.__svelte ?? (window.__svelte = {})).v ?? (Zs.v = /* @__PURE__ */ new Set())).add(Pa);
var Oa = /* @__PURE__ */ O('<button class="mm-btn ghost icon sm twisty svelte-3r6i99" type="button"> </button>'), La = /* @__PURE__ */ O('<span class="twisty-spacer svelte-3r6i99"></span>'), Fa = /* @__PURE__ */ O('<span class="mm-tag">Heading</span>'), Ua = /* @__PURE__ */ O('<span class="mm-tag broken" title="That page is missing or unpublished, so this item is not shown on the site">Broken</span>'), Ba = /* @__PURE__ */ O('<span class="mm-tag">Link</span>'), Va = /* @__PURE__ */ O('<span class="mm-tag button">Button</span>'), Ga = /* @__PURE__ */ O('<div role="treeitem" tabindex="0"><span class="grip svelte-3r6i99" draggable="true" role="presentation" aria-hidden="true">⠿</span> <!> <span class="label svelte-3r6i99"> </span> <!> <!> <span class="target svelte-3r6i99"> </span> <span class="actions svelte-3r6i99"><button class="mm-btn ghost icon sm" type="button" title="Out one level (Alt+←)">←</button> <button class="mm-btn ghost icon sm" type="button" title="Up (Alt+↑)">↑</button> <button class="mm-btn ghost icon sm" type="button" title="Down (Alt+↓)">↓</button> <button class="mm-btn ghost icon sm" type="button" title="In one level (Alt+→)">→</button> <button class="mm-btn ghost icon sm" type="button" title="Duplicate">⧉</button> <button class="mm-btn ghost icon sm danger" type="button" title="Remove">✕</button></span></div>');
function Ha(e, t) {
  pn(t, !0);
  const n = /* @__PURE__ */ xe(() => t.row.item), r = /* @__PURE__ */ xe(() => t.store.resolved[f(n).key] || null), s = /* @__PURE__ */ xe(() => t.store.selected === f(n).key), i = /* @__PURE__ */ xe(() => {
    var g;
    return (((g = f(n).children) == null ? void 0 : g.length) ?? 0) > 0;
  }), l = /* @__PURE__ */ xe(() => t.store.collapsed.has(f(n).key)), a = /* @__PURE__ */ xe(() => {
    var g;
    return f(n).label || ((g = f(r)) == null ? void 0 : g.label) || f(n).url || f(n).route || "Untitled";
  }), u = /* @__PURE__ */ xe(() => f(n).type === "page" ? f(n).route : f(n).type === "url" ? f(n).url : "");
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
  var d = Ga();
  let v;
  var _ = V(d), p = w(_, 2);
  {
    var m = (g) => {
      var T = Oa(), Ae = ye(T, !0);
      ne(() => {
        Qt(T, "aria-label", f(l) ? "Expand" : "Collapse"), pe(Ae, f(l) ? "▸" : "▾");
      }), F("click", T, (gn) => {
        gn.stopPropagation(), t.store.toggleCollapse(f(n).key);
      }), M(g, T);
    }, y = (g) => {
      var T = La();
      M(g, T);
    };
    J(p, (g) => {
      f(i) ? g(m) : g(y, -1);
    });
  }
  var h = w(p, 2), x = ye(h, !0), G = w(h, 2);
  {
    var P = (g) => {
      var T = Fa();
      M(g, T);
    }, q = (g) => {
      var T = Ua();
      M(g, T);
    }, K = (g) => {
      var T = Ba();
      M(g, T);
    };
    J(G, (g) => {
      var T;
      f(n).type === "heading" ? g(P) : (T = f(r)) != null && T.broken ? g(q, 1) : f(n).type === "url" && g(K, 2);
    });
  }
  var D = w(G, 2);
  {
    var L = (g) => {
      var T = Va();
      M(g, T);
    }, X = /* @__PURE__ */ xe(() => {
      var g;
      return (g = f(n).style) == null ? void 0 : g.includes("button");
    });
    J(D, (g) => {
      f(X) && g(L);
    });
  }
  var S = w(D, 2), R = ye(S, !0), W = w(S, 2), I = V(W), H = w(I, 2), $ = w(H, 2), te = w($, 2), oe = w(te, 2), ue = w(oe, 2);
  ne(() => {
    v = Pn(d, 1, "row svelte-3r6i99", null, v, { selected: f(s), dragging: t.dragging }), Ts(d, `margin-inline-start: calc(var(--mm-indent) * ${t.row.depth ?? ""})`), Qt(d, "aria-selected", f(s)), Qt(d, "aria-level", t.row.depth + 1), pe(x, f(a)), pe(R, f(u));
  }), F("click", d, () => t.store.select(f(n).key)), F("keydown", d, c), Tt("dragstart", _, (g) => t.onDragStart(g, t.row)), F("click", I, (g) => {
    g.stopPropagation(), t.store.outdent(f(n).key);
  }), F("click", H, (g) => {
    g.stopPropagation(), t.store.moveUp(f(n).key);
  }), F("click", $, (g) => {
    g.stopPropagation(), t.store.moveDown(f(n).key);
  }), F("click", te, (g) => {
    g.stopPropagation(), t.store.indent(f(n).key);
  }), F("click", oe, (g) => {
    g.stopPropagation(), t.store.duplicate(f(n).key);
  }), F("click", ue, (g) => {
    g.stopPropagation(), t.store.remove(f(n).key);
  }), M(e, d), _n();
}
Nr(["click", "keydown"]);
const Ka = 24;
function za(e, t, n, r, s = 5) {
  const i = Math.max(0, Math.min(n, e.length)), l = i > 0 ? e[i - 1] : null, a = i < e.length ? e[i] : null, u = t + r, c = l ? l.depth + 1 : 0, d = a ? a.depth : 0, v = Math.min(c, s - 1), _ = Math.max(0, Math.max(d, Math.min(u, v)));
  return {
    depth: _,
    parentKey: _ === 0 ? null : qa(e, i, _),
    beforeKey: a ? a.key : null,
    clamped: _ !== u
  };
}
function qa(e, t, n) {
  for (let r = t - 1; r >= 0; r--) {
    if (e[r].depth === n - 1) return e[r].key;
    if (e[r].depth < n - 1) return null;
  }
  return null;
}
function Ya(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n].top + e[n].height / 2;
    if (t < r) return n;
  }
  return e.length;
}
function Wa(e, t, n = Ka) {
  return Math.round((e - t) / n);
}
function Cs() {
  return Math.random().toString(36).slice(2, 8);
}
function qr(e = "url", t = {}) {
  return {
    key: Cs(),
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
function Je(e, t = /* @__PURE__ */ new Set(), n = 0, r = null, s = []) {
  var i;
  for (const l of e)
    s.push({ key: l.key, depth: n, parentKey: r, item: l }), (i = l.children) != null && i.length && !t.has(l.key) && Je(l.children, t, n + 1, l.key, s);
  return s;
}
function ar(e, t) {
  for (const n of e) {
    if (n.key === t) return n;
    const r = ar(n.children || [], t);
    if (r) return r;
  }
  return null;
}
function Fi(e) {
  return e.reduce((t, n) => t + 1 + Fi(n.children || []), 0);
}
function Ui(e, t = 1) {
  return e.reduce(
    (n, r) => {
      var s;
      return Math.max(n, (s = r.children) != null && s.length ? Ui(r.children, t + 1) : t);
    },
    0
  );
}
function Kt(e, t) {
  let n = null;
  const r = (i) => i.flatMap((l) => l.key === t ? (n = l, []) : [{ ...l, children: r(l.children || []) }]);
  return { items: r(e), removed: n };
}
function zt(e, t, n, r) {
  const s = (i) => {
    const l = r ? i.findIndex((u) => u.key === r) : -1, a = [...i];
    return a.splice(l === -1 ? a.length : l, 0, t), a;
  };
  return n === null ? s(e) : e.map((i) => i.key === n ? { ...i, children: s(i.children || []) } : { ...i, children: zt(i.children || [], t, n, r) });
}
function Xa(e, t, n) {
  if (!n || !t) return e;
  const { items: r, removed: s } = Kt(e, t);
  return s ? zt(r, s, n.parentKey, n.beforeKey) : e;
}
function Ja(e, t) {
  const n = Je(e), r = n.findIndex((a) => a.key === t);
  if (r <= 0) return e;
  const s = n[r], i = dn(e, s.parentKey), l = i.findIndex((a) => a.key === t);
  if (l > 0) {
    const a = [...i];
    return a.splice(l, 1), a.splice(l - 1, 0, i[l]), js(e, s.parentKey, a);
  }
  return no(e, t, s.parentKey);
}
function Za(e, t) {
  var v;
  const n = Je(e).find((_) => _.key === t);
  if (!n) return e;
  const r = dn(e, n.parentKey), s = r.findIndex((_) => _.key === t);
  if (s < r.length - 1) {
    const _ = [...r];
    return _.splice(s, 1), _.splice(s + 1, 0, r[s]), js(e, n.parentKey, _);
  }
  if (n.parentKey === null) return e;
  const { items: i, removed: l } = Kt(e, t), a = Je(i).find((_) => _.key === n.parentKey), u = dn(i, (a == null ? void 0 : a.parentKey) ?? null), c = u.findIndex((_) => _.key === n.parentKey), d = ((v = u[c + 1]) == null ? void 0 : v.key) ?? null;
  return zt(i, l, (a == null ? void 0 : a.parentKey) ?? null, d);
}
function Qa(e, t, n = 5) {
  const r = Je(e).find((d) => d.key === t);
  if (!r) return e;
  const s = dn(e, r.parentKey), i = s.findIndex((d) => d.key === t);
  if (i <= 0) return e;
  const l = s[i - 1], a = Ui([ar(e, t)]);
  if (r.depth + 1 + a > n) return e;
  const { items: u, removed: c } = Kt(e, t);
  return zt(u, c, l.key, null);
}
function $a(e, t) {
  var d;
  const n = Je(e).find((v) => v.key === t);
  if (!n || n.parentKey === null) return e;
  const { items: r, removed: s } = Kt(e, t), i = Je(r).find((v) => v.key === n.parentKey), l = (i == null ? void 0 : i.parentKey) ?? null, a = dn(r, l), u = a.findIndex((v) => v.key === n.parentKey), c = ((d = a[u + 1]) == null ? void 0 : d.key) ?? null;
  return zt(r, s, l, c);
}
function eo(e, t) {
  return Kt(e, t).items;
}
function to(e, t) {
  var u;
  const n = ar(e, t);
  if (!n) return e;
  const r = (c) => ({ ...c, key: Cs(), children: (c.children || []).map(r) }), s = Je(e).find((c) => c.key === t), i = dn(e, s.parentKey), l = i.findIndex((c) => c.key === t), a = ((u = i[l + 1]) == null ? void 0 : u.key) ?? null;
  return zt(e, r(n), s.parentKey, a);
}
function jn(e, t = /* @__PURE__ */ new Set()) {
  return (e || []).map((n) => {
    let r = n.key;
    return (!r || t.has(r)) && (r = Cs()), t.add(r), { ...n, key: r, children: jn(n.children || [], t) };
  });
}
function dn(e, t) {
  var n;
  return t === null ? e : ((n = ar(e, t)) == null ? void 0 : n.children) || [];
}
function js(e, t, n) {
  return t === null ? n : e.map(
    (r) => r.key === t ? { ...r, children: n } : { ...r, children: js(r.children || [], t, n) }
  );
}
function no(e, t, n) {
  const { items: r, removed: s } = Kt(e, t), i = Je(r).find((l) => l.key === n);
  return zt(r, s, (i == null ? void 0 : i.parentKey) ?? null, n);
}
var ro = /* @__PURE__ */ O('<p class="empty svelte-d2e7rp">This menu is empty. Add pages or a custom link from the panel on the left.</p>'), zs = /* @__PURE__ */ O("<div><!></div>"), so = /* @__PURE__ */ O('<span class="hint svelte-d2e7rp"><!></span>'), io = /* @__PURE__ */ O('<div class="tree mm-scroll svelte-d2e7rp" role="tree" aria-label="Menu items" tabindex="-1"><!> <!> <!></div>');
function lo(e, t) {
  pn(t, !0);
  let n = /* @__PURE__ */ B(null), r = /* @__PURE__ */ B(null), s = 0, i = 0, l = [], a = [], u = /* @__PURE__ */ B(null), c = /* @__PURE__ */ B(-1);
  const d = /* @__PURE__ */ xe(() => t.store.rows);
  function v() {
    if (!f(n)) return;
    const S = f(n).getBoundingClientRect().top;
    a = [...f(n).querySelectorAll("[data-row]")].filter((R) => R.dataset.row !== f(r)).map((R) => {
      const W = R.getBoundingClientRect();
      return {
        top: W.top - S + f(n).scrollTop,
        height: W.height
      };
    });
  }
  function _(S, R) {
    E(r, R.key, !0), s = S.clientX, i = R.depth, S.dataTransfer.setData("text/plain", R.key), S.dataTransfer.effectAllowed = "move";
    const { items: W } = Kt(t.store.items, R.key);
    l = Je(W, t.store.collapsed).map((I) => ({ key: I.key, depth: I.depth })), requestAnimationFrame(v);
  }
  function p(S) {
    if (!f(r)) return;
    S.preventDefault(), S.dataTransfer.dropEffect = "move";
    const R = f(n).getBoundingClientRect().top, W = S.clientY - R + f(n).scrollTop;
    E(c, Ya(a, W), !0), E(u, za(l, i, f(c), Wa(S.clientX, s), t.store.maxDepth), !0), y(S.clientY);
  }
  let m = null;
  function y(S) {
    const R = f(n).getBoundingClientRect(), W = 40, I = S < R.top + W ? -8 : S > R.bottom - W ? 8 : 0;
    clearTimeout(m), I && (f(n).scrollBy(0, I), v(), m = setTimeout(() => y(S), 40));
  }
  function h(S) {
    S.preventDefault(), f(r) && f(u) && t.store.applyDrop(f(r), f(u)), x();
  }
  function x() {
    clearTimeout(m), E(r, null), E(u, null), E(c, -1), a = [], l = [];
  }
  const G = /* @__PURE__ */ xe(() => {
    if (!f(u) || f(c) < 0 || !a.length) return 0;
    if (f(c) >= a.length) {
      const S = a[a.length - 1];
      return S.top + S.height;
    }
    return a[f(c)].top;
  });
  var P = io(), q = V(P);
  {
    var K = (S) => {
      var R = ro();
      M(S, R);
    };
    J(q, (S) => {
      f(d).length || S(K);
    });
  }
  var D = w(q, 2);
  Sr(D, 17, () => f(d), (S) => S.key, (S, R) => {
    var W = zs(), I = V(W);
    {
      let H = /* @__PURE__ */ xe(() => f(r) === f(R).key);
      Ha(I, {
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
    ne(() => Qt(W, "data-row", f(R).key)), M(S, W);
  });
  var L = w(D, 2);
  {
    var X = (S) => {
      var R = zs();
      let W;
      var I = V(R);
      {
        var H = ($) => {
          var te = so(), oe = V(te);
          {
            var ue = (T) => {
              var Ae = Us();
              ne(() => pe(Ae, `This menu renders ${t.store.maxDepth ?? ""} level${t.store.maxDepth === 1 ? "" : "s"}`)), M(T, Ae);
            }, g = (T) => {
              var Ae = Us("Can't skip a level");
              M(T, Ae);
            };
            J(oe, (T) => {
              f(u).depth >= t.store.maxDepth - 1 ? T(ue) : T(g, -1);
            });
          }
          M($, te);
        };
        J(I, ($) => {
          f(u).clamped && $(H);
        });
      }
      ne(() => {
        W = Pn(R, 1, "indicator svelte-d2e7rp", null, W, { clamped: f(u).clamped }), Ts(R, `top: ${f(G) ?? ""}px; margin-inline-start: calc(var(--mm-indent) * ${f(u).depth ?? ""})`);
      }), M(S, R);
    };
    J(L, (S) => {
      f(u) && S(X);
    });
  }
  Ia(P, (S) => E(n, S), () => f(n)), Tt("dragover", P, p), Tt("drop", P, h), Tt("dragleave", P, () => {
    E(u, null), E(c, -1);
  }), Tt("dragend", P, x), Tt("scroll", P, () => f(r) && v()), M(e, P), _n();
}
var ao = /* @__PURE__ */ O('<p class="empty svelte-17w6cpd">Select an item to edit it.</p>'), oo = /* @__PURE__ */ O(`<div class="mm-banner error">This points at <code class="svelte-17w6cpd"> </code>, which is missing or unpublished. It is not shown on the
        site. Fix the page, or point this item somewhere else.</div>`), uo = /* @__PURE__ */ O(`<p class="mm-help">Leave this empty and the item follows the page's own menu label.</p>`), fo = /* @__PURE__ */ O('<label class="mm-label svelte-17w6cpd" for="mm-route-field">Page</label> <input id="mm-route-field" class="mm-input"/>', 1), co = /* @__PURE__ */ O('<label class="mm-label svelte-17w6cpd" for="mm-url-field">URL</label> <input id="mm-url-field" class="mm-input"/>', 1), vo = /* @__PURE__ */ O('<label class="mm-label svelte-17w6cpd" for="mm-icon-field">Icon</label> <input id="mm-icon-field" class="mm-input" placeholder="fa-user"/> <label class="mm-label svelte-17w6cpd" for="mm-desc-field">Description</label> <input id="mm-desc-field" class="mm-input"/> <p class="mm-help">Shown under the label. Best on items inside a dropdown.</p> <label class="check svelte-17w6cpd"><input type="checkbox"/> Open in a new tab</label> <label class="check svelte-17w6cpd"><input type="checkbox"/> Add <code class="svelte-17w6cpd">nofollow</code></label> <p class="mm-label svelte-17w6cpd" style="margin-top: 14px">Style</p> <label class="check svelte-17w6cpd"><input type="checkbox"/> Show as a button</label> <label class="check svelte-17w6cpd"><input type="checkbox"/> Highlight</label>', 1), ho = /* @__PURE__ */ O('<div class="fields mm-scroll svelte-17w6cpd"><!> <label class="mm-label svelte-17w6cpd" for="mm-label-field">Label</label> <input id="mm-label-field" class="mm-input"/> <!> <!> <!></div>');
function po(e, t) {
  pn(t, !0);
  const n = /* @__PURE__ */ xe(() => t.store.selectedItem), r = /* @__PURE__ */ xe(() => f(n) ? t.store.resolved[f(n).key] : null);
  function s(d) {
    t.store.update(f(n).key, d);
  }
  function i(d, v) {
    const _ = new Set(f(n).style || []);
    v ? _.add(d) : _.delete(d), s({ style: [..._] });
  }
  var l = oa(), a = Ct(l);
  {
    var u = (d) => {
      var v = ao();
      M(d, v);
    }, c = (d) => {
      var v = ho(), _ = V(v);
      {
        var p = (D) => {
          var L = oo(), X = w(V(L)), S = ye(X, !0);
          ne(() => pe(S, f(n).route)), M(D, L);
        };
        J(_, (D) => {
          var L;
          (L = f(r)) != null && L.broken && D(p);
        });
      }
      var m = w(_, 4), y = w(m, 2);
      {
        var h = (D) => {
          var L = uo();
          M(D, L);
        };
        J(y, (D) => {
          f(n).type === "page" && D(h);
        });
      }
      var x = w(y, 2);
      {
        var G = (D) => {
          var L = fo(), X = w(Ct(L), 2);
          ne(() => wn(X, f(n).route || "")), F("input", X, (S) => s({ route: S.target.value })), M(D, L);
        }, P = (D) => {
          var L = co(), X = w(Ct(L), 2);
          ne(() => wn(X, f(n).url || "")), F("input", X, (S) => s({ url: S.target.value })), M(D, L);
        };
        J(x, (D) => {
          f(n).type === "page" ? D(G) : f(n).type === "url" && D(P, 1);
        });
      }
      var q = w(x, 2);
      {
        var K = (D) => {
          var L = vo(), X = w(Ct(L), 2), S = w(X, 4), R = w(S, 4), W = V(R), I = w(R, 2), H = V(I), $ = w(I, 4), te = V($), oe = w($, 2), ue = V(oe);
          ne(
            (g, T) => {
              wn(X, f(n).icon || ""), wn(S, f(n).description || ""), Cn(W, f(n).target === "_blank"), Cn(H, !!f(n).nofollow), Cn(te, g), Cn(ue, T);
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
          ), F("input", X, (g) => s({ icon: g.target.value })), F("input", S, (g) => s({ description: g.target.value })), F("change", W, (g) => s({ target: g.target.checked ? "_blank" : "" })), F("change", H, (g) => s({ nofollow: g.target.checked })), F("change", te, (g) => i("button", g.target.checked)), F("change", ue, (g) => i("highlight", g.target.checked)), M(D, L);
        };
        J(q, (D) => {
          f(n).type !== "heading" && D(K);
        });
      }
      ne(() => {
        var D;
        wn(m, f(n).label || ""), Qt(m, "placeholder", f(n).type === "page" ? ((D = f(r)) == null ? void 0 : D.label) || "Follows the page title" : "");
      }), F("input", m, (D) => s({ label: D.target.value })), M(d, v);
    };
    J(a, (d) => {
      f(n) ? d(c, -1) : d(u);
    });
  }
  M(e, l), _n();
}
Nr(["input", "change"]);
function _o() {
  const e = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), t = window.__GRAV_API_PREFIX || "/api/v1";
  return e + t;
}
function mo() {
  const e = { Accept: "application/json" };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function xt(e, t, n) {
  var l;
  const r = { method: e, headers: mo(), credentials: "same-origin" };
  n !== void 0 && (r.headers["Content-Type"] = "application/json", r.body = JSON.stringify(n));
  const s = await fetch(_o() + t, r);
  if (s.status === 204) return null;
  const i = await s.json().catch(() => ({}));
  if (!s.ok) {
    const a = (i == null ? void 0 : i.detail) || ((l = i == null ? void 0 : i.error) == null ? void 0 : l.message) || (i == null ? void 0 : i.message) || `Request failed (${s.status})`, u = new Error(a);
    throw u.status = s.status, u.errors = (i == null ? void 0 : i.errors) || null, u;
  }
  return i && typeof i == "object" && "data" in i ? i.data : i;
}
const bt = {
  list: () => xt("GET", "/maw-menus/menus"),
  get: (e, t = !1) => xt("GET", `/maw-menus/menus/${encodeURIComponent(e)}${t ? "?resolve=1" : ""}`),
  create: (e) => xt("POST", "/maw-menus/menus", e),
  update: (e, t) => xt("PATCH", `/maw-menus/menus/${encodeURIComponent(e)}`, t),
  remove: (e) => xt("DELETE", `/maw-menus/menus/${encodeURIComponent(e)}`),
  seed: (e, t = {}) => xt("POST", `/maw-menus/menus/${encodeURIComponent(e)}/seed`, t),
  /**
   * The page picker. Kept as one function so it can be swapped for the core /pages endpoint
   * without touching the component.
   */
  pages: (e = "") => xt("GET", `/maw-menus/pages${e ? `?search=${encodeURIComponent(e)}` : ""}`)
};
var go = /* @__PURE__ */ O('<div class="mm-banner error"> </div>'), bo = /* @__PURE__ */ O('<p class="muted svelte-1jjp3gp">Loading…</p>'), yo = /* @__PURE__ */ O('<p class="muted svelte-1jjp3gp">No pages match.</p>'), wo = /* @__PURE__ */ O('<span class="mm-tag" title="Not in the automatic page-tree nav">Hidden</span>'), ko = /* @__PURE__ */ O('<span class="mm-tag broken">Draft</span>'), Eo = /* @__PURE__ */ O('<li><label class="page svelte-1jjp3gp"><input type="checkbox"/> <span class="name svelte-1jjp3gp"> </span> <!> <!></label></li>'), xo = /* @__PURE__ */ O('<ul class="pages svelte-1jjp3gp"></ul>'), So = /* @__PURE__ */ O('<div class="body mm-scroll svelte-1jjp3gp"><input class="mm-input" placeholder="Search pages"/> <!></div> <div class="foot svelte-1jjp3gp"><button class="mm-btn primary" type="button"> </button></div>', 1), To = /* @__PURE__ */ O('<div class="body mm-scroll svelte-1jjp3gp"><label class="mm-label svelte-1jjp3gp" for="mm-new-url">URL</label> <input id="mm-new-url" class="mm-input" placeholder="https://example.com or /a/page"/> <label class="mm-label svelte-1jjp3gp" for="mm-new-label">Label</label> <input id="mm-new-label" class="mm-input"/> <button class="mm-btn primary wide svelte-1jjp3gp" type="button">Add link</button> <hr class="svelte-1jjp3gp"/> <label class="mm-label svelte-1jjp3gp" for="mm-new-heading">Heading</label> <input id="mm-new-heading" class="mm-input" placeholder="Services"/> <p class="mm-help">A label that groups the items under it. Not a link.</p> <button class="mm-btn wide svelte-1jjp3gp" type="button">Add heading</button></div>'), Ao = /* @__PURE__ */ O(`<div class="body mm-scroll svelte-1jjp3gp"><p>Build this menu from the page tree, exactly as the theme's automatic navigation would: visible,
        linkable pages and one level of children.</p> <p class="mm-help">Labels are left empty so each item keeps following its page's own menu label.</p> <button class="mm-btn wide svelte-1jjp3gp" type="button">Add to this menu</button> <button class="mm-btn wide danger svelte-1jjp3gp" type="button">Replace everything</button></div>`), Co = /* @__PURE__ */ O('<div class="panel svelte-1jjp3gp"><div class="tabs svelte-1jjp3gp"><button type="button">Pages</button> <button type="button">Link</button> <button type="button">Build</button></div> <!></div>');
function jo(e, t) {
  pn(t, !0);
  let n = /* @__PURE__ */ B("pages"), r = /* @__PURE__ */ B(Be([])), s = /* @__PURE__ */ B(""), i = /* @__PURE__ */ B(Be(/* @__PURE__ */ new Set())), l = /* @__PURE__ */ B(!1), a = /* @__PURE__ */ B(""), u = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B(""), d = /* @__PURE__ */ B("");
  async function v() {
    E(l, !0), E(a, "");
    try {
      E(r, await bt.pages(f(s)) || [], !0);
    } catch (I) {
      E(a, I.message, !0);
    } finally {
      E(l, !1);
    }
  }
  Wl(() => {
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
    H.has(I) ? H.delete(I) : H.add(I), E(i, H, !0);
  }
  function p() {
    const I = f(r).filter((H) => f(i).has(H.route)).map((H) => qr("page", { route: H.route }));
    I.length && (t.store.addMany(I), t.store.flash(`Added ${I.length} item${I.length === 1 ? "" : "s"}`)), E(i, /* @__PURE__ */ new Set(), !0);
  }
  function m() {
    f(u).trim() && (t.store.add(qr("url", { url: f(u).trim(), label: f(c).trim() })), E(u, ""), E(c, ""));
  }
  function y() {
    f(d).trim() && (t.store.add(qr("heading", { label: f(d).trim() })), E(d, ""));
  }
  var h = Co(), x = V(h), G = V(x);
  let P;
  var q = w(G, 2);
  let K;
  var D = w(q, 2);
  let L;
  var X = w(x, 2);
  {
    var S = (I) => {
      var H = So(), $ = Ct(H), te = V($), oe = w(te, 2);
      {
        var ue = (fe) => {
          var He = go(), Et = ye(He, !0);
          ne(() => pe(Et, f(a))), M(fe, He);
        }, g = (fe) => {
          var He = bo();
          M(fe, He);
        }, T = (fe) => {
          var He = yo();
          M(fe, He);
        }, Ae = (fe) => {
          var He = xo();
          Sr(He, 21, () => f(r), (Et) => Et.route, (Et, ot) => {
            var b = Eo(), N = V(b), Q = V(N), ee = w(Q, 2), ie = ye(ee, !0), Ne = w(ee, 2);
            {
              var Ze = (ve) => {
                var he = wo();
                M(ve, he);
              };
              J(Ne, (ve) => {
                f(ot).visible || ve(Ze);
              });
            }
            var Qe = w(Ne, 2);
            {
              var me = (ve) => {
                var he = ko();
                M(ve, he);
              };
              J(Qe, (ve) => {
                f(ot).published || ve(me);
              });
            }
            ne(
              (ve) => {
                Ts(b, `padding-inline-start: calc(var(--mm-indent) * ${f(ot).depth ?? ""})`), Cn(Q, ve), pe(ie, f(ot).menu || f(ot).title);
              },
              [() => f(i).has(f(ot).route)]
            ), F("change", Q, () => _(f(ot).route)), M(Et, b);
          }), M(fe, He);
        };
        J(oe, (fe) => {
          f(a) ? fe(ue) : f(l) ? fe(g, 1) : f(r).length ? fe(Ae, -1) : fe(T, 2);
        });
      }
      var gn = w($, 2), bn = V(gn), Pr = ye(bn);
      ne(() => {
        bn.disabled = !f(i).size, pe(Pr, `Add ${(f(i).size || "") ?? ""} selected`);
      }), Xt(te, () => f(s), (fe) => E(s, fe)), F("click", bn, p), M(I, H);
    }, R = (I) => {
      var H = To(), $ = w(V(H), 2), te = w($, 4), oe = w(te, 2), ue = w(oe, 6), g = w(ue, 4);
      Xt($, () => f(u), (T) => E(u, T)), F("keydown", te, (T) => T.key === "Enter" && m()), Xt(te, () => f(c), (T) => E(c, T)), F("click", oe, m), F("keydown", ue, (T) => T.key === "Enter" && y()), Xt(ue, () => f(d), (T) => E(d, T)), F("click", g, y), M(I, H);
    }, W = (I) => {
      var H = Ao(), $ = w(V(H), 4), te = w($, 2);
      F("click", $, () => t.store.seed(!1)), F("click", te, () => t.store.seed(!0)), M(I, H);
    };
    J(X, (I) => {
      f(n) === "pages" ? I(S) : f(n) === "link" ? I(R, 1) : I(W, -1);
    });
  }
  ne(() => {
    P = Pn(G, 1, "tab svelte-1jjp3gp", null, P, { on: f(n) === "pages" }), K = Pn(q, 1, "tab svelte-1jjp3gp", null, K, { on: f(n) === "link" }), L = Pn(D, 1, "tab svelte-1jjp3gp", null, L, { on: f(n) === "seed" });
  }), F("click", G, () => E(n, "pages")), F("click", q, () => E(n, "link")), F("click", D, () => E(n, "seed")), M(e, h), _n();
}
Nr(["click", "change", "keydown"]);
var qs = /* @__PURE__ */ O("<option> </option>"), Ro = /* @__PURE__ */ O("<option>No menus yet</option>"), Mo = /* @__PURE__ */ O(`<span class="count svelte-nejbyb" title="A theme that doesn't name a menu gets the main one. Change which that is in Plugins → MAW Menus.">Not the main menu</span>`), Do = /* @__PURE__ */ O('<label class="depth svelte-nejbyb">Levels <select class="mm-input svelte-nejbyb"></select></label> <span class="count svelte-nejbyb"> </span> <!>', 1), Io = /* @__PURE__ */ O('<span class="unsaved svelte-nejbyb">Unsaved changes</span>'), No = /* @__PURE__ */ O('<button class="mm-btn danger" type="button">Delete</button>'), Po = /* @__PURE__ */ O('<button class="mm-btn ghost" type="button">Close</button>'), Oo = /* @__PURE__ */ O('<div class="mm-banner error"> </div>'), Lo = /* @__PURE__ */ O('<div class="mm-banner ok"> </div>'), Fo = /* @__PURE__ */ O('<p class="muted pad svelte-nejbyb">Loading…</p>'), Uo = /* @__PURE__ */ O(`<div class="pad svelte-nejbyb"><p class="muted svelte-nejbyb">No menus yet.</p> <p class="muted svelte-nejbyb">A theme looks for one named <code class="svelte-nejbyb">header</code>. Until that exists, the site keeps using its
        automatic page-tree navigation — so nothing changes until you are ready.</p></div>`), Bo = /* @__PURE__ */ O('<div class="cols svelte-nejbyb"><aside class="left svelte-nejbyb"><!></aside> <main class="middle svelte-nejbyb"><!></main> <aside class="right svelte-nejbyb"><!></aside></div>'), Vo = /* @__PURE__ */ O(`<div class="scrim svelte-nejbyb" role="presentation"><div class="dialog svelte-nejbyb" role="dialog" aria-modal="true" aria-label="New menu"><h2 class="svelte-nejbyb">New menu</h2> <label class="mm-label svelte-nejbyb" for="mm-title">Name</label> <input id="mm-title" class="mm-input"/> <label class="mm-label svelte-nejbyb" for="mm-id">Id</label> <input id="mm-id" class="mm-input"/> <p class="mm-help">The name a template asks for, as in <code class="svelte-nejbyb">maw_menu('header')</code>. It cannot be changed later,
        because renaming it would empty the nav with no error anywhere.</p> <div class="dialog-actions svelte-nejbyb"><button class="mm-btn ghost" type="button">Cancel</button> <button class="mm-btn primary" type="button">Create</button></div></div></div>`), Go = /* @__PURE__ */ O(`<div class="scrim svelte-nejbyb" role="presentation"><div class="dialog svelte-nejbyb" role="dialog" aria-modal="true" aria-label="Delete menu"><h2 class="svelte-nejbyb"> </h2> <p>Any template asking for <code class="svelte-nejbyb"> </code> falls back to the automatic page-tree
        navigation. This cannot be undone.</p> <div class="dialog-actions svelte-nejbyb"><button class="mm-btn ghost" type="button">Cancel</button> <button class="mm-btn danger" type="button">Delete</button></div></div></div>`), Ho = /* @__PURE__ */ O('<div class="app svelte-nejbyb"><header class="svelte-nejbyb"><select class="mm-input picker svelte-nejbyb"><!><!></select> <button class="mm-btn" type="button">New menu</button> <!> <span class="spacer svelte-nejbyb"></span> <!> <button class="mm-btn primary" type="button"> </button> <!> <!></header> <!> <!> <!></div> <!> <!>', 1);
function Ko(e, t) {
  pn(t, !0);
  let n = Ks(t, "store", 7), r = Ks(t, "onClose", 3, null), s = /* @__PURE__ */ B(!1), i = /* @__PURE__ */ B(""), l = /* @__PURE__ */ B(""), a = /* @__PURE__ */ B(!1);
  const u = (b) => b.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
  async function c() {
    const b = f(i).trim();
    if (b)
      try {
        await n().createMenu(b, f(l).trim() || u(b)), E(s, !1), E(i, ""), E(l, "");
      } catch (N) {
        n().error = N.message;
      }
  }
  async function d() {
    try {
      await n().deleteMenu(n().current.id), E(a, !1);
    } catch (b) {
      n().error = b.message;
    }
  }
  function v(b) {
    (b.ctrlKey || b.metaKey) && b.key === "s" && (b.preventDefault(), n().save()), b.key === "Escape" && (E(s, !1), E(a, !1));
  }
  function _(b, N) {
    b.target === b.currentTarget && N();
  }
  var p = Ho();
  Tt("keydown", ts, v);
  var m = Ct(p), y = V(m), h = V(y), x = V(h);
  Sr(x, 17, () => n().menus, (b) => b.id, (b, N) => {
    var Q = qs(), ee = ye(Q), ie = {};
    ne(() => {
      pe(ee, `${f(N).title ?? ""} (${f(N).id ?? ""})${f(N).is_default ? " — main" : ""}`), ie !== (ie = f(N).id) && (Q.value = (Q.__value = ie) ?? "");
    }), M(b, Q);
  });
  var G = w(x);
  {
    var P = (b) => {
      var N = Ro();
      N.value = N.__value = "", M(b, N);
    };
    J(G, (b) => {
      n().menus.length || b(P);
    });
  }
  var q;
  Gs(h);
  var K = w(h, 2), D = w(K, 2);
  {
    var L = (b) => {
      var N = Do(), Q = Ct(N), ee = w(V(Q));
      Sr(ee, 20, () => [1, 2, 3, 4, 5], ya, (he, mt) => {
        var or = qs(), Vi = ye(or, !0), Or = {};
        ne(() => {
          pe(Vi, mt), Or !== (Or = mt) && (or.value = (or.__value = Or) ?? "");
        }), M(he, or);
      });
      var ie;
      Gs(ee);
      var Ne = w(Q, 2), Ze = ye(Ne), Qe = w(Ne, 2);
      {
        var me = (he) => {
          var mt = Mo();
          M(he, mt);
        }, ve = /* @__PURE__ */ xe(() => {
          var he;
          return n().current && !((he = n().menus.find((mt) => mt.id === n().current.id)) != null && he.is_default);
        });
        J(Qe, (he) => {
          f(ve) && he(me);
        });
      }
      ne(() => {
        ie !== (ie = n().maxDepth) && (ee.value = (ee.__value = ie) ?? "", fs(ee, ie)), pe(Ze, `${n().count ?? ""} item${n().count === 1 ? "" : "s"}`);
      }), F("change", ee, (he) => n().setMaxDepth(Number(he.target.value))), M(b, N);
    };
    J(D, (b) => {
      n().current && b(L);
    });
  }
  var X = w(D, 4);
  {
    var S = (b) => {
      var N = Io();
      M(b, N);
    };
    J(X, (b) => {
      n().dirty && b(S);
    });
  }
  var R = w(X, 2), W = ye(R, !0), I = w(R, 2);
  {
    var H = (b) => {
      var N = No();
      F("click", N, () => E(a, !0)), M(b, N);
    };
    J(I, (b) => {
      n().current && b(H);
    });
  }
  var $ = w(I, 2);
  {
    var te = (b) => {
      var N = Po();
      F("click", N, function(...Q) {
        var ee;
        (ee = r()) == null || ee.apply(this, Q);
      }), M(b, N);
    };
    J($, (b) => {
      r() && b(te);
    });
  }
  var oe = w(y, 2);
  {
    var ue = (b) => {
      var N = Oo(), Q = ye(N, !0);
      ne(() => pe(Q, n().error)), M(b, N);
    };
    J(oe, (b) => {
      n().error && b(ue);
    });
  }
  var g = w(oe, 2);
  {
    var T = (b) => {
      var N = Lo(), Q = ye(N, !0);
      ne(() => pe(Q, n().notice)), M(b, N);
    };
    J(g, (b) => {
      n().notice && b(T);
    });
  }
  var Ae = w(g, 2);
  {
    var gn = (b) => {
      var N = Fo();
      M(b, N);
    }, bn = (b) => {
      var N = Uo();
      M(b, N);
    }, Pr = (b) => {
      var N = Bo(), Q = V(N), ee = V(Q);
      jo(ee, {
        get store() {
          return n();
        }
      });
      var ie = w(Q, 2), Ne = V(ie);
      lo(Ne, {
        get store() {
          return n();
        }
      });
      var Ze = w(ie, 2), Qe = V(Ze);
      po(Qe, {
        get store() {
          return n();
        }
      }), M(b, N);
    };
    J(Ae, (b) => {
      n().loading ? b(gn) : n().current ? b(Pr, -1) : b(bn, 1);
    });
  }
  var fe = w(m, 2);
  {
    var He = (b) => {
      var N = Vo(), Q = V(N), ee = w(V(Q), 4), ie = w(ee, 4), Ne = w(ie, 4), Ze = V(Ne), Qe = w(Ze, 2);
      ne(
        (me, ve) => {
          Qt(ie, "placeholder", me), Qe.disabled = ve;
        },
        [
          () => u(f(i)) || "header",
          () => !f(i).trim()
        ]
      ), F("click", N, (me) => _(me, () => E(s, !1))), F("keydown", ee, (me) => me.key === "Enter" && c()), Xt(ee, () => f(i), (me) => E(i, me)), Xt(ie, () => f(l), (me) => E(l, me)), F("click", Ze, () => E(s, !1)), F("click", Qe, c), M(b, N);
    };
    J(fe, (b) => {
      f(s) && b(He);
    });
  }
  var Et = w(fe, 2);
  {
    var ot = (b) => {
      var N = Go(), Q = V(N), ee = V(Q), ie = ye(ee), Ne = w(ee, 2), Ze = w(V(Ne)), Qe = ye(Ze, !0), me = w(Ne, 2), ve = V(me), he = w(ve, 2);
      ne(() => {
        pe(ie, `Delete "${n().current.title ?? ""}"?`), pe(Qe, n().current.id);
      }), F("click", N, (mt) => _(mt, () => E(a, !1))), F("click", ve, () => E(a, !1)), F("click", he, d), M(b, N);
    };
    J(Et, (b) => {
      f(a) && b(ot);
    });
  }
  ne(() => {
    var b;
    h.disabled = !n().menus.length, q !== (q = ((b = n().current) == null ? void 0 : b.id) ?? "") && (h.value = (h.__value = q) ?? "", fs(h, q)), R.disabled = !n().current || n().saving || !n().dirty, pe(W, n().saving ? "Saving…" : "Save");
  }), F("change", h, (b) => n().open(b.target.value)), F("click", K, () => E(s, !0)), F("click", R, () => n().save()), M(e, p), _n();
}
Nr(["change", "click", "keydown"]);
var Kn, zn, qn, Yn, Wn, Xn, Jn, Zn, Qn, $n, er, tr, de, Rn, Wt, _r;
class zo {
  constructor({ onState: t } = {}) {
    k(this, de);
    k(
      this,
      Kn,
      /** @type {Array<object>} summaries from GET /menus */
      /* @__PURE__ */ B(Be([]))
    );
    k(this, zn, /* @__PURE__ */ B(null));
    k(this, qn, /* @__PURE__ */ B(Be([])));
    k(this, Yn, /* @__PURE__ */ B(Be(/* @__PURE__ */ new Set())));
    k(this, Wn, /* @__PURE__ */ B(null));
    k(this, Xn, /* @__PURE__ */ B(Be({})));
    k(this, Jn, /* @__PURE__ */ B(!0));
    k(this, Zn, /* @__PURE__ */ B(!1));
    k(this, Qn, /* @__PURE__ */ B(!1));
    k(this, $n, /* @__PURE__ */ B(""));
    k(this, er, /* @__PURE__ */ B(""));
    k(this, tr, /* @__PURE__ */ B(null));
    this.onState = t || (() => {
    });
  }
  get menus() {
    return f(o(this, Kn));
  }
  set menus(t) {
    E(o(this, Kn), t, !0);
  }
  get current() {
    return f(o(this, zn));
  }
  set current(t) {
    E(o(this, zn), t, !0);
  }
  get items() {
    return f(o(this, qn));
  }
  set items(t) {
    E(o(this, qn), t, !0);
  }
  get collapsed() {
    return f(o(this, Yn));
  }
  set collapsed(t) {
    E(o(this, Yn), t, !0);
  }
  get selected() {
    return f(o(this, Wn));
  }
  set selected(t) {
    E(o(this, Wn), t, !0);
  }
  get resolved() {
    return f(o(this, Xn));
  }
  set resolved(t) {
    E(o(this, Xn), t, !0);
  }
  get loading() {
    return f(o(this, Jn));
  }
  set loading(t) {
    E(o(this, Jn), t, !0);
  }
  get saving() {
    return f(o(this, Zn));
  }
  set saving(t) {
    E(o(this, Zn), t, !0);
  }
  get dirty() {
    return f(o(this, Qn));
  }
  set dirty(t) {
    E(o(this, Qn), t, !0);
  }
  get error() {
    return f(o(this, $n));
  }
  set error(t) {
    E(o(this, $n), t, !0);
  }
  get notice() {
    return f(o(this, er));
  }
  set notice(t) {
    E(o(this, er), t, !0);
  }
  get baseRev() {
    return f(o(this, tr));
  }
  set baseRev(t) {
    E(o(this, tr), t, !0);
  }
  get maxDepth() {
    var t;
    return ((t = this.current) == null ? void 0 : t.max_depth) || 2;
  }
  get rows() {
    return Je(this.items, this.collapsed);
  }
  get selectedItem() {
    return this.selected ? ar(this.items, this.selected) : null;
  }
  get count() {
    return Fi(this.items);
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
      this.menus = await bt.list() || [];
      const s = t || ((n = this.current) == null ? void 0 : n.id) || ((r = this.menus[0]) == null ? void 0 : r.id) || null;
      s ? await this.open(s) : (this.current = null, this.items = []);
    } catch (s) {
      this.error = s.message;
    } finally {
      this.loading = !1, C(this, de, Rn).call(this);
    }
  }
  async open(t) {
    this.error = "";
    try {
      const n = await bt.get(t, !0);
      this.current = n, this.items = jn(n.items || []), this.baseRev = n.rev, this.selected = null, this.collapsed = /* @__PURE__ */ new Set(), C(this, de, _r).call(this, n.resolved || []), C(this, de, Wt).call(this, !1);
    } catch (n) {
      this.error = n.message;
    }
  }
  /** Every mutation goes through here, so dirty tracking can never be forgotten. */
  mutate(t) {
    const n = t(this.items);
    n !== this.items && (this.items = n, C(this, de, Wt).call(this, !0));
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
    const n = jn([t])[0];
    return this.mutate((r) => [...r, n]), this.selected = n.key, n;
  }
  addMany(t) {
    const n = jn(t);
    return this.mutate((r) => [...r, ...n]), n;
  }
  replaceAll(t) {
    this.mutate(() => jn(t)), this.selected = null;
  }
  update(t, n) {
    this.mutate((r) => {
      const s = (i) => i.map((l) => l.key === t ? { ...l, ...n } : { ...l, children: s(l.children || []) });
      return s(r);
    });
  }
  moveUp(t) {
    this.mutate((n) => Ja(n, t));
  }
  moveDown(t) {
    this.mutate((n) => Za(n, t));
  }
  indent(t) {
    this.mutate((n) => Qa(n, t, this.maxDepth));
  }
  outdent(t) {
    this.mutate((n) => $a(n, t));
  }
  duplicate(t) {
    this.mutate((n) => to(n, t));
  }
  remove(t) {
    this.mutate((n) => eo(n, t)), this.selected === t && (this.selected = null);
  }
  applyDrop(t, n) {
    this.mutate((r) => Xa(r, t, n));
  }
  /* -------------------------------------------------- persistence */
  async save() {
    if (!this.current || this.saving) return !1;
    this.saving = !0, this.error = "", C(this, de, Rn).call(this);
    try {
      const t = await bt.update(this.current.id, { items: this.items, base_rev: this.baseRev });
      return this.current = t, this.baseRev = t.rev, C(this, de, Wt).call(this, !1), this.flash("Saved"), await this.refreshResolved(), !0;
    } catch (t) {
      return this.error = t.status === 409 ? `${t.message} Reload to see their version, or save again to overwrite it.` : t.message, t.status === 409 && (this.baseRev = null), !1;
    } finally {
      this.saving = !1, C(this, de, Rn).call(this);
    }
  }
  async refreshResolved() {
    if (this.current)
      try {
        const t = await bt.get(this.current.id, !0);
        C(this, de, _r).call(this, t.resolved || []);
      } catch {
      }
  }
  async createMenu(t, n) {
    const r = await bt.create({ title: t, id: n || void 0, items: [], max_depth: 2 });
    return this.menus = [...this.menus, r].sort((s, i) => s.title.localeCompare(i.title)), await this.open(r.id), r;
  }
  async deleteMenu(t) {
    await bt.remove(t), this.menus = this.menus.filter((n) => n.id !== t), this.current = null, this.items = [], C(this, de, Wt).call(this, !1), await this.load();
  }
  async setMaxDepth(t) {
    this.current && (this.current = { ...this.current, max_depth: t }, C(this, de, Wt).call(this, !0));
  }
  async seed(t) {
    if (!this.current) return;
    const { items: n } = await bt.seed(this.current.id, { include_site_menu: !0 });
    t ? this.replaceAll(n) : this.addMany(n), this.flash(t ? "Rebuilt from the page tree" : "Added from the page tree");
  }
}
Kn = new WeakMap(), zn = new WeakMap(), qn = new WeakMap(), Yn = new WeakMap(), Wn = new WeakMap(), Xn = new WeakMap(), Jn = new WeakMap(), Zn = new WeakMap(), Qn = new WeakMap(), $n = new WeakMap(), er = new WeakMap(), tr = new WeakMap(), de = new WeakSet(), /** Admin2 merges this into its own {dirty, valid, busy} and uses `dirty` for the route guard. */
Rn = function() {
  this.onState({ dirty: this.dirty, busy: this.saving, valid: !0 });
}, Wt = function(t) {
  this.dirty = t, C(this, de, Rn).call(this);
}, /** Flatten the resolved tree into {key: node} so a row can show its resolved label and broken state. */
_r = function(t, n = {}) {
  for (const r of t)
    r.key && (n[r.key] = r), C(this, de, _r).call(this, r.children || [], n);
  return this.resolved = n, n;
};
const Ys = "__MAW_CSS__", Ws = window.__GRAV_FIELD_TAG || "grav-maw-menus--menus", qo = "maw-menus-host";
var nr, rr, jr, nt, Ot, Lt, Ht, Bi, ds;
class Yo extends HTMLElement {
  constructor() {
    super(...arguments);
    k(this, Ht);
    k(this, nr, null);
    k(this, rr, null);
    k(this, jr, null);
    k(this, nt, null);
    k(this, Ot, null);
    k(this, Lt, null);
  }
  set field(n) {
    A(this, nr, n);
  }
  get field() {
    return o(this, nr);
  }
  set value(n) {
    JSON.stringify(n ?? null) !== o(this, jr) && A(this, rr, n ?? null);
  }
  get value() {
    return o(this, rr);
  }
  connectedCallback() {
    const n = this.shadowRoot || this.attachShadow({ mode: "open" });
    if (n.childElementCount) return;
    const r = document.createElement("style");
    r.textContent = Ys + `
      .launch { display: flex; align-items: center; gap: 10px; }
      .launch p { margin: 0; color: var(--mm-muted-fg); }
    `, n.appendChild(r);
    const s = document.createElement("div");
    s.className = "mm-root launch", s.style.position = "static";
    const i = document.createElement("button");
    i.type = "button", i.className = "mm-btn primary", i.textContent = "Open the menu builder", i.addEventListener("click", () => C(this, Ht, Bi).call(this));
    const l = document.createElement("p");
    l.textContent = "Menus are stored separately from this form and save on their own.", s.append(i, l), n.appendChild(s);
  }
  disconnectedCallback() {
    queueMicrotask(() => {
      this.isConnected || C(this, Ht, ds).call(this);
    });
  }
}
nr = new WeakMap(), rr = new WeakMap(), jr = new WeakMap(), nt = new WeakMap(), Ot = new WeakMap(), Lt = new WeakMap(), Ht = new WeakSet(), Bi = function() {
  if (o(this, nt)) return;
  A(this, nt, document.createElement(qo)), o(this, nt).style.cssText = "position: fixed; inset: 0; z-index: 2147483000;", document.body.appendChild(o(this, nt));
  const n = o(this, nt).attachShadow({ mode: "open" }), r = document.createElement("style");
  r.textContent = Ys + `
      .mm-root { position: fixed; inset: 0; background: var(--mm-bg); padding: 16px; overflow: auto; }
    `, n.appendChild(r);
  const s = document.createElement("div");
  s.className = "mm-root", n.appendChild(s), A(this, Lt, new zo({})), A(this, Ot, _a(Ko, { target: s, props: { store: o(this, Lt), onClose: () => C(this, Ht, ds).call(this) } })), o(this, Lt).load();
}, ds = function() {
  var n;
  o(this, Ot) && ga(o(this, Ot)), (n = o(this, nt)) == null || n.remove(), A(this, Ot, null), A(this, nt, null), A(this, Lt, null);
};
customElements.get(Ws) || customElements.define(Ws, Yo);
