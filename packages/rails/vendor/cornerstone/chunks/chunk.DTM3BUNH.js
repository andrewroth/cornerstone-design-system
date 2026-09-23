/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsIntersectionObserver
} from "./chunk.F4KNTSRD.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/intersection-observer/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-intersection-observer";
var reactWrapper = o({
  tagName,
  elementClass: CsIntersectionObserver,
  react: React,
  events: {
    onCsIntersect: "cs-intersect"
  },
  displayName: "CsIntersectionObserver"
});
var intersection_observer_default = reactWrapper;

export {
  intersection_observer_default
};
