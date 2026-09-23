/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  tab_panel_styles_default
} from "./chunk.BAAYBXBY.js";
import {
  e
} from "./chunk.WDXZHMSD.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
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

// src/components/tab-panel/tab-panel.ts
var id = 0;
var CsTabPanel = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id;
    this.componentId = `cs-tab-panel-${this.attrId}`;
    this.name = "";
    this.active = false;
    this.role = "tabpanel";
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = (this.id || "").length > 0 ? this.id : this.componentId;
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return b`
      <slot
        class=${e({
      "tab-panel": true,
      "tab-panel-active": this.active
    })}
      ></slot>
    `;
  }
};
CsTabPanel.css = tab_panel_styles_default;
__decorateClass([
  n({ reflect: true })
], CsTabPanel.prototype, "name", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTabPanel.prototype, "active", 2);
__decorateClass([
  n({ reflect: true })
], CsTabPanel.prototype, "role", 2);
__decorateClass([
  watch("active")
], CsTabPanel.prototype, "handleActiveChange", 1);
CsTabPanel = __decorateClass([
  customElement("cs-tab-panel")
], CsTabPanel);

export {
  CsTabPanel
};
