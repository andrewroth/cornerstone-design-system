/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  getIconPath
} from "./chunk.WI4KFPQA.js";

// src/components/icon/library.default.ts
var MS_VERSION = "0.46.0";
var STYLES = ["sharp", "outlined", "rounded"];
var WEIGHTS = [100, 200, 300, 400, 500, 600, 700];
var DEFAULT_WEIGHT = 400;
function getIconStyle(family) {
  return STYLES.includes(family) ? family : "sharp";
}
function getIconWeight(weight) {
  const value = Number(weight);
  if (!Number.isFinite(value)) {
    return DEFAULT_WEIGHT;
  }
  return WEIGHTS.reduce(
    (closest, candidate) => Math.abs(candidate - value) < Math.abs(closest - value) ? candidate : closest
  );
}
function getIconFileName(name, variant) {
  return variant === "fill" ? `${name}-fill` : name;
}
function getIconUrl(name, family, variant, weight) {
  const style = getIconStyle(family);
  const resolvedWeight = getIconWeight(weight);
  const fileName = getIconFileName(name, variant);
  const iconBase = getIconPath();
  if (iconBase) {
    return `${iconBase}/${resolvedWeight}/${style}/${fileName}.svg`;
  }
  return `https://cdn.jsdelivr.net/npm/@material-symbols/svg-${resolvedWeight}@${MS_VERSION}/${style}/${fileName}.svg`;
}
var library = {
  name: "default",
  resolver: (name, family = "sharp", variant = "regular", _autoWidth = false, weight = DEFAULT_WEIGHT) => {
    return getIconUrl(name, family, variant, weight);
  },
  mutator: (svg) => {
    if (!svg.hasAttribute("fill")) {
      svg.setAttribute("fill", "currentColor");
    }
  }
};
var library_default_default = library;

export {
  getIconStyle,
  getIconWeight,
  getIconFileName,
  library_default_default
};
