/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  number_input_styles_default
} from "./chunk.AWSBPE6O.js";
import {
  submitOnEnter
} from "./chunk.I3GI4VWI.js";
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

// src/components/number-input/number-input.ts
var CsNumberInput = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.title = "";
    // make reactive to pass through
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.size = "m";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.placeholder = "";
    this.readonly = false;
    this.required = false;
    this.step = 1;
    this.withoutSteppers = false;
    this.inputmode = "numeric";
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
  /** Returns true if the value is at or below the minimum. */
  get isAtMin() {
    if (this.min === void 0) {
      return false;
    }
    const numValue = parseFloat(this.value || "");
    return !isNaN(numValue) && numValue <= this.min;
  }
  /** Returns true if the value is at or above the maximum. */
  get isAtMax() {
    if (this.max === void 0) {
      return false;
    }
    const numValue = parseFloat(this.value || "");
    return !isNaN(numValue) && numValue >= this.max;
  }
  handleChange(event) {
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleInput() {
    this.value = this.input.value;
  }
  handleKeyDown(event) {
    submitOnEnter(event, this);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      requestAnimationFrame(() => {
        if (this.value !== this.input.value) {
          this.value = this.input.value;
        }
      });
    }
  }
  handleStepperPointerUp(direction, event) {
    if (this.disabled || this.readonly) {
      return;
    }
    const beforeInputEvent = new InputEvent("beforeinput", { bubbles: true, cancelable: true, composed: true });
    this.dispatchEvent(beforeInputEvent);
    if (beforeInputEvent.defaultPrevented) {
      return;
    }
    if (direction === "up") {
      this.input.stepUp();
    } else {
      this.input.stepDown();
    }
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    if (event.pointerType !== "touch") {
      this.input.focus();
    }
  }
  handleStepperPointerDown(event) {
    if (event.pointerType === "touch") {
      return;
    }
    event.preventDefault();
    this.input.focus();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("defaultValue")) {
      if (this.input && this.value && this.input.value !== this.value) {
        this._value = this.input.value;
      }
      this.customStates.set("blank", !this.value);
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
  /** Increments the value by the step amount. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value by the step amount. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  formResetCallback() {
    this.value = this.defaultValue;
    super.formResetCallback();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "ssrLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
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

      <div part="number-input" class="number-field">
        ${!this.withoutSteppers ? b`
                <button
                  part="stepper stepper-decrement"
                  class="stepper stepper-decrement"
                  type="button"
                  tabindex="-1"
                  aria-label=${this.localize.term("decrement")}
                  ?disabled=${this.disabled || this.readonly || this.isAtMin}
                  @pointerdown=${this.handleStepperPointerDown}
                  @pointerup=${(event) => this.handleStepperPointerUp("down", event)}
                >
                  <slot name="decrement-icon">
                    <cs-icon name="remove" library="system"></cs-icon>
                  </slot>
                </button>
              ` : ""}

        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type="number"
          inputmode=${o(this.inputmode)}
          title=${this.title}
          name=${o(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o(this.placeholder)}
          min=${o(this.min)}
          max=${o(this.max)}
          step=${o(this.step)}
          .value=${l(this.value ?? "")}
          autocomplete=${o(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${o(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${!this.withoutSteppers ? b`
                <button
                  part="stepper stepper-increment"
                  class="stepper stepper-increment"
                  type="button"
                  tabindex="-1"
                  aria-label=${this.localize.term("increment")}
                  ?disabled=${this.disabled || this.readonly || this.isAtMax}
                  @pointerdown=${this.handleStepperPointerDown}
                  @pointerup=${(event) => this.handleStepperPointerUp("up", event)}
                >
                  <slot name="increment-icon">
                    <cs-icon name="add" library="system"></cs-icon>
                  </slot>
                </button>
              ` : ""}
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
CsNumberInput.css = [size_styles_default, form_control_styles_default, number_input_styles_default];
CsNumberInput.shadowRootOptions = { ...CornerstoneFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  e("input")
], CsNumberInput.prototype, "input", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "title", 2);
__decorateClass([
  r()
], CsNumberInput.prototype, "value", 1);
__decorateClass([
  n({ attribute: "value", reflect: true })
], CsNumberInput.prototype, "defaultValue", 2);
__decorateClass([
  n({ reflect: true })
], CsNumberInput.prototype, "size", 2);
__decorateClass([
  n({ reflect: true })
], CsNumberInput.prototype, "appearance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsNumberInput.prototype, "pill", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "label", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsNumberInput.prototype, "hint", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "placeholder", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsNumberInput.prototype, "readonly", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsNumberInput.prototype, "required", 2);
__decorateClass([
  n({ type: Number })
], CsNumberInput.prototype, "min", 2);
__decorateClass([
  n({ type: Number })
], CsNumberInput.prototype, "max", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "step", 2);
__decorateClass([
  n({ attribute: "without-steppers", type: Boolean })
], CsNumberInput.prototype, "withoutSteppers", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "autocomplete", 2);
__decorateClass([
  n({ type: Boolean })
], CsNumberInput.prototype, "autofocus", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "enterkeyhint", 2);
__decorateClass([
  n()
], CsNumberInput.prototype, "inputmode", 2);
__decorateClass([
  n({ attribute: "ssr-label", type: Boolean })
], CsNumberInput.prototype, "ssrLabel", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsNumberInput.prototype, "ssrHint", 2);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], CsNumberInput.prototype, "handleStepChange", 1);
CsNumberInput = __decorateClass([
  customElement("cs-number-input")
], CsNumberInput);
CsNumberInput.disableWarning?.("change-in-update");

export {
  CsNumberInput
};
