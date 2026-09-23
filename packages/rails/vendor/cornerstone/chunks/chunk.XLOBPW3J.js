/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  i
} from "./chunk.CRKHH5GL.js";

// src/components/divider/divider.styles.ts
var divider_styles_default = i`
  :host {
    --color: var(--cs-color-surface-border);
    --width: var(--cs-border-width-s);
    --spacing: var(--cs-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`;

export {
  divider_styles_default
};
