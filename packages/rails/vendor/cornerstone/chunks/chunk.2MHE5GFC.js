/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsAccordion
} from "./chunk.JWAION5N.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/accordion/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-accordion";
var reactWrapper = o({
  tagName,
  elementClass: CsAccordion,
  react: React,
  events: {
    onCsAccordionExpand: "cs-accordion-expand",
    onCsAccordionAfterExpand: "cs-accordion-after-expand",
    onCsAccordionCollapse: "cs-accordion-collapse",
    onCsAccordionAfterCollapse: "cs-accordion-after-collapse"
  },
  displayName: "CsAccordion"
});
var accordion_default = reactWrapper;

export {
  accordion_default
};
