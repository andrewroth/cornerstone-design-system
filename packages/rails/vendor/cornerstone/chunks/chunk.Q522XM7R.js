/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/lazy-change.ts
var CsLazyChangeEvent = class extends Event {
  constructor() {
    super("cs-lazy-change", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsLazyChangeEvent
};
