/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  f
} from "./chunk.AEGNXCBX.js";
import {
  D
} from "./chunk.B2T6AD2P.js";

// ../../node_modules/@lit-labs/ssr-client/lit-element-hydrate-support.js
globalThis.litElementHydrateSupport = ({ LitElement: s }) => {
  const h = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(s), "observedAttributes").get;
  Object.defineProperty(s, "observedAttributes", { get() {
    return [...h.call(this), "defer-hydration"];
  } });
  const e = s.prototype.attributeChangedCallback;
  s.prototype.attributeChangedCallback = function(t, i, s2) {
    "defer-hydration" === t && null === s2 && n.call(this), e.call(this, t, i, s2);
  };
  const n = s.prototype.connectedCallback;
  s.prototype.connectedCallback = function() {
    this.hasAttribute("defer-hydration") || n.call(this);
  };
  const o = s.prototype.createRenderRoot;
  s.prototype.createRenderRoot = function() {
    return this.shadowRoot ? (this._$AG = true, this.shadowRoot) : o.call(this);
  };
  const r = Object.getPrototypeOf(s.prototype).update;
  s.prototype.update = function(s2) {
    const h2 = this.render();
    if (r.call(this, s2), this._$AG) {
      this._$AG = false;
      for (const t of this.getAttributeNames()) if (t.startsWith("hydrate-internals-")) {
        const i = t.slice(18);
        this.removeAttribute(i), this.removeAttribute(t);
      }
      f(h2, this.renderRoot, this.renderOptions);
    } else D(h2, this.renderRoot, this.renderOptions);
  };
};
