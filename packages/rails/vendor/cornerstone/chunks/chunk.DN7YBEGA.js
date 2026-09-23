/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  MirrorValidator
} from "./chunk.6WQS6DWD.js";
import {
  CornerstoneFormAssociatedElement
} from "./chunk.6URCDSBB.js";
import {
  CsInvalidEvent
} from "./chunk.NYORTQAI.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  o
} from "./chunk.OFJBXFXN.js";
import {
  button_styles_default
} from "./chunk.YBU3UVPI.js";
import {
  variants_styles_default
} from "./chunk.5AXL3WXA.js";
import {
  e as e2
} from "./chunk.WDXZHMSD.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  customElement,
  e,
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  T,
  b,
  w
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// ../../node_modules/lit-html/static.js
var a = /* @__PURE__ */ Symbol.for("");
var o2 = (t) => {
  if (t?.r === a) return t?._$litStatic$;
};
var i = (t, ...r2) => ({ _$litStatic$: r2.reduce((r3, e3, a2) => r3 + ((t2) => {
  if (void 0 !== t2._$litStatic$) return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e3) + t[a2 + 1], t[0]), r: a });
var l = /* @__PURE__ */ new Map();
var n2 = (t) => (r2, ...e3) => {
  const a2 = e3.length;
  let s, i2;
  const n3 = [], u2 = [];
  let c2, $2 = 0, f = false;
  for (; $2 < a2; ) {
    for (c2 = r2[$2]; $2 < a2 && void 0 !== (i2 = e3[$2], s = o2(i2)); ) c2 += s + r2[++$2], f = true;
    $2 !== a2 && u2.push(i2), n3.push(c2), $2++;
  }
  if ($2 === a2 && n3.push(r2[a2]), f) {
    const t2 = n3.join("$$lit$$");
    void 0 === (r2 = l.get(t2)) && (n3.raw = n3, l.set(t2, r2 = n3)), e3 = u2;
  }
  return t(r2, ...e3);
};
var u = n2(b);
var c = n2(w);
var $ = n2(T);

// src/components/button/button.ts
var CsButton = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["click"];
    this.localize = new LocalizeController(this);
    this.invalid = false;
    this.isIconButton = false;
    this.title = "";
    this.variant = "neutral";
    this.appearance = "accent";
    this.size = "m";
    this.withCaret = false;
    this.disabled = false;
    this.loading = false;
    this.pill = false;
    this.type = "button";
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  constructLightDOMButton() {
    const button = document.createElement("button");
    for (const attribute of this.attributes) {
      if (attribute.name === "style") {
        continue;
      }
      button.setAttribute(attribute.name, attribute.value);
    }
    button.type = this.type;
    button.style.position = "absolute !important";
    button.style.width = "0 !important";
    button.style.height = "0 !important";
    button.style.clipPath = "inset(50%) !important";
    button.style.overflow = "hidden !important";
    button.style.whiteSpace = "nowrap !important";
    if (this.name) {
      button.name = this.name;
    }
    button.value = this.value || "";
    return button;
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.type !== "submit" && this.type !== "reset") {
      return;
    }
    const form = this.getForm();
    if (!form) {
      return;
    }
    const lightDOMButton = this.constructLightDOMButton();
    this.parentElement?.append(lightDOMButton);
    lightDOMButton.click();
    lightDOMButton.remove();
  }
  handleInvalid() {
    this.dispatchEvent(new CsInvalidEvent());
  }
  handleLabelSlotChange() {
    const nodes = this.labelSlot.assignedNodes({ flatten: true });
    let hasIconLabel = false;
    let hasIcon = false;
    let hasText = false;
    let hasOtherElements = false;
    [...nodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (element.localName === "cs-icon") {
          hasIcon = true;
          if (!hasIconLabel) {
            const iconLabel = element.label;
            hasIconLabel = typeof iconLabel === "string" && iconLabel.length > 0;
          }
        } else {
          hasOtherElements = true;
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || "";
        if (text.length > 0) {
          hasText = true;
        }
      }
    });
    this.isIconButton = hasIcon && !hasText && !hasOtherElements;
    this.customStates.set("icon-button", this.isIconButton);
    if (this.isIconButton && !hasIconLabel) {
      console.warn(
        'Icon buttons must have a label for screen readers. Add <cs-icon label="..."> to remove this warning.',
        this
      );
    }
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
    this.updateValidity();
  }
  handleHrefChange() {
    this.customStates.set("link", this.isLink());
  }
  handleLoadingChange() {
    this.customStates.set("loading", this.loading);
  }
  setValue(..._args) {
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i`a` : i`button`;
    return u`
      <${tag}
        part="button"
        class=${e2({
      button: true,
      caret: this.withCaret,
      disabled: this.disabled,
      loading: this.loading,
      rtl: this.localize.dir() === "rtl",
      "is-icon-button": this.isIconButton
    })}
        ?disabled=${o(isLink ? void 0 : this.disabled)}
        type=${o(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o(isLink ? void 0 : this.name)}
        value=${o(isLink ? void 0 : this.value)}
        href=${o(isLink ? this.href : void 0)}
        target=${o(isLink ? this.target : void 0)}
        download=${o(isLink ? this.download : void 0)}
        rel=${o(isLink && this.rel ? this.rel : void 0)}
        role=${o(isLink ? void 0 : "button")}
        aria-disabled=${o(isLink && this.disabled ? "true" : void 0)}
        tabindex=${this.disabled ? "-1" : "0"}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret ? u` <cs-icon part="caret" class="caret" library="system" name="keyboard_arrow_down"></cs-icon> ` : ""}
        ${this.loading ? u`<cs-spinner part="spinner"></cs-spinner>` : ""}
      </${tag}>
    `;
  }
};
CsButton.shadowRootOptions = { ...CornerstoneFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
CsButton.css = [button_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  e(".button")
], CsButton.prototype, "button", 2);
__decorateClass([
  e("slot:not([name])")
], CsButton.prototype, "labelSlot", 2);
__decorateClass([
  r()
], CsButton.prototype, "invalid", 2);
__decorateClass([
  r()
], CsButton.prototype, "isIconButton", 2);
__decorateClass([
  n()
], CsButton.prototype, "title", 2);
__decorateClass([
  n({ reflect: true })
], CsButton.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], CsButton.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], CsButton.prototype, "size", 2);
__decorateClass([
  n({ attribute: "with-caret", type: Boolean, reflect: true })
], CsButton.prototype, "withCaret", 2);
__decorateClass([
  n({ type: Boolean })
], CsButton.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsButton.prototype, "loading", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsButton.prototype, "pill", 2);
__decorateClass([
  n()
], CsButton.prototype, "type", 2);
__decorateClass([
  n({ reflect: true })
], CsButton.prototype, "name", 2);
__decorateClass([
  n({ reflect: true })
], CsButton.prototype, "value", 2);
__decorateClass([
  n({ reflect: true })
], CsButton.prototype, "href", 2);
__decorateClass([
  n()
], CsButton.prototype, "target", 2);
__decorateClass([
  n()
], CsButton.prototype, "rel", 2);
__decorateClass([
  n()
], CsButton.prototype, "download", 2);
__decorateClass([
  n({ attribute: "formaction" })
], CsButton.prototype, "formAction", 2);
__decorateClass([
  n({ attribute: "formenctype" })
], CsButton.prototype, "formEnctype", 2);
__decorateClass([
  n({ attribute: "formmethod" })
], CsButton.prototype, "formMethod", 2);
__decorateClass([
  n({ attribute: "formnovalidate", type: Boolean })
], CsButton.prototype, "formNoValidate", 2);
__decorateClass([
  n({ attribute: "formtarget" })
], CsButton.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], CsButton.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("href")
], CsButton.prototype, "handleHrefChange", 1);
__decorateClass([
  watch("loading", { waitUntilFirstUpdate: true })
], CsButton.prototype, "handleLoadingChange", 1);
CsButton = __decorateClass([
  customElement("cs-button")
], CsButton);
CsButton.disableWarning?.("change-in-update");

export {
  CsButton
};
/*! Bundled license information:

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
