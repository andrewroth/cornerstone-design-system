/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  button_group_styles_default
} from "./chunk.DP64BJVX.js";
import {
  CornerstoneElement,
  customElement,
  e,
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/button-group/button-group.ts
var CsButtonGroup = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.disableRole = false;
    this.hasOutlined = false;
    this.label = "";
    this.orientation = "horizontal";
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("orientation")) {
      this.setAttribute("aria-orientation", this.orientation);
    }
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button?.classList.add("button-focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button?.classList.remove("button-focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button?.classList.add("button-hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button?.classList.remove("button-hover");
  }
  render() {
    return b`
      <slot
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `;
  }
};
CsButtonGroup.css = [button_group_styles_default];
__decorateClass([
  e("slot")
], CsButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  r()
], CsButtonGroup.prototype, "disableRole", 2);
__decorateClass([
  r()
], CsButtonGroup.prototype, "hasOutlined", 2);
__decorateClass([
  n()
], CsButtonGroup.prototype, "label", 2);
__decorateClass([
  n({ reflect: true })
], CsButtonGroup.prototype, "orientation", 2);
CsButtonGroup = __decorateClass([
  customElement("cs-button-group")
], CsButtonGroup);
function findButton(el) {
  const selector = "cs-button, cs-radio-button";
  return el.closest(selector) ?? el.querySelector(selector);
}

export {
  CsButtonGroup
};
