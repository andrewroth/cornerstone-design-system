/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  split_panel_styles_default
} from "./chunk.PVIQ47SM.js";
import {
  drag
} from "./chunk.CIU2UIYH.js";
import {
  CsRepositionEvent
} from "./chunk.REJ5RFTA.js";
import {
  clamp
} from "./chunk.VJSGOTOR.js";
import {
  o as o2
} from "./chunk.OFJBXFXN.js";
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
  o
} from "./chunk.CRKHH5GL.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/split-panel/split-panel.ts
var CsSplitPanel = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.isCollapsed = false;
    this.localize = new LocalizeController(this);
    this.positionBeforeCollapsing = 0;
    this.position = 50;
    this.orientation = "horizontal";
    this.disabled = false;
    this.snapThreshold = 12;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!o) {
      this.resizeObserver = new ResizeObserver((entries) => this.handleResize(entries));
      this.updateComplete.then(() => this.resizeObserver.observe(this));
      this.detectSize();
      this.cachedPositionInPixels = this.percentageToPixels(this.position);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.unobserve(this);
  }
  detectSize() {
    const { width, height } = this.getBoundingClientRect();
    this.size = this.orientation === "vertical" ? height : width;
  }
  percentageToPixels(value) {
    return this.size * (value / 100);
  }
  pixelsToPercentage(value) {
    return value / this.size * 100;
  }
  handleDrag(event) {
    const isRtl = this.didSSR && !this.hasUpdated ? this.dir === "rtl" : this.localize.dir() === "rtl";
    if (this.disabled) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    drag(this, {
      onMove: (x, y) => {
        let newPositionInPixels = this.orientation === "vertical" ? y : x;
        if (this.primary === "end") {
          newPositionInPixels = this.size - newPositionInPixels;
        }
        if (this.snap) {
          const snaps = this.snap.split(" ");
          snaps.forEach((value) => {
            let snapPoint;
            if (value.endsWith("%")) {
              snapPoint = this.size * (parseFloat(value) / 100);
            } else {
              snapPoint = parseFloat(value);
            }
            if (isRtl && this.orientation === "horizontal") {
              snapPoint = this.size - snapPoint;
            }
            if (newPositionInPixels >= snapPoint - this.snapThreshold && newPositionInPixels <= snapPoint + this.snapThreshold) {
              newPositionInPixels = snapPoint;
            }
          });
        }
        this.position = clamp(this.pixelsToPercentage(newPositionInPixels), 0, 100);
      },
      initialEvent: event
    });
  }
  handleKeyDown(event) {
    if (this.disabled) {
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Enter"].includes(event.key)) {
      let newPosition = this.position;
      const incr = (event.shiftKey ? 10 : 1) * (this.primary === "end" ? -1 : 1);
      event.preventDefault();
      if (event.key === "ArrowLeft" && this.orientation === "horizontal" || event.key === "ArrowUp" && this.orientation === "vertical") {
        newPosition -= incr;
      }
      if (event.key === "ArrowRight" && this.orientation === "horizontal" || event.key === "ArrowDown" && this.orientation === "vertical") {
        newPosition += incr;
      }
      if (event.key === "Home") {
        newPosition = this.primary === "end" ? 100 : 0;
      }
      if (event.key === "End") {
        newPosition = this.primary === "end" ? 0 : 100;
      }
      if (event.key === "Enter") {
        if (this.isCollapsed) {
          newPosition = this.positionBeforeCollapsing;
          this.isCollapsed = false;
        } else {
          const positionBeforeCollapsing = this.position;
          newPosition = 0;
          requestAnimationFrame(() => {
            this.isCollapsed = true;
            this.positionBeforeCollapsing = positionBeforeCollapsing;
          });
        }
      }
      this.position = clamp(newPosition, 0, 100);
    }
  }
  handleResize(entries) {
    const { width, height } = entries[0].contentRect;
    this.size = this.orientation === "vertical" ? height : width;
    if (isNaN(this.cachedPositionInPixels) || this.position === Infinity) {
      this.cachedPositionInPixels = Number(this.getAttribute("position-in-pixels"));
      this.positionInPixels = Number(this.getAttribute("position-in-pixels"));
      this.position = this.pixelsToPercentage(this.positionInPixels);
    }
    if (this.primary) {
      const newPosition = this.pixelsToPercentage(this.cachedPositionInPixels);
      if (this.position !== newPosition) {
        this.position = newPosition;
      }
    }
  }
  handlePositionChange() {
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
    const newPositionInPixels = this.percentageToPixels(this.position);
    if (this.positionInPixels !== newPositionInPixels) {
      this.positionInPixels = newPositionInPixels;
    }
    this.isCollapsed = false;
    this.positionBeforeCollapsing = 0;
    this.dispatchEvent(new CsRepositionEvent());
  }
  handlePositionInPixelsChange() {
    const newPosition = this.pixelsToPercentage(this.positionInPixels);
    if (this.position !== newPosition) {
      this.position = newPosition;
    }
  }
  handleVerticalChange() {
    this.detectSize();
  }
  updateStyles() {
    const gridTemplate = this.orientation === "vertical" ? "gridTemplateRows" : "gridTemplateColumns";
    const gridTemplateAlt = this.orientation === "vertical" ? "gridTemplateColumns" : "gridTemplateRows";
    const isRtl = this.hasUpdated ? this.localize.dir() === "rtl" : this.dir === "rtl";
    const primary = `
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `;
    const secondary = "auto";
    if (this.primary === "end") {
      if (isRtl && this.orientation === "horizontal") {
        this.setStyle(gridTemplate, `${primary} var(--divider-width) ${secondary}`);
      } else {
        this.setStyle(gridTemplate, `${secondary} var(--divider-width) ${primary}`);
      }
    } else {
      if (isRtl && this.orientation === "horizontal") {
        this.setStyle(gridTemplate, `${secondary} var(--divider-width) ${primary}`);
      } else {
        this.setStyle(gridTemplate, `${primary} var(--divider-width) ${secondary}`);
      }
    }
    this.setStyle(gridTemplateAlt, "unset");
  }
  willUpdate(changedProperties) {
    if (!this.style) {
      this.updateStyles();
    }
    super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
  }
  render() {
    if (this.style) {
      this.updateStyles();
    }
    return b`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${o2(this.disabled ? void 0 : "0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `;
  }
};
CsSplitPanel.css = split_panel_styles_default;
__decorateClass([
  e(".divider")
], CsSplitPanel.prototype, "divider", 2);
__decorateClass([
  n({ type: Number, reflect: true })
], CsSplitPanel.prototype, "position", 2);
__decorateClass([
  n({ attribute: "position-in-pixels", type: Number })
], CsSplitPanel.prototype, "positionInPixels", 2);
__decorateClass([
  n({ reflect: true })
], CsSplitPanel.prototype, "orientation", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSplitPanel.prototype, "disabled", 2);
__decorateClass([
  n()
], CsSplitPanel.prototype, "primary", 2);
__decorateClass([
  n()
], CsSplitPanel.prototype, "snap", 2);
__decorateClass([
  n({ type: Number, attribute: "snap-threshold" })
], CsSplitPanel.prototype, "snapThreshold", 2);
__decorateClass([
  watch("position")
], CsSplitPanel.prototype, "handlePositionChange", 1);
__decorateClass([
  watch("positionInPixels")
], CsSplitPanel.prototype, "handlePositionInPixelsChange", 1);
__decorateClass([
  watch("vertical")
], CsSplitPanel.prototype, "handleVerticalChange", 1);
CsSplitPanel = __decorateClass([
  customElement("cs-split-panel")
], CsSplitPanel);

export {
  CsSplitPanel
};
