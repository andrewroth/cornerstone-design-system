/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-after-expand.ts
var CsAccordionAfterExpandEvent = class extends Event {
  constructor(detail) {
    super("cs-accordion-after-expand", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsAccordionAfterExpandEvent
};
