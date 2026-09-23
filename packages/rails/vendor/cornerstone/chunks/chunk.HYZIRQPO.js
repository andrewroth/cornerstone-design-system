/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/start.ts
var CsStartEvent = class extends Event {
  constructor() {
    super("cs-start", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsStartEvent
};
