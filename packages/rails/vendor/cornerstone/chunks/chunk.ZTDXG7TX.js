/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-expand.ts
var CsAccordionExpandEvent = class extends Event {
  constructor(detail) {
    super("cs-accordion-expand", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  CsAccordionExpandEvent
};
