/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  tab_styles_default
} from "./chunk.5OEROKM2.js";
import {
  e as e2
} from "./chunk.WDXZHMSD.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  e,
  n
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/tab/tab.ts
var id = 0;
var CsTab = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id;
    this.componentId = `cs-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.disabled = false;
    this.tabIndex = 0;
    this.slot = "nav";
    this.role = "tab";
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    if (this.disabled && !this.active) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }
  }
  render() {
    this.id = this.id?.length > 0 ? this.id : this.componentId;
    return b`
      <div
        part="tab"
        class=${e2({
      tab: true,
      "tab-active": this.active
    })}
      >
        <slot></slot>
      </div>
    `;
  }
};
CsTab.css = tab_styles_default;
__decorateClass([
  e(".tab")
], CsTab.prototype, "tab", 2);
__decorateClass([
  n({ reflect: true })
], CsTab.prototype, "panel", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTab.prototype, "active", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTab.prototype, "disabled", 2);
__decorateClass([
  n({ type: Number, reflect: true })
], CsTab.prototype, "tabIndex", 2);
__decorateClass([
  n({ reflect: true })
], CsTab.prototype, "slot", 2);
__decorateClass([
  n({ reflect: true })
], CsTab.prototype, "role", 2);
__decorateClass([
  watch("active")
], CsTab.prototype, "handleActiveChange", 1);
__decorateClass([
  watch("disabled")
], CsTab.prototype, "handleDisabledChange", 1);
CsTab = __decorateClass([
  customElement("cs-tab")
], CsTab);

export {
  CsTab
};
