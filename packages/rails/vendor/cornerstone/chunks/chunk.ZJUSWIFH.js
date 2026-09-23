/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/expand.ts
var CsExpandEvent = class extends Event {
  constructor() {
    super("cs-expand", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsExpandEvent
};
