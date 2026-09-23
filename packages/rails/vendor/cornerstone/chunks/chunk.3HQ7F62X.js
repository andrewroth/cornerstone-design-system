/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  HasSlotController
} from "./chunk.25L55TBI.js";
import {
  card_styles_default
} from "./chunk.V7NOL4OB.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  e
} from "./chunk.WDXZHMSD.js";
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

// src/components/card/card.ts
var CsCard = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(
      this,
      "footer",
      "header",
      "media",
      "header-actions",
      "footer-actions"
    );
    this.appearance = "outlined";
    this.hasHeader = false;
    this.hasMedia = false;
    this.hasFooter = false;
    this.ssrHeaderActions = false;
    this.ssrFooterActions = false;
    this.orientation = "vertical";
  }
  willUpdate(changedProperties) {
    this.hasHeader = this.hasSlotController.test("header", "hasHeader");
    this.hasMedia = this.hasSlotController.test("media", "hasMedia");
    this.hasFooter = this.hasSlotController.test("footer", "hasFooter");
    super.willUpdate(changedProperties);
  }
  render() {
    if (this.orientation === "horizontal") {
      return b`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `;
    }
    const hasHeaderActions = this.hasSlotController.test("header-actions", "ssrHeaderActions");
    const hasFooterActions = this.hasSlotController.test("footer-actions", "ssrFooterActions");
    return b`
      <slot name="media" part="media" class="media"></slot>

      <header
        part="header"
        class=${e({
      header: true,
      "has-actions": hasHeaderActions
    })}
      >
        <slot name="header"></slot>
        <slot name="header-actions"></slot>
      </header>

      <div part="body" class="body"><slot></slot></div>

      <footer
        part="footer"
        class=${e({
      footer: true,
      "has-actions": hasFooterActions
    })}
      >
        <slot name="footer"></slot>
        <slot name="footer-actions"></slot>
      </footer>
    `;
  }
};
CsCard.css = [size_styles_default, card_styles_default];
__decorateClass([
  n({ reflect: true })
], CsCard.prototype, "appearance", 2);
__decorateClass([
  n({ attribute: "has-header", type: Boolean, reflect: true })
], CsCard.prototype, "hasHeader", 2);
__decorateClass([
  n({ attribute: "has-media", type: Boolean, reflect: true })
], CsCard.prototype, "hasMedia", 2);
__decorateClass([
  n({ attribute: "has-footer", type: Boolean, reflect: true })
], CsCard.prototype, "hasFooter", 2);
__decorateClass([
  n({ attribute: "ssr-header-actions", type: Boolean, reflect: true })
], CsCard.prototype, "ssrHeaderActions", 2);
__decorateClass([
  n({ attribute: "ssr-footer-actions", type: Boolean, reflect: true })
], CsCard.prototype, "ssrFooterActions", 2);
__decorateClass([
  n({ reflect: true })
], CsCard.prototype, "orientation", 2);
CsCard = __decorateClass([
  customElement("cs-card")
], CsCard);
CsCard.disableWarning?.("change-in-update");

export {
  CsCard
};
