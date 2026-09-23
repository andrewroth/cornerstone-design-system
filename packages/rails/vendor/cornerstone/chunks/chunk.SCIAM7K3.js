/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsAnimation
} from "./chunk.ZXJNAVK7.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/animation/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-animation";
var reactWrapper = o({
  tagName,
  elementClass: CsAnimation,
  react: React,
  events: {
    onCsCancel: "cs-cancel",
    onCsFinish: "cs-finish",
    onCsStart: "cs-start"
  },
  displayName: "CsAnimation"
});
var animation_default = reactWrapper;

export {
  animation_default
};
