/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  option_styles_default
} from "./chunk.OPLF5YYP.js";
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
  A,
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/internal/get-text.ts
function getText(root, depth = 0) {
  if (!root || !globalThis.Node) {
    return "";
  }
  if (typeof root[Symbol.iterator] === "function") {
    const nodes = Array.isArray(root) ? root : [...root];
    return nodes.map((node2) => getText(node2, --depth)).join("");
  }
  const node = root;
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node;
    if (element.hasAttribute("slot") || element.matches("style, script")) {
      return "";
    }
    if (element instanceof HTMLSlotElement) {
      const assignedNodes = element.assignedNodes({ flatten: true });
      if (assignedNodes.length > 0) {
        return getText(assignedNodes, --depth);
      }
    }
    return depth > -1 ? getText(element, --depth) : element.textContent ?? "";
  }
  return node.hasChildNodes() ? getText(node.childNodes, --depth) : "";
}

// src/components/option/option.ts
var CsOption = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    // @ts-expect-error - Controller is currently unused
    this.localize = new LocalizeController(this);
    this.cachedDefaultLabel = "";
    this.isInitialized = false;
    this.isDefaultLabelDirty = true;
    this.current = false;
    this.value = "";
    this.disabled = false;
    this.selected = false;
    this.defaultSelected = false;
    this._label = "";
    this.handleHover = (event) => {
      if (event.type === "mouseenter") {
        this.customStates.set("hover", true);
      } else if (event.type === "mouseleave") {
        this.customStates.set("hover", false);
      }
    };
  }
  set label(value) {
    const oldValue = this._label;
    this._label = value || "";
    if (this._label !== oldValue) {
      this.requestUpdate("label", oldValue);
    }
  }
  get label() {
    if (this._label) {
      return this._label;
    }
    return this.defaultLabel;
  }
  /** The default label, generated from the element contents. Will be equal to `label` in most cases. */
  get defaultLabel() {
    if (this.isDefaultLabelDirty || !this.cachedDefaultLabel) {
      this.updateDefaultLabel();
    }
    return this.cachedDefaultLabel;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-selected", "false");
    this.addEventListener("mouseenter", this.handleHover);
    this.addEventListener("mouseleave", this.handleHover);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this.handleHover);
    this.removeEventListener("mouseleave", this.handleHover);
  }
  handleDefaultSlotChange() {
    this.isDefaultLabelDirty = true;
    if (this.isInitialized) {
      customElements.whenDefined("cs-select").then(() => {
        const controller = this.closest("cs-select");
        if (controller) {
          controller.handleDefaultSlotChange?.();
        }
      });
      customElements.whenDefined("cs-combobox").then(() => {
        const controller = this.closest("cs-combobox");
        if (controller) {
          controller.handleDefaultSlotChange?.();
        }
      });
    } else {
      this.isInitialized = true;
    }
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("defaultSelected")) {
      if (this.didSSR && this.hasUpdated || !this.didSSR) {
        this.syncDefaultSelected();
      }
    }
    super.willUpdate(changedProperties);
  }
  syncDefaultSelected() {
    if ("closest" in this) {
      if (!this.closest("cs-combobox, cs-select")?.hasInteracted) {
        if (this.defaultSelected) {
          const oldVal = this.selected;
          this.selected = this.defaultSelected;
          this.requestUpdate("selected", oldVal);
        }
      }
    }
  }
  updated(changedProperties) {
    if (changedProperties.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
      this.customStates.set("disabled", this.disabled);
    }
    if (changedProperties.has("selected")) {
      this.setAttribute("aria-selected", this.selected ? "true" : "false");
      this.customStates.set("selected", this.selected);
    }
    if (changedProperties.has("value")) {
      if (typeof this.value !== "string") {
        this.value = String(this.value);
      }
      this.handleDefaultSlotChange();
    }
    if (changedProperties.has("current")) {
      this.customStates.set("current", this.current);
    }
    super.updated(changedProperties);
  }
  async firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.didSSR && !this.hasUpdated) {
      await this.updateComplete;
      this.syncDefaultSelected();
    } else {
      this.syncDefaultSelected();
    }
    if (this.selected && !this.defaultSelected) {
      const parent = this.closest("cs-select, cs-combobox");
      if (parent && !parent.hasInteracted) {
        await customElements.whenDefined(parent.localName);
        await parent.updateComplete;
        parent.selectionChanged?.();
      }
    }
  }
  updateDefaultLabel() {
    const oldValue = this.cachedDefaultLabel;
    this.cachedDefaultLabel = getText(this).trim();
    this.isDefaultLabelDirty = false;
    const changed = this.cachedDefaultLabel !== oldValue;
    if (!this._label && changed) {
      this.requestUpdate("label", oldValue);
    }
    return changed;
  }
  render() {
    const selected = this.selected;
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.requestUpdate();
      });
      return A;
    }
    return b`
      ${selected ? b`<cs-icon part="checked-icon" class="check" name="check" library="system" aria-hidden="true"></cs-icon>` : b`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `;
  }
};
CsOption.css = option_styles_default;
__decorateClass([
  e(".label")
], CsOption.prototype, "defaultSlot", 2);
__decorateClass([
  r()
], CsOption.prototype, "current", 2);
__decorateClass([
  n({ reflect: true })
], CsOption.prototype, "value", 2);
__decorateClass([
  n({ type: Boolean })
], CsOption.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, attribute: false })
], CsOption.prototype, "selected", 2);
__decorateClass([
  n({ type: Boolean, attribute: "selected" })
], CsOption.prototype, "defaultSelected", 2);
__decorateClass([
  n()
], CsOption.prototype, "label", 1);
CsOption = __decorateClass([
  customElement("cs-option")
], CsOption);

export {
  CsOption
};
