/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  f,
  i,
  i2,
  o,
  u
} from "./chunk.CRKHH5GL.js";
import {
  __decorateClass,
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk.QQCENPXN.js";

// ../../node_modules/@lit/reactive-element/decorators/property.js
var o2 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r = (t3 = o2, e3, r4) => {
  const { kind: n2, metadata: i3 } = r4;
  let s = globalThis.litPropertyMetadata.get(i3);
  if (void 0 === s && globalThis.litPropertyMetadata.set(i3, s = /* @__PURE__ */ new Map()), "setter" === n2 && ((t3 = Object.create(t3)).wrapped = true), s.set(r4.name, t3), "accessor" === n2) {
    const { name: o3 } = r4;
    return { set(r5) {
      const n3 = e3.get.call(this);
      e3.set.call(this, r5), this.requestUpdate(o3, n3, t3, true, r5);
    }, init(e4) {
      return void 0 !== e4 && this.C(o3, void 0, t3, e4), e4;
    } };
  }
  if ("setter" === n2) {
    const { name: o3 } = r4;
    return function(r5) {
      const n3 = this[o3];
      e3.call(this, r5), this.requestUpdate(o3, n3, t3, true, r5);
    };
  }
  throw Error("Unsupported decorator location: " + n2);
};
function n(t3) {
  return (e3, o3) => "object" == typeof o3 ? r(t3, e3, o3) : ((t4, e4, o4) => {
    const r4 = e4.hasOwnProperty(o4);
    return e4.constructor.createProperty(o4, t4), r4 ? Object.getOwnPropertyDescriptor(e4, o4) : void 0;
  })(t3, e3, o3);
}

// ../../node_modules/@lit/reactive-element/decorators/state.js
function r2(r4) {
  return n({ ...r4, state: true, attribute: false });
}

// ../../node_modules/@lit/reactive-element/decorators/event-options.js
function t(t3) {
  return (n2, o3) => {
    const c = "function" == typeof n2 ? n2 : n2[o3];
    Object.assign(c, t3);
  };
}

// ../../node_modules/@lit/reactive-element/decorators/base.js
var e = (e3, t3, c) => (c.configurable = true, c.enumerable = true, Reflect.decorate && "object" != typeof t3 && Object.defineProperty(e3, t3, c), c);

// ../../node_modules/@lit/reactive-element/decorators/query.js
function e2(e3, r4) {
  return (n2, s, i3) => {
    const o3 = (t3) => t3.renderRoot?.querySelector(e3) ?? null;
    if (r4) {
      const { get: e4, set: r5 } = "object" == typeof s ? n2 : i3 ?? /* @__PURE__ */ (() => {
        const t3 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t3];
        }, set(e5) {
          this[t3] = e5;
        } };
      })();
      return e(n2, s, { get() {
        let t3 = e4.call(this);
        return void 0 === t3 && (t3 = o3(this), (null !== t3 || this.hasUpdated) && r5.call(this, t3)), t3;
      } });
    }
    return e(n2, s, { get() {
      return o3(this);
    } });
  };
}

// ../../node_modules/@lit/reactive-element/decorators/query-async.js
function r3(r4) {
  return (n2, e3) => e(n2, e3, { async get() {
    return await this.updateComplete, this.renderRoot?.querySelector(r4) ?? null;
  } });
}

// ../../node_modules/@lit/reactive-element/decorators/custom-element.js
var t2 = (t3) => (e3, o3) => {
  void 0 !== o3 ? o3.addInitializer(() => {
    customElements.define(t3, e3);
  }) : customElements.define(t3, e3);
};

// src/styles/component/host.styles.ts
var host_styles_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`;

// src/internal/cornerstone-element.ts
var HAS_ENDING_COLON = /;\s+$/;
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}
function buildStyleAttribute(options) {
  const { property, value, element } = options;
  if (value) {
    let style = element.getAttribute("style") || "";
    if (style) {
      if (!style.match(HAS_ENDING_COLON)) {
        style += ";";
      }
      style += " ";
    }
    const str = `${property}: ${value}`;
    if (style.includes(str)) {
      return;
    }
    return `${style}${str};`;
  }
  return null;
}
var _hasRecordedInitialProperties;
var CornerstoneElement = class extends i2 {
  constructor() {
    super();
    __privateAdd(this, _hasRecordedInitialProperties, false);
    this.initialReflectedProperties = /* @__PURE__ */ new Map();
    this.didSSR = o || Boolean(this.shadowRoot);
    /**
     * @internal Methods for setting and checking custom states.
     */
    this.customStates = {
      /** Adds or removes the specified custom state. */
      set: (customState, active) => {
        if (!this.internals?.states) {
          return;
        }
        try {
          if (active) {
            this.internals.states.add(customState);
          } else {
            this.internals.states.delete(customState);
          }
        } catch (e3) {
          if (String(e3).includes("must start with '--'")) {
            console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");
          } else {
            throw e3;
          }
        }
      },
      /** Determines whether or not the element currently has the specified state. */
      has: (customState) => {
        if (!this.internals?.states) {
          return false;
        }
        try {
          return this.internals.states.has(customState);
        } catch {
          return false;
        }
      }
    };
    try {
      this.internals = this.attachInternals();
    } catch {
      console.error("Element internals are not supported in your browser. Consider using a polyfill");
    }
    this.customStates.set("cs-defined", true);
    const Self = this.constructor;
    for (const [property, spec] of Self.elementProperties) {
      if (spec.default === "inherit" && spec.initial !== void 0 && typeof property === "string") {
        this.customStates.set(`initial-${property}-${spec.initial}`, true);
      }
    }
  }
  /** Prepends host styles to the component's styles. */
  static get styles() {
    const styles = Array.isArray(this.css) ? this.css : this.css ? [this.css] : [];
    return [host_styles_default, ...styles];
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.didSSR) {
      this.shadowRoot?.prepend(
        document.createComment(
          ` Cornerstone: https://cruglobal.github.io/cornerstone-design-system/components/${this.localName.replace("cs-", "")} `
        )
      );
    }
    if (this.didSSR) {
      this.updateComplete.then(() => {
        this.shadowRoot?.prepend(
          document.createComment(
            ` Cornerstone: https://cruglobal.github.io/cornerstone-design-system/components/${this.localName.replace("cs-", "")} `
          )
        );
      });
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach(
        (obj, prop) => {
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );
      __privateSet(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.didSSR) {
      this.shadowRoot?.querySelectorAll("slot").forEach((slotElement) => {
        slotElement.dispatchEvent(new Event("slotchange", { bubbles: true, composed: false, cancelable: false }));
      });
    }
  }
  update(changedProperties) {
    try {
      super.update(changedProperties);
    } catch (e3) {
      if (this.didSSR && !this.hasUpdated) {
        const event = new Event("lit-hydration-error", { bubbles: true, composed: true, cancelable: false });
        event.error = e3;
        this.dispatchEvent(event);
      }
      throw e3;
    }
  }
  /**
   * @internal
   * Internal way to set styles across both client and server
   */
  setStyle(property, value) {
    if (!this.style) {
      const str = buildStyleAttribute({
        // because this is going to be serialized to an HTML style attribute, need to transform the casing.
        property: camelToKebab(property),
        value,
        element: this
      });
      if (str) {
        this.setAttribute("style", str);
      }
      return;
    }
    this.style[property] = value;
  }
  /**
   * @internal
   * Internal way to set a CSS custom property across both client and server.
   */
  setStyleProperty(property, value) {
    if (!this.style) {
      const str = buildStyleAttribute({
        // because this is going to be serialized to an HTML style attribute, need to transform the casing.
        property,
        value,
        element: this
      });
      if (str) {
        this.setAttribute("style", str);
      }
      return;
    }
    this.style.setProperty(property, value);
  }
  /**
   * @internal Given a native event, this function cancels it and dispatches it again from the host element using the desired
   * event options.
   */
  relayNativeEvent(event, eventOptions) {
    event.stopImmediatePropagation();
    this.dispatchEvent(
      new event.constructor(event.type, {
        ...event,
        ...eventOptions
      })
    );
  }
};
_hasRecordedInitialProperties = new WeakMap();
__decorateClass([
  n()
], CornerstoneElement.prototype, "dir", 2);
__decorateClass([
  n()
], CornerstoneElement.prototype, "lang", 2);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "did-ssr" })
], CornerstoneElement.prototype, "didSSR", 2);

// src/internal/custom-element.ts
var thisBuild = true ? "bundled" : "unknown";
var REGISTRY_KEY = /* @__PURE__ */ Symbol.for("cornerstone.registeringBuilds");
function registeringBuilds() {
  const global = globalThis;
  const existing = global[REGISTRY_KEY];
  if (existing) {
    return existing;
  }
  const created = /* @__PURE__ */ new Map();
  global[REGISTRY_KEY] = created;
  return created;
}
function customElement(tagName) {
  return (cls) => {
    if (customElements.get(tagName)) {
      const firstBuild = registeringBuilds().get(tagName) ?? "unknown";
      console.warn(
        `Cornerstone Components: <${tagName}> is already defined, so this definition was skipped. The existing one came from the ${firstBuild} build; this one is from the ${thisBuild} build. Import each component from one build only \u2014 mixing them doubles the bundle, and if the two are different versions the page runs whichever registered first.`
      );
      return;
    }
    registeringBuilds().set(tagName, thisBuild);
    t2(tagName)(cls);
  };
}

export {
  n,
  r2 as r,
  t,
  e2 as e,
  r3 as r2,
  host_styles_default,
  CornerstoneElement,
  customElement
};
/*! Bundled license information:

@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
