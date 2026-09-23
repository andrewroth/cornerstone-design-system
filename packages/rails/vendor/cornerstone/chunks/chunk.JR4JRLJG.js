/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsSelect
} from "./chunk.UBXCZSBW.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/select/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-select";
var reactWrapper = o({
  tagName,
  elementClass: CsSelect,
  react: React,
  events: {
    onCsClear: "cs-clear",
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide",
    onCsInvalid: "cs-invalid"
  },
  displayName: "CsSelect"
});
var select_default = reactWrapper;

export {
  select_default
};
