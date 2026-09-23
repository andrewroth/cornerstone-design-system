/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/select.ts
var CsSelectEvent = class extends Event {
  constructor(detail) {
    super("cs-select", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  CsSelectEvent
};
