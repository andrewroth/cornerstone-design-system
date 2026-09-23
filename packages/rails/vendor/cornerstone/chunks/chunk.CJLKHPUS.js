/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsTimeInput
} from "./chunk.GUJP2HVU.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/time-input/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-time-input";
var reactWrapper = o({
  tagName,
  elementClass: CsTimeInput,
  react: React,
  events: {
    onCsClear: "cs-clear",
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide",
    onCsInvalid: "cs-invalid"
  },
  displayName: "CsTimeInput"
});
var time_input_default = reactWrapper;

export {
  time_input_default
};
