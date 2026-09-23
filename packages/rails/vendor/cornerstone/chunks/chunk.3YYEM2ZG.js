/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsRemoveEvent
} from "./chunk.YS5PIYHC.js";
import {
  tag_styles_default
} from "./chunk.IY3AXBAP.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  variants_styles_default
} from "./chunk.5AXL3WXA.js";
import {
  CornerstoneElement,
  customElement,
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

// src/components/tag/tag.ts
var CsTag = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.variant = "neutral";
    this.appearance = "filled-outlined";
    this.size = "m";
    this.pill = false;
    this.withRemove = false;
  }
  handleRemoveClick() {
    this.dispatchEvent(new CsRemoveEvent());
  }
  render() {
    return b`
      <slot part="content" class="content"></slot>

      ${this.withRemove ? b`
              <cs-button
                part="remove-button"
                exportparts="button:remove-button__button"
                class="remove"
                appearance="plain"
                size=${this.size}
                @click=${this.handleRemoveClick}
                tabindex="-1"
              >
                <cs-icon name="close" library="system" label=${this.localize.term("remove")}></cs-icon>
              </cs-button>
            ` : ""}
    `;
  }
};
CsTag.css = [tag_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n({ reflect: true })
], CsTag.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], CsTag.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], CsTag.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTag.prototype, "pill", 2);
__decorateClass([
  n({ attribute: "with-remove", type: Boolean })
], CsTag.prototype, "withRemove", 2);
CsTag = __decorateClass([
  customElement("cs-tag")
], CsTag);

export {
  CsTag
};
