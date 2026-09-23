/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-collapse.ts
var CsAccordionCollapseEvent = class extends Event {
  constructor(detail) {
    super("cs-accordion-collapse", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  CsAccordionCollapseEvent
};
