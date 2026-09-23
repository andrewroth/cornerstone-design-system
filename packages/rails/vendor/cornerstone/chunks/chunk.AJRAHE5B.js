/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/resize.ts
var CsResizeEvent = class extends Event {
  constructor(detail) {
    super("cs-resize", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsResizeEvent
};
