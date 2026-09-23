/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsAccordionItemCollapsedEvent
} from "./chunk.XJ36J6OZ.js";
import {
  CsAccordionItemExpandedEvent
} from "./chunk.2MQX2VB4.js";
import {
  CsAccordionItemTriggerEvent
} from "./chunk.3YQX52WM.js";
import {
  waitForEvent
} from "./chunk.EVAGGOC2.js";
import {
  animate,
  parseDuration
} from "./chunk.HC2QZ77X.js";
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
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  accordion_item_styles_default
} from "./chunk.74O2IAEM.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/accordion-item/accordion-item.ts
var CsAccordionItem = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.animationGeneration = 0;
    this.localize = new LocalizeController(this);
    this.isAnimating = false;
    this.label = "";
    this.expanded = false;
    this.disabled = false;
    this.headingLevel = "3";
    this.isTabbable = true;
    this.iconPlacement = "end";
    this.appearance = "outlined";
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.body.style.height = this.expanded ? "auto" : "0";
  }
  updated() {
    this.customStates.set("animating", this.isAnimating);
  }
  handleTriggerClick() {
    if (this.disabled) {
      return;
    }
    this.dispatchEvent(new CsAccordionItemTriggerEvent({ item: this }));
  }
  handleTriggerKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleTriggerClick();
    }
  }
  async handleExpandedChange() {
    this.animationGeneration++;
    const generation = this.animationGeneration;
    if (this.expanded) {
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--show-duration") || "200ms");
      const easing = getComputedStyle(this.body).getPropertyValue("--easing") || "ease";
      await animate(
        this.body,
        [
          { height: "0", opacity: "0" },
          { height: `${this.body.scrollHeight}px`, opacity: "1" }
        ],
        { duration, easing }
      );
      if (this.animationGeneration !== generation) {
        return;
      }
      this.body.style.height = "auto";
      this.isAnimating = false;
      this.dispatchEvent(new CsAccordionItemExpandedEvent());
    } else {
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--hide-duration") || "200ms");
      const easing = getComputedStyle(this.body).getPropertyValue("--easing") || "ease";
      await animate(
        this.body,
        [
          { height: `${this.body.scrollHeight}px`, opacity: "1" },
          { height: "0", opacity: "0" }
        ],
        { duration, easing }
      );
      if (this.animationGeneration !== generation) {
        return;
      }
      this.body.style.height = "0";
      this.isAnimating = false;
      this.dispatchEvent(new CsAccordionItemCollapsedEvent());
    }
  }
  /** Expands the accordion item with animation. */
  async expand() {
    if (this.expanded || this.disabled) {
      return;
    }
    this.expanded = true;
    return waitForEvent(this, "cs-accordion-item-expanded");
  }
  /** Collapses the accordion item with animation. */
  async collapse() {
    if (!this.expanded || this.disabled) {
      return;
    }
    this.expanded = false;
    return waitForEvent(this, "cs-accordion-item-collapsed");
  }
  /** Toggles the accordion item's expanded state. */
  async toggle() {
    return this.expanded ? this.collapse() : this.expand();
  }
  /** Focuses the accordion item's trigger button. */
  focus(options) {
    this.triggerButton?.focus(options);
  }
  renderHeadingWrapper(content) {
    const level = parseInt(this.headingLevel, 10);
    switch (level >= 1 && level <= 6 ? level : 3) {
      case 1:
        return b`<h1 part="heading">${content}</h1>`;
      case 2:
        return b`<h2 part="heading">${content}</h2>`;
      case 4:
        return b`<h4 part="heading">${content}</h4>`;
      case 5:
        return b`<h5 part="heading">${content}</h5>`;
      case 6:
        return b`<h6 part="heading">${content}</h6>`;
      default:
        return b`<h3 part="heading">${content}</h3>`;
    }
  }
  render() {
    const isRtl = !this.hasUpdated ? this.dir === "rtl" : this.localize.dir() === "rtl";
    const button = b`
      <button
        part="button"
        type="button"
        id="trigger"
        aria-expanded=${this.expanded ? "true" : "false"}
        aria-controls="panel"
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled || !this.isTabbable ? "-1" : "0"}
        @click=${this.handleTriggerClick}
        @keydown=${this.handleTriggerKeyDown}
      >
        <slot name="label" part="label">${this.label}</slot>
        <span part="icon">
          <slot name="icon">
            <cs-icon library="system" name=${isRtl ? "keyboard_arrow_left" : "keyboard_arrow_right"}></cs-icon>
          </slot>
        </span>
      </button>
    `;
    return b`
      <div part="accordion-item">
        ${this.headingLevel === "none" ? button : this.renderHeadingWrapper(button)}
        <div
          part="panel"
          id="panel"
          class=${e2({ body: true, animating: this.isAnimating })}
          role="region"
          aria-labelledby="trigger"
        >
          <slot part="content" class="content"></slot>
        </div>
      </div>
    `;
  }
};
CsAccordionItem.css = accordion_item_styles_default;
__decorateClass([
  e(".body")
], CsAccordionItem.prototype, "body", 2);
__decorateClass([
  e('[part~="button"]')
], CsAccordionItem.prototype, "triggerButton", 2);
__decorateClass([
  r()
], CsAccordionItem.prototype, "isAnimating", 2);
__decorateClass([
  n()
], CsAccordionItem.prototype, "label", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsAccordionItem.prototype, "expanded", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsAccordionItem.prototype, "disabled", 2);
__decorateClass([
  n({ attribute: "heading-level", reflect: true })
], CsAccordionItem.prototype, "headingLevel", 2);
__decorateClass([
  n({ type: Boolean, attribute: false })
], CsAccordionItem.prototype, "isTabbable", 2);
__decorateClass([
  n({ attribute: "icon-placement", reflect: true })
], CsAccordionItem.prototype, "iconPlacement", 2);
__decorateClass([
  n({ reflect: true })
], CsAccordionItem.prototype, "appearance", 2);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], CsAccordionItem.prototype, "handleExpandedChange", 1);
CsAccordionItem = __decorateClass([
  customElement("cs-accordion-item")
], CsAccordionItem);

export {
  CsAccordionItem
};
