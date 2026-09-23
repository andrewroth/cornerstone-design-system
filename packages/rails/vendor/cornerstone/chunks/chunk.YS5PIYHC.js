/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/remove.ts
var CsRemoveEvent = class extends Event {
  constructor() {
    super("cs-remove", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsRemoveEvent
};
