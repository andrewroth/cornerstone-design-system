/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  divider_styles_default
} from "./chunk.XLOBPW3J.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  n
} from "./chunk.VO5P54JZ.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/divider/divider.ts
var CsDivider = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.orientation = "horizontal";
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.orientation);
  }
};
CsDivider.css = divider_styles_default;
__decorateClass([
  n({ reflect: true })
], CsDivider.prototype, "orientation", 2);
__decorateClass([
  watch("orientation")
], CsDivider.prototype, "handleVerticalChange", 1);
CsDivider = __decorateClass([
  customElement("cs-divider")
], CsDivider);

export {
  CsDivider
};
