/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  spinner_styles_default
} from "./chunk.QESVOJGD.js";
import {
  CornerstoneElement,
  customElement
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

// src/components/spinner/spinner.ts
var CsSpinner = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
  }
  render() {
    return b`
      <svg
        part="spinner"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `;
  }
};
CsSpinner.css = spinner_styles_default;
CsSpinner = __decorateClass([
  customElement("cs-spinner")
], CsSpinner);

export {
  CsSpinner
};
