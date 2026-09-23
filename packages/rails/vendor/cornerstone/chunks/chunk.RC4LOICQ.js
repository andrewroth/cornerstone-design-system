/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  n as n2
} from "./chunk.O434RZP6.js";
import {
  o as o2
} from "./chunk.CW2GRV24.js";
import {
  page_mobile_styles_default
} from "./chunk.7P3XWUWJ.js";
import {
  page_styles_default
} from "./chunk.5SYSD3MR.js";
import {
  visually_hidden_styles_default
} from "./chunk.EOSY2PVW.js";
import {
  l
} from "./chunk.QXOR233R.js";
import {
  CornerstoneElement,
  customElement,
  e,
  n
} from "./chunk.VO5P54JZ.js";
import {
  o
} from "./chunk.CRKHH5GL.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/page/page.ts
function toPx(value, element = document.documentElement) {
  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }
  if (!window.CSS || !CSS.registerProperty) {
    if (typeof value === "string" && value.endsWith("px")) {
      return parseFloat(value);
    }
    return Number(value) || 0;
  }
  const resolver = "--cs-length-resolver";
  if (!CSS.registerProperty.toString().includes(resolver)) {
    try {
      CSS.registerProperty({
        name: resolver,
        syntax: "<length>",
        inherits: false,
        initialValue: "0px"
      });
    } catch {
    }
  }
  const previousValue = element.style.getPropertyValue(resolver);
  element.style.setProperty(resolver, value);
  const computedValue = getComputedStyle(element)?.getPropertyValue(resolver);
  element.style.setProperty(resolver, previousValue);
  if (computedValue?.endsWith("px")) {
    return parseFloat(computedValue);
  }
  return Number(computedValue) || 0;
}
function toLength(px) {
  return Number.isNaN(Number(px)) ? px : `${px}px`;
}
var CsPage = class extends CornerstoneElement {
  constructor() {
    super();
    // SSR guard: ResizeObserver is not available during server-side rendering
    this.headerResizeObserver = !o ? this.slotResizeObserver("header") : null;
    this.subheaderResizeObserver = !o ? this.slotResizeObserver("subheader") : null;
    this.bannerResizeObserver = !o ? this.slotResizeObserver("banner") : null;
    this.footerResizeObserver = !o ? this.slotResizeObserver("footer") : null;
    this.handleNavigationToggle = (e2) => {
      if (this.view === "desktop") {
        this.hideNavigation();
        return;
      }
      const path = e2.composedPath();
      const navigationToggleSlot = this.navigationToggleSlot;
      if (path.find((el) => {
        return el.hasAttribute?.("data-toggle-nav") || el.assignedSlot === navigationToggleSlot || el === navigationToggleSlot;
      })) {
        e2.preventDefault();
        this.toggleNavigation();
      }
    };
    this.view = "desktop";
    this.navOpen = false;
    this.mobileBreakpoint = "768px";
    this.navigationPlacement = "start";
    this.disableNavigationToggle = false;
    this.pageResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.borderBoxSize[0];
            const pageWidth = contentBoxSize.inlineSize;
            const oldView = this.view;
            if (pageWidth >= toPx(this.mobileBreakpoint)) {
              this.view = "desktop";
            } else {
              this.view = "mobile";
            }
            this.requestUpdate("view", oldView);
          }
        }
      });
    }) : null;
    this.updateNavigationToggleState = (e2) => {
      if (e2) {
        const slotName = e2.target.name;
        if (!["navigation", "navigation-header", "navigation-footer"].includes(slotName)) {
          return;
        }
      }
      const hasCustomToggle = Boolean(this.querySelector(":not([slot='navigation-toggle']) [data-toggle-nav]"));
      const hasNavigationContent = Boolean(this.querySelector('[slot="navigation"]')) || Boolean(this.querySelector('[slot="navigation-header"]')) || Boolean(this.querySelector('[slot="navigation-footer"]'));
      this.disableNavigationToggle = hasCustomToggle || !hasNavigationContent;
    };
    if (!o) {
      this.addEventListener("click", this.handleNavigationToggle);
    }
  }
  slotResizeObserver(slot) {
    return new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.borderBoxSize[0];
            this.style.setProperty(`--${slot}-height`, `${Math.round(contentBoxSize.blockSize)}px`);
          }
        }
      });
    });
  }
  updated(changedProperties) {
    if (changedProperties.has("view")) {
      this.hideNavigation();
    }
    super.updated(changedProperties);
  }
  connectedCallback() {
    super.connectedCallback();
    if (!o) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.pageResizeObserver?.observe(this);
          this.headerResizeObserver?.observe(this.header);
          this.subheaderResizeObserver?.observe(this.subheader);
          this.bannerResizeObserver?.observe(this.banner);
          this.footerResizeObserver?.observe(this.footer);
        });
      });
    }
  }
  /**
   * https://stackoverflow.com/a/26831113
   * This prevents awkward gaps when scrolling the page and the aside / menu don't "fill" the gaps.
   */
  visiblePixelsInViewport(element) {
    if (!element) {
      return null;
    }
    const elementHeight = element.clientHeight;
    const windowHeight = window.innerHeight;
    const rect = element.getBoundingClientRect?.();
    if (!rect) {
      return null;
    }
    const { top, bottom } = rect;
    return Math.max(0, top > 0 ? Math.min(elementHeight, windowHeight - top) : Math.min(bottom, windowHeight));
  }
  firstUpdated(changedProperties) {
    if (!document.getElementById("main-content")) {
      const div = document.createElement("div");
      div.id = "main-content";
      div.slot = "skip-to-content-target";
      this.prepend(div);
    }
    this.shadowRoot.addEventListener("slotchange", this.updateNavigationToggleState);
    this.updateNavigationToggleState();
    super.firstUpdated(changedProperties);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.pageResizeObserver?.unobserve(this);
    this.headerResizeObserver?.unobserve(this.header);
    this.subheaderResizeObserver?.unobserve(this.subheader);
    this.footerResizeObserver?.unobserve(this.footer);
    this.bannerResizeObserver?.unobserve(this.banner);
  }
  /**
   * Shows the mobile navigation drawer
   */
  showNavigation() {
    this.navOpen = true;
  }
  /**
   * Hides the mobile navigation drawer
   */
  hideNavigation() {
    this.navOpen = false;
  }
  /**
   * Toggles the mobile navigation drawer
   */
  toggleNavigation() {
    this.navOpen = !this.navOpen;
  }
  render() {
    return b`
      <a href="#main-content" part="skip-to-content" class="cs-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${o2(`
        <style id="mobile-styles">
          ${page_mobile_styles_default(toLength(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="page">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <cs-button part="navigation-toggle" size="s" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <cs-icon name="menu" part="navigation-toggle-icon" label="Toggle navigation drawer"></cs-icon>
              </slot>
            </cs-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  ${n2(
      this.view === "desktop",
      () => b`<slot name="navigation-header"><div></div></slot>`,
      () => b`<div></div>`
    )}
                </slot>
                <slot name="desktop-navigation">
                  ${n2(
      this.view === "desktop",
      () => b`<slot name="navigation"><div></div></slot>`,
      () => b`<div></div>`
    )}
                </slot>
                <slot name="desktop-navigation-footer">
                  ${n2(
      this.view === "desktop",
      () => b`<slot name="navigation-footer"><div></div></slot>`,
      () => b`<div></div>`
    )}
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <cs-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${l(this.navOpen)}
        @cs-after-show=${() => this.navOpen = this.navigationDrawer.open}
        @cs-after-hide=${() => this.navOpen = this.navigationDrawer.open}
        exportparts="
          dialog:drawer__dialog,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__button:drawer__close-button__button,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          ${n2(
      this.view === "mobile",
      () => b`<slot name="navigation-header"><div></div></slot>`,
      () => b`<div></div>`
    )}
        </slot>
        <slot name="mobile-navigation">
          ${n2(
      this.view === "mobile",
      () => b`<slot name="navigation"><div></div></slot>`,
      () => b`<div></div>`
    )}
        </slot>

        <slot slot="footer" name="mobile-navigation-footer">
          ${n2(
      this.view === "mobile",
      () => b`<slot part="navigation-footer" name="navigation-footer"><div></div></slot>`,
      () => b`<div></div>`
    )}
        </slot>
      </cs-drawer>
    `;
  }
};
CsPage.css = [visually_hidden_styles_default, page_styles_default];
__decorateClass([
  e("[part~='header']")
], CsPage.prototype, "header", 2);
__decorateClass([
  e("[part~='menu']")
], CsPage.prototype, "menu", 2);
__decorateClass([
  e("[part~='main']")
], CsPage.prototype, "main", 2);
__decorateClass([
  e("[part~='aside']")
], CsPage.prototype, "aside", 2);
__decorateClass([
  e("[part~='subheader']")
], CsPage.prototype, "subheader", 2);
__decorateClass([
  e("[part~='footer']")
], CsPage.prototype, "footer", 2);
__decorateClass([
  e("[part~='banner']")
], CsPage.prototype, "banner", 2);
__decorateClass([
  e("[part~='drawer']")
], CsPage.prototype, "navigationDrawer", 2);
__decorateClass([
  e("slot[name~='navigation-toggle']")
], CsPage.prototype, "navigationToggleSlot", 2);
__decorateClass([
  n({ attribute: "view", reflect: true })
], CsPage.prototype, "view", 2);
__decorateClass([
  n({ attribute: "nav-open", reflect: true, type: Boolean })
], CsPage.prototype, "navOpen", 2);
__decorateClass([
  n({ attribute: "mobile-breakpoint", type: String })
], CsPage.prototype, "mobileBreakpoint", 2);
__decorateClass([
  n({ attribute: "navigation-placement", reflect: true })
], CsPage.prototype, "navigationPlacement", 2);
__decorateClass([
  n({ attribute: "disable-navigation-toggle", reflect: true, type: Boolean })
], CsPage.prototype, "disableNavigationToggle", 2);
CsPage = __decorateClass([
  customElement("cs-page")
], CsPage);

export {
  CsPage
};
