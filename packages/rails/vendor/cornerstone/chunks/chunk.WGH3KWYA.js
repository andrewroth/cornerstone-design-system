/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsColorPicker
} from "./chunk.GB3MVDTY.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/color-picker/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-color-picker";
var reactWrapper = o({
  tagName,
  elementClass: CsColorPicker,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide",
    onCsInvalid: "cs-invalid"
  },
  displayName: "CsColorPicker"
});
var color_picker_default = reactWrapper;

export {
  color_picker_default
};
