/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsMutationEvent
} from "./chunk.TDSLPPI2.js";
import {
  mutation_observer_styles_default
} from "./chunk.QBJC2WHM.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
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

// src/components/mutation-observer/mutation-observer.ts
var CsMutationObserver = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.attrOldValue = false;
    this.charData = false;
    this.charDataOldValue = false;
    this.childList = false;
    this.disabled = false;
    this.handleMutation = (mutationList) => {
      this.dispatchEvent(new CsMutationEvent({ mutationList }));
    };
  }
  connectedCallback() {
    super.connectedCallback();
    if (typeof MutationObserver !== "undefined") {
      this.mutationObserver = new MutationObserver(this.handleMutation);
      if (!this.disabled) {
        this.startObserver();
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }
  startObserver() {
    const observeAttributes = typeof this.attr === "string" && this.attr.length > 0;
    const attributeFilter = observeAttributes && this.attr !== "*" ? this.attr.split(" ") : void 0;
    try {
      this.mutationObserver.observe(this, {
        subtree: true,
        childList: this.childList,
        attributes: observeAttributes,
        attributeFilter,
        attributeOldValue: this.attrOldValue,
        characterData: this.charData,
        characterDataOldValue: this.charDataOldValue
      });
    } catch {
    }
  }
  stopObserver() {
    this.mutationObserver.disconnect();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  handleChange() {
    this.stopObserver();
    this.startObserver();
  }
  render() {
    return b` <slot></slot> `;
  }
};
CsMutationObserver.css = mutation_observer_styles_default;
__decorateClass([
  n({ reflect: true })
], CsMutationObserver.prototype, "attr", 2);
__decorateClass([
  n({ attribute: "attr-old-value", type: Boolean, reflect: true })
], CsMutationObserver.prototype, "attrOldValue", 2);
__decorateClass([
  n({ attribute: "char-data", type: Boolean, reflect: true })
], CsMutationObserver.prototype, "charData", 2);
__decorateClass([
  n({ attribute: "char-data-old-value", type: Boolean, reflect: true })
], CsMutationObserver.prototype, "charDataOldValue", 2);
__decorateClass([
  n({ attribute: "child-list", type: Boolean, reflect: true })
], CsMutationObserver.prototype, "childList", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsMutationObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], CsMutationObserver.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("attr", { waitUntilFirstUpdate: true }),
  watch("attr-old-value", { waitUntilFirstUpdate: true }),
  watch("char-data", { waitUntilFirstUpdate: true }),
  watch("char-data-old-value", { waitUntilFirstUpdate: true }),
  watch("childList", { waitUntilFirstUpdate: true })
], CsMutationObserver.prototype, "handleChange", 1);
CsMutationObserver = __decorateClass([
  customElement("cs-mutation-observer")
], CsMutationObserver);

export {
  CsMutationObserver
};
