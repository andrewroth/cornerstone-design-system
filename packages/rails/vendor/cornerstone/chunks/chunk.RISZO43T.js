/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/hover.ts
var CsHoverEvent = class extends Event {
  constructor(detail) {
    super("cs-hover", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsHoverEvent
};
