/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsClearEvent
} from "./chunk.NLPSVSUU.js";
import {
  submitOnEnter
} from "./chunk.I3GI4VWI.js";
import {
  input_styles_default
} from "./chunk.6ZC4A2PI.js";
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
  MirrorValidator
} from "./chunk.6WQS6DWD.js";
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
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/input/input.ts
var CsInput = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.title = "";
    this.type = "text";
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.size = "m";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.withClear = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.withoutSpinButtons = false;
    this.required = false;
    this.spellcheck = true;
    this.ssrLabel = false;
    this.ssrHint = false;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }
    return this._value ?? this.defaultValue;
  }
  set value(val) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  /**
   * @internal
   */
  updateFormValue(value) {
    if (value == null) {
      this.setValue("", null);
      return;
    }
    super.updateFormValue(value);
  }
  handleChange(event) {
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleClearClick(event) {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.updateComplete.then(() => {
        this.dispatchEvent(new CsClearEvent());
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
    this.input.focus();
  }
  handleInput() {
    this.value = this.input.value;
  }
  handleKeyDown(event) {
    submitOnEnter(event, this);
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("defaultValue") || changedProperties.has("type")) {
      const sanitizingTypes = ["number", "date", "time", "datetime-local"];
      if (this.input && sanitizingTypes.includes(this.type) && this.value && this.input.value !== this.value) {
        this._value = this.input.value;
      }
      this.customStates.set("blank", !this.value);
      this.updateValidity();
    }
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start ?? this.input.selectionStart;
    const selectionEnd = end ?? this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  formResetCallback() {
    this.value = null;
    if (this.input) {
      this.input.value = this.value;
    }
    super.formResetCallback();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "ssrLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasClearIcon = this.withClear && !this.disabled && !this.readonly;
    const isClearIconVisible = (
      // prevents hydration mismatch errors.
      (!this.didSSR || this.hasUpdated) && hasClearIcon && (typeof this.value === "number" || this.value && this.value.length > 0)
    );
    return b`
      <label
        part="form-control-label"
        class=${e2({
      label: true,
      "has-label": hasLabel
    })}
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="input-wrapper" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
          title=${this.title}
          name=${o(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o(this.placeholder)}
          minlength=${o(this.minlength)}
          maxlength=${o(this.maxlength)}
          min=${o(this.min)}
          max=${o(this.max)}
          step=${o(this.step)}
          .value=${l(this.value ?? "")}
          autocapitalize=${o(this.autocapitalize)}
          autocomplete=${o(this.autocomplete)}
          autocorrect=${this.autocorrect ? "on" : "off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${o(this.pattern)}
          enterkeyhint=${o(this.enterkeyhint)}
          inputmode=${o(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${isClearIconVisible ? b`
                <button
                  part="clear-button"
                  class="clear"
                  type="button"
                  aria-label=${this.localize.term("clearEntry")}
                  @click=${this.handleClearClick}
                  tabindex="-1"
                >
                  <slot name="clear-icon">
                    <cs-icon name="cancel" library="system"></cs-icon>
                  </slot>
                </button>
              ` : ""}
        ${this.passwordToggle && !this.disabled ? b`
                <button
                  part="password-toggle-button"
                  class="password-toggle"
                  type="button"
                  aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                  @click=${this.handlePasswordToggle}
                  tabindex="-1"
                >
                  ${!this.passwordVisible ? b`
                          <slot name="show-password-icon">
                            <cs-icon name="visibility" library="system"></cs-icon>
                          </slot>
                        ` : b`
                          <slot name="hide-password-icon">
                            <cs-icon name="visibility_off" library="system"></cs-icon>
                          </slot>
                        `}
                </button>
              ` : ""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${e2({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
CsInput.css = [size_styles_default, form_control_styles_default, input_styles_default];
CsInput.shadowRootOptions = { ...CornerstoneFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  e("input")
], CsInput.prototype, "input", 2);
__decorateClass([
  n()
], CsInput.prototype, "title", 2);
__decorateClass([
  n({ reflect: true })
], CsInput.prototype, "type", 2);
__decorateClass([
  r()
], CsInput.prototype, "value", 1);
__decorateClass([
  n({ attribute: "value", reflect: true })
], CsInput.prototype, "defaultValue", 2);
__decorateClass([
  n({ reflect: true })
], CsInput.prototype, "size", 2);
__decorateClass([
  n({ reflect: true })
], CsInput.prototype, "appearance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsInput.prototype, "pill", 2);
__decorateClass([
  n()
], CsInput.prototype, "label", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsInput.prototype, "hint", 2);
__decorateClass([
  n({ attribute: "with-clear", type: Boolean })
], CsInput.prototype, "withClear", 2);
__decorateClass([
  n()
], CsInput.prototype, "placeholder", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsInput.prototype, "readonly", 2);
__decorateClass([
  n({ attribute: "password-toggle", type: Boolean })
], CsInput.prototype, "passwordToggle", 2);
__decorateClass([
  n({ attribute: "password-visible", type: Boolean })
], CsInput.prototype, "passwordVisible", 2);
__decorateClass([
  n({ attribute: "without-spin-buttons", type: Boolean, reflect: true })
], CsInput.prototype, "withoutSpinButtons", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsInput.prototype, "required", 2);
__decorateClass([
  n()
], CsInput.prototype, "pattern", 2);
__decorateClass([
  n({ type: Number })
], CsInput.prototype, "minlength", 2);
__decorateClass([
  n({ type: Number })
], CsInput.prototype, "maxlength", 2);
__decorateClass([
  n()
], CsInput.prototype, "min", 2);
__decorateClass([
  n()
], CsInput.prototype, "max", 2);
__decorateClass([
  n()
], CsInput.prototype, "step", 2);
__decorateClass([
  n()
], CsInput.prototype, "autocapitalize", 2);
__decorateClass([
  n({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "off" ? false : true,
      toAttribute: (value) => value ? "on" : "off"
    }
  })
], CsInput.prototype, "autocorrect", 2);
__decorateClass([
  n()
], CsInput.prototype, "autocomplete", 2);
__decorateClass([
  n({ type: Boolean })
], CsInput.prototype, "autofocus", 2);
__decorateClass([
  n()
], CsInput.prototype, "enterkeyhint", 2);
__decorateClass([
  n({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], CsInput.prototype, "spellcheck", 2);
__decorateClass([
  n()
], CsInput.prototype, "inputmode", 2);
__decorateClass([
  n({ attribute: "ssr-label", type: Boolean })
], CsInput.prototype, "ssrLabel", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsInput.prototype, "ssrHint", 2);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], CsInput.prototype, "handleStepChange", 1);
CsInput = __decorateClass([
  customElement("cs-input")
], CsInput);
CsInput.disableWarning?.("change-in-update");

export {
  CsInput
};
