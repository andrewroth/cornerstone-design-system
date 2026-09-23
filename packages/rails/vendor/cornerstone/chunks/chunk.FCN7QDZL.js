/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  progress_ring_styles_default
} from "./chunk.P6XFQMFP.js";
import {
  o
} from "./chunk.AFMAZM55.js";
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

// src/components/progress-ring/progress-ring.ts
var CsProgressRing = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.label = "";
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value")) {
      const radius = parseFloat(getComputedStyle(this.indicator).getPropertyValue("r"));
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - this.value / 100 * circumference;
      this.indicatorOffset = `${offset}px`;
    }
  }
  render() {
    return b`
      <div
        part="progress-ring"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length > 0 ? this.label : this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style=${o({ "--percentage": this.value / 100 })}
      >
        <svg class="image">
          <circle part="track" class="track"></circle>
          <circle
            part="indicator"
            class="indicator"
            style=${o({ "stroke-dashoffset": this.indicatorOffset })}
          ></circle>
        </svg>

        <slot id="label" part="label" class="label"></slot>
      </div>
    `;
  }
};
CsProgressRing.css = progress_ring_styles_default;
__decorateClass([
  e(".indicator")
], CsProgressRing.prototype, "indicator", 2);
__decorateClass([
  r()
], CsProgressRing.prototype, "indicatorOffset", 2);
__decorateClass([
  n({ type: Number, reflect: true })
], CsProgressRing.prototype, "value", 2);
__decorateClass([
  n()
], CsProgressRing.prototype, "label", 2);
CsProgressRing = __decorateClass([
  customElement("cs-progress-ring")
], CsProgressRing);
CsProgressRing.disableWarning?.("change-in-update");

export {
  CsProgressRing
};
