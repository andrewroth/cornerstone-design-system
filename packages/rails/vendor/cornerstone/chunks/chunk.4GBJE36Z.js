/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsResizeEvent
} from "./chunk.AJRAHE5B.js";
import {
  resize_observer_styles_default
} from "./chunk.H7DREWD4.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  n
} from "./chunk.VO5P54JZ.js";
import {
  o
} from "./chunk.CRKHH5GL.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/resize-observer/resize-observer.ts
var CsResizeObserver = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.observedElements = [];
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!o) {
      this.resizeObserver = new ResizeObserver((entries) => {
        this.dispatchEvent(new CsResizeEvent({ entries }));
      });
      if (!this.disabled) {
        this.updateComplete.then(() => {
          this.startObserver();
        });
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }
  handleSlotChange() {
    if (!this.disabled) {
      this.startObserver();
    }
  }
  startObserver() {
    const slot = this.shadowRoot.querySelector("slot");
    if (slot !== null) {
      const elements = slot.assignedElements({ flatten: true });
      this.observedElements.forEach((el) => this.resizeObserver.unobserve(el));
      this.observedElements = [];
      elements.forEach((el) => {
        this.resizeObserver.observe(el);
        this.observedElements.push(el);
      });
    }
  }
  stopObserver() {
    this.resizeObserver.disconnect();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  render() {
    return b` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
CsResizeObserver.css = resize_observer_styles_default;
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsResizeObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], CsResizeObserver.prototype, "handleDisabledChange", 1);
CsResizeObserver = __decorateClass([
  customElement("cs-resize-observer")
], CsResizeObserver);

export {
  CsResizeObserver
};
