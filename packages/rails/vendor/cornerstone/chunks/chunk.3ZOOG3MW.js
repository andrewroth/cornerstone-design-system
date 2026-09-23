/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/show.ts
var CsShowEvent = class extends Event {
  constructor() {
    super("cs-show", { bubbles: true, cancelable: true, composed: true });
  }
};

export {
  CsShowEvent
};
