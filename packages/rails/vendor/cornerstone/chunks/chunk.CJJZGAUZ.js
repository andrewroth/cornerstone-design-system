/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsPagination
} from "./chunk.LSN7NPBY.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/pagination/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-pagination";
var reactWrapper = o({
  tagName,
  elementClass: CsPagination,
  react: React,
  events: {
    onCsPageChange: "cs-page-change",
    onCsAfterPageChange: "cs-after-page-change"
  },
  displayName: "CsPagination"
});
var pagination_default = reactWrapper;

export {
  pagination_default
};
