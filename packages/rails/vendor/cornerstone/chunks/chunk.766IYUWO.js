/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/page-change.ts
var CsPageChangeEvent = class extends Event {
  constructor(detail) {
    super("cs-page-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  CsPageChangeEvent
};
