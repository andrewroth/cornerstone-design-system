/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  avatar_styles_default
} from "./chunk.DNT5PVBB.js";
import {
  CsErrorEvent
} from "./chunk.WAVBO5QN.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/avatar/avatar.ts
var CsAvatar = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.image = "";
    this.label = "";
    this.initials = "";
    this.loading = "eager";
    this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = false;
  }
  handleImageLoadError() {
    this.hasError = true;
    this.dispatchEvent(new CsErrorEvent());
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.didSSR) {
      const img = this.shadowRoot?.querySelector?.("img");
      if (img && img.complete && img.naturalWidth <= 0) {
        this.updateComplete.then(() => {
          this.handleImageLoadError();
        });
      }
    }
  }
  render() {
    const avatarWithImage = b`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `;
    let avatarWithoutImage;
    if (this.initials) {
      avatarWithoutImage = b`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`;
    } else {
      avatarWithoutImage = b`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <cs-icon name="person" library="system"></cs-icon>
        </slot>
      `;
    }
    return b` ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage} `;
  }
};
CsAvatar.css = avatar_styles_default;
__decorateClass([
  r()
], CsAvatar.prototype, "hasError", 2);
__decorateClass([
  n()
], CsAvatar.prototype, "image", 2);
__decorateClass([
  n()
], CsAvatar.prototype, "label", 2);
__decorateClass([
  n()
], CsAvatar.prototype, "initials", 2);
__decorateClass([
  n()
], CsAvatar.prototype, "loading", 2);
__decorateClass([
  n({ reflect: true })
], CsAvatar.prototype, "shape", 2);
__decorateClass([
  watch("image")
], CsAvatar.prototype, "handleImageChange", 1);
CsAvatar = __decorateClass([
  customElement("cs-avatar")
], CsAvatar);

export {
  CsAvatar
};
