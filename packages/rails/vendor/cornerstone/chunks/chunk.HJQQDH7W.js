/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CornerstoneElement,
  customElement,
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

// src/components/relative-time/relative-time.ts
var availableUnits = [
  { max: 276e4, value: 6e4, unit: "minute" },
  // max 46 minutes
  { max: 72e6, value: 36e5, unit: "hour" },
  // max 20 hours
  { max: 5184e5, value: 864e5, unit: "day" },
  // max 6 days
  { max: 24192e5, value: 6048e5, unit: "week" },
  // max 28 days
  { max: 28512e6, value: 2592e6, unit: "month" },
  // max 11 months
  { max: Infinity, value: 31536e6, unit: "year" }
];
var CsRelativeTime = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isoTime = "";
    this.relativeTime = "";
    this.date = /* @__PURE__ */ new Date();
    this.format = "long";
    this.numeric = "auto";
    this.sync = false;
    this.referenceDate = null;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.updateTimeout);
  }
  willUpdate(changedProperties) {
    const now = this.referenceDate || /* @__PURE__ */ new Date();
    const then = new Date(this.date);
    if (isNaN(then.getMilliseconds())) {
      this.relativeTime = "";
      this.isoTime = "";
      return super.willUpdate(changedProperties);
    }
    const diff = then.getTime() - now.getTime();
    const { unit, value } = availableUnits.find((singleUnit) => Math.abs(diff) < singleUnit.max);
    this.isoTime = then.toISOString();
    this.relativeTime = this.localize.relativeTime(Math.round(diff / value), unit, {
      numeric: this.numeric,
      style: this.format
    });
    clearTimeout(this.updateTimeout);
    if (this.sync) {
      let nextInterval;
      if (unit === "minute") {
        nextInterval = getTimeUntilNextUnit("second");
      } else if (unit === "hour") {
        nextInterval = getTimeUntilNextUnit("minute");
      } else if (unit === "day") {
        nextInterval = getTimeUntilNextUnit("hour");
      } else {
        nextInterval = getTimeUntilNextUnit("day");
      }
      this.updateTimeout = setTimeout(() => this.requestUpdate(), nextInterval);
    }
  }
  render() {
    if (this.relativeTime === "" && this.isoTime === "") {
      return "";
    }
    return b`<time datetime=${this.isoTime}>${this.relativeTime}</time>`;
  }
};
__decorateClass([
  r()
], CsRelativeTime.prototype, "isoTime", 2);
__decorateClass([
  r()
], CsRelativeTime.prototype, "relativeTime", 2);
__decorateClass([
  n()
], CsRelativeTime.prototype, "date", 2);
__decorateClass([
  n()
], CsRelativeTime.prototype, "format", 2);
__decorateClass([
  n()
], CsRelativeTime.prototype, "numeric", 2);
__decorateClass([
  n({ type: Boolean })
], CsRelativeTime.prototype, "sync", 2);
__decorateClass([
  r()
], CsRelativeTime.prototype, "referenceDate", 2);
CsRelativeTime = __decorateClass([
  customElement("cs-relative-time")
], CsRelativeTime);
function getTimeUntilNextUnit(unit) {
  const units = { second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 };
  const value = units[unit];
  return value - Date.now() % value;
}

export {
  CsRelativeTime
};
