/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsMutationObserver
} from "./chunk.QXTA4TXA.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/mutation-observer/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-mutation-observer";
var reactWrapper = o({
  tagName,
  elementClass: CsMutationObserver,
  react: React,
  events: {
    onCsMutation: "cs-mutation"
  },
  displayName: "CsMutationObserver"
});
var mutation_observer_default = reactWrapper;

export {
  mutation_observer_default
};
