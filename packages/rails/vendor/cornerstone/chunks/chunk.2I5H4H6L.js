/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  carousel_item_styles_default
} from "./chunk.HLCWYOAF.js";
import {
  CornerstoneElement,
  customElement
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/carousel-item/carousel-item.ts
var CsCarouselItem = class extends CornerstoneElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
  }
  render() {
    return b` <slot></slot> `;
  }
};
CsCarouselItem.css = carousel_item_styles_default;
CsCarouselItem = __decorateClass([
  customElement("cs-carousel-item")
], CsCarouselItem);

export {
  CsCarouselItem
};
