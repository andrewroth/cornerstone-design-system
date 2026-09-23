/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  skeleton_styles_default
} from "./chunk.IUGV2PGE.js";
import {
  CornerstoneElement,
  customElement,
  n
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/skeleton/skeleton.ts
var CsSkeleton = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return b` <div part="indicator" class="indicator"></div> `;
  }
};
CsSkeleton.css = skeleton_styles_default;
__decorateClass([
  n({ reflect: true })
], CsSkeleton.prototype, "effect", 2);
CsSkeleton = __decorateClass([
  customElement("cs-skeleton")
], CsSkeleton);

export {
  CsSkeleton
};
