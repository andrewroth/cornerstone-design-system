/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsTreeItem
} from "./chunk.G3K7QMYI.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/tree-item/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-tree-item";
var reactWrapper = o({
  tagName,
  elementClass: CsTreeItem,
  react: React,
  events: {
    onCsExpand: "cs-expand",
    onCsAfterExpand: "cs-after-expand",
    onCsCollapse: "cs-collapse",
    onCsAfterCollapse: "cs-after-collapse",
    onCsLazyChange: "cs-lazy-change",
    onCsLazyLoad: "cs-lazy-load"
  },
  displayName: "CsTreeItem"
});
var tree_item_default = reactWrapper;

export {
  tree_item_default
};
