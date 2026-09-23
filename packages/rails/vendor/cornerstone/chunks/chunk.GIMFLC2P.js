/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/finish.ts
var CsFinishEvent = class extends Event {
  constructor() {
    super("cs-finish", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsFinishEvent
};
