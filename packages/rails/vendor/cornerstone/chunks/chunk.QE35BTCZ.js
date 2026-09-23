/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/selection-change.ts
var CsSelectionChangeEvent = class extends Event {
  constructor(detail) {
    super("cs-selection-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsSelectionChangeEvent
};
