/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  en_default
} from "./chunk.PRD3XZ4M.js";
import {
  LocalizeController,
  registerTranslation
} from "./chunk.FFJLVZKJ.js";

// src/utilities/localize.ts
var LocalizeController2 = class extends LocalizeController {
  lang() {
    if (this.host.didSSR && !this.host.hasUpdated) {
      return this.host.lang || "en";
    }
    return super.lang();
  }
};
registerTranslation(en_default);

export {
  LocalizeController2 as LocalizeController
};
