/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-item-expanded.ts
var CsAccordionItemExpandedEvent = class extends Event {
  constructor() {
    super("cs-accordion-item-expanded", { bubbles: false, cancelable: false, composed: false });
  }
};

export {
  CsAccordionItemExpandedEvent
};
