/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/after-expand.ts
var CsAfterExpandEvent = class extends Event {
  constructor() {
    super("cs-after-expand", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsAfterExpandEvent
};
