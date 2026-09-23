/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  textarea_styles_default
} from "./chunk.WIQWTLJD.js";
import {
  visually_hidden_styles_default
} from "./chunk.EOSY2PVW.js";
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

// src/components/textarea/textarea.ts
var CsTextarea = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.announcedCountText = "";
    this.title = "";
    this.name = null;
    this._value = null;
    this.defaultValue = this.getAttribute("value") ?? "";
    this.size = "m";
    this.appearance = "outlined";
    this.label = "";
    this.hint = "";
    this.placeholder = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.spellcheck = true;
    this.ssrLabel = false;
    this.ssrHint = false;
    this.withCount = false;
    this.lastObservedWidth = 0;
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
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.setTextareaDimensions();
      this.updateResizeObserver();
      if (this.didSSR && this.input && this.value !== this.input.value) {
        const value = this.input.value;
        this.value = value;
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.countAnnounceTimeout);
    this.resizeObserver?.disconnect();
    this.resizeObserver = void 0;
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
  /** Creates or destroys the resize observer based on the current resize mode. */
  updateResizeObserver() {
    const needsObserver = this.resize !== "none";
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = void 0;
    }
    if (needsObserver && this.input) {
      if (this.resize === "auto") {
        this.resizeObserver = new ResizeObserver((entries) => {
          const width = entries[0]?.contentRect.width ?? 0;
          if (width !== this.lastObservedWidth) {
            this.lastObservedWidth = width;
            requestAnimationFrame(() => this.setTextareaDimensions());
          }
        });
        this.resizeObserver.observe(this);
      } else {
        this.resizeObserver = new ResizeObserver(() => this.setTextareaDimensions());
        this.resizeObserver.observe(this.input);
      }
    }
  }
  handleBlur() {
    this.checkValidity();
  }
  handleChange(event) {
    this.valueHasChanged = true;
    this.value = this.input.value;
    this.setTextareaDimensions();
    this.checkValidity();
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleInput(event) {
    this.valueHasChanged = true;
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
    this.scheduleCountAnnouncement();
  }
  scheduleCountAnnouncement() {
    clearTimeout(this.countAnnounceTimeout);
    this.countAnnounceTimeout = setTimeout(() => {
      const currentLength = (this.value ?? "").length;
      this.announcedCountText = this.maxlength != null ? this.localize.term("numCharactersRemaining", this.maxlength - currentLength) : this.localize.term("numCharacters", currentLength);
    }, 1e3);
  }
  setTextareaDimensions() {
    if (this.resize === "none") {
      this.base.style.width = ``;
      this.base.style.height = ``;
      return;
    }
    if (this.resize === "auto") {
      this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
      this.input.style.height = "auto";
      const newHeight = this.input.scrollHeight;
      this.input.style.height = `${newHeight}px`;
      this.sizeAdjuster.style.height = `${newHeight}px`;
      this.base.style.width = ``;
      this.base.style.height = ``;
      return;
    }
    if (this.input.style.width) {
      const width = Number(this.input.style.width.split(/px/)[0]) + 2;
      this.base.style.width = `${width}px`;
    }
    if (this.input.style.height) {
      const height = Number(this.input.style.height.split(/px/)[0]) + 2;
      this.base.style.height = `${height}px`;
    }
  }
  handleRowsChange() {
    this.setTextareaDimensions();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.checkValidity();
    this.setTextareaDimensions();
  }
  updated(changedProperties) {
    if (changedProperties.has("resize")) {
      this.setTextareaDimensions();
      this.updateResizeObserver();
    }
    super.updated(changedProperties);
    if (changedProperties.has("value")) {
      this.customStates.set("blank", !this.value);
    }
  }
  /** Sets focus on the textarea. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the textarea. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the textarea. */
  select() {
    this.input.select();
  }
  /** Gets or sets the textarea's scroll position. */
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number") {
        this.input.scrollTop = position.top;
      }
      if (typeof position.left === "number") {
        this.input.scrollLeft = position.left;
      }
      return void 0;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollLeft
    };
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
      this.setTextareaDimensions();
    }
  }
  formResetCallback() {
    this._value = null;
    if (this.input) {
      this.input.value = this.value || "";
    }
    super.formResetCallback();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "ssrLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const currentLength = (this.value ?? "").length;
    const countText = this.maxlength != null ? this.localize.term("numCharactersRemaining", this.maxlength - currentLength) : this.localize.term("numCharacters", currentLength);
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

      <div part="textarea-wrapper" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${o(this.name)}
          .value=${l(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o(this.placeholder)}
          rows=${o(this.rows)}
          minlength=${o(this.minlength)}
          maxlength=${o(this.maxlength)}
          autocapitalize=${o(this.autocapitalize)}
          autocorrect=${o(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${o(this.spellcheck)}
          enterkeyhint=${o(this.enterkeyhint)}
          inputmode=${o(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize !== "auto"}></div>
      </div>

      <div
        part="hint"
        class=${e2({
      footer: true,
      "has-count": this.withCount,
      "has-slotted": hasHint
    })}
      >
        <slot id="hint" name="hint" class="hint" aria-hidden=${hasHint ? "false" : "true"}>${this.hint}</slot>

        ${this.withCount ? b`
                <div part="count" class="count" aria-hidden="true">${countText}</div>
                <div class="cs-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
              ` : ""}
      </div>
    `;
  }
};
CsTextarea.css = [textarea_styles_default, form_control_styles_default, size_styles_default, visually_hidden_styles_default];
__decorateClass([
  r()
], CsTextarea.prototype, "announcedCountText", 2);
__decorateClass([
  e(".control")
], CsTextarea.prototype, "input", 2);
__decorateClass([
  e('[part~="textarea-wrapper"]')
], CsTextarea.prototype, "base", 2);
__decorateClass([
  e(".size-adjuster")
], CsTextarea.prototype, "sizeAdjuster", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "title", 2);
__decorateClass([
  n({ reflect: true })
], CsTextarea.prototype, "name", 2);
__decorateClass([
  r()
], CsTextarea.prototype, "value", 1);
__decorateClass([
  n({ attribute: "value", reflect: true })
], CsTextarea.prototype, "defaultValue", 2);
__decorateClass([
  n({ reflect: true })
], CsTextarea.prototype, "size", 2);
__decorateClass([
  n({ reflect: true })
], CsTextarea.prototype, "appearance", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "label", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsTextarea.prototype, "hint", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "placeholder", 2);
__decorateClass([
  n({ type: Number })
], CsTextarea.prototype, "rows", 2);
__decorateClass([
  n({ reflect: true })
], CsTextarea.prototype, "resize", 2);
__decorateClass([
  n({ type: Boolean })
], CsTextarea.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTextarea.prototype, "readonly", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTextarea.prototype, "required", 2);
__decorateClass([
  n({ type: Number })
], CsTextarea.prototype, "minlength", 2);
__decorateClass([
  n({ type: Number })
], CsTextarea.prototype, "maxlength", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "autocapitalize", 2);
__decorateClass([
  n({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "off" ? false : true,
      toAttribute: (value) => value ? "on" : "off"
    }
  })
], CsTextarea.prototype, "autocorrect", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "autocomplete", 2);
__decorateClass([
  n({ type: Boolean })
], CsTextarea.prototype, "autofocus", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "enterkeyhint", 2);
__decorateClass([
  n({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], CsTextarea.prototype, "spellcheck", 2);
__decorateClass([
  n()
], CsTextarea.prototype, "inputmode", 2);
__decorateClass([
  n({ attribute: "ssr-label", type: Boolean })
], CsTextarea.prototype, "ssrLabel", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsTextarea.prototype, "ssrHint", 2);
__decorateClass([
  n({ attribute: "with-count", type: Boolean, reflect: true })
], CsTextarea.prototype, "withCount", 2);
__decorateClass([
  watch("rows", { waitUntilFirstUpdate: true })
], CsTextarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], CsTextarea.prototype, "handleValueChange", 1);
CsTextarea = __decorateClass([
  customElement("cs-textarea")
], CsTextarea);
CsTextarea.disableWarning?.("change-in-update");

export {
  CsTextarea
};
