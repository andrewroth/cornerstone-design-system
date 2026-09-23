/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsDropdown
} from "./chunk.AGWGBUSC.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/dropdown/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-dropdown";
var reactWrapper = o({
  tagName,
  elementClass: CsDropdown,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide",
    onCsSelect: "cs-select"
  },
  displayName: "CsDropdown"
});
var dropdown_default = reactWrapper;

export {
  dropdown_default
};
