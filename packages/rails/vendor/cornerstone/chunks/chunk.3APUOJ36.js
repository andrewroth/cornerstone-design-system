/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/components/known-date/internal/partial-date-validator.ts
var PartialDateValidator = () => {
  return {
    checkValidity(element) {
      const host = element;
      const parts = host.parts;
      const empty = parts.day === "" && parts.month === "" && parts.year === "";
      if (empty) {
        return { isValid: true, invalidKeys: [], message: "" };
      }
      if (host.value === "") {
        const message = host.localize?.term("incompleteDate") || "Enter a valid date.";
        return { isValid: false, invalidKeys: ["badInput"], message };
      }
      return { isValid: true, invalidKeys: [], message: "" };
    }
  };
};

export {
  PartialDateValidator
};
