/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-item-trigger.ts
var CsAccordionItemTriggerEvent = class extends Event {
  constructor(detail) {
    super("cs-accordion-item-trigger", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  CsAccordionItemTriggerEvent
};
