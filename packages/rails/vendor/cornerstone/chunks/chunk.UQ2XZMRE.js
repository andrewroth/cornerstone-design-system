/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/tab-show.ts
var CsTabShowEvent = class extends Event {
  constructor(detail) {
    super("cs-tab-show", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsTabShowEvent
};
