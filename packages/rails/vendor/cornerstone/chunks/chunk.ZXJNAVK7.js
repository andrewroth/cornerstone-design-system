/*! Cornerstone Components 0.6.2 - MIT licensed. See LICENSE.md and NOTICE. */
import {
  CsStartEvent
} from "./chunk.HYZIRQPO.js";
import {
  CsFinishEvent
} from "./chunk.GIMFLC2P.js";
import {
  CsCancelEvent
} from "./chunk.JWIY4LQX.js";
import {
  animation_styles_default
} from "./chunk.5JHQ2HNT.js";
import {
  dist_exports
} from "./chunk.CVRSRK6H.js";
import {
  watch
} from "./chunk.3QN4KTE6.js";
import {
  CornerstoneElement,
  customElement,
  n,
  r2 as r
} from "./chunk.VO5P54JZ.js";
import {
  b
} from "./chunk.B2T6AD2P.js";
import {
  __decorateClass
} from "./chunk.QQCENPXN.js";

// src/components/animation/animation.ts
var CsAnimation = class extends CornerstoneElement {
  constructor() {
    super(...arguments);
    this.hasStarted = false;
    this.name = "none";
    this.play = false;
    this.delay = 0;
    this.direction = "normal";
    this.duration = 1e3;
    this.easing = "linear";
    this.endDelay = 0;
    this.fill = "auto";
    this.iterations = Infinity;
    this.iterationStart = 0;
    this.playbackRate = 1;
    this.handleAnimationFinish = () => {
      this.play = false;
      this.hasStarted = false;
      this.dispatchEvent(new CsFinishEvent());
    };
    this.handleAnimationCancel = () => {
      this.play = false;
      this.hasStarted = false;
      this.dispatchEvent(new CsCancelEvent());
    };
  }
  /** Gets and sets the current animation time. */
  get currentTime() {
    return this.animation?.currentTime ?? 0;
  }
  set currentTime(time) {
    if (this.animation) {
      this.animation.currentTime = time;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if ("animate" in this) {
      this.createAnimation();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if ("animate" in this) {
      this.destroyAnimation();
    }
  }
  handleSlotChange() {
    this.destroyAnimation();
    this.createAnimation();
  }
  async createAnimation() {
    const easing = dist_exports.easings[this.easing] ?? this.easing;
    const keyframes = this.keyframes ?? dist_exports[this.name];
    const slot = await this.defaultSlot;
    const element = slot.assignedElements()[0];
    if (!element || !keyframes) {
      return false;
    }
    this.destroyAnimation();
    this.animation = element.animate(keyframes, {
      delay: this.delay,
      direction: this.direction,
      duration: this.duration,
      easing,
      endDelay: this.endDelay,
      fill: this.fill,
      iterationStart: this.iterationStart,
      iterations: this.iterations
    });
    this.animation.playbackRate = this.playbackRate;
    this.animation.addEventListener("cancel", this.handleAnimationCancel);
    this.animation.addEventListener("finish", this.handleAnimationFinish);
    if (this.play) {
      this.hasStarted = true;
      this.dispatchEvent(new CsStartEvent());
    } else {
      this.animation.pause();
    }
    return true;
  }
  destroyAnimation() {
    if (this.animation) {
      this.animation.cancel();
      this.animation.removeEventListener("cancel", this.handleAnimationCancel);
      this.animation.removeEventListener("finish", this.handleAnimationFinish);
      this.hasStarted = false;
    }
  }
  handleAnimationChange() {
    if (!this.hasUpdated) {
      return;
    }
    this.createAnimation();
  }
  handlePlayChange() {
    if (this.animation) {
      if (this.play && !this.hasStarted) {
        this.hasStarted = true;
        this.dispatchEvent(new CsStartEvent());
      }
      if (this.play) {
        this.animation.play();
      } else {
        this.animation.pause();
      }
      return true;
    }
    return false;
  }
  handlePlaybackRateChange() {
    if (this.animation) {
      this.animation.playbackRate = this.playbackRate;
    }
  }
  /** Clears all keyframe effects caused by this animation and aborts its playback. */
  cancel() {
    this.animation?.cancel();
  }
  /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
  finish() {
    this.animation?.finish();
  }
  render() {
    return b` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
CsAnimation.css = animation_styles_default;
__decorateClass([
  r("slot")
], CsAnimation.prototype, "defaultSlot", 2);
__decorateClass([
  n()
], CsAnimation.prototype, "name", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CsAnimation.prototype, "play", 2);
__decorateClass([
  n({ type: Number })
], CsAnimation.prototype, "delay", 2);
__decorateClass([
  n()
], CsAnimation.prototype, "direction", 2);
__decorateClass([
  n({ type: Number })
], CsAnimation.prototype, "duration", 2);
__decorateClass([
  n()
], CsAnimation.prototype, "easing", 2);
__decorateClass([
  n({ attribute: "end-delay", type: Number })
], CsAnimation.prototype, "endDelay", 2);
__decorateClass([
  n()
], CsAnimation.prototype, "fill", 2);
__decorateClass([
  n({ type: Number })
], CsAnimation.prototype, "iterations", 2);
__decorateClass([
  n({ attribute: "iteration-start", type: Number })
], CsAnimation.prototype, "iterationStart", 2);
__decorateClass([
  n({ attribute: false })
], CsAnimation.prototype, "keyframes", 2);
__decorateClass([
  n({ attribute: "playback-rate", type: Number })
], CsAnimation.prototype, "playbackRate", 2);
__decorateClass([
  watch([
    "name",
    "delay",
    "direction",
    "duration",
    "easing",
    "endDelay",
    "fill",
    "iterations",
    "iterationsStart",
    "keyframes"
  ])
], CsAnimation.prototype, "handleAnimationChange", 1);
__decorateClass([
  watch("play")
], CsAnimation.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("playbackRate")
], CsAnimation.prototype, "handlePlaybackRateChange", 1);
CsAnimation = __decorateClass([
  customElement("cs-animation")
], CsAnimation);

export {
  CsAnimation
};
