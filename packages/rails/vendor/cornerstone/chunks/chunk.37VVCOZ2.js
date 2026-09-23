/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/random-content-change.ts
var CsContentChangeEvent = class extends Event {
  constructor(detail) {
    super("cs-content-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsContentChangeEvent
};
