/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CornerstoneElement,
  customElement,
  n
} from "./chunk.VO5P54JZ.js";
import {
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/format-bytes/format-bytes.ts
var CsFormatBytes = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.unit = "byte";
    this.display = "short";
  }
  static get styles() {
    return [];
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    const bitPrefixes = ["", "kilo", "mega", "giga", "tera"];
    const bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"];
    const prefix = this.unit === "bit" ? bitPrefixes : bytePrefixes;
    const index = Math.max(0, Math.min(Math.floor(Math.log10(this.value) / 3), prefix.length - 1));
    const unit = prefix[index] + this.unit;
    const valueToFormat = parseFloat((this.value / Math.pow(1e3, index)).toPrecision(3));
    return this.localize.number(valueToFormat, {
      style: "unit",
      unit,
      unitDisplay: this.display
    });
  }
};
__decorateClass([
  n({ type: Number })
], CsFormatBytes.prototype, "value", 2);
__decorateClass([
  n()
], CsFormatBytes.prototype, "unit", 2);
__decorateClass([
  n()
], CsFormatBytes.prototype, "display", 2);
CsFormatBytes = __decorateClass([
  customElement("cs-format-bytes")
], CsFormatBytes);

export {
  CsFormatBytes
};
