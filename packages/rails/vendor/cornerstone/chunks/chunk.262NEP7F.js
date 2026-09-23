/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsDialog
} from "./chunk.MDGAP4OA.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/dialog/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-dialog";
var reactWrapper = o({
  tagName,
  elementClass: CsDialog,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide"
  },
  displayName: "CsDialog"
});
var dialog_default = reactWrapper;

export {
  dialog_default
};
