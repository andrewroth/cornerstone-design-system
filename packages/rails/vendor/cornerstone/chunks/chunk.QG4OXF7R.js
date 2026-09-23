/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsToastItem
} from "./chunk.3AS5TYFH.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/toast-item/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-toast-item";
var reactWrapper = o({
  tagName,
  elementClass: CsToastItem,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide"
  },
  displayName: "CsToastItem"
});
var toast_item_default = reactWrapper;

export {
  toast_item_default
};
