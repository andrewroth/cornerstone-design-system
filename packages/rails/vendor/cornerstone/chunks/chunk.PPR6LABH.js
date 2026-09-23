/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/include-error.ts
var CsIncludeErrorEvent = class extends Event {
  constructor(detail) {
    super("cs-include-error", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsIncludeErrorEvent
};
