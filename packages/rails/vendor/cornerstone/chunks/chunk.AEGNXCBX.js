/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  t
} from "./chunk.TGBJR2G4.js";
import {
  d,
  l,
  n,
  r
} from "./chunk.VYYRMD7E.js";
import {
  E,
  j
} from "./chunk.B2T6AD2P.js";

// ../../node_modules/lit-html/private-ssr-support.js
var r2 = null;
var i = { boundAttributeSuffix: j.M, marker: j.P, markerMatch: j.A, HTML_RESULT: j.C, getTemplateHtml: j.L, overrideDirectiveResolve: (e, t2) => class extends e {
  _$AS(e2, r3) {
    return t2(this, r3);
  }
}, patchDirectiveResolve: (e, t2) => {
  if (e.prototype._$AS.name !== t2.name) {
    r2 ?? (r2 = e.prototype._$AS.name);
    for (let i2 = e.prototype; i2 !== Object.prototype; i2 = Object.getPrototypeOf(i2)) if (i2.hasOwnProperty(r2)) return void (i2[r2] = t2);
    throw Error("Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527");
  }
}, setDirectiveClass(e, t2) {
  e._$litDirective$ = t2;
}, getAttributePartCommittedValue: (e, r3, i2) => {
  let o = E;
  return e.j = (e2) => o = e2, e._$AI(r3, e, i2), o;
}, connectedDisconnectable: (e) => ({ ...e, _$AU: true }), resolveDirective: j.V, AttributePart: j.H, PropertyPart: j.B, BooleanAttributePart: j.N, EventPart: j.U, ElementPart: j.F, TemplateInstance: j.R, isIterable: j.D, ChildPart: j.I };

// ../../node_modules/@lit-labs/ssr-client/lib/hydrate-lit-html.js
var { TemplateInstance: l2, isIterable: s, resolveDirective: d2, ChildPart: c, ElementPart: p } = i;
var f = (e, t2, r3 = {}) => {
  if (void 0 !== t2._$litPart$) throw Error("container already contains a live render");
  let n2, o, i2;
  const a = [], l3 = document.createTreeWalker(t2, NodeFilter.SHOW_COMMENT);
  let s2;
  for (; null !== (s2 = l3.nextNode()); ) {
    const t3 = s2.data;
    if (t3.startsWith("lit-part")) {
      if (0 === a.length && void 0 !== n2) throw Error(`There must be only one root part per container. Found a part marker (${s2}) when we already have a root part marker (${o})`);
      i2 = m(e, s2, a, r3), void 0 === n2 && (n2 = i2), o ?? (o = s2);
    } else if (t3.startsWith("lit-node")) h(s2, a, r3);
    else if (t3.startsWith("/lit-part")) {
      if (1 === a.length && i2 !== n2) throw Error("internal error");
      i2 = u(s2, i2, a);
    }
  }
  if (void 0 === n2) {
    const e2 = t2 instanceof ShadowRoot ? "{container.host.localName}'s shadow root" : t2 instanceof DocumentFragment ? "DocumentFragment" : t2.localName;
    console.error(`There should be exactly one root part in a render container, but we didn't find any in ${e2}.`);
  }
  t2._$litPart$ = n2;
};
var m = (t2, r3, a, p2) => {
  let f2, m2;
  if (0 === a.length) m2 = new c(r3, null, void 0, p2), f2 = t2;
  else {
    const e = a[a.length - 1];
    if ("template-instance" === e.type) m2 = new c(r3, null, e.instance, p2), e.instance._$AV.push(m2), f2 = e.result.values[e.instancePartIndex++], e.templatePartIndex++;
    else if ("iterable" === e.type) {
      m2 = new c(r3, null, e.part, p2);
      const t3 = e.iterator.next();
      if (t3.done) throw f2 = void 0, e.done = true, Error("Unhandled shorter than expected iterable");
      f2 = t3.value, e.part._$AH.push(m2);
    } else m2 = new c(r3, null, e.part, p2);
  }
  if (f2 = d2(m2, f2), f2 === E) a.push({ part: m2, type: "leaf" });
  else if (n(f2)) a.push({ part: m2, type: "leaf" }), m2._$AH = f2;
  else if (l(f2)) {
    if (d(f2)) throw Error("compiled templates are not supported");
    const e = "lit-part " + v(f2);
    if (r3.data !== e) throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");
    {
      const e2 = c.prototype._$AC(f2), t3 = new l2(e2, m2);
      a.push({ type: "template-instance", instance: t3, part: m2, templatePartIndex: 0, instancePartIndex: 0, result: f2 }), m2._$AH = t3;
    }
  } else s(f2) ? (a.push({ part: m2, type: "iterable", value: f2, iterator: f2[Symbol.iterator](), done: false }), m2._$AH = []) : (a.push({ part: m2, type: "leaf" }), m2._$AH = f2 ?? "");
  return m2;
};
var u = (e, t2, r3) => {
  if (void 0 === t2) throw Error("unbalanced part marker");
  t2._$AB = e;
  const n2 = r3.pop();
  if ("iterable" === n2.type && !n2.iterator.next().done) throw Error("unexpected longer than expected iterable");
  if (r3.length > 0) return r3[r3.length - 1].part;
};
var h = (e, t2, n2) => {
  const o = /lit-node (\d+)/.exec(e.data), i2 = parseInt(o[1]), l3 = e.nextElementSibling;
  if (null === l3) throw Error("could not find node for attribute parts");
  l3.removeAttribute("defer-hydration");
  const s2 = t2[t2.length - 1];
  if ("template-instance" !== s2.type) throw Error("Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.");
  {
    const e2 = s2.instance;
    for (; ; ) {
      const t3 = e2._$AD.parts[s2.templatePartIndex];
      if (void 0 === t3 || t3.type !== t.ATTRIBUTE && t3.type !== t.ELEMENT || t3.index !== i2) break;
      if (t3.type === t.ATTRIBUTE) {
        const o2 = new t3.ctor(l3, t3.name, t3.strings, s2.instance, n2), i3 = r(o2) ? s2.result.values[s2.instancePartIndex] : s2.result.values, d3 = !(o2.type === t.EVENT || o2.type === t.PROPERTY);
        o2._$AI(i3, o2, s2.instancePartIndex, d3), s2.instancePartIndex += t3.strings.length - 1, e2._$AV.push(o2);
      } else {
        const t4 = new p(l3, s2.instance, n2);
        d2(t4, s2.result.values[s2.instancePartIndex++]), e2._$AV.push(t4);
      }
      s2.templatePartIndex++;
    }
  }
};
var w = /* @__PURE__ */ new WeakMap();
var v = (e) => {
  let t2 = w.get(e.strings);
  if (void 0 !== t2) return t2;
  const r3 = new Uint32Array(2).fill(5381);
  for (const t3 of e.strings) for (let e2 = 0; e2 < t3.length; e2++) r3[e2 % 2] = 33 * r3[e2 % 2] ^ t3.charCodeAt(e2);
  const n2 = String.fromCharCode(...new Uint8Array(r3.buffer));
  return t2 = btoa(n2), w.set(e.strings, t2), t2;
};

export {
  i,
  f,
  v
};
/*! Bundled license information:

lit-html/private-ssr-support.js:
@lit-labs/ssr-client/lib/hydrate-lit-html.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
