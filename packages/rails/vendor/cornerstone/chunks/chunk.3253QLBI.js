/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/complete.ts
var CsCompleteEvent = class extends Event {
  constructor() {
    super("cs-complete", { bubbles: true, cancelable: true, composed: true });
  }
};

export {
  CsCompleteEvent
};
