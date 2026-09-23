/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/cancel.ts
var CsCancelEvent = class extends Event {
  constructor() {
    super("cs-cancel", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsCancelEvent
};
