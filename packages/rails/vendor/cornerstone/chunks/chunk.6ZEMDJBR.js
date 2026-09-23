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
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/format-date/format-date.ts
var CsFormatDate = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.date = /* @__PURE__ */ new Date();
    this.hourFormat = "auto";
  }
  static get styles() {
    return [];
  }
  render() {
    const date = new Date(this.date);
    const hour12 = this.hourFormat === "auto" ? void 0 : this.hourFormat === "12";
    if (isNaN(date.getMilliseconds())) {
      return void 0;
    }
    const displayDate = this.localize.date(date, {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12
    });
    return b`<time datetime=${date.toISOString()}>${displayDate}</time>`;
  }
};
__decorateClass([
  n()
], CsFormatDate.prototype, "date", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "weekday", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "era", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "year", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "month", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "day", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "hour", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "minute", 2);
__decorateClass([
  n()
], CsFormatDate.prototype, "second", 2);
__decorateClass([
  n({ attribute: "time-zone-name" })
], CsFormatDate.prototype, "timeZoneName", 2);
__decorateClass([
  n({ attribute: "time-zone" })
], CsFormatDate.prototype, "timeZone", 2);
__decorateClass([
  n({ attribute: "hour-format" })
], CsFormatDate.prototype, "hourFormat", 2);
CsFormatDate = __decorateClass([
  customElement("cs-format-date")
], CsFormatDate);

export {
  CsFormatDate
};
