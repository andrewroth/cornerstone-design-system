/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/components/page/page.mobile.styles.ts
var page_mobile_styles_default = (breakpoint = "768px") => `
  @media screen and (width < ${breakpoint}) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;

export {
  page_mobile_styles_default
};
