/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  progress_bar_styles_default
} from "./chunk.II2LMJ7B.js";
import {
  clamp
} from "./chunk.VJSGOTOR.js";
import {
  o
} from "./chunk.OFJBXFXN.js";
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

// src/components/progress-bar/progress-bar.ts
var CsProgressBar = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.indeterminate = false;
    this.label = "";
  }
  willUpdate(changedProperties) {
    if (this.style == null) {
      this.setStyleProperty("--percentage", `${clamp(this.value, 0, 100)}%`);
    }
    super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    if (changedProperties.has("value")) {
      requestAnimationFrame(() => {
        this.style.setProperty("--percentage", `${clamp(this.value, 0, 100)}%`);
      });
    }
    super.updated(changedProperties);
  }
  render() {
    return b`
      <div
        part="progress-bar"
        class="progress-bar"
        role="progressbar"
        title=${o(this.title)}
        aria-label=${this.label.length > 0 ? this.label : this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? "0" : this.value}
      >
        <div part="indicator" class="indicator">
          ${!this.indeterminate ? b` <slot id="label" part="label" class="label"></slot> ` : ""}
        </div>
      </div>
    `;
  }
};
CsProgressBar.css = progress_bar_styles_default;
__decorateClass([
  n({ type: Number, reflect: true })
], CsProgressBar.prototype, "value", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsProgressBar.prototype, "indeterminate", 2);
__decorateClass([
  n()
], CsProgressBar.prototype, "label", 2);
CsProgressBar = __decorateClass([
  customElement("cs-progress-bar")
], CsProgressBar);

export {
  CsProgressBar
};
