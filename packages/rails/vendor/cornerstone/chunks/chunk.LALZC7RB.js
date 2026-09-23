/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  callout_styles_default
} from "./chunk.SR2UVBIV.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  variants_styles_default
} from "./chunk.5AXL3WXA.js";
import {
  CornerstoneElement,
  customElement,
  n
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/callout/callout.ts
var CsCallout = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.size = "m";
  }
  render() {
    return b`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `;
  }
};
CsCallout.css = [callout_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n({ reflect: true })
], CsCallout.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], CsCallout.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], CsCallout.prototype, "size", 2);
CsCallout = __decorateClass([
  customElement("cs-callout")
], CsCallout);

export {
  CsCallout
};
