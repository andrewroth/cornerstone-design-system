/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/invalid.ts
var CsInvalidEvent = class extends Event {
  constructor() {
    super("cs-invalid", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsInvalidEvent
};
