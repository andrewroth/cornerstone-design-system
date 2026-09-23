/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  RenderedWatcher
} from "./chunk.64ZZMQFA.js";
import {
  lockBodyScrolling,
  unlockBodyScrolling
} from "./chunk.I467WJ3G.js";
import {
  parseSpaceDelimitedTokens
} from "./chunk.QVMFBQ5Z.js";
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
  dialog_styles_default
} from "./chunk.EYECLIOP.js";
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible
} from "./chunk.OW5I3LRS.js";
import {
  HasSlotController
} from "./chunk.25L55TBI.js";
import {
  o as o2
} from "./chunk.OFJBXFXN.js";
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
  n
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

// src/components/dialog/dialog.ts
var CsDialog = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.renderedWatcher = new RenderedWatcher(this, (isRendered) => this.handleRenderedChange(isRendered));
    this.open = false;
    this.label = "";
    this.withoutHeader = false;
    this.lightDismiss = false;
    this.ssrFooter = false;
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose(this.dialog);
      }
    };
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.open) {
      this.addOpenListeners();
      this.dialog.showModal();
      lockBodyScrolling(this);
      this.renderedWatcher.start(this.dialog);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.renderedWatcher.stop();
    unlockBodyScrolling(this);
    this.removeOpenListeners();
  }
  async requestClose(source) {
    const csHideEvent = new CsHideEvent({ source });
    this.dispatchEvent(csHideEvent);
    if (csHideEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.dialog, "pulse");
      return;
    }
    this.removeOpenListeners();
    await animateWithClass(this.dialog, "hide");
    this.open = false;
    this.dialog.close();
    unlockBodyScrolling(this);
    this.renderedWatcher.stop();
    const trigger = this.originalTrigger;
    if (typeof trigger?.focus === "function") {
      setTimeout(() => trigger.focus());
    }
    this.dispatchEvent(new CsAfterHideEvent());
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
  }
  handleDialogCancel(event) {
    event.preventDefault();
    if (!this.dialog.classList.contains("hide") && event.target === this.dialog && isTopDismissible(this)) {
      this.requestClose(this.dialog);
    }
  }
  handleDialogClick(event) {
    const target = event.target;
    const button = target.closest('[data-dialog="close"]');
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }
  async handleDialogPointerDown(event) {
    if (event.target === this.dialog) {
      if (this.lightDismiss) {
        this.requestClose(this.dialog);
      } else {
        await animateWithClass(this.dialog, "pulse");
      }
    }
  }
  /**
   * Suspends the modal when third-party CSS (e.g. cookie banner blockers) hides an open dialog, so the page isn't
   * left scroll locked and inert. "open" stays true so the modal resumes if the dialog is rendered again.
   */
  handleRenderedChange(isRendered) {
    if (!this.open) {
      this.renderedWatcher.stop();
      return;
    }
    if (!isRendered && this.dialog.open) {
      this.removeOpenListeners();
      this.dialog.close();
      unlockBodyScrolling(this);
    } else if (isRendered && !this.dialog.open) {
      this.addOpenListeners();
      this.dialog.showModal();
      lockBodyScrolling(this);
    }
  }
  handleOpenChange() {
    if (this.open && !this.dialog.open) {
      this.show();
    } else if (!this.open && this.dialog.open) {
      this.open = true;
      this.requestClose(this.dialog);
    } else if (!this.open) {
      this.renderedWatcher.stop();
    }
  }
  /** Shows the dialog. */
  async show() {
    const csShowEvent = new CsShowEvent();
    this.dispatchEvent(csShowEvent);
    if (csShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }
    this.addOpenListeners();
    this.originalTrigger = document.activeElement;
    this.open = true;
    this.dialog.showModal();
    lockBodyScrolling(this);
    this.renderedWatcher.start(this.dialog);
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector("[autofocus]");
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      } else {
        this.dialog.focus();
      }
    });
    await animateWithClass(this.dialog, "show");
    this.dispatchEvent(new CsAfterShowEvent());
  }
  render() {
    const hasHeader = !this.withoutHeader;
    const labelledBy = hasHeader ? "title" : void 0;
    const hasFooter = this.hasSlotController.test("footer", "ssrFooter");
    return b`
      <dialog
        part="dialog"
        aria-labelledby=${o2(labelledBy)}
        class=${e2({
      dialog: true,
      open: this.open
    })}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${hasHeader ? b`
                <header part="header" class="header">
                  <h2 part="title" class="title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(8203)} </slot>
                  </h2>
                  <div part="header-actions" class="header-actions">
                    <slot name="header-actions"></slot>
                    <cs-button
                      part="close-button"
                      exportparts="button:close-button__button"
                      class="close"
                      appearance="plain"
                      @click="${(event) => this.requestClose(event.target)}"
                    >
                      <cs-icon name="close" label=${this.localize.term("close")} library="system"></cs-icon>
                    </cs-button>
                  </div>
                </header>
              ` : ""}

        <div part="body" class="body"><slot></slot></div>

        <!-- Use a hidden element so we still get "slotchange" events. -->
        <footer part="footer" class="footer" ?hidden=${!hasFooter}>
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
};
CsDialog.css = dialog_styles_default;
__decorateClass([
  e(".dialog")
], CsDialog.prototype, "dialog", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsDialog.prototype, "open", 2);
__decorateClass([
  n({ reflect: true })
], CsDialog.prototype, "label", 2);
__decorateClass([
  n({ attribute: "without-header", type: Boolean, reflect: true })
], CsDialog.prototype, "withoutHeader", 2);
__decorateClass([
  n({ attribute: "light-dismiss", type: Boolean })
], CsDialog.prototype, "lightDismiss", 2);
__decorateClass([
  n({ attribute: "ssr-footer", type: Boolean })
], CsDialog.prototype, "ssrFooter", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], CsDialog.prototype, "handleOpenChange", 1);
CsDialog = __decorateClass([
  customElement("cs-dialog")
], CsDialog);
if (!o) {
  document.addEventListener("click", (event) => {
    const dialogAttrEl = event.target.closest("[data-dialog]");
    if (dialogAttrEl instanceof Element) {
      const [command, id] = parseSpaceDelimitedTokens(dialogAttrEl.getAttribute("data-dialog") || "");
      if (command === "open" && id?.length) {
        const doc = dialogAttrEl.getRootNode();
        const dialog = doc.getElementById(id);
        if (dialog?.localName === "cs-dialog") {
          dialog.open = true;
        } else {
          console.warn(`A dialog with an ID of "${id}" could not be found in this document.`);
        }
      }
    }
  });
  document.addEventListener("pointerdown", () => {
  });
}

export {
  CsDialog
};
