/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  i
} from "./chunk.CRKHH5GL.js";

// src/styles/component/form-control.styles.ts
var form_control_styles_default = i`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--cs-form-control-label-color);
    font-weight: var(--cs-form-control-label-font-weight);
    line-height: var(--cs-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--cs-form-control-required-content);
    margin-inline-start: var(--cs-form-control-required-content-offset);
    color: var(--cs-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--cs-form-control-hint-color);
    font-weight: var(--cs-form-control-hint-font-weight);
    line-height: var(--cs-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--cs-font-size-smaller);

    &:not(.has-slotted, .has-hint, .has-count) {
      display: none;
    }
  }
`;

export {
  form_control_styles_default
};
