/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/events/accordion-item-collapsed.ts
var CsAccordionItemCollapsedEvent = class extends Event {
  constructor() {
    super("cs-accordion-item-collapsed", { bubbles: false, cancelable: false, composed: false });
  }
};

export {
  CsAccordionItemCollapsedEvent
};
