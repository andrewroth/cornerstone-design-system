/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/mutation.ts
var CsMutationEvent = class extends Event {
  constructor(detail) {
    super("cs-mutation", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsMutationEvent
};
