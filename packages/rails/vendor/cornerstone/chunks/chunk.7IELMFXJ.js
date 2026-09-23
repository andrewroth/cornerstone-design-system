/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  radio_styles_default
} from "./chunk.GXAQBWZI.js";
import {
  form_control_styles_default
} from "./chunk.GNP22RG3.js";
import {
  CornerstoneFormAssociatedElement
} from "./chunk.6URCDSBB.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  customElement,
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  o
} from "./chunk.CRKHH5GL.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/radio/radio.ts
var CsRadio = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super();
    this.checked = false;
    this.forceDisabled = false;
    this.appearance = "default";
    this.disabled = false;
    this.handleClick = () => {
      if (!this.disabled && !this.forceDisabled) {
        this.checked = true;
      }
    };
    if (!o) {
      this.addEventListener("click", this.handleClick);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.setInitialAttributes();
  }
  setInitialAttributes() {
    this.setAttribute("role", "radio");
    this.tabIndex = 0;
    this.setAttribute("aria-disabled", this.disabled || this.forceDisabled ? "true" : "false");
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("checked")) {
      this.customStates.set("checked", this.checked);
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
      if (!this.disabled && !this.forceDisabled) {
        this.tabIndex = this.checked ? 0 : -1;
      }
    }
    if (changedProperties.has("disabled") || changedProperties.has("forceDisabled")) {
      const effectivelyDisabled = this.disabled || this.forceDisabled;
      this.customStates.set("disabled", effectivelyDisabled);
      this.setAttribute("aria-disabled", effectivelyDisabled ? "true" : "false");
      if (effectivelyDisabled) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = this.checked ? 0 : -1;
      }
    }
  }
  /**
   * @override
   */
  setValue() {
  }
  render() {
    return b`
      <span part="control" class="control">
        ${this.checked ? b`
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                  <circle cx="8" cy="8" r="8" />
                </svg>
              ` : ""}
      </span>

      <slot part="label" class="label"></slot>
    `;
  }
};
CsRadio.css = [form_control_styles_default, size_styles_default, radio_styles_default];
__decorateClass([
  r()
], CsRadio.prototype, "checked", 2);
__decorateClass([
  r()
], CsRadio.prototype, "forceDisabled", 2);
__decorateClass([
  n({ reflect: true })
], CsRadio.prototype, "value", 2);
__decorateClass([
  n({ reflect: true })
], CsRadio.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], CsRadio.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean })
], CsRadio.prototype, "disabled", 2);
CsRadio = __decorateClass([
  customElement("cs-radio")
], CsRadio);
CsRadio.disableWarning?.("change-in-update");

export {
  CsRadio
};
