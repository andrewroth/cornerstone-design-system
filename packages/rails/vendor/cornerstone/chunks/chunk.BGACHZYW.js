/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  switch_styles_default
} from "./chunk.YCJV62NR.js";
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
  n
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

// src/components/switch/switch.ts
var CsSwitch = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint");
    this.localize = new LocalizeController(this);
    this.title = "";
    this.name = null;
    this._value = this.getAttribute("value") ?? null;
    this.size = "m";
    this.disabled = false;
    this._checked = null;
    this.defaultChecked = this.hasAttribute("checked");
    this.required = false;
    this.hint = "";
    this.ssrHint = false;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  /** The value of the switch, submitted as a name/value pair with form data. */
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
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  handleKeyDown(event) {
    const isRtl = this.localize.dir() === "rtl";
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = isRtl;
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = !isRtl;
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("checked") || changedProperties.has("defaultChecked") || changedProperties.has("disabled")) {
      this.handleValueOrCheckedChange();
    }
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
    }
    this.customStates.set("checked", this.checked);
    this.updateValidity();
  }
  handleDisabledChange() {
    this.updateValidity();
  }
  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }
  /** Sets focus on the switch. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }
  setValue(value, stateValue) {
    if (!this.checked) {
      this.internals.setFormValue(null, null);
      return;
    }
    this.internals.setFormValue(value ?? "on", stateValue);
  }
  formResetCallback() {
    this._checked = null;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }
  render() {
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasHint = this.hint ? true : !!hasHintSlot;
    const checkedAttribute = this.didSSR && !this.hasUpdated ? this.checked : this.defaultChecked;
    const checkedProperty = this.didSSR && !this.hasUpdated ? null : l(this.checked);
    return b`
      <label
        part="switch"
        class=${e2({
      checked: this.checked,
      disabled: this.disabled
    })}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${o(this.name)}
          value=${o(this.value)}
          .checked=${o(checkedProperty)}
          ?checked=${checkedAttribute}
          ?disabled=${this.disabled}
          ?required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${e2({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
CsSwitch.shadowRootOptions = { ...CornerstoneFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
CsSwitch.css = [form_control_styles_default, size_styles_default, switch_styles_default];
__decorateClass([
  e('input[type="checkbox"]')
], CsSwitch.prototype, "input", 2);
__decorateClass([
  n()
], CsSwitch.prototype, "title", 2);
__decorateClass([
  n({ reflect: true })
], CsSwitch.prototype, "name", 2);
__decorateClass([
  n({ reflect: true })
], CsSwitch.prototype, "value", 1);
__decorateClass([
  n({ reflect: true })
], CsSwitch.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean })
], CsSwitch.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, attribute: false })
], CsSwitch.prototype, "checked", 1);
__decorateClass([
  n({ type: Boolean, attribute: "checked", reflect: true })
], CsSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSwitch.prototype, "required", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsSwitch.prototype, "hint", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsSwitch.prototype, "ssrHint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], CsSwitch.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], CsSwitch.prototype, "handleDisabledChange", 1);
CsSwitch = __decorateClass([
  customElement("cs-switch")
], CsSwitch);
CsSwitch.disableWarning?.("change-in-update");

export {
  CsSwitch
};
