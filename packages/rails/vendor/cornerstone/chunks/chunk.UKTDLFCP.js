/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/after-show.ts
var CsAfterShowEvent = class extends Event {
  constructor() {
    super("cs-after-show", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsAfterShowEvent
};
