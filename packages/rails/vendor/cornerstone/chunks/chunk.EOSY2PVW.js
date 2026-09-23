/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  i
} from "./chunk.CRKHH5GL.js";

// src/styles/component/visually-hidden.styles.ts
var visually_hidden_styles_default = i`
  .cs-visually-hidden:not(:focus-within),
  .cs-visually-hidden-force,
  .cs-visually-hidden-hint::part(hint),
  .cs-visually-hidden-label::part(label),
  .cs-visually-hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;

export {
  visually_hidden_styles_default
};
