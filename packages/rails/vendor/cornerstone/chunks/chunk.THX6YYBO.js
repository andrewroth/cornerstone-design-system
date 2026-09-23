/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsPopover
} from "./chunk.JATD5H7G.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/popover/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-popover";
var reactWrapper = o({
  tagName,
  elementClass: CsPopover,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide"
  },
  displayName: "CsPopover"
});
var popover_default = reactWrapper;

export {
  popover_default
};
