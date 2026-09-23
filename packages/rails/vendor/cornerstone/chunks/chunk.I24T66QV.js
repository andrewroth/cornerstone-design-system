/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsTabShowEvent
} from "./chunk.UQ2XZMRE.js";
import {
  CsTabHideEvent
} from "./chunk.DP7I3K2F.js";
import {
  tab_group_styles_default
} from "./chunk.N5MDHEBR.js";
import {
  scrollIntoView
} from "./chunk.I467WJ3G.js";
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

// src/components/tab-group/tab-group.ts
var CsTabGroup = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.focusableTabs = [];
    this.panels = [];
    this.localize = new LocalizeController(this);
    this.hasScrollControls = false;
    this.active = "";
    this.placement = "top";
    this.activation = "auto";
    this.withoutScrollControls = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (o) {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollControls();
    });
    this.mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((m) => !["aria-labelledby", "aria-controls"].includes(m.attributeName))) {
        setTimeout(() => this.setAriaLabels());
      }
      const relevantMutations = mutations.filter((m) => {
        const target = m.target;
        return target.closest("cs-tab-group") === this;
      });
      if (relevantMutations.some((m) => m.attributeName === "disabled")) {
        this.syncTabsAndPanels();
      } else if (relevantMutations.some((m) => m.attributeName === "active")) {
        const tabs = relevantMutations.filter((m) => m.attributeName === "active" && m.target.tagName.toLowerCase() === "cs-tab").map((m) => m.target);
        const newActiveTab = tabs.find((tab) => tab.active);
        if (newActiveTab && newActiveTab.closest("cs-tab-group") === this) {
          this.setActiveTab(newActiveTab);
        }
      }
    });
    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          if (this.active) {
            const tab = this.tabs.find((t) => t.panel === this.active);
            if (tab) {
              this.setActiveTab(tab);
            }
          } else {
            this.setActiveTab(this.getActiveTab() ?? this.tabs[0], { emitEvents: false });
          }
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    if (this.nav) {
      this.resizeObserver?.unobserve(this.nav);
    }
  }
  getAllTabs() {
    const slot = this.shadowRoot.querySelector('slot[name="nav"]');
    return [...slot.assignedElements()].filter((el) => {
      return el.tagName.toLowerCase() === "cs-tab";
    });
  }
  getAllPanels() {
    return [...this.defaultSlot.assignedElements()].filter((el) => el.tagName.toLowerCase() === "cs-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((el) => el.active);
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest("cs-tab");
    const tabGroup = tab?.closest("cs-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tab = target.closest("cs-tab");
    const tabGroup = tab?.closest("cs-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      if (tab !== null) {
        this.setActiveTab(tab, { scrollBehavior: "smooth" });
        event.preventDefault();
      }
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const activeEl = this.tabs.find((t) => t.matches(":focus"));
      const isRtl = this.localize.dir() === "rtl";
      let nextTab = null;
      if (activeEl?.tagName.toLowerCase() === "cs-tab") {
        if (event.key === "Home") {
          nextTab = this.focusableTabs[0];
        } else if (event.key === "End") {
          nextTab = this.focusableTabs[this.focusableTabs.length - 1];
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowRight" : "ArrowLeft") || ["start", "end"].includes(this.placement) && event.key === "ArrowUp") {
          const currentIndex = this.tabs.findIndex((el) => el === activeEl);
          nextTab = this.findNextFocusableTab(currentIndex, "backward");
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowLeft" : "ArrowRight") || ["start", "end"].includes(this.placement) && event.key === "ArrowDown") {
          const currentIndex = this.tabs.findIndex((el) => el === activeEl);
          nextTab = this.findNextFocusableTab(currentIndex, "forward");
        }
        if (!nextTab) {
          return;
        }
        nextTab.tabIndex = 0;
        nextTab.focus({ preventScroll: true });
        if (this.activation === "auto") {
          this.setActiveTab(nextTab, { scrollBehavior: "smooth" });
        } else {
          this.tabs.forEach((tabEl) => {
            tabEl.tabIndex = tabEl === nextTab ? 0 : -1;
          });
        }
        if (["top", "bottom"].includes(this.placement)) {
          scrollIntoView(nextTab, this.nav, "horizontal");
        }
        event.preventDefault();
      }
    }
  }
  findNextFocusableTab(currentIndex, direction) {
    let nextTab = null;
    const iterator = direction === "forward" ? 1 : -1;
    let nextIndex = currentIndex + iterator;
    while (currentIndex < this.tabs.length) {
      nextTab = this.tabs[nextIndex] || null;
      if (nextTab === null) {
        if (direction === "forward") {
          nextTab = this.focusableTabs[0];
        } else {
          nextTab = this.focusableTabs[this.focusableTabs.length - 1];
        }
        break;
      }
      if (!nextTab.disabled) {
        break;
      }
      nextIndex += iterator;
    }
    return nextTab;
  }
  handleScrollToStart() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft + this.nav.clientWidth : this.nav.scrollLeft - this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  handleScrollToEnd() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft - this.nav.clientWidth : this.nav.scrollLeft + this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  setActiveTab(tab, options) {
    options = {
      emitEvents: true,
      scrollBehavior: "auto",
      ...options
    };
    if (tab.closest("cs-tab-group") !== this) {
      return;
    }
    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.active = tab.panel;
      this.activeTab = tab;
      this.tabs.forEach((el) => {
        el.active = el === this.activeTab;
        el.tabIndex = el === this.activeTab ? 0 : -1;
      });
      this.panels.forEach((el) => el.active = el.name === this.activeTab?.panel);
      if (["top", "bottom"].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, "horizontal", options.scrollBehavior);
      }
      if (options.emitEvents) {
        if (previousTab) {
          this.dispatchEvent(new CsTabHideEvent({ name: previousTab.panel }));
        }
        this.dispatchEvent(new CsTabShowEvent({ name: this.activeTab.panel }));
      }
    }
  }
  setAriaLabels() {
    this.tabs.forEach((tab) => {
      const panel = this.panels.find((el) => el.name === tab.panel);
      if (panel) {
        tab.setAttribute("aria-controls", panel.getAttribute("id"));
        panel.setAttribute("aria-labelledby", tab.getAttribute("id"));
      }
    });
  }
  // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs();
    this.focusableTabs = this.tabs.filter((el) => !el.disabled);
    this.panels = this.getAllPanels();
    this.updateComplete.then(() => this.updateScrollControls());
  }
  updateActiveTab() {
    const tab = this.tabs.find((el) => el.panel === this.active);
    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  updateScrollControls() {
    if (this.withoutScrollControls) {
      this.hasScrollControls = false;
    } else {
      this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth + 1;
    }
  }
  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === "rtl" : this.dir === "rtl";
    return b`
      <div
        part="tab-group"
        class=${e2({
      "tab-group": true,
      "tab-group-top": this.placement === "top",
      "tab-group-bottom": this.placement === "bottom",
      "tab-group-start": this.placement === "start",
      "tab-group-end": this.placement === "end",
      "tab-group-has-scroll-controls": this.hasScrollControls
    })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls ? b`
                  <cs-button
                    part="scroll-button scroll-button-start"
                    exportparts="button:scroll-button__button"
                    class="scroll-button scroll-button-start"
                    appearance="plain"
                    @click=${this.handleScrollToStart}
                  >
                    <cs-icon
                      name=${isRtl ? "keyboard_arrow_right" : "keyboard_arrow_left"}
                      library="system"
                      label=${this.localize.term("scrollToStart")}
                    ></cs-icon>
                  </cs-button>
                ` : ""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${() => this.activeTab?.focus({ preventScroll: true })}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls ? b`
                  <cs-button
                    part="scroll-button scroll-button-end"
                    class="scroll-button scroll-button-end"
                    exportparts="button:scroll-button__button"
                    appearance="plain"
                    @click=${this.handleScrollToEnd}
                  >
                    <cs-icon
                      name=${isRtl ? "keyboard_arrow_left" : "keyboard_arrow_right"}
                      library="system"
                      label=${this.localize.term("scrollToEnd")}
                    ></cs-icon>
                  </cs-button>
                ` : ""}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `;
  }
};
CsTabGroup.css = tab_group_styles_default;
__decorateClass([
  e(".tab-group")
], CsTabGroup.prototype, "tabGroup", 2);
__decorateClass([
  e(".body slot")
], CsTabGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e(".nav")
], CsTabGroup.prototype, "nav", 2);
__decorateClass([
  r()
], CsTabGroup.prototype, "hasScrollControls", 2);
__decorateClass([
  n({ reflect: true })
], CsTabGroup.prototype, "active", 2);
__decorateClass([
  n()
], CsTabGroup.prototype, "placement", 2);
__decorateClass([
  n()
], CsTabGroup.prototype, "activation", 2);
__decorateClass([
  n({ attribute: "without-scroll-controls", type: Boolean })
], CsTabGroup.prototype, "withoutScrollControls", 2);
__decorateClass([
  watch("active")
], CsTabGroup.prototype, "updateActiveTab", 1);
__decorateClass([
  watch("withoutScrollControls", { waitUntilFirstUpdate: true })
], CsTabGroup.prototype, "updateScrollControls", 1);
CsTabGroup = __decorateClass([
  customElement("cs-tab-group")
], CsTabGroup);

export {
  CsTabGroup
};
