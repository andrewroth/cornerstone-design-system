/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  breadcrumb_styles_default
} from "./chunk.CVIHRYYP.js";
import {
  CornerstoneElement,
  customElement,
  e,
  n
} from "./chunk.VO5P54JZ.js";
import {
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/breadcrumb/breadcrumb.ts
var CsBreadcrumb = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.separatorDir = this.localize.dir();
    this.label = "";
  }
  // Generates a clone of the separator element to use for each breadcrumb item
  getSeparator() {
    const separator = this.separatorSlot.assignedElements({ flatten: true })[0];
    const clone = separator.cloneNode(true);
    [clone, ...clone.querySelectorAll("[id]")].forEach((el) => el.removeAttribute("id"));
    clone.setAttribute("data-default", "");
    clone.slot = "separator";
    return clone;
  }
  handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
      (item) => item.tagName.toLowerCase() === "cs-breadcrumb-item"
    );
    items.forEach((item, index) => {
      const separator = item.querySelector('[slot="separator"]');
      if (separator === null) {
        item.append(this.getSeparator());
      } else if (separator.hasAttribute("data-default")) {
        separator.replaceWith(this.getSeparator());
      } else {
      }
      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }
  render() {
    if (this.separatorDir !== this.localize.dir()) {
      this.separatorDir = this.localize.dir();
      this.updateComplete.then(() => this.handleSlotChange());
    }
    return b`
      <nav part="breadcrumb" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <cs-icon
            name=${this.localize.dir() === "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right"}
            library="system"
          ></cs-icon>
        </slot>
      </span>
    `;
  }
};
CsBreadcrumb.css = breadcrumb_styles_default;
__decorateClass([
  e("slot")
], CsBreadcrumb.prototype, "defaultSlot", 2);
__decorateClass([
  e('slot[name="separator"]')
], CsBreadcrumb.prototype, "separatorSlot", 2);
__decorateClass([
  n()
], CsBreadcrumb.prototype, "label", 2);
CsBreadcrumb = __decorateClass([
  customElement("cs-breadcrumb")
], CsBreadcrumb);

export {
  CsBreadcrumb
};
