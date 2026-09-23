/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/load.ts
var CsLoadEvent = class extends Event {
  constructor() {
    super("cs-load", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  CsLoadEvent
};
