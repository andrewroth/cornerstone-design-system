/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  drawer_styles_default
} from "./chunk.OHZK5VOU.js";
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

// src/components/drawer/drawer.ts
var CsDrawer = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.renderedWatcher = new RenderedWatcher(this, (isRendered) => this.handleRenderedChange(isRendered));
    this.open = false;
    this.label = "";
    this.placement = "end";
    this.withoutHeader = false;
    this.lightDismiss = false;
    this.ssrFooter = false;
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose(this.drawer);
      }
    };
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.open) {
      this.addOpenListeners();
      this.drawer.showModal();
      lockBodyScrolling(this);
      this.renderedWatcher.start(this.drawer);
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
      animateWithClass(this.drawer, "pulse");
      return;
    }
    this.removeOpenListeners();
    await animateWithClass(this.drawer, "hide");
    this.open = false;
    this.drawer.close();
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
    if (!this.drawer.classList.contains("hide") && event.target === this.drawer && isTopDismissible(this)) {
      this.requestClose(this.drawer);
    }
  }
  handleDialogClick(event) {
    const target = event.target;
    const button = target.closest('[data-drawer="close"]');
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }
  async handleDialogPointerDown(event) {
    if (event.target === this.drawer) {
      if (this.lightDismiss) {
        this.requestClose(this.drawer);
      } else {
        await animateWithClass(this.drawer, "pulse");
      }
    }
  }
  /**
   * Suspends the modal when third-party CSS (e.g. cookie banner blockers) hides an open drawer, so the page isn't
   * left scroll locked and inert. "open" stays true so the modal resumes if the drawer is rendered again.
   */
  handleRenderedChange(isRendered) {
    if (!this.open) {
      this.renderedWatcher.stop();
      return;
    }
    if (!isRendered && this.drawer.open) {
      this.removeOpenListeners();
      this.drawer.close();
      unlockBodyScrolling(this);
    } else if (isRendered && !this.drawer.open) {
      this.addOpenListeners();
      this.drawer.showModal();
      lockBodyScrolling(this);
    }
  }
  handleOpenChange() {
    if (this.open && !this.drawer.open) {
      this.show();
    } else if (this.drawer.open) {
      this.open = true;
      this.requestClose(this.drawer);
    } else if (!this.open) {
      this.renderedWatcher.stop();
    }
  }
  /** Shows the drawer. */
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
    this.drawer.showModal();
    lockBodyScrolling(this);
    this.renderedWatcher.start(this.drawer);
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector("[autofocus]");
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      } else {
        this.drawer.focus();
      }
    });
    await animateWithClass(this.drawer, "show");
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
      drawer: true,
      open: this.open,
      top: this.placement === "top",
      end: this.placement === "end",
      bottom: this.placement === "bottom",
      start: this.placement === "start"
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

        <footer part="footer" class="footer" ?hidden=${!hasFooter}>
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
};
CsDrawer.css = drawer_styles_default;
__decorateClass([
  e(".drawer")
], CsDrawer.prototype, "drawer", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsDrawer.prototype, "open", 2);
__decorateClass([
  n({ reflect: true })
], CsDrawer.prototype, "label", 2);
__decorateClass([
  n({ reflect: true })
], CsDrawer.prototype, "placement", 2);
__decorateClass([
  n({ attribute: "without-header", type: Boolean, reflect: true })
], CsDrawer.prototype, "withoutHeader", 2);
__decorateClass([
  n({ attribute: "light-dismiss", type: Boolean })
], CsDrawer.prototype, "lightDismiss", 2);
__decorateClass([
  n({ attribute: "ssr-footer", type: Boolean })
], CsDrawer.prototype, "ssrFooter", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], CsDrawer.prototype, "handleOpenChange", 1);
CsDrawer = __decorateClass([
  customElement("cs-drawer")
], CsDrawer);
if (!o) {
  document.addEventListener("click", (event) => {
    const drawerAttrEl = event.target.closest("[data-drawer]");
    if (drawerAttrEl instanceof Element) {
      const [command, id] = parseSpaceDelimitedTokens(drawerAttrEl.getAttribute("data-drawer") || "");
      if (command === "open" && id?.length) {
        const doc = drawerAttrEl.getRootNode();
        const drawer = doc.getElementById(id);
        if (drawer?.localName === "cs-drawer") {
          drawer.open = true;
        } else {
          console.warn(`A drawer with an ID of "${id}" could not be found in this document.`);
        }
      }
    }
  });
  document.addEventListener("pointerdown", () => {
  });
}

export {
  CsDrawer
};
