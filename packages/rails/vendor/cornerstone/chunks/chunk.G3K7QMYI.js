/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsLazyChangeEvent
} from "./chunk.Q522XM7R.js";
import {
  CsLazyLoadEvent
} from "./chunk.EB3IAVUR.js";
import {
  CsExpandEvent
} from "./chunk.ZJUSWIFH.js";
import {
  CsCollapseEvent
} from "./chunk.DJJJADLC.js";
import {
  CsAfterCollapseEvent
} from "./chunk.4QEGLJGY.js";
import {
  CsAfterExpandEvent
} from "./chunk.FK2TIGYL.js";
import {
  tree_item_styles_default
} from "./chunk.WVYZTD6S.js";
import {
  n as n2
} from "./chunk.O434RZP6.js";
import {
  l
} from "./chunk.QXOR233R.js";
import {
  animate,
  parseDuration
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
  LocalizeController
} from "./chunk.QUVFD4CZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// ../../node_modules/@lit/context/lib/context-request-event.js
var s = class extends Event {
  constructor(s4, t2, e5, o) {
    super("context-request", { bubbles: true, composed: true }), this.context = s4, this.contextTarget = t2, this.callback = e5, this.subscribe = o ?? false;
  }
};

// ../../node_modules/@lit/context/lib/create-context.js
function n3(n4) {
  return n4;
}

// ../../node_modules/@lit/context/lib/controllers/context-consumer.js
var s2 = class {
  constructor(t2, s4, i2, h) {
    if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (t3, s5) => {
      this.unsubscribe && (this.unsubscribe !== s5 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = t3, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(t3, s5)), this.unsubscribe = s5;
    }, this.host = t2, void 0 !== s4.context) {
      const t3 = s4;
      this.context = t3.context, this.callback = t3.callback, this.subscribe = t3.subscribe ?? false;
    } else this.context = s4, this.callback = i2, this.subscribe = h ?? false;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new s(this.context, this.host, this.t, this.subscribe));
  }
};

// ../../node_modules/@lit/context/lib/value-notifier.js
var s3 = class {
  get value() {
    return this.o;
  }
  set value(s4) {
    this.setValue(s4);
  }
  setValue(s4, t2 = false) {
    const i2 = t2 || !Object.is(s4, this.o);
    this.o = s4, i2 && this.updateObservers();
  }
  constructor(s4) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [s5, { disposer: t2 }] of this.subscriptions) s5(this.o, t2);
    }, void 0 !== s4 && (this.value = s4);
  }
  addCallback(s4, t2, i2) {
    if (!i2) return void s4(this.value);
    this.subscriptions.has(s4) || this.subscriptions.set(s4, { disposer: () => {
      this.subscriptions.delete(s4);
    }, consumerHost: t2 });
    const { disposer: h } = this.subscriptions.get(s4);
    s4(this.value, h);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
};

// ../../node_modules/@lit/context/lib/controllers/context-provider.js
var e3 = class extends Event {
  constructor(t2, s4) {
    super("context-provider", { bubbles: true, composed: true }), this.context = t2, this.contextTarget = s4;
  }
};
var i = class extends s3 {
  constructor(s4, e5, i2) {
    super(void 0 !== e5.context ? e5.initialValue : i2), this.onContextRequest = (t2) => {
      if (t2.context !== this.context) return;
      const s5 = t2.contextTarget ?? t2.composedPath()[0];
      s5 !== this.host && (t2.stopPropagation(), this.addCallback(t2.callback, s5, t2.subscribe));
    }, this.onProviderRequest = (s5) => {
      if (s5.context !== this.context) return;
      if ((s5.contextTarget ?? s5.composedPath()[0]) === this.host) return;
      const e6 = /* @__PURE__ */ new Set();
      for (const [s6, { consumerHost: i3 }] of this.subscriptions) e6.has(s6) || (e6.add(s6), i3.dispatchEvent(new s(this.context, i3, s6, true)));
      s5.stopPropagation();
    }, this.host = s4, void 0 !== e5.context ? this.context = e5.context : this.context = e5, this.attachListeners(), this.host.addController?.(this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new e3(this.context, this.host));
  }
};

// ../../node_modules/@lit/context/lib/decorators/provide.js
function e4({ context: e5 }) {
  return (n4, i2) => {
    const r2 = /* @__PURE__ */ new WeakMap();
    if ("object" == typeof i2) return { get() {
      return n4.get.call(this);
    }, set(t2) {
      return r2.get(this).setValue(t2), n4.set.call(this, t2);
    }, init(n5) {
      return r2.set(this, new i(this, { context: e5, initialValue: n5 })), n5;
    } };
    {
      n4.constructor.addInitializer(((n5) => {
        r2.set(n5, new i(n5, { context: e5 }));
      }));
      const o = Object.getOwnPropertyDescriptor(n4, i2);
      let s4;
      if (void 0 === o) {
        const t2 = /* @__PURE__ */ new WeakMap();
        s4 = { get() {
          return t2.get(this);
        }, set(e6) {
          r2.get(this).setValue(e6), t2.set(this, e6);
        }, configurable: true, enumerable: true };
      } else {
        const t2 = o.set;
        s4 = { ...o, set(e6) {
          r2.get(this).setValue(e6), t2?.call(this, e6);
        } };
      }
      return void Object.defineProperty(n4, i2, s4);
    }
  };
}

// ../../node_modules/@lit/context/lib/decorators/consume.js
function c({ context: c2, subscribe: e5 }) {
  return (o, n4) => {
    "object" == typeof n4 ? n4.addInitializer((function() {
      new s2(this, { context: c2, callback: (t2) => {
        o.set.call(this, t2);
      }, subscribe: e5 });
    })) : o.constructor.addInitializer(((o2) => {
      new s2(o2, { context: c2, callback: (t2) => {
        o2[n4] = t2;
      }, subscribe: e5 });
    }));
  };
}

// src/components/tree-item/tree-item.ts
var treeItemContext = n3("cs-tree-item");
var CsTreeItem = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.indeterminate = false;
    this.isLeaf = false;
    this.loading = false;
    this.selectable = false;
    this.expanded = false;
    this.selected = false;
    this.disabled = false;
    this.lazy = false;
    this._treeItemContext = { depth: 0, expanded: this.expanded };
    this._parentTreeContext = null;
    this.animationGeneration = 0;
    this.tabIndex = -1;
    this.role = "treeitem";
  }
  static isTreeItem(node) {
    const el = node;
    return el && (el.role === "treeitem" || el.getAttribute?.("role") === "treeitem");
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "treeitem");
    this.setAttribute("tabIndex", this.tabIndex.toString());
    if (this.isNestedItem()) {
      this.setAttribute("slot", "children");
      if (!this._parentTreeContext?.expanded) {
        this.expanded = false;
      }
    }
    if (this._parentTreeContext) {
      this._treeItemContext = { depth: this._parentTreeContext.depth + 1, expanded: this.expanded };
    }
    this.updateIndentation();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.childrenContainer.hidden = !this.expanded;
    this.childrenContainer.style.height = this.expanded ? "auto" : "0";
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
    this.handleExpandedChange();
  }
  async animateCollapse(generation) {
    this.dispatchEvent(new CsCollapseEvent());
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));
    await animate(
      this.childrenContainer,
      [
        // We can't animate from 'auto', so use the scroll height for now
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: "1", overflow: "hidden" },
        { height: "0", opacity: "0", overflow: "hidden" }
      ],
      { duration, easing: "cubic-bezier(0.4, 0.0, 0.2, 1)" }
    );
    if (this.animationGeneration !== generation) {
      return;
    }
    this.childrenContainer.hidden = true;
    this.dispatchEvent(new CsAfterCollapseEvent());
  }
  // Checks whether the item is nested into an item
  isNestedItem() {
    if (this._parentTreeContext !== null) {
      return true;
    }
    const parent = this.parentElement;
    return !!parent && CsTreeItem.isTreeItem(parent);
  }
  /** Counts the nesting depth and sets the private --indent property on the host for indentation. */
  updateIndentation() {
    const depth = Math.max(this._treeItemContext?.depth || 0, this.getDepth());
    this.setStyleProperty("--indent", `calc(${depth} * var(--indent-size, 2em))`);
  }
  getDepth() {
    let depth = 0;
    let node = this.parentElement;
    while (node) {
      if (CsTreeItem.isTreeItem(node)) {
        depth++;
      }
      node = node.parentElement;
    }
    return depth;
  }
  handleChildrenSlotChange() {
    this.loading = false;
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("selected") && !changedProperties.has("indeterminate")) {
      this.indeterminate = false;
    }
    super.willUpdate(changedProperties);
  }
  async animateExpand(generation) {
    this.dispatchEvent(new CsExpandEvent());
    this.childrenContainer.hidden = false;
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));
    await animate(
      this.childrenContainer,
      [
        { height: "0", opacity: "0", overflow: "hidden" },
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: "1", overflow: "hidden" }
      ],
      {
        duration,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
      }
    );
    if (this.animationGeneration !== generation) {
      return;
    }
    this.childrenContainer.style.height = "auto";
    this.dispatchEvent(new CsAfterExpandEvent());
  }
  handleLoadingChange() {
    this.setAttribute("aria-busy", this.loading ? "true" : "false");
    if (!this.loading) {
      this.animateExpand(this.animationGeneration);
    }
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleExpandedState() {
    this.customStates.set("expanded", this.expanded);
  }
  handleIndeterminateStateChange() {
    this.customStates.set("indeterminate", this.indeterminate);
  }
  handleSelectedChange() {
    this.customStates.set("selected", this.selected);
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleExpandedChange() {
    if (!this.isLeaf) {
      this.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    } else {
      this.removeAttribute("aria-expanded");
    }
  }
  handleExpandAnimation() {
    this.animationGeneration++;
    const generation = this.animationGeneration;
    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;
        this.dispatchEvent(new CsLazyLoadEvent());
      } else {
        this.animateExpand(generation);
      }
    } else {
      this.animateCollapse(generation);
    }
  }
  handleLazyChange() {
    this.dispatchEvent(new CsLazyChangeEvent());
  }
  /** Gets all the nested tree items in this node. */
  getChildrenItems({ includeDisabled = true } = {}) {
    return this.childrenSlot ? [...this.childrenSlot.assignedElements({ flatten: true })].filter(
      (item) => CsTreeItem.isTreeItem(item) && (includeDisabled || !item.disabled)
    ) : [];
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    const showExpandButton = !this.loading && (!this.isLeaf || this.lazy);
    return b`
      <div
        part="tree-item"
        class="${e2({
      "tree-item": true,
      "tree-item-expanded": this.expanded,
      "tree-item-selected": this.selected,
      "tree-item-leaf": this.isLeaf,
      "tree-item-loading": this.loading,
      "tree-item-has-expand-button": showExpandButton
    })}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${e2({
      "expand-button": true,
      "expand-button-visible": showExpandButton
    })}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${n2(
      this.loading,
      () => b` <cs-spinner part="spinner" exportparts="spinner:spinner__spinner"></cs-spinner> `,
      () => b`
                  <cs-icon name=${isRtl ? "keyboard_arrow_left" : "keyboard_arrow_right"} library="system"></cs-icon>
                `
    )}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <cs-icon name=${isRtl ? "keyboard_arrow_left" : "keyboard_arrow_right"} library="system"></cs-icon>
            </slot>
          </div>

          ${n2(
      this.selectable,
      () => b`
              <cs-checkbox
                part="checkbox"
                exportparts="
                    checkbox:checkbox__checkbox,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${l(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></cs-checkbox>
            `
    )}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group" ?hidden=${!this.expanded && !this.isConnected}>
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }
};
CsTreeItem.css = tree_item_styles_default;
__decorateClass([
  r()
], CsTreeItem.prototype, "indeterminate", 2);
__decorateClass([
  r()
], CsTreeItem.prototype, "isLeaf", 2);
__decorateClass([
  r()
], CsTreeItem.prototype, "loading", 2);
__decorateClass([
  r()
], CsTreeItem.prototype, "selectable", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTreeItem.prototype, "expanded", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTreeItem.prototype, "selected", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTreeItem.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsTreeItem.prototype, "lazy", 2);
__decorateClass([
  e4({ context: treeItemContext })
], CsTreeItem.prototype, "_treeItemContext", 2);
__decorateClass([
  c({ context: treeItemContext, subscribe: false })
], CsTreeItem.prototype, "_parentTreeContext", 2);
__decorateClass([
  e("slot:not([name])")
], CsTreeItem.prototype, "defaultSlot", 2);
__decorateClass([
  e("slot[name=children]")
], CsTreeItem.prototype, "childrenSlot", 2);
__decorateClass([
  e(".item")
], CsTreeItem.prototype, "itemElement", 2);
__decorateClass([
  e(".children")
], CsTreeItem.prototype, "childrenContainer", 2);
__decorateClass([
  e(".expand-button slot")
], CsTreeItem.prototype, "expandButtonSlot", 2);
__decorateClass([
  n({ reflect: true, type: Number, attribute: "tabindex" })
], CsTreeItem.prototype, "tabIndex", 2);
__decorateClass([
  n({ reflect: true })
], CsTreeItem.prototype, "role", 2);
__decorateClass([
  watch("loading", { waitUntilFirstUpdate: true })
], CsTreeItem.prototype, "handleLoadingChange", 1);
__decorateClass([
  watch("disabled")
], CsTreeItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("expanded")
], CsTreeItem.prototype, "handleExpandedState", 1);
__decorateClass([
  watch("indeterminate")
], CsTreeItem.prototype, "handleIndeterminateStateChange", 1);
__decorateClass([
  watch("selected")
], CsTreeItem.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], CsTreeItem.prototype, "handleExpandedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], CsTreeItem.prototype, "handleExpandAnimation", 1);
__decorateClass([
  watch("lazy", { waitUntilFirstUpdate: true })
], CsTreeItem.prototype, "handleLazyChange", 1);
CsTreeItem = __decorateClass([
  customElement("cs-tree-item")
], CsTreeItem);
CsTreeItem.disableWarning?.("change-in-update");

export {
  treeItemContext,
  CsTreeItem
};
/*! Bundled license information:

@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/context/lib/decorators/provide.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/context/lib/decorators/consume.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
