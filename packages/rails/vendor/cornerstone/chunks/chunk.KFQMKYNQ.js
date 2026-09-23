/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  o,
  require_react
} from "./chunk.UPT2UL3V.js";
import {
  CsOtpInput
} from "./chunk.UOD6NFZX.js";
import {
  __toESM
} from "./chunk.QQCENPXN.js";

// src/react/otp-input/index.ts
var React = __toESM(require_react(), 1);
var tagName = "cs-otp-input";
var reactWrapper = o({
  tagName,
  elementClass: CsOtpInput,
  react: React,
  events: {
    onCsComplete: "cs-complete",
    onCsClear: "cs-clear",
    onCsInvalid: "cs-invalid"
  },
  displayName: "CsOtpInput"
});
var otp_input_default = reactWrapper;

export {
  otp_input_default
};
