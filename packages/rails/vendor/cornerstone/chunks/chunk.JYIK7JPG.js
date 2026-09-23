/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  checkbox_styles_default
} from "./chunk.EG22HWAQ.js";
import {
  RequiredValidator
} from "./chunk.BWRQEKED.js";
import {
  form_control_styles_default
} from "./chunk.GNP22RG3.js";
import {
  l
} from "./chunk.QXOR233R.js";
import {
  HasSlotController
} from "./chunk.25L55TBI.js";
import {
  CornerstoneFormAssociatedElement
} from "./chunk.6URCDSBB.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  o
} from "./chunk.OFJBXFXN.js";
import {
  e as e2
} from "./chunk.WDXZHMSD.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  customElement,
  e,
  n
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/checkbox/checkbox.ts
var CsCheckbox = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint");
    this.title = "";
    // make reactive to pass through
    this._value = this.getAttribute("value") ?? null;
    this.size = "m";
    this.disabled = false;
    this.indeterminate = false;
    this._checked = null;
    this.defaultChecked = this.hasAttribute("checked");
    this.required = false;
    this.hint = "";
    this.ssrHint = false;
  }
  static get validators() {
    return [
      ...super.validators,
      RequiredValidator({
        validationProperty: "checked",
        // Use a checkbox so we get "free" translation strings.
        validationElement: () => Object.assign(document.createElement("input"), {
          type: "checkbox",
          required: true
        })
      })
    ];
  }
  /** The value of the checkbox, submitted as a name/value pair with form data. */
  get value() {
    return this._value ?? "on";
  }
  set value(val) {
    this._value = val;
  }
  get checked() {
    if (this.valueHasChanged) {
      return Boolean(this._checked);
    }
    return this._checked ?? this.defaultChecked;
  }
  set checked(val) {
    this._checked = Boolean(val);
    this.valueHasChanged = true;
  }
  handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.handleDefaultCheckedChange();
      });
      return;
    }
    this.handleDefaultCheckedChange();
  }
  handleDefaultCheckedChange() {
    this.handleValueOrCheckedChange();
  }
  handleValueOrCheckedChange() {
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.handleValueOrCheckedChange();
      });
      return;
    }
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked;
      this.input.indeterminate = this.indeterminate;
    }
    this.customStates.set("checked", this.checked);
    this.customStates.set("indeterminate", this.indeterminate);
    this.updateValidity();
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("checked") || changedProperties.has("defaultChecked") || changedProperties.has("disabled")) {
      this.handleValueOrCheckedChange();
    }
  }
  formResetCallback() {
    this._checked = null;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }
  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }
  render() {
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasHint = this.hint ? true : !!hasHintSlot;
    const isIndeterminate = !this.checked && this.indeterminate;
    const iconName = isIndeterminate ? "horizontal_rule" : "check";
    const stateIconPart = isIndeterminate ? "indeterminate-icon" : "checked-icon";
    const checkedAttribute = this.didSSR && !this.hasUpdated ? this.checked : this.defaultChecked;
    const checkedProperty = this.didSSR && !this.hasUpdated ? null : l(this.checked);
    return b`
      <label part="checkbox">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${o(this.name)}
            value=${o(this.value)}
            .indeterminate=${l(this.indeterminate)}
            .checked=${o(checkedProperty)}
            ?checked=${checkedAttribute}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.indeterminate ? "mixed" : this.checked ? "true" : "false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <cs-icon part="${stateIconPart} icon" library="system" name=${iconName}></cs-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${hasHint ? "false" : "true"}
        class="${e2({ "has-slotted": hasHint })}"
      >
        ${this.hint}
      </slot>
    `;
  }
};
CsCheckbox.css = [form_control_styles_default, size_styles_default, checkbox_styles_default];
CsCheckbox.shadowRootOptions = { ...CornerstoneFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  e('input[type="checkbox"]')
], CsCheckbox.prototype, "input", 2);
__decorateClass([
  n()
], CsCheckbox.prototype, "title", 2);
__decorateClass([
  n({ reflect: true })
], CsCheckbox.prototype, "value", 1);
__decorateClass([
  n({ reflect: true })
], CsCheckbox.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean })
], CsCheckbox.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  n({ type: Boolean, attribute: false })
], CsCheckbox.prototype, "checked", 1);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "checked" })
], CsCheckbox.prototype, "defaultChecked", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsCheckbox.prototype, "required", 2);
__decorateClass([
  n()
], CsCheckbox.prototype, "hint", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsCheckbox.prototype, "ssrHint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], CsCheckbox.prototype, "handleDefaultCheckedChange", 1);
__decorateClass([
  watch(["checked", "indeterminate"])
], CsCheckbox.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled")
], CsCheckbox.prototype, "handleDisabledChange", 1);
CsCheckbox = __decorateClass([
  customElement("cs-checkbox")
], CsCheckbox);
CsCheckbox.disableWarning?.("change-in-update");

export {
  CsCheckbox
};
