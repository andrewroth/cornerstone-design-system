/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  getBasePath
} from "./chunk.WI4KFPQA.js";

// src/utilities/autoloader.ts
var observer = new MutationObserver((mutations) => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        discover(node);
      }
    }
  }
});
function startLoader() {
  discover(document);
  observer.observe(document.documentElement, { subtree: true, childList: true });
}
function stopLoader() {
  observer.disconnect();
}
async function discover(root) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : "";
  const rootIsCornerstoneComponent = rootTagName.startsWith("cs-");
  const tags = [...root.querySelectorAll(":not(:defined)")].map((el) => el.tagName.toLowerCase()).filter((tag) => tag.startsWith("cs-"));
  if (rootIsCornerstoneComponent && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }
  const preloadSelectors = root.querySelectorAll("[data-cs-preload]");
  const preloadRoots = root instanceof Element && root.hasAttribute("data-cs-preload") ? [root, ...preloadSelectors] : preloadSelectors;
  for (const el of preloadRoots) {
    tags.push(
      ...el.getAttribute("data-cs-preload").split(/\s+/).filter((tag) => tag.startsWith("cs-"))
    );
  }
  const tagsToRegister = [...new Set(tags)];
  const imports = await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));
  for (const imp of imports) {
    if (imp.status === "rejected") {
      console.error(imp.reason);
    }
  }
  await new Promise(requestAnimationFrame);
  root.dispatchEvent(
    new CustomEvent("cs-discovery-complete", {
      bubbles: false,
      cancelable: false,
      composed: true
    })
  );
}
function register(tagName) {
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }
  const tagWithoutPrefix = tagName.replace(/^cs-/i, "");
  const path = getBasePath(`components/${tagWithoutPrefix}/${tagWithoutPrefix}.js`);
  return new Promise((resolve, reject) => {
    import(path).then(() => resolve()).catch(() => reject(new Error(`Unable to autoload <${tagName}> from ${path}`)));
  });
}
var _timeout = 2e3;
function preventTurboFouce(timeout = 2e3) {
  _timeout = timeout;
  document.addEventListener("turbo:before-render", handleRender);
}
async function handleRender(event) {
  const newBody = event.detail.newBody;
  event.preventDefault();
  try {
    await Promise.race([discover(newBody), new Promise((resolve) => setTimeout(resolve, _timeout))]);
  } finally {
    event.detail.resume();
  }
}

export {
  startLoader,
  stopLoader,
  discover,
  preventTurboFouce
};
