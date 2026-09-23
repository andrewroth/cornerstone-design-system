/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/clear.ts
var CsClearEvent = class extends Event {
  constructor() {
    super("cs-clear", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsClearEvent
};
