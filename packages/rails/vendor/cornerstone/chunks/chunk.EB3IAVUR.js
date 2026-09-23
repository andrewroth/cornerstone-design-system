/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/lazy-load.ts
var CsLazyLoadEvent = class extends Event {
  constructor() {
    super("cs-lazy-load", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsLazyLoadEvent
};
