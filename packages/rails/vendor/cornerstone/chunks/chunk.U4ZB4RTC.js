/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  library_brands_default
} from "./chunk.5I2MJI4V.js";
import {
  library_default_default
} from "./chunk.WA2HPE5W.js";
import {
  library_system_default
} from "./chunk.KRPQCOJS.js";

// src/components/icon/library.ts
var defaultIconFamily = "sharp";
var registry = [library_default_default, library_system_default, library_brands_default];
var watchedIcons = /* @__PURE__ */ new Set();
function watchIcon(icon) {
  watchedIcons.add(icon);
}
function unwatchIcon(icon) {
  watchedIcons.delete(icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}
function registerIconLibrary(name, options) {
  unregisterIconLibrary(name);
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
    spriteSheet: options.spriteSheet
  });
  watchedIcons.forEach((icon) => {
    if (icon.library === name) {
      icon.setIcon();
    }
  });
}
function unregisterIconLibrary(name) {
  registry = registry.filter((lib) => lib.name !== name);
}
function setDefaultIconFamily(family) {
  defaultIconFamily = family;
  watchedIcons.forEach((icon) => icon.setIcon());
}
function getDefaultIconFamily() {
  return defaultIconFamily;
}

export {
  watchIcon,
  unwatchIcon,
  getIconLibrary,
  registerIconLibrary,
  unregisterIconLibrary,
  setDefaultIconFamily,
  getDefaultIconFamily
};
