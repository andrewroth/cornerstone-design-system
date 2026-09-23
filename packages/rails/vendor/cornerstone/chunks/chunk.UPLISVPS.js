/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  zoomable_frame_styles_default
} from "./chunk.QOHTE36K.js";
import {
  parseSpaceDelimitedTokens
} from "./chunk.QVMFBQ5Z.js";
import {
  o as o2
} from "./chunk.OFJBXFXN.js";
import {
  CornerstoneElement,
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

// src/internal/color-scheme-controller.ts
var ColorSchemeController = class {
  constructor(host, onThemeChange) {
    this.handleTransitionEnd = () => {
      this.onThemeChange();
    };
    (this.host = host).addController(this);
    this.onThemeChange = onThemeChange;
    if (typeof document !== "undefined") {
      this.hiddenElement = document.createElement("div");
      this.hiddenElement.setAttribute("aria-hidden", "true");
      Object.assign(this.hiddenElement.style, {
        position: "absolute",
        width: "0",
        height: "0",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: "0",
        // Transition on a WA surface token — changes whenever the theme class changes
        color: "var(--cs-color-surface-default, transparent)",
        transition: "color 0.001ms"
      });
    }
  }
  hostConnected() {
    if (this.hiddenElement) {
      this.host.appendChild(this.hiddenElement);
      this.hiddenElement.addEventListener("transitionend", this.handleTransitionEnd);
    }
  }
  hostDisconnected() {
    if (this.hiddenElement) {
      this.hiddenElement.removeEventListener("transitionend", this.handleTransitionEnd);
      this.hiddenElement.remove();
    }
  }
};

// src/components/zoomable-frame/zoomable-frame.ts
var CsZoomableFrame = class extends CornerstoneElement {
  constructor() {
    super();
    this.localize = new LocalizeController(this);
    // SSR guard: MutationObserver is not available during server-side rendering
    this.themeObserver = !o ? new MutationObserver(() => this.syncTheme()) : null;
    this.availableZoomLevels = [];
    this.allowfullscreen = false;
    this.loading = "eager";
    this.zoom = 1;
    this.zoomLevels = "25% 50% 75% 100% 125% 150% 175% 200%";
    this.withoutControls = false;
    this.withoutInteraction = false;
    this.withThemeSync = false;
    new ColorSchemeController(this, () => this.syncTheme());
  }
  /** Returns the internal iframe's `window` object. (Readonly property) */
  get contentWindow() {
    return this.iframe?.contentWindow || null;
  }
  /** Returns the internal iframe's `document` object. (Readonly property) */
  get contentDocument() {
    return this.iframe?.contentDocument || null;
  }
  parseZoomLevels(zoomLevelsString) {
    const tokens = parseSpaceDelimitedTokens(zoomLevelsString);
    const levels = [];
    for (const token of tokens) {
      let value;
      if (token.endsWith("%")) {
        const percentage = parseFloat(token.slice(0, -1));
        if (!isNaN(percentage)) {
          value = Math.max(0, percentage / 100);
        } else {
          continue;
        }
      } else {
        value = parseFloat(token);
        if (!isNaN(value)) {
          value = Math.max(0, value);
        } else {
          continue;
        }
      }
      levels.push(value);
    }
    return [...new Set(levels)].sort((a, b2) => a - b2);
  }
  getCurrentZoomIndex() {
    if (this.availableZoomLevels.length === 0) {
      return -1;
    }
    let closestIndex = 0;
    let closestDiff = Math.abs(this.availableZoomLevels[0] - this.zoom);
    for (let i = 1; i < this.availableZoomLevels.length; i++) {
      const diff = Math.abs(this.availableZoomLevels[i] - this.zoom);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  }
  isZoomInDisabled() {
    if (this.availableZoomLevels.length === 0) {
      return false;
    }
    const currentIndex = this.getCurrentZoomIndex();
    return currentIndex >= this.availableZoomLevels.length - 1;
  }
  isZoomOutDisabled() {
    if (this.availableZoomLevels.length === 0) {
      return false;
    }
    const currentIndex = this.getCurrentZoomIndex();
    return currentIndex <= 0;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("zoom")) {
      this.setStyleProperty("--zoom", `${this.zoom}`);
    }
    super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    if (changedProperties.has("zoomLevels")) {
      this.availableZoomLevels = this.parseZoomLevels(this.zoomLevels);
      if (this.availableZoomLevels.length > 0) {
        const currentIndex = this.getCurrentZoomIndex();
        if (Math.abs(this.availableZoomLevels[currentIndex] - this.zoom) > 1e-3) {
          this.zoom = this.availableZoomLevels[currentIndex];
        }
      }
    }
    if (changedProperties.has("withThemeSync")) {
      if (this.withThemeSync) {
        this.themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        this.syncTheme();
      } else {
        this.themeObserver?.disconnect();
      }
    }
    super.updated(changedProperties);
  }
  /** Zooms in to the next available zoom level. */
  zoomIn() {
    if (this.availableZoomLevels.length === 0) {
      this.zoom = Math.min(this.zoom + 0.05, 2);
      return;
    }
    const currentIndex = this.getCurrentZoomIndex();
    if (currentIndex < this.availableZoomLevels.length - 1) {
      this.zoom = this.availableZoomLevels[currentIndex + 1];
    }
  }
  /** Zooms out to the previous available zoom level. */
  zoomOut() {
    if (this.availableZoomLevels.length === 0) {
      this.zoom = Math.max(this.zoom - 0.05, 0);
      return;
    }
    const currentIndex = this.getCurrentZoomIndex();
    if (currentIndex > 0) {
      this.zoom = this.availableZoomLevels[currentIndex - 1];
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.themeObserver?.disconnect();
  }
  syncTheme() {
    if (!this.withThemeSync) {
      return;
    }
    try {
      const iframeRoot = this.contentDocument?.documentElement;
      if (!iframeRoot) {
        return;
      }
      const prefixes = ["cs-theme-", "cs-brand-", "cs-palette-"];
      const schemeCls = /* @__PURE__ */ new Set();
      const themeCls = /* @__PURE__ */ new Set();
      let el = this;
      let schemeFound = false;
      while (el) {
        if (!schemeFound) {
          if (el.classList.contains("cs-dark")) {
            schemeCls.add("cs-dark");
            schemeFound = true;
          } else if (el.classList.contains("cs-light")) {
            schemeCls.add("cs-light");
            schemeFound = true;
          }
        }
        for (const cls of el.classList) {
          if (prefixes.some((p) => cls.startsWith(p))) {
            themeCls.add(cls);
          }
        }
        el = el.parentElement;
      }
      iframeRoot.classList.toggle("cs-dark", schemeCls.has("cs-dark"));
      iframeRoot.classList.toggle("cs-light", schemeCls.has("cs-light"));
      const toRemove = Array.from(iframeRoot.classList).filter((c) => prefixes.some((p) => c.startsWith(p)));
      iframeRoot.classList.remove(...toRemove);
      iframeRoot.classList.add(...themeCls);
    } catch {
    }
  }
  handleLoad() {
    if (this.withThemeSync) {
      this.syncTheme();
    }
    this.dispatchEvent(new Event("load", { bubbles: false, cancelable: false, composed: true }));
  }
  handleError() {
    this.dispatchEvent(new Event("error", { bubbles: false, cancelable: false, composed: true }));
  }
  render() {
    return b`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${o2(this.sandbox ?? void 0)}
          src=${o2(this.src ?? void 0)}
          srcdoc=${o2(this.srcdoc ?? void 0)}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${!this.withoutControls ? b`
              <div id="controls" part="controls">
                <button
                  part="zoom-out-button"
                  aria-label=${this.localize.term("zoomOut")}
                  @click=${this.zoomOut}
                  ?disabled=${this.isZoomOutDisabled()}
                >
                  <slot name="zoom-out-icon">
                    <cs-icon name="remove" label="Zoom out"></cs-icon>
                  </slot>
                </button>
                <span>${this.localize.number(this.zoom, { style: "percent", maximumFractionDigits: 1 })}</span>
                <button
                  part="zoom-in-button"
                  aria-label=${this.localize.term("zoomIn")}
                  @click=${this.zoomIn}
                  ?disabled=${this.isZoomInDisabled()}
                >
                  <slot name="zoom-in-icon">
                    <cs-icon name="add" label="Zoom in"></cs-icon>
                  </slot>
                </button>
              </div>
            ` : ""}
    `;
  }
};
CsZoomableFrame.css = zoomable_frame_styles_default;
__decorateClass([
  r()
], CsZoomableFrame.prototype, "availableZoomLevels", 2);
__decorateClass([
  e("#iframe")
], CsZoomableFrame.prototype, "iframe", 2);
__decorateClass([
  n()
], CsZoomableFrame.prototype, "src", 2);
__decorateClass([
  n()
], CsZoomableFrame.prototype, "srcdoc", 2);
__decorateClass([
  n({ type: Boolean })
], CsZoomableFrame.prototype, "allowfullscreen", 2);
__decorateClass([
  n()
], CsZoomableFrame.prototype, "loading", 2);
__decorateClass([
  n()
], CsZoomableFrame.prototype, "referrerpolicy", 2);
__decorateClass([
  n()
], CsZoomableFrame.prototype, "sandbox", 2);
__decorateClass([
  n({ type: Number, reflect: true })
], CsZoomableFrame.prototype, "zoom", 2);
__decorateClass([
  n({ attribute: "zoom-levels" })
], CsZoomableFrame.prototype, "zoomLevels", 2);
__decorateClass([
  n({ type: Boolean, attribute: "without-controls", reflect: true })
], CsZoomableFrame.prototype, "withoutControls", 2);
__decorateClass([
  n({ type: Boolean, attribute: "without-interaction", reflect: true })
], CsZoomableFrame.prototype, "withoutInteraction", 2);
__decorateClass([
  n({ type: Boolean, attribute: "with-theme-sync", reflect: true })
], CsZoomableFrame.prototype, "withThemeSync", 2);
CsZoomableFrame = __decorateClass([
  customElement("cs-zoomable-frame")
], CsZoomableFrame);

export {
  CsZoomableFrame
};
