/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsTooltip
} from "./chunk.IWP7N7XA.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/tooltip/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-tooltip";
var reactWrapper = o({
  tagName,
  elementClass: CsTooltip,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide"
  },
  displayName: "CsTooltip"
});
var tooltip_default = reactWrapper;

export {
  tooltip_default
};
