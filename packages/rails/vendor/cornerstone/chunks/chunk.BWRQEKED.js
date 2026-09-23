/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */

// src/internal/validators/required-validator.ts
var RequiredValidator = (options = {}) => {
  const { validationProperty = "value" } = options;
  const canCreateElement = typeof document !== "undefined" && "createElement" in document;
  const provided = options.validationElement;
  let validationElement;
  if (typeof provided === "function") {
    if (canCreateElement) {
      validationElement = provided();
    }
  } else if (provided) {
    validationElement = provided;
  } else if (canCreateElement) {
    validationElement = Object.assign(document.createElement("input"), { required: true });
  }
  const obj = {
    observedAttributes: ["required"],
    message: validationElement?.validationMessage,
    // @TODO: Add a translation.
    checkValidity(element) {
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      const isRequired = element.required ?? element.hasAttribute("required");
      if (!isRequired) {
        return validity;
      }
      const value = element[validationProperty];
      const isEmpty = !value;
      if (isEmpty) {
        validity.message = typeof obj.message === "function" ? obj.message(element) : obj.message || "";
        validity.isValid = false;
        validity.invalidKeys.push("valueMissing");
      }
      return validity;
    }
  };
  return obj;
};

export {
  RequiredValidator
};
