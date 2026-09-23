/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  breadcrumb_item_styles_default
} from "./chunk.TQHQU7J2.js";
import {
  o
} from "./chunk.OFJBXFXN.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
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

// src/components/breadcrumb-item/breadcrumb-item.ts
var CsBreadcrumbItem = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.renderType = "button";
    this.rel = "noreferrer noopener";
  }
  setRenderType() {
    const hasDropdown = this.defaultSlot.assignedElements({ flatten: true }).filter((i) => i.tagName.toLowerCase() === "cs-dropdown").length > 0;
    if (typeof this.href === "string") {
      this.renderType = "link";
      return;
    }
    if (hasDropdown) {
      this.renderType = "dropdown";
      return;
    }
    this.renderType = "button";
  }
  hrefChanged() {
    this.setRenderType();
  }
  handleSlotChange() {
    this.setRenderType();
  }
  render() {
    return b`
      <span part="start" class="start">
        <slot name="start"></slot>
      </span>

      ${this.renderType === "link" ? b`
              <a
                part="label"
                class="label label-link"
                href="${this.href}"
                target="${o(this.target ? this.target : void 0)}"
                rel=${o(this.target ? this.rel : void 0)}
              >
                <slot></slot>
              </a>
            ` : ""}
      ${this.renderType === "button" ? b`
              <button part="label" type="button" class="label label-button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            ` : ""}
      ${this.renderType === "dropdown" ? b`
              <div part="label" class="label label-dropdown">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            ` : ""}

      <span part="end" class="end">
        <slot name="end"></slot>
      </span>

      <span part="separator" class="separator" aria-hidden="true">
        <slot name="separator"></slot>
      </span>
    `;
  }
};
CsBreadcrumbItem.css = breadcrumb_item_styles_default;
__decorateClass([
  e("slot:not([name])")
], CsBreadcrumbItem.prototype, "defaultSlot", 2);
__decorateClass([
  r()
], CsBreadcrumbItem.prototype, "renderType", 2);
__decorateClass([
  n()
], CsBreadcrumbItem.prototype, "href", 2);
__decorateClass([
  n()
], CsBreadcrumbItem.prototype, "target", 2);
__decorateClass([
  n()
], CsBreadcrumbItem.prototype, "rel", 2);
__decorateClass([
  watch("href", { waitUntilFirstUpdate: true })
], CsBreadcrumbItem.prototype, "hrefChanged", 1);
CsBreadcrumbItem = __decorateClass([
  customElement("cs-breadcrumb-item")
], CsBreadcrumbItem);

export {
  CsBreadcrumbItem
};
