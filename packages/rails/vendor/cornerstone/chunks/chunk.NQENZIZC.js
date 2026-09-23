/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsCopyEvent
} from "./chunk.DWYWP5LN.js";
import {
  announce
} from "./chunk.PFH4TBPZ.js";
import {
  copy_button_styles_default
} from "./chunk.XHEJJHDC.js";
import {
  visually_hidden_styles_default
} from "./chunk.EOSY2PVW.js";
import {
  uniqueId
} from "./chunk.VJSGOTOR.js";
import {
  animateWithClass
} from "./chunk.HC2QZ77X.js";
import {
  e as e2
} from "./chunk.WDXZHMSD.js";
import {
  CsErrorEvent
} from "./chunk.WAVBO5QN.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  e,
  host_styles_default,
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

// src/components/copy-button/copy-button.ts
var INTERNAL_TOOLTIP_SLOT = "cs-internal-tooltip";
var ASSIGNED_ID_PROP = "__waCopyButtonAssignedId";
var CsCopyButton = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isCopying = false;
    this.status = "rest";
    this.hasCustomTrigger = false;
    this.customTriggerEl = null;
    this.lightTooltip = null;
    this.feedbackTimeout = null;
    this.value = "";
    this.from = "";
    this.disabled = false;
    this.copyLabel = "";
    this.successLabel = "";
    this.errorLabel = "";
    this.feedbackDuration = 1e3;
    this.tooltipPlacement = "top";
    this.tooltip = "full";
    this.handleDefaultSlotChange = () => {
      const assigned = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
      const trigger = assigned.find((el) => el instanceof HTMLElement) ?? null;
      if (trigger !== this.customTriggerEl) {
        this.releaseAssignedId(this.customTriggerEl);
        this.customTriggerEl = trigger;
      }
      this.hasCustomTrigger = trigger !== null;
      if (trigger && this.tooltip !== "none") {
        if (!trigger.id) {
          trigger.id = uniqueId("cs-copy-button-trigger-");
          trigger[ASSIGNED_ID_PROP] = true;
        }
        this.ensureLightTooltip();
      } else {
        this.removeLightTooltip();
      }
    };
  }
  get activeTooltip() {
    return this.lightTooltip ?? this.shadowTooltip ?? null;
  }
  get currentLabel() {
    if (this.status === "success") {
      return this.successLabel || this.localize.term("copied");
    }
    if (this.status === "error") {
      return this.errorLabel || this.localize.term("error");
    }
    return this.copyLabel || this.localize.term("copy");
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.didSSR) {
      this.updateComplete.then(() => {
        this.handleDefaultSlotChange();
      });
    } else {
      this.handleDefaultSlotChange();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeLightTooltip();
  }
  handleStatusChange() {
    this.customStates.set("success", this.status === "success");
    this.customStates.set("error", this.status === "error");
    this.syncTooltipText();
    if (this.status === "success" || this.status === "error") {
      announce(this.currentLabel, "polite");
    }
  }
  handleLabelChange() {
    this.syncTooltipText();
  }
  handleTooltipOptionsChange() {
    if (this.lightTooltip) {
      this.lightTooltip.placement = this.tooltipPlacement;
      this.lightTooltip.disabled = this.disabled;
    }
  }
  handleTooltipModeChange(oldValue) {
    if (this.tooltip === "none") {
      this.removeLightTooltip();
    } else if (oldValue === "none") {
      this.handleDefaultSlotChange();
    } else if (this.lightTooltip) {
      this.lightTooltip.setAttribute("trigger", this.tooltip === "copy" ? "manual" : "hover focus");
    }
  }
  releaseAssignedId(el) {
    if (el && el[ASSIGNED_ID_PROP]) {
      el.removeAttribute("id");
      delete el[ASSIGNED_ID_PROP];
    }
  }
  ensureLightTooltip() {
    if (!this.customTriggerEl) {
      return;
    }
    const triggerValue = this.tooltip === "copy" ? "manual" : "hover focus";
    if (!this.lightTooltip) {
      const tooltip = document.createElement("cs-tooltip");
      tooltip.setAttribute("slot", INTERNAL_TOOLTIP_SLOT);
      tooltip.setAttribute("part", "feedback");
      tooltip.setAttribute("trigger", triggerValue);
      tooltip.dataset.copyButtonTooltip = "";
      tooltip.setAttribute("for", this.customTriggerEl.id);
      tooltip.placement = this.tooltipPlacement;
      tooltip.disabled = this.disabled;
      tooltip.textContent = this.currentLabel;
      this.appendChild(tooltip);
      this.lightTooltip = tooltip;
    } else {
      this.lightTooltip.setAttribute("for", this.customTriggerEl.id);
      this.lightTooltip.setAttribute("trigger", triggerValue);
      this.lightTooltip.placement = this.tooltipPlacement;
      this.lightTooltip.disabled = this.disabled;
      this.lightTooltip.textContent = this.currentLabel;
    }
  }
  removeLightTooltip() {
    if (this.lightTooltip) {
      this.releaseAssignedId(this.customTriggerEl);
      this.lightTooltip.remove();
      this.lightTooltip = null;
    }
  }
  syncTooltipText() {
    if (this.lightTooltip) {
      this.lightTooltip.textContent = this.currentLabel;
    }
  }
  async handleCopy() {
    if (this.disabled || this.isCopying) {
      return;
    }
    this.isCopying = true;
    let valueToCopy = this.value;
    if (this.from) {
      const root = this.getRootNode();
      const isProperty = this.from.includes(".");
      const isAttribute = this.from.includes("[") && this.from.includes("]");
      let id = this.from;
      let field = "";
      if (isProperty) {
        [id, field] = this.from.trim().split(".");
      } else if (isAttribute) {
        [id, field] = this.from.trim().replace(/\]$/, "").split("[");
      }
      const target = "getElementById" in root ? root.getElementById(id) : null;
      if (target) {
        if (isAttribute) {
          valueToCopy = target.getAttribute(field) || "";
        } else if (isProperty) {
          valueToCopy = target[field] || "";
        } else {
          valueToCopy = target.textContent || "";
        }
      } else {
        this.showStatus("error");
        this.dispatchEvent(new CsErrorEvent());
      }
    }
    if (!valueToCopy) {
      this.showStatus("error");
      this.dispatchEvent(new CsErrorEvent());
    } else {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        this.showStatus("success");
        this.dispatchEvent(new CsCopyEvent({ value: valueToCopy }));
      } catch {
        this.showStatus("error");
        this.dispatchEvent(new CsErrorEvent());
      }
    }
  }
  async showStatus(status) {
    this.status = status;
    if (this.copyIcon) {
      const iconToShow = status === "success" ? this.successIcon : this.errorIcon;
      await animateWithClass(this.copyIcon, "hide");
      this.copyIcon.hidden = true;
      iconToShow.hidden = false;
      await animateWithClass(iconToShow, "show");
    }
    await this.updateComplete;
    const tooltip = this.tooltip === "none" ? null : this.activeTooltip;
    let earlyClose = null;
    if (tooltip) {
      tooltip.show();
      earlyClose = new Promise((resolve) => {
        tooltip.addEventListener(
          "cs-after-hide",
          () => {
            if (this.feedbackTimeout !== null) {
              clearTimeout(this.feedbackTimeout);
              this.feedbackTimeout = null;
            }
            resolve();
          },
          { once: true }
        );
      });
      this.feedbackTimeout = window.setTimeout(async () => {
        this.feedbackTimeout = null;
        await tooltip.hide();
      }, this.feedbackDuration);
    }
    setTimeout(async () => {
      if (earlyClose) {
        await earlyClose;
      }
      if (this.copyIcon) {
        const iconToShow = status === "success" ? this.successIcon : this.errorIcon;
        await animateWithClass(iconToShow, "hide");
        iconToShow.hidden = true;
        this.copyIcon.hidden = false;
        await animateWithClass(this.copyIcon, "show");
      }
      this.status = "rest";
      this.isCopying = false;
    }, this.feedbackDuration);
  }
  render() {
    const hasCustomTrigger = this.hasCustomTrigger;
    let showTooltip = !hasCustomTrigger && this.tooltip !== "none";
    const triggerValue = this.tooltip === "copy" ? "manual" : "hover focus";
    if (this.didSSR && !this.hasUpdated) {
      showTooltip = false;
    }
    return b`
      <div class="copy-button__trigger" @click=${this.handleCopy}>
        <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        <button
          class="button"
          part="button"
          type="button"
          id="copy-button"
          aria-label=${this.currentLabel}
          ?disabled=${this.disabled}
          ?hidden=${this.hasCustomTrigger}
        >
          <slot part="copy-icon" name="copy-icon">
            <cs-icon library="system" name="content_copy"></cs-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <cs-icon library="system" name="check"></cs-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <cs-icon library="system" name="close"></cs-icon>
          </slot>
        </button>

        ${showTooltip ? b`
                <cs-tooltip
                  part="feedback"
                  for="copy-button"
                  placement=${this.tooltipPlacement}
                  trigger=${triggerValue}
                  class=${e2({
      "copy-button-tooltip": true,
      "copy-button-tooltip-success": this.status === "success",
      "copy-button-tooltip-error": this.status === "error"
    })}
                  ?disabled=${this.disabled}
                  >${this.currentLabel}</cs-tooltip
                >
              ` : ""}
        <slot name="${INTERNAL_TOOLTIP_SLOT}"></slot>
      </div>
    `;
  }
};
CsCopyButton.css = [host_styles_default, visually_hidden_styles_default, copy_button_styles_default];
__decorateClass([
  e('slot[name="copy-icon"]')
], CsCopyButton.prototype, "copyIcon", 2);
__decorateClass([
  e('slot[name="success-icon"]')
], CsCopyButton.prototype, "successIcon", 2);
__decorateClass([
  e('slot[name="error-icon"]')
], CsCopyButton.prototype, "errorIcon", 2);
__decorateClass([
  e("slot:not([name])")
], CsCopyButton.prototype, "defaultSlot", 2);
__decorateClass([
  e('cs-tooltip[part="feedback"]')
], CsCopyButton.prototype, "shadowTooltip", 2);
__decorateClass([
  r()
], CsCopyButton.prototype, "isCopying", 2);
__decorateClass([
  r()
], CsCopyButton.prototype, "status", 2);
__decorateClass([
  r()
], CsCopyButton.prototype, "hasCustomTrigger", 2);
__decorateClass([
  n()
], CsCopyButton.prototype, "value", 2);
__decorateClass([
  n()
], CsCopyButton.prototype, "from", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsCopyButton.prototype, "disabled", 2);
__decorateClass([
  n({ attribute: "copy-label" })
], CsCopyButton.prototype, "copyLabel", 2);
__decorateClass([
  n({ attribute: "success-label" })
], CsCopyButton.prototype, "successLabel", 2);
__decorateClass([
  n({ attribute: "error-label" })
], CsCopyButton.prototype, "errorLabel", 2);
__decorateClass([
  n({ attribute: "feedback-duration", type: Number })
], CsCopyButton.prototype, "feedbackDuration", 2);
__decorateClass([
  n({ attribute: "tooltip-placement", reflect: true })
], CsCopyButton.prototype, "tooltipPlacement", 2);
__decorateClass([
  n({ reflect: true })
], CsCopyButton.prototype, "tooltip", 2);
__decorateClass([
  watch("status")
], CsCopyButton.prototype, "handleStatusChange", 1);
__decorateClass([
  watch(["copyLabel", "successLabel", "errorLabel"])
], CsCopyButton.prototype, "handleLabelChange", 1);
__decorateClass([
  watch(["tooltipPlacement", "disabled"], { waitUntilFirstUpdate: true })
], CsCopyButton.prototype, "handleTooltipOptionsChange", 1);
__decorateClass([
  watch("tooltip", { waitUntilFirstUpdate: true })
], CsCopyButton.prototype, "handleTooltipModeChange", 1);
CsCopyButton = __decorateClass([
  customElement("cs-copy-button")
], CsCopyButton);

export {
  CsCopyButton
};
