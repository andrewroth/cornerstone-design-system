/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsIncludeErrorEvent
} from "./chunk.PPR6LABH.js";
import {
  include_styles_default
} from "./chunk.PVNWTC5K.js";
import {
  requestInclude
} from "./chunk.LRMM7ZSN.js";
import {
  CsLoadEvent
} from "./chunk.VVV5GJL4.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  n
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/include/include.ts
var CsInclude = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.mode = "cors";
    this.allowScripts = false;
  }
  executeScript(script) {
    const newScript = document.createElement("script");
    [...script.attributes].forEach((attr) => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  }
  /** Clones the contents of an element — a template's `content`, or any other element's children — for insertion. */
  cloneFragment(element, ownerDocument) {
    const content = element.localName === "template" ? element.content : this.childNodesToFragment(element);
    return ownerDocument.importNode(content, true);
  }
  childNodesToFragment(element) {
    const fragment = element.ownerDocument.createDocumentFragment();
    element.childNodes.forEach((child) => fragment.append(child.cloneNode(true)));
    return fragment;
  }
  async handleSrcChange() {
    try {
      const src = this.src;
      const url = new URL(src, document.baseURI);
      const fragmentId = url.hash.slice(1);
      if (src.startsWith("#")) {
        const element = fragmentId ? document.getElementById(decodeURIComponent(fragmentId)) : null;
        if (element) {
          this.replaceChildren(this.cloneFragment(element, document));
        } else {
          this.replaceChildren();
        }
        this.dispatchEvent(new CsLoadEvent());
        return;
      }
      let fetchSrc = src;
      if (fragmentId) {
        url.hash = "";
        fetchSrc = url.href;
      }
      const file = await requestInclude(fetchSrc, this.mode);
      if (src !== this.src) {
        return;
      }
      if (!file.ok) {
        this.dispatchEvent(new CsIncludeErrorEvent({ status: file.status }));
        return;
      }
      if (fragmentId) {
        const doc = new DOMParser().parseFromString(file.html, "text/html");
        const element = doc.getElementById(decodeURIComponent(fragmentId));
        if (!element) {
          this.dispatchEvent(new CsIncludeErrorEvent({ status: file.status }));
          return;
        }
        this.replaceChildren(this.cloneFragment(element, document));
      } else {
        this.innerHTML = file.html;
      }
      if (this.allowScripts) {
        [...this.querySelectorAll("script")].forEach((script) => this.executeScript(script));
      }
      this.dispatchEvent(new CsLoadEvent());
    } catch {
      this.dispatchEvent(new CsIncludeErrorEvent({ status: -1 }));
    }
  }
  render() {
    return b`<slot></slot>`;
  }
};
CsInclude.css = include_styles_default;
__decorateClass([
  n()
], CsInclude.prototype, "src", 2);
__decorateClass([
  n()
], CsInclude.prototype, "mode", 2);
__decorateClass([
  n({ attribute: "allow-scripts", type: Boolean })
], CsInclude.prototype, "allowScripts", 2);
__decorateClass([
  watch("src")
], CsInclude.prototype, "handleSrcChange", 1);
CsInclude = __decorateClass([
  customElement("cs-include")
], CsInclude);

export {
  CsInclude
};
