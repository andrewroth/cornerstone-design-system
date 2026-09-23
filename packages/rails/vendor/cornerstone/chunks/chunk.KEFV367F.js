/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  scroller_styles_default
} from "./chunk.2Z3UEE2I.js";
import {
  CornerstoneElement,
  customElement,
  e,
  n,
  r,
  t
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

// src/components/scroller/scroller.ts
var CsScroller = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.resizeObserver = null;
    this.canScroll = false;
    this.orientation = "horizontal";
    this.withoutScrollbar = false;
    this.withoutShadow = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!o) {
      this.resizeObserver = new ResizeObserver(() => this.updateScroll());
      this.resizeObserver.observe(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }
  handleKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      this.content.scrollTo({
        left: this.orientation === "horizontal" ? 0 : void 0,
        top: this.orientation === "vertical" ? 0 : void 0
      });
    }
    if (event.key === "End") {
      event.preventDefault();
      this.content.scrollTo({
        left: this.orientation === "horizontal" ? this.content.scrollWidth : void 0,
        top: this.orientation === "vertical" ? this.content.scrollHeight : void 0
      });
    }
  }
  handleSlotChange() {
    this.updateScroll();
  }
  updateScroll() {
    if (this.orientation === "horizontal") {
      const clientWidth = Math.ceil(this.content.clientWidth);
      const scrollLeft = Math.abs(Math.ceil(this.content.scrollLeft));
      const scrollWidth = Math.ceil(this.content.scrollWidth);
      const maxScroll = scrollWidth - clientWidth;
      this.canScroll = maxScroll > 0;
      const startShadowOpacity = Math.min(1, scrollLeft / (maxScroll * 0.05));
      const endShadowOpacity = Math.min(1, (maxScroll - scrollLeft) / (maxScroll * 0.05));
      this.style.setProperty("--start-shadow-opacity", String(startShadowOpacity || 0));
      this.style.setProperty("--end-shadow-opacity", String(endShadowOpacity || 0));
    } else {
      const clientHeight = Math.ceil(this.content.clientHeight);
      const scrollTop = Math.abs(Math.ceil(this.content.scrollTop));
      const scrollHeight = Math.ceil(this.content.scrollHeight);
      const maxScroll = scrollHeight - clientHeight;
      this.canScroll = maxScroll > 0;
      const startShadowOpacity = Math.min(1, scrollTop / (maxScroll * 0.05));
      const endShadowOpacity = Math.min(1, (maxScroll - scrollTop) / (maxScroll * 0.05));
      this.style.setProperty("--start-shadow-opacity", String(startShadowOpacity || 0));
      this.style.setProperty("--end-shadow-opacity", String(endShadowOpacity || 0));
    }
  }
  render() {
    return b`
      ${this.withoutShadow ? "" : b`
              <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
              <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
            `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        tabindex=${this.canScroll ? "0" : "-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
CsScroller.css = [scroller_styles_default];
__decorateClass([
  e("#content")
], CsScroller.prototype, "content", 2);
__decorateClass([
  r()
], CsScroller.prototype, "canScroll", 2);
__decorateClass([
  n({ reflect: true })
], CsScroller.prototype, "orientation", 2);
__decorateClass([
  n({ attribute: "without-scrollbar", type: Boolean, reflect: true })
], CsScroller.prototype, "withoutScrollbar", 2);
__decorateClass([
  n({ attribute: "without-shadow", type: Boolean, reflect: true })
], CsScroller.prototype, "withoutShadow", 2);
__decorateClass([
  t({ passive: true })
], CsScroller.prototype, "updateScroll", 1);
CsScroller = __decorateClass([
  customElement("cs-scroller")
], CsScroller);

export {
  CsScroller
};
