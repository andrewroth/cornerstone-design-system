/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/utilities/base-path.ts
var basePath = "";
var iconPath = "";
function setBasePath(path) {
  basePath = path;
}
function packageRoot() {
  return new URL("../", import.meta.url).href.replace(/\/$/, "");
}
function getBasePath(subpath = "") {
  if (!basePath) {
    const el = document.querySelector("[data-cornerstone]");
    const attribute = el?.getAttribute("data-cornerstone");
    if (attribute) {
      setBasePath(new URL(attribute, window.location.href).href.replace(/\/$/, ""));
    } else {
      setBasePath(packageRoot());
    }
  }
  return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
}
function setIconPath(path) {
  iconPath = path;
}
function getIconPath() {
  return iconPath.replace(/\/$/, "");
}

export {
  setBasePath,
  getBasePath,
  setIconPath,
  getIconPath
};
