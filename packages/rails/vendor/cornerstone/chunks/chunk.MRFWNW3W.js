/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  checkbox_group_styles_default
} from "./chunk.PBY6IIOW.js";
import {
  form_control_styles_default
} from "./chunk.GNP22RG3.js";
import {
  HasSlotController
} from "./chunk.25L55TBI.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  e
} from "./chunk.WDXZHMSD.js";
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

// src/components/checkbox-group/checkbox-group.ts
var CsCheckboxGroup = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.label = "";
    this.hint = "";
    this.orientation = "vertical";
    this.required = false;
    this.ssrLabel = false;
    this.ssrHint = false;
    /**
     * Applies the group's size to each grouped checkbox/switch
     */
    this.syncCheckboxElements = () => {
      if (!this.size) {
        return;
      }
      for (const checkbox of this.getAllCheckboxes()) {
        checkbox.setAttribute("size", this.size);
      }
    };
  }
  updated(changedProperties) {
    if (changedProperties.has("size")) {
      this.syncCheckboxElements();
    }
  }
  /** Returns all grouped checkbox and switch elements. */
  getAllCheckboxes() {
    return [...this.querySelectorAll(":is(cs-checkbox, cs-switch)")];
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "ssrLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    return b`
      <fieldset
        part="form-control"
        class=${e({
      "form-control": true,
      "checkbox-group-required": this.required,
      "form-control-has-label": hasLabel
    })}
      >
        <label
          part="form-control-label"
          id="label"
          class=${e({
      label: true,
      "has-label": hasLabel
    })}
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" role="group" aria-labelledby="label" aria-describedby="hint">
          <slot @slotchange=${this.syncCheckboxElements}></slot>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${e({
      "has-slotted": hasHint
    })}
          aria-hidden=${hasHint ? "false" : "true"}
          >${this.hint}</slot
        >
      </fieldset>
    `;
  }
};
CsCheckboxGroup.css = [size_styles_default, form_control_styles_default, checkbox_group_styles_default];
__decorateClass([
  n()
], CsCheckboxGroup.prototype, "label", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsCheckboxGroup.prototype, "hint", 2);
__decorateClass([
  n({ reflect: true })
], CsCheckboxGroup.prototype, "orientation", 2);
__decorateClass([
  n({ reflect: true })
], CsCheckboxGroup.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsCheckboxGroup.prototype, "required", 2);
__decorateClass([
  n({ type: Boolean, attribute: "ssr-label" })
], CsCheckboxGroup.prototype, "ssrLabel", 2);
__decorateClass([
  n({ type: Boolean, attribute: "ssr-hint" })
], CsCheckboxGroup.prototype, "ssrHint", 2);
CsCheckboxGroup = __decorateClass([
  customElement("cs-checkbox-group")
], CsCheckboxGroup);
CsCheckboxGroup.disableWarning?.("change-in-update");

export {
  CsCheckboxGroup
};
