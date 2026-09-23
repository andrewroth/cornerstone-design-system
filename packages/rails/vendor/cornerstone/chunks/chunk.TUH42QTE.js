/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  slider_styles_default
} from "./chunk.KB6CFKQH.js";
import {
  activeElements
} from "./chunk.HWIJ6II3.js";
import {
  submitOnEnter
} from "./chunk.I3GI4VWI.js";
import {
  DraggableElement
} from "./chunk.CIU2UIYH.js";
import {
  form_control_styles_default
} from "./chunk.GNP22RG3.js";
import {
  HasSlotController
} from "./chunk.25L55TBI.js";
import {
  clamp
} from "./chunk.VJSGOTOR.js";
import {
  CornerstoneFormAssociatedElement
} from "./chunk.6URCDSBB.js";
import {
  size_styles_default
} from "./chunk.ZJRKBGXI.js";
import {
  e as e2
} from "./chunk.WDXZHMSD.js";
import {
  o
} from "./chunk.AFMAZM55.js";
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

// src/internal/validators/slider-validator.ts
function isStepMismatch(value, min, step) {
  const steps = (value - min) / step;
  return Math.abs(steps - Math.round(steps)) > 1e-9;
}
var SliderValidator = () => {
  return {
    observedAttributes: ["min", "max", "step"],
    checkValidity(element) {
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      const createNativeRange = (value, min, max, step) => {
        if (typeof document === "undefined") {
          return "";
        }
        const input = document.createElement("input");
        input.type = "range";
        input.min = String(min);
        input.max = String(max);
        input.step = String(step);
        input.value = String(value);
        input.checkValidity();
        return input.validationMessage;
      };
      if (element.isRange) {
        const minValue = element.minValue;
        const maxValue = element.maxValue;
        if (minValue < element.min) {
          validity.isValid = false;
          validity.invalidKeys.push("rangeUnderflow");
          validity.message = createNativeRange(minValue, element.min, element.max, element.step) || `Value must be greater than or equal to ${element.min}.`;
          return validity;
        }
        if (maxValue > element.max) {
          validity.isValid = false;
          validity.invalidKeys.push("rangeOverflow");
          validity.message = createNativeRange(maxValue, element.min, element.max, element.step) || `Value must be less than or equal to ${element.max}.`;
          return validity;
        }
        if (element.step && element.step !== 1) {
          const minStepMismatch = isStepMismatch(minValue, element.min, element.step);
          const maxStepMismatch = isStepMismatch(maxValue, element.min, element.step);
          if (minStepMismatch || maxStepMismatch) {
            validity.isValid = false;
            validity.invalidKeys.push("stepMismatch");
            const testValue = minStepMismatch ? minValue : maxValue;
            validity.message = createNativeRange(testValue, element.min, element.max, element.step) || `Value must be a multiple of ${element.step}.`;
            return validity;
          }
        }
      } else {
        const value = element.value;
        if (value < element.min) {
          validity.isValid = false;
          validity.invalidKeys.push("rangeUnderflow");
          validity.message = createNativeRange(value, element.min, element.max, element.step) || `Value must be greater than or equal to ${element.min}.`;
          return validity;
        }
        if (value > element.max) {
          validity.isValid = false;
          validity.invalidKeys.push("rangeOverflow");
          validity.message = createNativeRange(value, element.min, element.max, element.step) || `Value must be less than or equal to ${element.max}.`;
          return validity;
        }
        if (element.step && element.step !== 1 && isStepMismatch(value, element.min, element.step)) {
          validity.isValid = false;
          validity.invalidKeys.push("stepMismatch");
          validity.message = createNativeRange(value, element.min, element.max, element.step) || `Value must be a multiple of ${element.step}.`;
          return validity;
        }
      }
      return validity;
    }
  };
};

// src/components/slider/slider.ts
var CsSlider = class extends CornerstoneFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.draggableThumbMin = null;
    this.draggableThumbMax = null;
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.activeThumb = null;
    this.lastTrackPosition = null;
    this.label = "";
    this.hint = "";
    this.minValue = 0;
    this.maxValue = 50;
    this.defaultValue = this.getAttribute("value") == null ? this.minValue : Number(this.getAttribute("value"));
    this._value = null;
    this.range = false;
    this.disabled = false;
    this.readonly = false;
    this.orientation = "horizontal";
    this.size = "m";
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.tooltipDistance = 8;
    this.tooltipPlacement = "top";
    this.withMarkers = false;
    this.withTooltip = false;
    this.ssrLabel = false;
    this.ssrHint = false;
    this.ssrReference = false;
  }
  static get validators() {
    return [...super.validators, SliderValidator()];
  }
  // Track last position for direction detection
  get focusableAnchor() {
    return this.isRange ? this.thumbMin || this.slider : this.slider;
  }
  /** Override validation target to point to the focusable element */
  get validationTarget() {
    return this.focusableAnchor;
  }
  /** The current value of the slider, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      const val2 = this._value ?? this.minValue ?? 0;
      return clamp(val2, this.min, this.max);
    }
    const val = this._value ?? this.defaultValue;
    return clamp(val, this.min, this.max);
  }
  /**
   * What a non-numeric value is replaced with, mirroring `<input type="range">`'s value sanitization
   * algorithm: the control's default value, which for a range is the midpoint of `min` and `max` — or
   * `min` alone when `max` is below it.
   *
   * Note this is deliberately `min`/`max`, the slider's bounds, and not `minValue`/`maxValue`, which are
   * the two thumb positions of a range slider.
   */
  get sanitizedValue() {
    return this.max < this.min ? this.min : this.min + (this.max - this.min) / 2;
  }
  set value(val) {
    const numeric = Number(val);
    val = Number.isNaN(numeric) ? this.sanitizedValue : numeric;
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  /** Get if this is a range slider */
  get isRange() {
    return this.range;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.isRange) {
      this.draggableThumbMin = new DraggableElement(this.thumbMin, {
        start: () => {
          this.activeThumb = "min";
          this.trackBoundingClientRect = this.track.getBoundingClientRect();
          this.valueWhenDraggingStarted = this.minValue;
          this.customStates.set("dragging", true);
          this.showRangeTooltips();
        },
        move: (x, y) => {
          this.setThumbValueFromCoordinates(x, y, "min");
        },
        stop: () => {
          if (this.minValue !== this.valueWhenDraggingStarted) {
            this.updateComplete.then(() => {
              this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            });
            this.hasInteracted = true;
          }
          this.hideRangeTooltips();
          this.customStates.set("dragging", false);
          this.valueWhenDraggingStarted = void 0;
          this.activeThumb = null;
        }
      });
      this.draggableThumbMax = new DraggableElement(this.thumbMax, {
        start: () => {
          this.activeThumb = "max";
          this.trackBoundingClientRect = this.track.getBoundingClientRect();
          this.valueWhenDraggingStarted = this.maxValue;
          this.customStates.set("dragging", true);
          this.showRangeTooltips();
        },
        move: (x, y) => {
          this.setThumbValueFromCoordinates(x, y, "max");
        },
        stop: () => {
          if (this.maxValue !== this.valueWhenDraggingStarted) {
            this.updateComplete.then(() => {
              this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            });
            this.hasInteracted = true;
          }
          this.hideRangeTooltips();
          this.customStates.set("dragging", false);
          this.valueWhenDraggingStarted = void 0;
          this.activeThumb = null;
        }
      });
      this.draggableTrack = new DraggableElement(this.track, {
        start: (x, y) => {
          this.trackBoundingClientRect = this.track.getBoundingClientRect();
          if (this.activeThumb) {
            this.valueWhenDraggingStarted = this.activeThumb === "min" ? this.minValue : this.maxValue;
          } else {
            const value = this.getValueFromCoordinates(x, y);
            const minDistance = Math.abs(value - this.minValue);
            const maxDistance = Math.abs(value - this.maxValue);
            if (minDistance === maxDistance) {
              if (value > this.maxValue) {
                this.activeThumb = "max";
              } else if (value < this.minValue) {
                this.activeThumb = "min";
              } else {
                const isRtl = this.localize.dir() === "rtl";
                const isVertical = this.orientation === "vertical";
                const position = isVertical ? y : x;
                const previousPosition = this.lastTrackPosition || position;
                this.lastTrackPosition = position;
                const movingForward = position > previousPosition !== isRtl && !isVertical || position < previousPosition && isVertical;
                this.activeThumb = movingForward ? "max" : "min";
              }
            } else {
              this.activeThumb = minDistance <= maxDistance ? "min" : "max";
            }
            this.valueWhenDraggingStarted = this.activeThumb === "min" ? this.minValue : this.maxValue;
          }
          this.customStates.set("dragging", true);
          this.setThumbValueFromCoordinates(x, y, this.activeThumb);
          this.showRangeTooltips();
        },
        move: (x, y) => {
          if (this.activeThumb) {
            this.setThumbValueFromCoordinates(x, y, this.activeThumb);
          }
        },
        stop: () => {
          if (this.activeThumb) {
            const currentValue = this.activeThumb === "min" ? this.minValue : this.maxValue;
            if (currentValue !== this.valueWhenDraggingStarted) {
              this.updateComplete.then(() => {
                this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
              });
              this.hasInteracted = true;
            }
          }
          this.hideRangeTooltips();
          this.customStates.set("dragging", false);
          this.valueWhenDraggingStarted = void 0;
          this.activeThumb = null;
        }
      });
    } else {
      this.draggableTrack = new DraggableElement(this.slider, {
        start: (x, y) => {
          this.trackBoundingClientRect = this.track.getBoundingClientRect();
          this.valueWhenDraggingStarted = this.value;
          this.customStates.set("dragging", true);
          this.setValueFromCoordinates(x, y);
          this.showTooltip();
        },
        move: (x, y) => {
          this.setValueFromCoordinates(x, y);
        },
        stop: () => {
          if (this.value !== this.valueWhenDraggingStarted) {
            this.updateComplete.then(() => {
              this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            });
            this.hasInteracted = true;
          }
          this.hideTooltip();
          this.customStates.set("dragging", false);
          this.valueWhenDraggingStarted = void 0;
        }
      });
    }
  }
  willUpdate(changedProperties) {
    if (this.isRange) {
      if (changedProperties.has("minValue") || changedProperties.has("maxValue") || changedProperties.has("min") || changedProperties.has("max")) {
        this.minValue = clamp(this.minValue, this.min, this.maxValue);
        this.maxValue = clamp(this.maxValue, this.minValue, this.max);
      }
    }
    super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    if (this.isRange) {
      if (changedProperties.has("minValue") || changedProperties.has("maxValue")) {
        this.updateFormValue();
      }
    }
    if (changedProperties.has("disabled") || changedProperties.has("readonly")) {
      const enabled = !(this.disabled || this.readonly);
      if (this.isRange) {
        if (this.draggableThumbMin) {
          this.draggableThumbMin.toggle(enabled);
        }
        if (this.draggableThumbMax) {
          this.draggableThumbMax.toggle(enabled);
        }
      }
      if (this.draggableTrack) {
        this.draggableTrack.toggle(enabled);
      }
    }
    super.updated(changedProperties);
  }
  /** @internal Called when a containing fieldset is disabled. */
  formDisabledCallback(isDisabled) {
    this.disabled = isDisabled;
  }
  /** @internal Called when the form is reset. */
  formResetCallback() {
    if (this.isRange) {
      this.minValue = parseFloat(this.getAttribute("min-value") ?? String(this.min));
      this.maxValue = parseFloat(this.getAttribute("max-value") ?? String(this.max));
    } else {
      this._value = null;
      this.defaultValue = this.defaultValue ?? parseFloat(this.getAttribute("value") ?? String(this.min));
    }
    this.valueHasChanged = false;
    this.hasInteracted = false;
    super.formResetCallback();
  }
  /** Clamps a number to min/max while ensuring it's a valid step interval. */
  clampAndRoundToStep(value) {
    const stepPrecision = (String(this.step).split(".")[1] || "").replace(/0+$/g, "").length;
    const step = Number(this.step);
    const min = Number(this.min);
    const max = Number(this.max);
    value = Math.round(value / step) * step;
    value = clamp(value, min, max);
    return parseFloat(value.toFixed(stepPrecision));
  }
  /** Given a value, returns its percentage within a range of min/max. */
  getPercentageFromValue(value) {
    return (value - this.min) / (this.max - this.min) * 100;
  }
  /** Converts coordinates to slider value */
  getValueFromCoordinates(x, y) {
    const isRtl = this.localize.dir() === "rtl";
    const isVertical = this.orientation === "vertical";
    const { top, right, bottom, left, height, width } = this.trackBoundingClientRect;
    const pointerPosition = isVertical ? y : x;
    const sliderCoords = isVertical ? { start: top, end: bottom, size: height } : { start: left, end: right, size: width };
    const relativePosition = isVertical ? sliderCoords.end - pointerPosition : isRtl ? sliderCoords.end - pointerPosition : pointerPosition - sliderCoords.start;
    const percentage = relativePosition / sliderCoords.size;
    return this.clampAndRoundToStep(this.min + (this.max - this.min) * percentage);
  }
  handleBlur() {
    if (this.isRange) {
      requestAnimationFrame(() => {
        const focusedElement = this.shadowRoot?.activeElement;
        const thumbHasFocus = focusedElement === this.thumbMin || focusedElement === this.thumbMax;
        if (!thumbHasFocus) {
          this.hideRangeTooltips();
        }
      });
    } else {
      this.hideTooltip();
    }
    this.customStates.set("focused", false);
    this.dispatchEvent(new FocusEvent("blur", { bubbles: true, composed: true }));
  }
  handleFocus(event) {
    const target = event.target;
    if (this.isRange) {
      if (target === this.thumbMin) {
        this.activeThumb = "min";
      } else if (target === this.thumbMax) {
        this.activeThumb = "max";
      }
      this.showRangeTooltips();
    } else {
      this.showTooltip();
    }
    this.customStates.set("focused", true);
    this.dispatchEvent(new FocusEvent("focus", { bubbles: true, composed: true }));
  }
  handleKeyDown(event) {
    const isRtl = this.localize.dir() === "rtl";
    const target = event.target;
    if (this.disabled || this.readonly) {
      return;
    }
    if (this.isRange) {
      if (target === this.thumbMin) {
        this.activeThumb = "min";
      } else if (target === this.thumbMax) {
        this.activeThumb = "max";
      }
      if (!this.activeThumb) {
        return;
      }
    }
    const current = this.isRange ? this.activeThumb === "min" ? this.minValue : this.maxValue : this.value;
    let newValue = current;
    switch (event.key) {
      // Increase
      case "ArrowUp":
      case (isRtl ? "ArrowLeft" : "ArrowRight"):
        event.preventDefault();
        newValue = this.clampAndRoundToStep(current + this.step);
        break;
      // Decrease
      case "ArrowDown":
      case (isRtl ? "ArrowRight" : "ArrowLeft"):
        event.preventDefault();
        newValue = this.clampAndRoundToStep(current - this.step);
        break;
      // Minimum value
      case "Home":
        event.preventDefault();
        newValue = this.isRange && this.activeThumb === "min" ? this.min : this.isRange ? this.minValue : this.min;
        break;
      // Maximum value
      case "End":
        event.preventDefault();
        newValue = this.isRange && this.activeThumb === "max" ? this.max : this.isRange ? this.maxValue : this.max;
        break;
      // Move up 10%
      case "PageUp": {
        event.preventDefault();
        const stepUp = Math.max(
          current + (this.max - this.min) / 10,
          current + this.step
          // make sure we at least move up to the next step
        );
        newValue = this.clampAndRoundToStep(stepUp);
        break;
      }
      // Move down 10%
      case "PageDown": {
        event.preventDefault();
        const stepDown = Math.min(
          current - (this.max - this.min) / 10,
          current - this.step
          // make sure we at least move down to the previous step
        );
        newValue = this.clampAndRoundToStep(stepDown);
        break;
      }
      // Handle form submission on Enter
      case "Enter":
        submitOnEnter(event, this);
        return;
    }
    if (newValue === current) {
      return;
    }
    if (this.isRange) {
      if (this.activeThumb === "min") {
        if (newValue > this.maxValue) {
          this.maxValue = newValue;
          this.minValue = newValue;
        } else {
          this.minValue = Math.max(this.min, newValue);
        }
      } else {
        if (newValue < this.minValue) {
          this.minValue = newValue;
          this.maxValue = newValue;
        } else {
          this.maxValue = Math.min(this.max, newValue);
        }
      }
      this.updateFormValue();
    } else {
      this.value = clamp(newValue, this.min, this.max);
    }
    this.updateComplete.then(() => {
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
    this.hasInteracted = true;
  }
  handleLabelPointerDown(event) {
    event.preventDefault();
    if (!this.disabled) {
      if (this.isRange) {
        this.thumbMin?.focus();
      } else {
        this.slider.focus();
      }
    }
  }
  setValueFromCoordinates(x, y) {
    const oldValue = this.value;
    this.value = this.getValueFromCoordinates(x, y);
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
  }
  setThumbValueFromCoordinates(x, y, thumb) {
    const value = this.getValueFromCoordinates(x, y);
    const oldValue = thumb === "min" ? this.minValue : this.maxValue;
    if (thumb === "min") {
      if (value > this.maxValue) {
        this.maxValue = value;
        this.minValue = value;
      } else {
        this.minValue = Math.max(this.min, value);
      }
    } else {
      if (value < this.minValue) {
        this.minValue = value;
        this.maxValue = value;
      } else {
        this.maxValue = Math.min(this.max, value);
      }
    }
    if (oldValue !== (thumb === "min" ? this.minValue : this.maxValue)) {
      this.updateFormValue();
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
  }
  showTooltip() {
    if (this.withTooltip && this.tooltip) {
      this.tooltip.open = true;
    }
  }
  hideTooltip() {
    if (this.withTooltip && this.tooltip) {
      this.tooltip.open = false;
    }
  }
  showRangeTooltips() {
    if (!this.withTooltip) {
      return;
    }
    const tooltipMin = this.shadowRoot?.getElementById("tooltip-thumb-min");
    const tooltipMax = this.shadowRoot?.getElementById("tooltip-thumb-max");
    if (this.activeThumb === "min") {
      if (tooltipMin) {
        tooltipMin.open = true;
      }
      if (tooltipMax) {
        tooltipMax.open = false;
      }
    } else if (this.activeThumb === "max") {
      if (tooltipMax) {
        tooltipMax.open = true;
      }
      if (tooltipMin) {
        tooltipMin.open = false;
      }
    }
  }
  hideRangeTooltips() {
    if (!this.withTooltip) {
      return;
    }
    const tooltipMin = this.shadowRoot?.getElementById("tooltip-thumb-min");
    const tooltipMax = this.shadowRoot?.getElementById("tooltip-thumb-max");
    if (tooltipMin) {
      tooltipMin.open = false;
    }
    if (tooltipMax) {
      tooltipMax.open = false;
    }
  }
  /** Updates the form value submission for range sliders */
  /**
   * @internal
   */
  updateFormValue(value) {
    if (this.isRange) {
      const formData = new FormData();
      formData.append(this.name || "", String(this.minValue));
      formData.append(this.name || "", String(this.maxValue));
      this.setValue(formData, formData);
      return;
    }
    super.updateFormValue(value);
  }
  /** Sets focus to the slider. */
  focus() {
    if (this.isRange) {
      this.thumbMin?.focus();
    } else {
      this.slider.focus();
    }
  }
  /** Removes focus from the slider. */
  blur() {
    if (this.isRange) {
      for (const activeElement of activeElements()) {
        if (activeElement === this.thumbMin) {
          this.thumbMin.blur();
          break;
        } else if (activeElement === this.thumbMax) {
          this.thumbMax.blur();
          break;
        }
      }
    } else {
      this.slider.blur();
    }
  }
  /**
   * Decreases the slider's value by `step`. This is a programmatic change, so `input` and `change` events will not be
   * emitted when this is called.
   */
  stepDown() {
    if (this.isRange) {
      const newValue = this.clampAndRoundToStep(this.minValue - this.step);
      this.minValue = clamp(newValue, this.min, this.maxValue);
      this.updateFormValue();
    } else {
      const newValue = this.clampAndRoundToStep(this.value - this.step);
      this.value = newValue;
    }
  }
  /**
   * Increases the slider's value by `step`. This is a programmatic change, so `input` and `change` events will not be
   * emitted when this is called.
   */
  stepUp() {
    if (this.isRange) {
      const newValue = this.clampAndRoundToStep(this.maxValue + this.step);
      this.maxValue = clamp(newValue, this.minValue, this.max);
      this.updateFormValue();
    } else {
      const newValue = this.clampAndRoundToStep(this.value + this.step);
      this.value = newValue;
    }
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "ssrLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "ssrHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasReference = this.hasSlotController.test("reference", "ssrReference");
    const sliderClasses = e2({
      xs: this.size === "xs",
      s: this.size === "s",
      m: this.size === "m",
      l: this.size === "l",
      xl: this.size === "xl",
      horizontal: this.orientation === "horizontal",
      vertical: this.orientation === "vertical",
      disabled: this.disabled
    });
    const markers = [];
    if (this.withMarkers) {
      for (let i = this.min; i <= this.max; i += this.step) {
        markers.push(this.getPercentageFromValue(i));
      }
    }
    const label = b`
      <label
        id="label"
        part="label"
        for=${this.isRange ? "thumb-min" : "text-box"}
        class=${e2({ vh: !hasLabel, "has-label": hasLabel })}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `;
    const hint = b`
      <div
        id="hint"
        part="hint"
        class=${e2({
      "has-slotted": hasHint
    })}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `;
    const markersTemplate = this.withMarkers ? b`
          <div id="markers" part="markers">
            ${markers.map(
      (marker) => b`<span part="marker" class="marker" style=${o({ "--position": `${marker}%` })}></span>`
    )}
          </div>
        ` : "";
    const referencesTemplate = hasReference ? b`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        ` : "";
    const createTooltip = (thumbId, value) => this.withTooltip ? b`
            <cs-tooltip
              id=${`tooltip${thumbId !== "thumb" ? "-" + thumbId : ""}`}
              part="tooltip"
              exportparts="
                tooltip:tooltip__tooltip,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${thumbId}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter === "function" ? this.valueFormatter(value) : this.localize.number(value)}
              </span>
            </cs-tooltip>
          ` : "";
    if (this.isRange) {
      const minThumbPosition = clamp(this.getPercentageFromValue(this.minValue), 0, 100);
      const maxThumbPosition = clamp(this.getPercentageFromValue(this.maxValue), 0, 100);
      return b`
        ${label}

        <div id="slider" part="slider" class=${sliderClasses}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${o({
        "--start": `${Math.min(minThumbPosition, maxThumbPosition)}%`,
        "--end": `${Math.max(minThumbPosition, maxThumbPosition)}%`
      })}
            ></div>

            ${markersTemplate}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${o({ "--position": `${minThumbPosition}%` })}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter === "function" ? this.valueFormatter(this.minValue) : this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-labelledby="label thumb-min-bound"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled ? "true" : "false"}
              aria-readonly=${this.readonly ? "true" : "false"}
              tabindex=${this.disabled ? -1 : 0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${o({ "--position": `${maxThumbPosition}%` })}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter === "function" ? this.valueFormatter(this.maxValue) : this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-labelledby="label thumb-max-bound"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled ? "true" : "false"}
              aria-readonly=${this.readonly ? "true" : "false"}
              tabindex=${this.disabled ? -1 : 0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span id="thumb-min-bound" class="vh">minimum value</span>
            <span id="thumb-max-bound" class="vh">maximum value</span>
          </div>

          ${referencesTemplate} ${hint}
        </div>

        ${createTooltip("thumb-min", this.minValue)} ${createTooltip("thumb-max", this.maxValue)}
      `;
    } else {
      const thumbPosition = clamp(this.getPercentageFromValue(this.value), 0, 100);
      const indicatorOffsetPosition = clamp(
        this.getPercentageFromValue(typeof this.indicatorOffset === "number" ? this.indicatorOffset : this.min),
        0,
        100
      );
      return b`
        ${label}

        <div
          id="slider"
          part="slider"
          class=${sliderClasses}
          role="slider"
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-readonly=${this.disabled ? "true" : "false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter === "function" ? this.valueFormatter(this.value) : this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled ? -1 : 0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${o({ "--start": `${indicatorOffsetPosition}%`, "--end": `${thumbPosition}%` })}
            ></div>

            ${markersTemplate}
            <span id="thumb" part="thumb" style=${o({ "--position": `${thumbPosition}%` })}></span>
          </div>

          ${referencesTemplate} ${hint}
        </div>

        ${createTooltip("thumb", this.value)}
      `;
    }
  }
};
CsSlider.formAssociated = true;
CsSlider.observeSlots = true;
CsSlider.css = [size_styles_default, form_control_styles_default, slider_styles_default];
__decorateClass([
  e("#slider")
], CsSlider.prototype, "slider", 2);
__decorateClass([
  e("#thumb")
], CsSlider.prototype, "thumb", 2);
__decorateClass([
  e("#thumb-min")
], CsSlider.prototype, "thumbMin", 2);
__decorateClass([
  e("#thumb-max")
], CsSlider.prototype, "thumbMax", 2);
__decorateClass([
  e("#track")
], CsSlider.prototype, "track", 2);
__decorateClass([
  e("#tooltip")
], CsSlider.prototype, "tooltip", 2);
__decorateClass([
  n()
], CsSlider.prototype, "label", 2);
__decorateClass([
  n({ attribute: "hint" })
], CsSlider.prototype, "hint", 2);
__decorateClass([
  n({ reflect: true })
], CsSlider.prototype, "name", 2);
__decorateClass([
  n({ type: Number, attribute: "min-value" })
], CsSlider.prototype, "minValue", 2);
__decorateClass([
  n({ type: Number, attribute: "max-value" })
], CsSlider.prototype, "maxValue", 2);
__decorateClass([
  n({ attribute: "value", reflect: true, type: Number })
], CsSlider.prototype, "defaultValue", 2);
__decorateClass([
  r()
], CsSlider.prototype, "value", 1);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSlider.prototype, "range", 2);
__decorateClass([
  n({ type: Boolean })
], CsSlider.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsSlider.prototype, "readonly", 2);
__decorateClass([
  n({ reflect: true })
], CsSlider.prototype, "orientation", 2);
__decorateClass([
  n({ reflect: true })
], CsSlider.prototype, "size", 2);
__decorateClass([
  n({ attribute: "indicator-offset", type: Number })
], CsSlider.prototype, "indicatorOffset", 2);
__decorateClass([
  n({ type: Number })
], CsSlider.prototype, "min", 2);
__decorateClass([
  n({ type: Number })
], CsSlider.prototype, "max", 2);
__decorateClass([
  n({ type: Number })
], CsSlider.prototype, "step", 2);
__decorateClass([
  n({ type: Boolean })
], CsSlider.prototype, "autofocus", 2);
__decorateClass([
  n({ attribute: "tooltip-distance", type: Number })
], CsSlider.prototype, "tooltipDistance", 2);
__decorateClass([
  n({ attribute: "tooltip-placement", reflect: true })
], CsSlider.prototype, "tooltipPlacement", 2);
__decorateClass([
  n({ attribute: "with-markers", type: Boolean })
], CsSlider.prototype, "withMarkers", 2);
__decorateClass([
  n({ attribute: "with-tooltip", type: Boolean })
], CsSlider.prototype, "withTooltip", 2);
__decorateClass([
  n({ attribute: "ssr-label", type: Boolean })
], CsSlider.prototype, "ssrLabel", 2);
__decorateClass([
  n({ attribute: "ssr-hint", type: Boolean })
], CsSlider.prototype, "ssrHint", 2);
__decorateClass([
  n({ attribute: "ssr-reference", type: Boolean })
], CsSlider.prototype, "ssrReference", 2);
__decorateClass([
  n({ attribute: false })
], CsSlider.prototype, "valueFormatter", 2);
CsSlider = __decorateClass([
  customElement("cs-slider")
], CsSlider);

export {
  CsSlider
};
