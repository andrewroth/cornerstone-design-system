/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  e,
  i,
  t
} from "./chunk.TGBJR2G4.js";
import {
  A,
  E
} from "./chunk.B2T6AD2P.js";

// ../../node_modules/lit-html/directives/unsafe-html.js
var e2 = class extends i {
  constructor(i2) {
    if (super(i2), this.it = A, i2.type !== t.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === A || null == r) return this._t = void 0, this.it = r;
    if (r === E) return r;
    if ("string" != typeof r) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.it) return this._t;
    this.it = r;
    const s = [r];
    return s.raw = s, this._t = { _$litType$: this.constructor.resultType, strings: s, values: [] };
  }
};
e2.directiveName = "unsafeHTML", e2.resultType = 1;
var o = e(e2);

export {
  o
};
/*! Bundled license information:

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
