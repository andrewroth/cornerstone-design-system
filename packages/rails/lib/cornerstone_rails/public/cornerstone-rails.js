/*! cornerstone-rails - Turbo handling for Cornerstone Components. MIT licensed. */

// Served next to the vendored library, so this relative import resolves to the same module
// instances the loader uses.
import { preventTurboFouce } from './cornerstone.js';

// ---------------------------------------------------------------------------------------------
// Turbo Drive: hold each render until every cs-* element in the incoming body is registered, so
// components do not paint unstyled for a frame. Gives up after two seconds.
// ---------------------------------------------------------------------------------------------
preventTurboFouce();

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

const isComponent = element => element?.nodeType === Node.ELEMENT_NODE && element.localName.startsWith('cs-');
const attributesOf = element => new Map(Array.from(element.attributes, attribute => [attribute.name, attribute.value]));

function rememberServerAttributes(root) {
  // A preview is a clone of an earlier live page, not server HTML.
  if (!root || document.documentElement.hasAttribute('data-turbo-preview')) return;
  if (isComponent(root)) serverAttributes.set(root, attributesOf(root));
  for (const element of root.getElementsByTagName('*')) {
    if (isComponent(element)) serverAttributes.set(element, attributesOf(element));
  }
}

// This module is loaded ahead of the loader, so the first page is recorded before any component
// has upgraded and written its own attributes.
rememberServerAttributes(document.body);

document.addEventListener('turbo:before-render', event => rememberServerAttributes(event.detail.newBody));
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
