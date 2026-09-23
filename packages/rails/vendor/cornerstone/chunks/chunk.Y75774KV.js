/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/intersect.ts
var CsIntersectEvent = class extends Event {
  constructor(detail) {
    super("cs-intersect", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsIntersectEvent
};
