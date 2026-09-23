/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o
} from "./chunk.AFMAZM55.js";
import {
  CsErrorEvent
} from "./chunk.WAVBO5QN.js";
import {
  CsLoadEvent
} from "./chunk.VVV5GJL4.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  e,
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  animated_image_styles_default
} from "./chunk.7JR5GLMN.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/animated-image/animated-image.ts
var CsAnimatedImage = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isLoaded = false;
  }
  handleClick() {
    this.play = !this.play;
  }
  handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.play = !this.play;
    }
  }
  firstUpdated(changedProperties) {
    if (this.didSSR) {
      const img = this.animatedImage;
      if (img && img.complete) {
        if (img.naturalWidth > 0) {
          img.dispatchEvent(new Event("load"));
        } else {
          img.dispatchEvent(new Event("error"));
        }
      }
    }
    super.firstUpdated(changedProperties);
  }
  handleLoad() {
    const canvas = document.createElement("canvas");
    const { width, height } = this.animatedImage;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(this.animatedImage, 0, 0, width, height);
    this.frozenFrame = canvas.toDataURL("image/gif");
    if (!this.isLoaded) {
      this.dispatchEvent(new CsLoadEvent());
      this.isLoaded = true;
    }
  }
  handleError() {
    this.dispatchEvent(new CsErrorEvent());
  }
  handlePlayChange() {
    if (this.play) {
      this.animatedImage.src = "";
      this.animatedImage.src = this.src;
    }
  }
  handleSrcChange() {
    this.isLoaded = false;
  }
  render() {
    const verb = this.localize.term(this.play ? "pauseAnimation" : "playAnimation");
    const label = `${verb} ${this.alt}`;
    const shouldShow = this.didSSR && !this.hasUpdated || this.play;
    return b`
      <div
        class="animated-image"
        tabindex="0"
        role="button"
        aria-pressed=${this.play ? "true" : "false"}
        aria-label=${label}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <img
          class="animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${shouldShow ? "false" : "true"}
          style="visibility: hidden;"
          role="presentation"
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded ? b`
                <img
                  class="frozen"
                  src=${this.frozenFrame}
                  alt=${this.alt}
                  aria-hidden=${this.play ? "true" : "false"}
                  role="presentation"
                />

                <div part="control-box" class="control-box" aria-hidden="true">
                  <slot name="play-icon">
                    <cs-icon
                      name="play_arrow"
                      library="system"
                      class="default"
                      style=${o({ "margin-inline-start": "3px" })}
                    ></cs-icon>
                  </slot>
                  <slot name="pause-icon">
                    <cs-icon name="pause" library="system" variant="fill" class="default"></cs-icon>
                  </slot>
                </div>
              ` : ""}
      </div>
    `;
  }
};
CsAnimatedImage.css = animated_image_styles_default;
__decorateClass([
  e(".animated")
], CsAnimatedImage.prototype, "animatedImage", 2);
__decorateClass([
  r()
], CsAnimatedImage.prototype, "frozenFrame", 2);
__decorateClass([
  r()
], CsAnimatedImage.prototype, "isLoaded", 2);
__decorateClass([
  n()
], CsAnimatedImage.prototype, "src", 2);
__decorateClass([
  n()
], CsAnimatedImage.prototype, "alt", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsAnimatedImage.prototype, "play", 2);
__decorateClass([
  watch("play", { waitUntilFirstUpdate: true })
], CsAnimatedImage.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("src")
], CsAnimatedImage.prototype, "handleSrcChange", 1);
CsAnimatedImage = __decorateClass([
  customElement("cs-animated-image")
], CsAnimatedImage);

export {
  CsAnimatedImage
};
