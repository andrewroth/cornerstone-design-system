/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsDrawer
} from "./chunk.XNBIMW4E.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/drawer/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-drawer";
var reactWrapper = o({
  tagName,
  elementClass: CsDrawer,
  react: React,
  events: {
    onCsShow: "cs-show",
    onCsAfterShow: "cs-after-show",
    onCsHide: "cs-hide",
    onCsAfterHide: "cs-after-hide"
  },
  displayName: "CsDrawer"
});
var drawer_default = reactWrapper;

export {
  drawer_default
};
