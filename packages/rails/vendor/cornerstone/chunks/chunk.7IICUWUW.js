/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/after-page-change.ts
var CsAfterPageChangeEvent = class extends Event {
  constructor(detail) {
    super("cs-after-page-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsAfterPageChangeEvent
};
