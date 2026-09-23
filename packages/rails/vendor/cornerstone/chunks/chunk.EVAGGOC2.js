/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/internal/event.ts
function waitForEvent(el, eventName, timeout = 5e3) {
  return new Promise((resolve) => {
    function settle() {
      clearTimeout(timer);
      el.removeEventListener(eventName, done);
      resolve();
    }
    function done(event) {
      if (event.target === el) {
        settle();
      }
    }
    el.addEventListener(eventName, done);
    const timer = setTimeout(settle, timeout);
  });
}

export {
  waitForEvent
};
