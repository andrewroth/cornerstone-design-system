/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/tab-hide.ts
var CsTabHideEvent = class extends Event {
  constructor(detail) {
    super("cs-tab-hide", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsTabHideEvent
};
