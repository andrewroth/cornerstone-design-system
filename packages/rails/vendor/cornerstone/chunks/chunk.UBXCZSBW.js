/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  select_styles_default
} from "./chunk.Z2XNINUN.js";
import {
  o as o2
} from "./chunk.CW2GRV24.js";
import {
  scrollIntoView
} from "./chunk.I467WJ3G.js";
import {
  CsShowEvent
} from "./chunk.3ZOOG3MW.js";
import {
  CsHideEvent
} from "./chunk.4UXBEDUP.js";
import {
  CsAfterHideEvent
} from "./chunk.NTVMNT4T.js";
import {
  CsAfterShowEvent
} from "./chunk.UKTDLFCP.js";
import {
  CsClearEvent
} from "./chunk.NLPSVSUU.js";
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible
} from "./chunk.OW5I3LRS.js";
import {
  RequiredValidator
} from "./chunk.BWRQEKED.js";
import {
  form_control_styles_default
} from "./chunk.GNP22RG3.js";
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
  waitForEvent
} from "./chunk.EVAGGOC2.js";
import {
  animateWithClass
} from "./chunk.HC2QZ77X.js";
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
  o
} from "./chunk.CRKHH5GL.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/select/select.ts
var CsSelect = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.cachedOptions = null;
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.selectionOrder = /* @__PURE__ */ new Map();
    this.typeToSelectString = "";
    this.slotChangePending = false;
    this.displayLabel = "";
    this.selectedOptions = [];
    this.name = "";
    this._defaultValue = null;
    this.size = "m";
    this.placeholder = "";
    this.multiple = false;
    this.maxOptionsVisible = 3;
    this.disabled = false;
    this.withClear = false;
    this.open = false;
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.placement = "bottom";
    this.hint = "";
    this.ssrLabel = false;
    this.ssrHint = false;
    this.required = false;
    this.getTag = (option) => {
      return b`
      <cs-tag
        part="tag"
        exportparts="
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__button:tag__remove-button__button
          "
        ?pill=${this.pill}
        size=${this.size}
        with-remove
        data-value=${option.value}
        @cs-remove=${(event) => this.handleTagRemove(event, option)}
      >
        ${option.label}
      </cs-tag>
    `;
    };
    this.handleDocumentFocusIn = (event) => {
      const path = event.composedPath();
      if (!path.includes(this)) {
        this.hide();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      const target = event.target;
      const isClearButton = target.closest('[part~="clear-button"]') !== null;
      const isButton = target.closest("cs-button") !== null;
      if (isClearButton || isButton) {
        return;
      }
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
      if (event.key === "Enter" || event.key === " " && this.typeToSelectString === "") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!this.open) {
          this.show();
          return;
        }
        if (this.currentOption && !this.currentOption.disabled) {
          this.valueHasChanged = true;
          this.hasInteracted = true;
          if (this.multiple) {
            this.toggleOptionSelection(this.currentOption);
          } else {
            this.setSelectedOptions(this.currentOption);
          }
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
          if (!this.multiple) {
            this.hide();
            this.displayInput.focus({ preventScroll: true });
          }
        }
        return;
      }
      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        const allOptions = this.getAllOptions();
        const currentIndex = allOptions.indexOf(this.currentOption);
        let newIndex = Math.max(0, currentIndex);
        event.preventDefault();
        if (!this.open) {
          this.show();
          if (this.currentOption) {
            return;
          }
        }
        if (event.key === "ArrowDown") {
          newIndex = currentIndex + 1;
          if (newIndex > allOptions.length - 1) {
            newIndex = 0;
          }
        } else if (event.key === "ArrowUp") {
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = allOptions.length - 1;
          }
        } else if (event.key === "Home") {
          newIndex = 0;
        } else if (event.key === "End") {
          newIndex = allOptions.length - 1;
        }
        this.setCurrentOption(allOptions[newIndex]);
      }
      if (event.key?.length === 1 || event.key === "Backspace") {
        const allOptions = this.getAllOptions();
        if (event.metaKey || event.ctrlKey || event.altKey) {
          return;
        }
        if (!this.open) {
          if (event.key === "Backspace") {
            return;
          }
          this.show();
        }
        event.stopPropagation();
        event.preventDefault();
        clearTimeout(this.typeToSelectTimeout);
        this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3);
        if (event.key === "Backspace") {
          this.typeToSelectString = this.typeToSelectString.slice(0, -1);
        } else {
          this.typeToSelectString += event.key.toLowerCase();
        }
        for (const option of allOptions) {
          const label = option.label.toLowerCase();
          if (label.startsWith(this.typeToSelectString)) {
            this.setCurrentOption(option);
            break;
          }
        }
      }
    };
    this.handleDocumentMouseDown = (event) => {
      const path = event.composedPath();
      if (!path.includes(this)) {
        this.hide();
      }
    };
  }
  static get validators() {
    return [
      ...super.validators,
      RequiredValidator({
        validationElement: () => Object.assign(document.createElement("select"), { required: true })
      })
    ];
  }
  /** Where to anchor native constraint validation */
  get validationTarget() {
    return this.valueInput;
  }
  set defaultValue(val) {
    this._defaultValue = this.convertDefaultValue(val);
  }
  get defaultValue() {
    return this.convertDefaultValue(this._defaultValue);
  }
  rawValuesEqual(a, b2) {
    if (a == null && b2 == null) {
      return true;
    }
    if (a == null || b2 == null) {
      return false;
    }
    if (a.length !== b2.length) {
      return false;
    }
    return a.every((v, i) => v === b2[i]);
  }
  /**
   * @private
   * A converter for defaultValue from array to string if its multiple. Also fixes some hydration issues.
   */
  convertDefaultValue(val) {
    const isMultiple = this.multiple || this.hasAttribute("multiple");
    if (!isMultiple && Array.isArray(val)) {
      val = val[0];
    }
    return val;
  }
  set value(val) {
    const oldValue = this.value;
    if (val instanceof FormData) {
      val = val.getAll(this.name);
    }
    if (val != null && !Array.isArray(val)) {
      val = [val];
    }
    const oldRawValue = this._value;
    this._value = val ?? null;
    if (!this.rawValuesEqual(oldRawValue, this._value)) {
      this.valueHasChanged = true;
      this.requestUpdate("value", oldValue);
    }
  }
  get value() {
    let value = this._value ?? this.defaultValue ?? null;
    if (value != null) {
      value = Array.isArray(value) ? value : [value];
    }
    this.optionValues = new Set(
      this.getAllOptions().filter((option) => !option.disabled).map((option) => option.value)
    );
    let ret = value;
    if (value != null) {
      ret = value.filter((v) => this.optionValues.has(v));
      ret = this.multiple ? ret : ret[0];
      ret = ret ?? null;
    }
    return ret;
  }
  connectedCallback() {
    super.connectedCallback();
    this.processSlotChange();
    this.open = false;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
    this.cachedOptions = null;
  }
  updateDefaultValue() {
    const allOptions = this.getAllOptions();
    const defaultSelectedOptions = allOptions.filter((el) => el.hasAttribute("selected") || el.defaultSelected);
    if (defaultSelectedOptions.length > 0) {
      const selectedValues = defaultSelectedOptions.map((el) => el.value);
      this._defaultValue = this.multiple ? selectedValues : selectedValues[0];
    }
    if (this.hasAttribute("value")) {
      this._defaultValue = this.getAttribute("value") || null;
    }
  }
  addOpenListeners() {
    document.addEventListener("focusin", this.handleDocumentFocusIn);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    registerDismissible(this);
    if (this.getRootNode() !== document) {
      this.getRootNode().addEventListener("focusin", this.handleDocumentFocusIn);
    }
  }
  removeOpenListeners() {
    document.removeEventListener("focusin", this.handleDocumentFocusIn);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    unregisterDismissible(this);
    if (this.getRootNode() !== document) {
      this.getRootNode().removeEventListener("focusin", this.handleDocumentFocusIn);
    }
  }
  handleFocus() {
    this.displayInput.setSelectionRange(0, 0);
  }
  handleLabelClick() {
    this.displayInput.focus();
  }
  handleComboboxClick(event) {
    event.preventDefault();
  }
  handleComboboxMouseDown(event) {
    const path = event.composedPath();
    const isButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === "cs-button");
    if (this.disabled || isButton) {
      return;
    }
    event.preventDefault();
    this.displayInput.focus({ preventScroll: true });
    this.open = !this.open;
  }
  handleComboboxKeyDown(event) {
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.hasInteracted = true;
    this.valueHasChanged = true;
    if (this.value !== null) {
      this.displayLabel = "";
      this.selectionOrder.clear();
      this.setSelectedOptions([]);
      this.displayInput.focus({ preventScroll: true });
      this.updateComplete.then(() => {
        this.dispatchEvent(new CsClearEvent());
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleClearMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOptionClick(event) {
    const target = event.target;
    const option = target.closest("cs-option");
    if (option && !option.disabled) {
      this.hasInteracted = true;
      this.valueHasChanged = true;
      if (this.multiple) {
        this.toggleOptionSelection(option);
      } else {
        this.setSelectedOptions(option);
      }
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));
      this.requestUpdate("value");
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
      if (!this.multiple) {
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
    }
  }
  /* @internal - used by options to update labels */
  handleDefaultSlotChange() {
    if (this.slotChangePending) {
      return;
    }
    this.slotChangePending = true;
    queueMicrotask(() => {
      this.slotChangePending = false;
      this.processSlotChange();
    });
  }
  processSlotChange() {
    if (!customElements.get("cs-option")) {
      customElements.whenDefined("cs-option").then(() => this.handleDefaultSlotChange());
    }
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.handleDefaultSlotChange();
      });
      return;
    }
    this.cachedOptions = null;
    const allOptions = this.getAllOptions();
    this.updateDefaultValue();
    let value = this.value;
    if (value == null || !this.valueHasChanged && !this.hasInteracted) {
      this.selectionChanged();
      return;
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    const selectedOptions = allOptions.filter((el) => value.includes(el.value));
    this.setSelectedOptions(selectedOptions);
  }
  handleTagRemove(event, directOption) {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.hasInteracted = true;
    this.valueHasChanged = true;
    let option = directOption;
    if (!option) {
      const tagElement = event.target.closest("cs-tag[data-value]");
      if (tagElement) {
        const value = tagElement.dataset.value;
        option = this.selectedOptions.find((opt) => opt.value === value);
      }
    }
    if (option) {
      this.toggleOptionSelection(option, false);
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  // Gets an array of all `<cs-option>` elements
  getAllOptions() {
    if (this.cachedOptions) {
      return this.cachedOptions;
    }
    if (!this?.querySelectorAll) {
      return [];
    }
    this.cachedOptions = [...this.querySelectorAll("cs-option")];
    return this.cachedOptions;
  }
  // Gets the first `<cs-option>` element
  getFirstOption() {
    return this.querySelector("cs-option");
  }
  // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
  // option may be "current" at a time.
  setCurrentOption(option) {
    const allOptions = this.getAllOptions();
    allOptions.forEach((el) => {
      el.current = false;
      el.tabIndex = -1;
    });
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
      option.focus({ preventScroll: true });
      if (this.open && !this.listbox.hidden) {
        scrollIntoView(option, this.listbox, "vertical", "auto");
      }
    }
  }
  // Sets the selected option(s)
  setSelectedOptions(option) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];
    allOptions.forEach((el) => {
      if (newSelectedOptions.includes(el)) {
        return;
      }
      el.selected = false;
    });
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach((el) => el.selected = true);
    }
    this.selectionChanged();
  }
  // Toggles an option's selected state
  toggleOptionSelection(option, force) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }
    this.selectionChanged();
  }
  // @internal This method must be called whenever the selection changes. It will update the selected options cache, the
  // current value, and the display value. The option component uses it internally to update labels as they change.
  selectionChanged() {
    const options = this.getAllOptions();
    const newSelectedOptions = options.filter((el) => {
      if (!this.hasInteracted && !this.valueHasChanged) {
        const defaultValue = this.defaultValue;
        const defaultValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        return el.hasAttribute("selected") || el.defaultSelected || el.selected || defaultValues.includes(el.value);
      }
      return el.selected;
    });
    const newSelectedValues = new Set(newSelectedOptions.map((el) => el.value));
    for (const value of this.selectionOrder.keys()) {
      if (!newSelectedValues.has(value)) {
        this.selectionOrder.delete(value);
      }
    }
    const maxOrder = this.selectionOrder.size > 0 ? Math.max(...this.selectionOrder.values()) : -1;
    let nextOrder = maxOrder + 1;
    for (const option of newSelectedOptions) {
      if (!this.selectionOrder.has(option.value)) {
        this.selectionOrder.set(option.value, nextOrder++);
      }
    }
    this.selectedOptions = newSelectedOptions.sort((a, b2) => {
      const orderA = this.selectionOrder.get(a.value) ?? 0;
      const orderB = this.selectionOrder.get(b2.value) ?? 0;
      return orderA - orderB;
    });
    const selectedValues = new Set(this.selectedOptions.map((el) => el.value));
    if (selectedValues.size > 0 || this._value) {
      const oldValue = this._value;
      if (this._value == null) {
        const value = this.defaultValue ?? [];
        this._value = Array.isArray(value) ? value : [value];
      }
      this._value = this._value?.filter((value) => !this.optionValues?.has(value)) ?? null;
      this._value?.unshift(...selectedValues);
      this.requestUpdate("value", oldValue);
    }
    if (this.multiple) {
      if (this.placeholder && !this.value?.length) {
        this.displayLabel = "";
      } else {
        this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length);
      }
    } else {
      const selectedOption = this.selectedOptions[0];
      this.displayLabel = selectedOption?.label ?? "";
    }
    this.updateComplete.then(() => {
      this.updateValidity();
    });
  }
  get tags() {
    return this.selectedOptions.map((option, index) => {
      if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        const tag = this.getTag(option, index);
        if (!tag) {
          return null;
        }
        return typeof tag === "string" ? o2(tag) : tag;
      } else if (index === this.maxOptionsVisible) {
        return b`
          <cs-tag
            part="tag"
            exportparts="
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__button:tag__remove-button__button
            "
            >+${this.selectedOptions.length - index}</cs-tag
          >
        `;
      }
      return null;
    });
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("displayLabel")) {
      this.customStates.set("blank", !this.value && !this.displayLabel);
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.open = false;
    }
  }
  handleValueChange() {
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    const selectedOptions = allOptions.filter((el) => value.includes(el.value));
    this.setSelectedOptions(selectedOptions);
    this.updateValidity();
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());
      const csShowEvent = new CsShowEvent();
      this.dispatchEvent(csShowEvent);
      if (csShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      this.addOpenListeners();
      this.listbox.hidden = false;
      this.popup.active = true;
      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      await animateWithClass(this.popup.popup, "show");
      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
      }
      this.dispatchEvent(new CsAfterShowEvent());
    } else {
      const csHideEvent = new CsHideEvent();
      this.dispatchEvent(csHideEvent);
      if (csHideEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      this.removeOpenListeners();
      await animateWithClass(this.popup.popup, "hide");
      this.listbox.hidden = true;
      this.popup.active = false;
      this.dispatchEvent(new CsAfterHideEvent());
    }
  }
  /** Shows the listbox. */
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "cs-after-show");
  }
  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "cs-after-hide");
  }
  /** Sets focus on the control. */
  focus(options) {
    this.displayInput.focus(options);
  }
  /** Removes focus from the control. */
  blur() {
    this.displayInput.blur();
  }
  formResetCallback() {
    this.selectionOrder.clear();
    this.value = this.defaultValue;
    super.formResetCallback();
    this.handleValueChange();
    this.updateComplete.then(() => {
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "ssrLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasClearIcon = (this.hasUpdated || o) && this.withClear && !this.disabled && (this.displayLabel || this.value && this.value.length > 0);
    return b`
      <div
        part="form-control"
        class=${e2({
      "form-control": true,
      "form-control-has-label": hasLabel
    })}
      >
        <label
          id="label"
          part="form-control-label"
          class=${e2({
      label: true,
      "has-label": hasLabel
    })}
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <cs-popup
            class=${e2({
      select: true,
      open: this.open,
      disabled: this.disabled,
      enabled: !this.disabled,
      multiple: this.multiple
    })}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple && this.hasUpdated ? b`<div part="tags" class="tags" @cs-remove=${this.handleTagRemove}>${this.tags}</div>` : ""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
              />

              ${hasClearIcon ? b`
                      <button
                        part="clear-button"
                        type="button"
                        aria-label=${this.localize.term("clearEntry")}
                        @mousedown=${this.handleClearMouseDown}
                        @click=${this.handleClearClick}
                        tabindex="-1"
                      >
                        <slot name="clear-icon">
                          <cs-icon name="cancel" library="system"></cs-icon>
                        </slot>
                      </button>
                    ` : ""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <cs-icon library="system" name="keyboard_arrow_down"></cs-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </cs-popup>
        </div>

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
      </div>
    `;
  }
};
CsSelect.css = [select_styles_default, form_control_styles_default, size_styles_default];
__decorateClass([
  e(".select")
], CsSelect.prototype, "popup", 2);
__decorateClass([
  e(".combobox")
], CsSelect.prototype, "combobox", 2);
__decorateClass([
  e(".display-input")
], CsSelect.prototype, "displayInput", 2);
__decorateClass([
  e(".value-input")
], CsSelect.prototype, "valueInput", 2);
__decorateClass([
  e(".listbox")
], CsSelect.prototype, "listbox", 2);
__decorateClass([
  r()
], CsSelect.prototype, "displayLabel", 2);
__decorateClass([
  r()
], CsSelect.prototype, "currentOption", 2);
__decorateClass([
  r()
], CsSelect.prototype, "selectedOptions", 2);
__decorateClass([
  n({ reflect: true })
], CsSelect.prototype, "name", 2);
__decorateClass([
  n({
    attribute: false
  })
], CsSelect.prototype, "defaultValue", 1);
__decorateClass([
  n({ attribute: "value", reflect: false })
], CsSelect.prototype, "value", 1);
__decorateClass([
  n({ reflect: true })
], CsSelect.prototype, "size", 2);
__decorateClass([
  n()
], CsSelect.prototype, "placeholder", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSelect.prototype, "multiple", 2);
__decorateClass([
  n({ attribute: "max-options-visible", type: Number })
], CsSelect.prototype, "maxOptionsVisible", 2);
__decorateClass([
  n({ type: Boolean })
], CsSelect.prototype, "disabled", 2);
__decorateClass([
  n({ attribute: "with-clear", type: Boolean })
], CsSelect.prototype, "withClear", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSelect.prototype, "open", 2);
__decorateClass([
  n({ reflect: true })
], CsSelect.prototype, "appearance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSelect.prototype, "pill", 2);
__decorateClass([
  n()
], CsSelect.prototype, "label", 2);
__decorateClass([
  n({ reflect: true })
], CsSelect.prototype, "placement", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsSelect.prototype, "hint", 2);
__decorateClass([
  n({ attribute: "ssr-label", type: Boolean })
], CsSelect.prototype, "ssrLabel", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsSelect.prototype, "ssrHint", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSelect.prototype, "required", 2);
__decorateClass([
  n({ attribute: false })
], CsSelect.prototype, "getTag", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], CsSelect.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], CsSelect.prototype, "handleValueChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], CsSelect.prototype, "handleOpenChange", 1);
CsSelect = __decorateClass([
  customElement("cs-select")
], CsSelect);
CsSelect.disableWarning?.("change-in-update");

export {
  CsSelect
};
