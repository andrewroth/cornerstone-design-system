/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  tooltip_styles_default
} from "./chunk.6LZP6GAN.js";
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
  CsPopup
} from "./chunk.OO3JWV4O.js";
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible
} from "./chunk.OW5I3LRS.js";
import {
  uniqueId
} from "./chunk.VJSGOTOR.js";
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
  CornerstoneElement,
  customElement,
  e,
  n,
  r
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/tooltip/tooltip.ts
var CsTooltip = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.placement = "top";
    this.disabled = false;
    this.distance = 8;
    this.open = false;
    this.skidding = 0;
    this.showDelay = 150;
    this.hideDelay = 0;
    this.trigger = "hover focus";
    this.withoutArrow = false;
    this.for = null;
    this.anchor = null;
    this.eventController = new AbortController();
    this.handleBlur = () => {
      if (this.hasTrigger("focus")) {
        this.hide();
      }
    };
    this.handleClick = () => {
      if (this.hasTrigger("click")) {
        if (this.open) {
          this.hide();
        } else {
          this.show();
        }
      }
    };
    this.handleFocus = () => {
      if (this.hasTrigger("focus")) {
        this.show();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
      }
    };
    this.handleMouseOver = () => {
      if (this.hasTrigger("hover")) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.show(), this.showDelay);
      }
    };
    this.handleMouseOut = (event) => {
      if (this.hasTrigger("hover")) {
        const relatedTarget = event.relatedTarget;
        const movedIntoAnchor = Boolean(relatedTarget && this.anchor?.contains(relatedTarget));
        const movedIntoTooltip = Boolean(relatedTarget && this.contains(relatedTarget));
        if (movedIntoAnchor || movedIntoTooltip) {
          return;
        }
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => {
          this.hide();
        }, this.hideDelay);
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    const isClient = typeof document !== "undefined";
    if (isClient) {
      if (this.eventController.signal.aborted) {
        this.eventController = new AbortController();
      }
      this.addEventListener("mouseout", this.handleMouseOut);
      if (this.open) {
        this.open = false;
        this.updateComplete.then(() => {
          this.open = true;
        });
      }
      if (!this.id) {
        this.id = uniqueId("cs-tooltip-");
      }
      if (this.for && this.anchor) {
        this.anchor = null;
        this.handleForChange();
      } else if (this.for) {
        this.handleForChange();
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
    this.eventController.abort();
    if (this.anchor) {
      this.removeFromAriaLabelledBy(this.anchor, this.id);
    }
  }
  firstUpdated(changedProperties) {
    this.body.hidden = !this.open;
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
    super.firstUpdated(changedProperties);
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  /** Adds the tooltip ID to the aria-labelledby attribute */
  addToAriaLabelledBy(element, id) {
    const currentLabel = element.getAttribute("aria-labelledby") || "";
    const labels = currentLabel.split(/\s+/).filter(Boolean);
    if (!labels.includes(id)) {
      labels.push(id);
      element.setAttribute("aria-labelledby", labels.join(" "));
    }
  }
  /** Removes the tooltip ID from the aria-labelledby attribute */
  removeFromAriaLabelledBy(element, id) {
    const currentLabel = element.getAttribute("aria-labelledby") || "";
    const labels = currentLabel.split(/\s+/).filter(Boolean);
    const filteredLabels = labels.filter((label) => label !== id);
    if (filteredLabels.length > 0) {
      element.setAttribute("aria-labelledby", filteredLabels.join(" "));
    } else {
      element.removeAttribute("aria-labelledby");
    }
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }
      const csShowEvent = new CsShowEvent();
      this.dispatchEvent(csShowEvent);
      if (csShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      document.addEventListener("keydown", this.handleDocumentKeyDown, { signal: this.eventController.signal });
      registerDismissible(this);
      this.body.hidden = false;
      this.popup.active = true;
      await animateWithClass(this.popup.popup, "show-with-scale");
      this.popup.reposition();
      this.dispatchEvent(new CsAfterShowEvent());
    } else {
      const csHideEvent = new CsHideEvent();
      this.dispatchEvent(csHideEvent);
      if (csHideEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      unregisterDismissible(this);
      await animateWithClass(this.popup.popup, "hide-with-scale");
      this.popup.active = false;
      this.body.hidden = true;
      this.dispatchEvent(new CsAfterHideEvent());
    }
  }
  handleForChange() {
    const rootNode = this.getRootNode?.();
    if (!rootNode) {
      return;
    }
    const newAnchor = this.for ? rootNode.getElementById?.(this.for) : null;
    const oldAnchor = this.anchor;
    if (newAnchor === oldAnchor) {
      return;
    }
    const { signal } = this.eventController;
    if (newAnchor) {
      this.addToAriaLabelledBy(newAnchor, this.id);
      newAnchor.addEventListener("blur", this.handleBlur, { capture: true, signal });
      newAnchor.addEventListener("focus", this.handleFocus, { capture: true, signal });
      newAnchor.addEventListener("click", this.handleClick, { signal });
      newAnchor.addEventListener("mouseover", this.handleMouseOver, { signal });
      newAnchor.addEventListener("mouseout", this.handleMouseOut, { signal });
    }
    if (oldAnchor) {
      this.removeFromAriaLabelledBy(oldAnchor, this.id);
      oldAnchor.removeEventListener("blur", this.handleBlur, { capture: true });
      oldAnchor.removeEventListener("focus", this.handleFocus, { capture: true });
      oldAnchor.removeEventListener("click", this.handleClick);
      oldAnchor.removeEventListener("mouseover", this.handleMouseOver);
      oldAnchor.removeEventListener("mouseout", this.handleMouseOut);
    }
    this.anchor = newAnchor;
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  /** Shows the tooltip. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "cs-after-show");
  }
  /** Hides the tooltip */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "cs-after-hide");
  }
  render() {
    return b`
      <cs-popup
        part="tooltip"
        exportparts="
          popup:tooltip__popup,
          arrow:tooltip__arrow
        "
        class=${e2({
      tooltip: true,
      "tooltip-open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </cs-popup>
    `;
  }
};
CsTooltip.css = tooltip_styles_default;
CsTooltip.dependencies = { "cs-popup": CsPopup };
__decorateClass([
  e("slot:not([name])")
], CsTooltip.prototype, "defaultSlot", 2);
__decorateClass([
  e(".body")
], CsTooltip.prototype, "body", 2);
__decorateClass([
  e("cs-popup")
], CsTooltip.prototype, "popup", 2);
__decorateClass([
  n()
], CsTooltip.prototype, "placement", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTooltip.prototype, "disabled", 2);
__decorateClass([
  n({ type: Number })
], CsTooltip.prototype, "distance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTooltip.prototype, "open", 2);
__decorateClass([
  n({ type: Number })
], CsTooltip.prototype, "skidding", 2);
__decorateClass([
  n({ attribute: "show-delay", type: Number })
], CsTooltip.prototype, "showDelay", 2);
__decorateClass([
  n({ attribute: "hide-delay", type: Number })
], CsTooltip.prototype, "hideDelay", 2);
__decorateClass([
  n()
], CsTooltip.prototype, "trigger", 2);
__decorateClass([
  n({ attribute: "without-arrow", type: Boolean, reflect: true })
], CsTooltip.prototype, "withoutArrow", 2);
__decorateClass([
  n()
], CsTooltip.prototype, "for", 2);
__decorateClass([
  r()
], CsTooltip.prototype, "anchor", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], CsTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("for")
], CsTooltip.prototype, "handleForChange", 1);
__decorateClass([
  watch(["distance", "placement", "skidding"])
], CsTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("disabled")
], CsTooltip.prototype, "handleDisabledChange", 1);
CsTooltip = __decorateClass([
  customElement("cs-tooltip")
], CsTooltip);

export {
  CsTooltip
};
