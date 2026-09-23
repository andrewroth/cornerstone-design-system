/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/collapse.ts
var CsCollapseEvent = class extends Event {
  constructor() {
    super("cs-collapse", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsCollapseEvent
};
