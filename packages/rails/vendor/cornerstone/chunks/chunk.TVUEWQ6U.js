/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsDetails
} from "./chunk.Y7C5WREU.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/details/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-details";
var reactWrapper = o({
  tagName,
  elementClass: CsDetails,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide"
  },
  displayName: "CsDetails"
});
var details_default = reactWrapper;

export {
  details_default
};
