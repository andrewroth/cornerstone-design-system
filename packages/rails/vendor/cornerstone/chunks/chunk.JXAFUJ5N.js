/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  startLoader
} from "./chunk.O637MP3W.js";

// src/cornerstone.loader.ts
startLoader();
Promise.race([
  new Promise((resolve) => document.addEventListener("cs-discovery-complete", resolve)),
  new Promise((resolve) => setTimeout(resolve, 2e3))
]).then(() => {
  document.querySelectorAll(".cs-cloak").forEach((el) => el.classList.remove("cs-cloak"));
});
