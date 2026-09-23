/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  e,
  i,
  t
} from "./chunk.TGBJR2G4.js";
import {
  p,
  r
} from "./chunk.VYYRMD7E.js";
import {
  A,
  E
} from "./chunk.B2T6AD2P.js";

// ../../node_modules/lit-html/directives/live.js
var l = e(class extends i {
  constructor(r2) {
    if (super(r2), r2.type !== t.PROPERTY && r2.type !== t.ATTRIBUTE && r2.type !== t.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r(r2)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i2, [t2]) {
    if (t2 === E || t2 === A) return t2;
    const o = i2.element, l2 = i2.name;
    if (i2.type === t.PROPERTY) {
      if (t2 === o[l2]) return E;
    } else if (i2.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l2)) return E;
    } else if (i2.type === t.ATTRIBUTE && o.getAttribute(l2) === t2 + "") return E;
    return p(i2), t2;
  }
});

export {
  l
};
/*! Bundled license information:

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
