/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/copy.ts
var CsCopyEvent = class extends Event {
  constructor(detail) {
    super("cs-copy", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsCopyEvent
};
