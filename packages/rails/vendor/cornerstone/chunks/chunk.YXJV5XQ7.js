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

// src/components/format-number/format-number.ts
var CsFormatNumber = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.type = "decimal";
    this.withoutGrouping = false;
    this.currency = "USD";
    this.currencyDisplay = "symbol";
  }
  static get styles() {
    return [];
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    return this.localize.number(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.withoutGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    });
  }
};
__decorateClass([
  n({ type: Number })
], CsFormatNumber.prototype, "value", 2);
__decorateClass([
  n()
], CsFormatNumber.prototype, "type", 2);
__decorateClass([
  n({ attribute: "without-grouping", type: Boolean })
], CsFormatNumber.prototype, "withoutGrouping", 2);
__decorateClass([
  n()
], CsFormatNumber.prototype, "currency", 2);
__decorateClass([
  n({ attribute: "currency-display" })
], CsFormatNumber.prototype, "currencyDisplay", 2);
__decorateClass([
  n({ attribute: "minimum-integer-digits", type: Number })
], CsFormatNumber.prototype, "minimumIntegerDigits", 2);
__decorateClass([
  n({ attribute: "minimum-fraction-digits", type: Number })
], CsFormatNumber.prototype, "minimumFractionDigits", 2);
__decorateClass([
  n({ attribute: "maximum-fraction-digits", type: Number })
], CsFormatNumber.prototype, "maximumFractionDigits", 2);
__decorateClass([
  n({ attribute: "minimum-significant-digits", type: Number })
], CsFormatNumber.prototype, "minimumSignificantDigits", 2);
__decorateClass([
  n({ attribute: "maximum-significant-digits", type: Number })
], CsFormatNumber.prototype, "maximumSignificantDigits", 2);
CsFormatNumber = __decorateClass([
  customElement("cs-format-number")
], CsFormatNumber);

export {
  CsFormatNumber
};
