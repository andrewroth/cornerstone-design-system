/*! cornerstone-rails - loads Cornerstone Components on demand and handles Turbo. MIT licensed. */

// Served next to the vendored library, so the relative import below resolves to the same module
// the loader uses, and a <script> for the loader (eager: true) does not load a second copy.
//
// Options come from this module's own URL: ?turbo=0 turns the Turbo handling off.
const turbo = new URL(import.meta.url).searchParams.get('turbo') !== '0';

const isComponent = element => element?.nodeType === Node.ELEMENT_NODE && element.localName.startsWith('cs-');

// ---------------------------------------------------------------------------------------------
// Load on demand. cornerstone.loader.js also re-exports the library's utilities, so it statically
// imports 17 chunks before it looks at the page: the animation catalogue (40 KB), the system and
// brand icon sets (40 KB), the localizer and English strings, and the autoloader. On a page with
// no cs-* element that is about 100 KB for nothing. It is imported the first time the
// page has a cs-* element, or an element with data-cs-preload: at start, when one is inserted (a
// Turbo Drive render, a frame load, a stream, any script), or when Turbo is about to render one.
// ---------------------------------------------------------------------------------------------
let library;

function needsLibrary(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return false;
  if (isComponent(root) || root.hasAttribute?.('data-cs-preload')) return true;
  if (root.querySelector('[data-cs-preload]')) return true;
  for (const element of root.querySelectorAll('*')) {
    if (element.localName.startsWith('cs-')) return true;
  }
  return false;
}

// Imports the library once and resolves to the loader module. Also exported, for a page that
// creates cs-* elements where the observer cannot see them (inside a shadow root).
export function loadCornerstone() {
  if (!library) {
    observer.disconnect(); // the loader has its own observer from here on
    library = import('./cornerstone.loader.js');
  }
  return library;
}

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (needsLibrary(node)) {
        loadCornerstone();
        return;
      }
    }
  }
});

if (needsLibrary(document.documentElement)) {
  loadCornerstone();
} else {
  observer.observe(document.documentElement, { childList: true, subtree: true });
  // The loader removes cs-cloak once the page's components are registered. This page has none,
  // so there is nothing to wait for.
  for (const element of document.querySelectorAll('.cs-cloak')) element.classList.remove('cs-cloak');
}

// ---------------------------------------------------------------------------------------------
// Turbo Drive: hold each render until every cs-* element in the incoming body is registered, so
// components do not paint unstyled for a frame. Gives up after two seconds. This is Cornerstone's
// preventTurboFouce(), which cannot be used as is: it lives in the library, and it holds every
// render, while here a render with no cs-* element is not held and does not load the library.
// ---------------------------------------------------------------------------------------------
const FOUCE_TIMEOUT = 2000;

async function holdRender(event) {
  const { newBody } = event.detail;
  if (!needsLibrary(newBody)) return;
  event.preventDefault();
  try {
    await Promise.race([
      loadCornerstone().then(({ discover }) => discover(newBody)),
      new Promise(resolve => setTimeout(resolve, FOUCE_TIMEOUT))
    ]);
  } finally {
    event.detail.resume();
  }
}

// ---------------------------------------------------------------------------------------------
// Turbo morph (page refreshes with <meta name="turbo-refresh-method" content="morph">, and
// <turbo-frame refresh="morph">).
//
// Idiomorph makes each live element's attributes match the new server HTML. It never enters a
// shadow root, so a component's internal DOM is safe, but its host attributes are not: a
// component writes some of them itself (`open` on cs-dialog, `checked` on cs-checkbox, `role`
// and `tabindex` on cs-tree-item), and the server HTML does not contain them. Left alone, a
// refresh closes an open dialog, unchecks a box the user checked, and strips ARIA roles.
//
// The rule here: on a cs-* element, a morph applies only the attributes the SERVER changed
// between its previous render and this one. An attribute the server rendered the same way both
// times is left as the client has it. An element with no recorded server render (inserted by a
// Turbo Stream, or created in JavaScript) gets Turbo's default behaviour.
// ---------------------------------------------------------------------------------------------
const serverAttributes = new WeakMap(); // element -> Map(name -> value), as the server last rendered it
const incomingAttributes = new WeakMap(); // element -> Map, during one morph

const attributesOf = element => new Map(Array.from(element.attributes, attribute => [attribute.name, attribute.value]));

function rememberServerAttributes(root) {
  // A preview is a clone of an earlier live page, not server HTML.
  if (!root || document.documentElement.hasAttribute('data-turbo-preview')) return;
  if (isComponent(root)) serverAttributes.set(root, attributesOf(root));
  for (const element of root.getElementsByTagName('*')) {
    if (isComponent(element)) serverAttributes.set(element, attributesOf(element));
  }
}

if (turbo) {
  // This module runs ahead of the library, so the first page is recorded before any component
  // has upgraded and written its own attributes.
  rememberServerAttributes(document.body);

  // Recorded first, then held: the held body is still the server's HTML.
  document.addEventListener('turbo:before-render', event => rememberServerAttributes(event.detail.newBody));
  document.addEventListener('turbo:before-render', holdRender);
  document.addEventListener('turbo:before-frame-render', event => rememberServerAttributes(event.detail.newFrame));

  document.addEventListener('turbo:before-morph-element', event => {
    const { target } = event;
    const { newElement } = event.detail;
    if (isComponent(target) && newElement) incomingAttributes.set(target, attributesOf(newElement));
  });

  document.addEventListener('turbo:before-morph-attribute', event => {
    const { target } = event;
    if (!isComponent(target)) return;
    const previous = serverAttributes.get(target);
    const incoming = incomingAttributes.get(target);
    if (!previous || !incoming) return;
    const { attributeName } = event.detail;
    if (previous.get(attributeName) === incoming.get(attributeName)) event.preventDefault();
  });

  document.addEventListener('turbo:morph-element', event => {
    const { target } = event;
    const incoming = incomingAttributes.get(target);
    if (!incoming) return;
    serverAttributes.set(target, incoming);
    incomingAttributes.delete(target);
  });
}
