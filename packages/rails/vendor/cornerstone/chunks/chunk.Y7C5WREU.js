/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  details_styles_default
} from "./chunk.UWS3UV5Z.js";
import {
  CsShowEvent
} from "./chunk.3ZOOG3MW.js";
import {
  CsHideEvent
} from "./chunk.4UXBEDUP.js";
import {
  CsAfterHideEvent
} from "./chunk.NTVMNT4T.js";
import {
  CsAfterShowEvent
} from "./chunk.UKTDLFCP.js";
import {
  CornerstoneFormAssociatedElement
} from "./chunk.6URCDSBB.js";
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
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/details/details.ts
var CsDetails = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.animationGeneration = 0;
    this.isAnimating = false;
    this.open = false;
    this.disabled = false;
    this.appearance = "outlined";
    this.iconPlacement = "end";
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.detailsObserver?.disconnect();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.body.style.height = this.open ? "auto" : "0";
    if (this.open) {
      this.details.open = true;
    }
    this.detailsObserver = new MutationObserver((changes) => {
      for (const change of changes) {
        if (change.type === "attributes" && change.attributeName === "open") {
          if (this.details.open) {
            this.show();
          } else {
            this.hide();
          }
        }
      }
    });
    this.detailsObserver.observe(this.details, { attributes: true });
  }
  updated(changedProperties) {
    if (changedProperties.has("isAnimating")) {
      this.customStates.set("animating", this.isAnimating);
    }
  }
  handleSummaryClick(event) {
    const eventPath = event.composedPath();
    const hasInteractiveElement = eventPath.some((element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }
      const tagName = element.tagName.toLowerCase();
      if (["a", "button", "input", "textarea", "select"].includes(tagName)) {
        return true;
      }
      if (element instanceof CornerstoneFormAssociatedElement) {
        return !("disabled" in element) || !element.disabled;
      }
      return false;
    });
    if (hasInteractiveElement) {
      return;
    }
    event.preventDefault();
    if (!this.disabled) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
      this.header.focus();
    }
  }
  handleSummaryKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }
  /** Closes other <cs-details> elements in the same document when they have the same name. */
  closeOthersWithSameName() {
    if (!this.name) {
      return;
    }
    const root = this.getRootNode();
    const otherDetails = root.querySelectorAll(`cs-details[name="${this.name}"]`);
    otherDetails.forEach((detail) => {
      if (detail !== this && detail.open) {
        detail.open = false;
      }
    });
  }
  async handleOpenChange() {
    this.animationGeneration++;
    const generation = this.animationGeneration;
    if (this.open) {
      this.details.open = true;
      const csShow = new CsShowEvent();
      this.dispatchEvent(csShow);
      if (csShow.defaultPrevented) {
        this.open = false;
        this.details.open = false;
        return;
      }
      this.closeOthersWithSameName();
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--show-duration"));
      await animate(
        this.body,
        [
          { height: "0", opacity: "0" },
          { height: `${this.body.scrollHeight}px`, opacity: "1" }
        ],
        {
          duration,
          easing: "linear"
        }
      );
      if (this.animationGeneration !== generation) {
        return;
      }
      this.body.style.height = "auto";
      this.isAnimating = false;
      this.dispatchEvent(new CsAfterShowEvent());
    } else {
      const csHide = new CsHideEvent();
      this.dispatchEvent(csHide);
      if (csHide.defaultPrevented) {
        this.details.open = true;
        this.open = true;
        return;
      }
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--hide-duration"));
      await animate(
        this.body,
        [
          { height: `${this.body.scrollHeight}px`, opacity: "1" },
          { height: "0", opacity: "0" }
        ],
        { duration, easing: "linear" }
      );
      if (this.animationGeneration !== generation) {
        return;
      }
      this.body.style.height = "0";
      this.isAnimating = false;
      this.details.open = false;
      this.dispatchEvent(new CsAfterHideEvent());
    }
  }
  /** Shows the details. */
  async show() {
    if (this.open || this.disabled) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "cs-after-show");
  }
  /** Hides the details */
  async hide() {
    if (!this.open || this.disabled) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "cs-after-hide");
  }
  render() {
    const isRtl = !this.hasUpdated ? this.dir === "rtl" : this.localize.dir() === "rtl";
    return b`
      <details part="details">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="content"
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <cs-icon library="system" name=${isRtl ? "keyboard_arrow_left" : "keyboard_arrow_right"}></cs-icon>
            </slot>
            <slot name="collapse-icon">
              <cs-icon library="system" name=${isRtl ? "keyboard_arrow_left" : "keyboard_arrow_right"}></cs-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${e2({
      body: true,
      animating: this.isAnimating
    })}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `;
  }
};
CsDetails.css = details_styles_default;
__decorateClass([
  e("details")
], CsDetails.prototype, "details", 2);
__decorateClass([
  e("summary")
], CsDetails.prototype, "header", 2);
__decorateClass([
  e(".body")
], CsDetails.prototype, "body", 2);
__decorateClass([
  e(".expand-icon-slot")
], CsDetails.prototype, "expandIconSlot", 2);
__decorateClass([
  r()
], CsDetails.prototype, "isAnimating", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsDetails.prototype, "open", 2);
__decorateClass([
  n()
], CsDetails.prototype, "summary", 2);
__decorateClass([
  n({ reflect: true })
], CsDetails.prototype, "name", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsDetails.prototype, "disabled", 2);
__decorateClass([
  n({ reflect: true })
], CsDetails.prototype, "appearance", 2);
__decorateClass([
  n({ attribute: "icon-placement", reflect: true })
], CsDetails.prototype, "iconPlacement", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], CsDetails.prototype, "handleOpenChange", 1);
CsDetails = __decorateClass([
  customElement("cs-details")
], CsDetails);

export {
  CsDetails
};
