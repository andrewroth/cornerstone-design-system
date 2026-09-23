/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  toast_item_styles_default
} from "./chunk.L7EHZUOP.js";
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
  HasSlotController
} from "./chunk.25L55TBI.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  variants_styles_default
} from "./chunk.5AXL3WXA.js";
import {
  animateWithClass
} from "./chunk.HC2QZ77X.js";
import {
  e as e2
} from "./chunk.WDXZHMSD.js";
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

// src/components/toast-item/toast-item.ts
var CsToastItem = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "icon");
    this.localize = new LocalizeController(this);
    this.animationFrame = null;
    this.startTime = null;
    this.isHovering = false;
    this.isFocused = false;
    this.timeLeft = 100;
    this.variant = "neutral";
    this.size = "m";
    this.duration = 5e3;
    this.ssrIcon = false;
    this.tick = () => {
      if (!this.startTime) {
        return;
      }
      const elapsed = performance.now() - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      this.timeLeft = 100 * (1 - progress);
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(this.tick);
      } else {
        this.hide();
      }
    };
    this.handlePointerEnter = (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        this.isHovering = true;
        this.pauseTimer();
      }
    };
    this.handlePointerLeave = () => {
      if (this.isHovering) {
        this.isHovering = false;
        this.resumeTimer();
      }
    };
    this.handleFocusIn = () => {
      this.isFocused = true;
      this.pauseTimer();
    };
    this.handleFocusOut = () => {
      this.isFocused = false;
      this.resumeTimer();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pointerenter", this.handlePointerEnter);
    this.addEventListener("pointerleave", this.handlePointerLeave);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimer();
    this.removeEventListener("pointerenter", this.handlePointerEnter);
    this.removeEventListener("pointerleave", this.handlePointerLeave);
  }
  /** @internal Starts the toast item's timer and shows it. Called by the parent toast component. */
  async startTimer() {
    const showEvent = new CsShowEvent();
    this.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) {
      return;
    }
    await this.updateComplete;
    await animateWithClass(this.toastItemElement, "show");
    this.dispatchEvent(new CsAfterShowEvent());
    if (this.duration > 0 && Number.isFinite(this.duration)) {
      this.startTime = performance.now();
      this.timeLeft = 100;
      this.tick();
    }
  }
  /** @internal Stops the toast item's timer. */
  stopTimer() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
  /** Hides the toast item with animation and removes it from the DOM. */
  async hide() {
    this.stopTimer();
    const hideEvent = new CsHideEvent();
    this.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) {
      return;
    }
    await animateWithClass(this.toastItemElement, "hide");
    this.dispatchEvent(new CsAfterHideEvent());
    this.remove();
  }
  handleCloseClick() {
    this.hide();
  }
  pauseTimer() {
    this.stopTimer();
    this.timeLeft = 100;
  }
  resumeTimer() {
    if (!this.isHovering && !this.isFocused && this.duration > 0) {
      this.startTime = performance.now();
      this.tick();
    }
  }
  render() {
    const hasIcon = this.hasSlotController.test("icon", "ssrIcon");
    const hasDuration = this.duration > 0;
    return b`
      <div
        part="toast-item"
        class=${e2({
      "toast-item": true,
      "toast-item--has-icon": hasIcon,
      "toast-item--has-duration": hasDuration
    })}
      >
        <div part="accent" class="accent"></div>

        <div part="icon" class="icon">
          <slot name="icon"></slot>
        </div>

        <div part="content" class="content">
          <slot></slot>
        </div>

        <button
          part="close-button"
          class="close-button"
          type="button"
          aria-label=${this.localize.term("close")}
          @click=${this.handleCloseClick}
          @focusin=${this.handleFocusIn}
          @focusout=${this.handleFocusOut}
        >
          <cs-progress-ring
            part="progress-ring"
            exportparts="
              progress-ring:progress-ring__progress-ring,
              label:progress-ring__label,
              track:progress-ring__track,
              indicator:progress-ring__indicator
            "
            value=${this.timeLeft}
            aria-hidden="true"
          >
            <cs-icon part="close-icon" exportparts="svg:close-icon__svg" name="close" library="system"></cs-icon>
          </cs-progress-ring>
        </button>
      </div>
    `;
  }
};
CsToastItem.css = [toast_item_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  e(".toast-item")
], CsToastItem.prototype, "toastItemElement", 2);
__decorateClass([
  r()
], CsToastItem.prototype, "timeLeft", 2);
__decorateClass([
  n({ reflect: true })
], CsToastItem.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], CsToastItem.prototype, "size", 2);
__decorateClass([
  n({ type: Number })
], CsToastItem.prototype, "duration", 2);
__decorateClass([
  n({ attribute: "ssr-icon", type: Boolean })
], CsToastItem.prototype, "ssrIcon", 2);
CsToastItem = __decorateClass([
  customElement("cs-toast-item")
], CsToastItem);

export {
  CsToastItem
};
