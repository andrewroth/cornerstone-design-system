/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/reposition.ts
var CsRepositionEvent = class extends Event {
  constructor() {
    super("cs-reposition", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsRepositionEvent
};
