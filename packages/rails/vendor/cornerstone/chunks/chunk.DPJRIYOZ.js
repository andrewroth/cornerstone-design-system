/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  variants_styles_default
} from "./chunk.5AXL3WXA.js";
import {
  badge_styles_default
} from "./chunk.H3D6QFPI.js";
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

// src/components/badge/badge.ts
var CsBadge = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.appearance = "accent";
    this.pill = false;
    this.attention = "none";
  }
  render() {
    return b`
      <span part="start">
        <slot name="start"></slot>
      </span>

      <span part="badge" role="status">
        <slot></slot>
      </span>

      <span part="end">
        <slot name="end"></slot>
      </span>
    `;
  }
};
CsBadge.css = [variants_styles_default, badge_styles_default];
__decorateClass([
  n({ reflect: true })
], CsBadge.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], CsBadge.prototype, "appearance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsBadge.prototype, "pill", 2);
__decorateClass([
  n({ reflect: true })
], CsBadge.prototype, "attention", 2);
CsBadge = __decorateClass([
  customElement("cs-badge")
], CsBadge);

export {
  CsBadge
};
