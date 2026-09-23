/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/slide-change.ts
var CsSlideChangeEvent = class extends Event {
  constructor(detail) {
    super("cs-slide-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsSlideChangeEvent
};
