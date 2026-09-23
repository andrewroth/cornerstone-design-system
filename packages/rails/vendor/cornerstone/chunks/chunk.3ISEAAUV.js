/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  comparison_styles_default
} from "./chunk.AXKGCIX7.js";
import {
  drag
} from "./chunk.CIU2UIYH.js";
import {
  clamp
} from "./chunk.VJSGOTOR.js";
import {
  o
} from "./chunk.AFMAZM55.js";
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
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/comparison/comparison.ts
var CsComparison = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.position = 50;
  }
  handleDrag(event) {
    const { width } = this.getBoundingClientRect();
    const isRtl = this.localize.dir() === "rtl";
    event.preventDefault();
    drag(this, {
      onMove: (x) => {
        this.customStates.set("dragging", true);
        this.position = parseFloat(clamp(x / width * 100, 0, 100).toFixed(2));
        if (isRtl) {
          this.position = 100 - this.position;
        }
      },
      onStop: () => {
        this.customStates.set("dragging", false);
      },
      initialEvent: event
    });
  }
  handleKeyDown(event) {
    const isLtr = this.matches(":dir(ltr)");
    const isRtl = this.localize.dir() === "rtl";
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;
      event.preventDefault();
      if (isLtr && event.key === "ArrowLeft" || isRtl && event.key === "ArrowRight") {
        newPosition -= incr;
      }
      if (isLtr && event.key === "ArrowRight" || isRtl && event.key === "ArrowLeft") {
        newPosition += incr;
      }
      if (event.key === "Home") {
        newPosition = 0;
      }
      if (event.key === "End") {
        newPosition = 100;
      }
      newPosition = clamp(newPosition, 0, 100);
      this.position = newPosition;
    }
  }
  handlePositionChange() {
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === "rtl" : this.dir === "rtl";
    return b`
      <div id="comparison" class="image" part="comparison">
        <div part="before" class="before">
          <slot name="before"></slot>
        </div>

        <div
          part="after"
          class="after"
          style=${o({
      clipPath: isRtl ? `inset(0 0 0 ${100 - this.position}%)` : `inset(0 ${100 - this.position}% 0 0)`
    })}
        >
          <slot name="after"></slot>
        </div>
      </div>

      <div
        part="divider"
        class="divider"
        style=${o({
      left: isRtl ? `${100 - this.position}%` : `${this.position}%`
    })}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <div
          part="handle"
          class="handle"
          role="scrollbar"
          aria-valuenow=${this.position}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-controls="comparison"
          tabindex="0"
        >
          <slot name="handle">
            <cs-icon library="system" name="drag_indicator"></cs-icon>
          </slot>
        </div>
      </div>
    `;
  }
};
CsComparison.css = comparison_styles_default;
__decorateClass([
  e(".handle")
], CsComparison.prototype, "handle", 2);
__decorateClass([
  n({ type: Number, reflect: true })
], CsComparison.prototype, "position", 2);
__decorateClass([
  watch("position", { waitUntilFirstUpdate: true })
], CsComparison.prototype, "handlePositionChange", 1);
CsComparison = __decorateClass([
  customElement("cs-comparison")
], CsComparison);

export {
  CsComparison
};
