/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsInclude
} from "./chunk.S3N5R7VH.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/include/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-include";
var reactWrapper = o({
  tagName,
  elementClass: CsInclude,
  react: React,
  events: {
    onCsLoad: "cs-load",
    onCsIncludeError: "cs-include-error"
  },
  displayName: "CsInclude"
});
var include_default = reactWrapper;

export {
  include_default
};
