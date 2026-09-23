/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/after-collapse.ts
var CsAfterCollapseEvent = class extends Event {
  constructor() {
    super("cs-after-collapse", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsAfterCollapseEvent
};
