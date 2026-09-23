/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/hide.ts
var CsHideEvent = class extends Event {
  constructor(detail) {
    super("cs-hide", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  CsHideEvent
};
