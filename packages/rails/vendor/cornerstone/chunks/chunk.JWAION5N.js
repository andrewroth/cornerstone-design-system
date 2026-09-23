/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsAccordionAfterExpandEvent
} from "./chunk.QNZZU272.js";
import {
  CsAccordionCollapseEvent
} from "./chunk.25QWNZW6.js";
import {
  CsAccordionExpandEvent
} from "./chunk.ZTDXG7TX.js";
import {
  CsAccordionAfterCollapseEvent
} from "./chunk.XSNXTL3J.js";
import {
  accordion_styles_default
} from "./chunk.RPP2DJ2T.js";
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

// src/components/accordion/accordion.ts
var CsAccordion = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.mode = "multiple";
    this.iconPlacement = "end";
    this.headingLevel = "3";
    this.appearance = "outlined";
  }
  getAllItems() {
    return this.defaultSlot.assignedElements({ flatten: true }).filter((el) => el.tagName.toLowerCase() === "cs-accordion-item");
  }
  getFocusableItems() {
    return this.getAllItems().filter((item) => !item.disabled);
  }
  ownsItem(item) {
    return item.closest("cs-accordion") === this;
  }
  initRovingTabIndex() {
    this.getFocusableItems().forEach((item, index) => {
      item.isTabbable = index === 0;
    });
  }
  handleSlotChange() {
    if (this.didSSR) {
      const promises = [];
      this.getAllItems().forEach((item) => {
        if (item.didSSR && !item.hasUpdated) {
          promises.push(item.updateComplete);
        }
      });
      if (promises.length > 0) {
        Promise.allSettled(promises).then(() => {
          this.handleSlotChange();
        });
        return;
      }
    }
    this.syncIconPlacement();
    this.syncHeadingLevel();
    this.syncAppearance();
    this.initRovingTabIndex();
  }
  handleFocusIn(event) {
    const items = this.getFocusableItems();
    const path = event.composedPath();
    const closestItem = path.find(
      (el) => el instanceof Element && el.tagName.toLowerCase() === "cs-accordion-item"
    );
    if (!closestItem || !this.ownsItem(closestItem)) {
      return;
    }
    const focusedItem = items.find((item) => item === closestItem);
    if (!focusedItem) {
      return;
    }
    items.forEach((item) => item.isTabbable = item === focusedItem);
  }
  handleKeyDown(event) {
    const items = this.getFocusableItems();
    if (!items.length) {
      return;
    }
    const path = event.composedPath();
    const closestItem = path.find(
      (el) => el instanceof Element && el.tagName.toLowerCase() === "cs-accordion-item"
    );
    if (!closestItem || !this.ownsItem(closestItem)) {
      return;
    }
    const currentIndex = items.findIndex((item) => item.isTabbable);
    let nextIndex = currentIndex;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case "ArrowUp":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }
    items.forEach((item, index) => item.isTabbable = index === nextIndex);
    items[nextIndex].focus();
  }
  syncIconPlacement() {
    this.getAllItems().forEach((item) => item.iconPlacement = this.iconPlacement);
  }
  syncHeadingLevel() {
    this.getAllItems().forEach((item) => item.headingLevel = this.headingLevel);
  }
  syncAppearance() {
    this.getAllItems().forEach((item) => item.appearance = this.appearance);
  }
  async handleItemTrigger(event) {
    const { item } = event.detail;
    if (!this.ownsItem(item)) {
      return;
    }
    event.stopPropagation();
    if (item.disabled) {
      return;
    }
    if (item.expanded) {
      if (this.mode === "single") {
        return;
      }
      const csCollapse = new CsAccordionCollapseEvent({ item });
      this.dispatchEvent(csCollapse);
      if (csCollapse.defaultPrevented) {
        return;
      }
      await item.collapse();
      this.dispatchEvent(new CsAccordionAfterCollapseEvent({ item }));
    } else {
      if (this.mode === "single" || this.mode === "single-collapsible") {
        this.getAllItems().filter((i) => i !== item && i.expanded).forEach((i) => i.collapse());
      }
      const csExpand = new CsAccordionExpandEvent({ item });
      this.dispatchEvent(csExpand);
      if (csExpand.defaultPrevented) {
        return;
      }
      await item.expand();
      this.dispatchEvent(new CsAccordionAfterExpandEvent({ item }));
    }
  }
  /** Expands all accordion items. No-op when `mode` is `single` or `single-collapsible`. */
  expandAll() {
    if (this.mode === "single" || this.mode === "single-collapsible") {
      return;
    }
    this.getAllItems().filter((item) => !item.disabled && !item.expanded).forEach((item) => item.expand());
  }
  /** Collapses all accordion items. */
  collapseAll() {
    this.getAllItems().filter((item) => item.expanded).forEach((item) => item.collapse());
  }
  render() {
    return b`
      <slot
        @slotchange=${this.handleSlotChange}
        @cs-accordion-item-trigger=${this.handleItemTrigger}
        @focusin=${this.handleFocusIn}
        @keydown=${this.handleKeyDown}
      ></slot>
    `;
  }
};
CsAccordion.css = accordion_styles_default;
__decorateClass([
  e("slot")
], CsAccordion.prototype, "defaultSlot", 2);
__decorateClass([
  n({ reflect: true })
], CsAccordion.prototype, "mode", 2);
__decorateClass([
  n({ attribute: "icon-placement", reflect: true })
], CsAccordion.prototype, "iconPlacement", 2);
__decorateClass([
  n({ attribute: "heading-level", reflect: true })
], CsAccordion.prototype, "headingLevel", 2);
__decorateClass([
  n({ reflect: true })
], CsAccordion.prototype, "appearance", 2);
__decorateClass([
  watch("iconPlacement", { waitUntilFirstUpdate: true })
], CsAccordion.prototype, "syncIconPlacement", 1);
__decorateClass([
  watch("headingLevel", { waitUntilFirstUpdate: true })
], CsAccordion.prototype, "syncHeadingLevel", 1);
__decorateClass([
  watch("appearance", { waitUntilFirstUpdate: true })
], CsAccordion.prototype, "syncAppearance", 1);
CsAccordion = __decorateClass([
  customElement("cs-accordion")
], CsAccordion);

export {
  CsAccordion
};
