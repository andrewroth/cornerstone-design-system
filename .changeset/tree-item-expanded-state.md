---
'@cruglobal/cornerstone-components': patch
---

Fixed: `<cs-tree-item>` keeps its `expanded` state when it renders nested under an expanded item or is moved in the DOM, and `cs-expand` / `cs-collapse` now fire after the `expanded` attribute, `aria-expanded` and the `expanded` custom state have updated.
