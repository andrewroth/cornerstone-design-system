/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-after-collapse.ts
var CsAccordionAfterCollapseEvent = class extends Event {
  constructor(detail) {
    super("cs-accordion-after-collapse", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsAccordionAfterCollapseEvent
};
