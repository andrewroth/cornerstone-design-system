/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  popover_styles_default
} from "./chunk.SQCER2OW.js";
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

// src/components/popover/popover.ts
var openPopovers = /* @__PURE__ */ new Set();
var CsPopover = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.anchor = null;
    this.placement = "top";
    this.open = false;
    this.distance = 8;
    this.skidding = 0;
    this.for = null;
    this.withoutArrow = false;
    this.eventController = new AbortController();
    this.handleAnchorClick = () => {
      this.open = !this.open;
    };
    this.handleBodyClick = (event) => {
      const target = event.target;
      const button = target.closest('[data-popover="close"]');
      if (button) {
        event.stopPropagation();
        this.open = false;
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.open = false;
        const anchor = this.anchor;
        if (anchor && typeof anchor.focus === "function") {
          anchor.focus({ preventScroll: true });
        }
      }
    };
    this.handleDocumentClick = (event) => {
      if (this.anchor && event.composedPath().includes(this.anchor)) {
        return;
      }
      if (!event.composedPath().includes(this)) {
        this.open = false;
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.id) {
      this.id = uniqueId("cs-popover-");
    }
    if (this.eventController.signal.aborted) {
      this.eventController = new AbortController();
    }
    if (this.for && this.anchor) {
      this.anchor = null;
      this.handleForChange();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
    this.eventController.abort();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.open) {
      this.dialog.show();
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  updated(changedProperties) {
    if (changedProperties.has("open")) {
      this.customStates.set("open", this.open);
    }
  }
  async handleOpenChange() {
    if (this.open) {
      const csShowEvent = new CsShowEvent();
      this.dispatchEvent(csShowEvent);
      if (csShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      openPopovers.forEach((popover) => popover.open = false);
      document.addEventListener("keydown", this.handleDocumentKeyDown, { signal: this.eventController.signal });
      document.addEventListener("click", this.handleDocumentClick, { signal: this.eventController.signal });
      this.dialog.setAttribute("open", "");
      this.popup.active = true;
      openPopovers.add(this);
      registerDismissible(this);
      requestAnimationFrame(() => {
        const elementToFocus = this.querySelector("[autofocus]");
        if (elementToFocus && typeof elementToFocus.focus === "function") {
          elementToFocus.focus({ preventScroll: true });
        } else {
          this.dialog.focus({ preventScroll: true });
        }
      });
      await animateWithClass(this.popup.popup, "show-with-scale");
      this.popup.reposition();
      this.dispatchEvent(new CsAfterShowEvent());
    } else {
      const csHideEvent = new CsHideEvent();
      this.dispatchEvent(csHideEvent);
      if (csHideEvent.defaultPrevented) {
        this.open = true;
        return;
      }
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      document.removeEventListener("click", this.handleDocumentClick);
      openPopovers.delete(this);
      unregisterDismissible(this);
      await animateWithClass(this.popup.popup, "hide-with-scale");
      this.popup.active = false;
      this.dialog.close();
      this.dispatchEvent(new CsAfterHideEvent());
    }
  }
  handleForChange() {
    const rootNode = this.getRootNode();
    if (!rootNode) {
      return;
    }
    const newAnchor = this.for ? rootNode.getElementById(this.for) : null;
    const oldAnchor = this.anchor;
    if (newAnchor === oldAnchor) {
      return;
    }
    const { signal } = this.eventController;
    if (newAnchor) {
      newAnchor.addEventListener("click", this.handleAnchorClick, { signal });
    }
    if (oldAnchor) {
      oldAnchor.removeEventListener("click", this.handleAnchorClick);
    }
    this.anchor = newAnchor;
    if (this.for && !newAnchor) {
      console.warn(
        `A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,
        this
      );
    }
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  /** Shows the popover. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "cs-after-show");
  }
  /** Hides the popover. */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "cs-after-hide");
  }
  render() {
    return b`
      <dialog part="dialog" class="dialog">
        <cs-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${e2({
      popover: true,
      "popover-open": this.open
    })}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          shift-padding="8"
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </cs-popup>
      </dialog>
    `;
  }
};
CsPopover.css = popover_styles_default;
CsPopover.dependencies = { "cs-popup": CsPopup };
__decorateClass([
  e("dialog")
], CsPopover.prototype, "dialog", 2);
__decorateClass([
  e(".body")
], CsPopover.prototype, "body", 2);
__decorateClass([
  e("cs-popup")
], CsPopover.prototype, "popup", 2);
__decorateClass([
  r()
], CsPopover.prototype, "anchor", 2);
__decorateClass([
  n()
], CsPopover.prototype, "placement", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsPopover.prototype, "open", 2);
__decorateClass([
  n({ type: Number })
], CsPopover.prototype, "distance", 2);
__decorateClass([
  n({ type: Number })
], CsPopover.prototype, "skidding", 2);
__decorateClass([
  n()
], CsPopover.prototype, "for", 2);
__decorateClass([
  n({ attribute: "without-arrow", type: Boolean, reflect: true })
], CsPopover.prototype, "withoutArrow", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], CsPopover.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("for")
], CsPopover.prototype, "handleForChange", 1);
__decorateClass([
  watch(["distance", "placement", "skidding"])
], CsPopover.prototype, "handleOptionsChange", 1);
CsPopover = __decorateClass([
  customElement("cs-popover")
], CsPopover);

export {
  CsPopover
};
