/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/after-hide.ts
var CsAfterHideEvent = class extends Event {
  constructor() {
    super("cs-after-hide", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsAfterHideEvent
};
