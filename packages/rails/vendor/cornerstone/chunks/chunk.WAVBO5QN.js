/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/error.ts
var CsErrorEvent = class extends Event {
  constructor() {
    super("cs-error", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsErrorEvent
};
