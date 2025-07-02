/*!
 * @phucbm/magnetic-button 0.0.5
 * https://phucbm.github.io/magnetic-button/
 *
 * @license MIT
 * @author: phucbm, https://github.com/phucbm
 */
"use strict";
var MagneticButton = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/umd.ts
  var umd_exports = {};
  __export(umd_exports, {
    default: () => umd_default
  });

  // node_modules/.pnpm/@phucbm+lerp@1.0.1/node_modules/@phucbm/lerp/dist/index.js
  function n(r, u, e = 0.1) {
    return r * (1 - e) + u * e;
  }
  var b = n;

  // src/index.ts
  var _MagneticButton = class _MagneticButton {
    /**
     * Creates a new MagneticButton instance
     * @param target - The HTML element to apply magnetic effect to. If null, auto-initializes all elements with data-magnetic attribute
     * @param options - Configuration options for the magnetic effect
     */
    constructor(target, options = {}) {
      this.settings = {
        activeClass: "magnetizing",
        attraction: 0.3,
        distance: 200,
        fraction: 0.1,
        onEnter: () => {
        },
        onExit: () => {
        },
        onUpdate: () => {
        }
      };
      this.isEnter = false;
      this.lerpPos = { x: 0, y: 0 };
      if (!target) {
        document.querySelectorAll("[data-magnetic]").forEach((element) => {
          if (!_MagneticButton.initializedElements.has(element)) {
            new _MagneticButton(element, options);
          }
        });
        return;
      }
      if (_MagneticButton.initializedElements.has(target)) {
        return;
      }
      _MagneticButton.initializedElements.add(target);
      const dataDistance = parseFloat(target.getAttribute("data-distance") || "");
      const dataAttraction = parseFloat(target.getAttribute("data-attraction") || "");
      const dataFraction = parseFloat(target.getAttribute("data-fraction") || "");
      this.settings = {
        ...this.settings,
        attraction: !isNaN(dataAttraction) ? dataAttraction : options.attraction ?? this.settings.attraction,
        distance: !isNaN(dataDistance) ? dataDistance : options.distance ?? this.settings.distance,
        fraction: !isNaN(dataFraction) ? dataFraction : options.fraction ?? this.settings.fraction,
        ...options
      };
      window.addEventListener("mousemove", (e) => this.magnetize(target, e));
      target.classList.add("is-magnetized");
    }
    /**
     * Main magnetization logic - processes mouse movement and applies magnetic effect
     * @param target - The target element
     * @param e - Mouse event
     */
    magnetize(target, e) {
      const data = this.calculateCoordinates(target, e.clientX, e.clientY);
      if (data.distance < this.settings.distance) {
        this.animateButton(target, data.deltaX, data.deltaY);
        if (!this.isEnter) {
          this.isEnter = true;
          target.classList.add(this.settings.activeClass);
          this.settings.onEnter(data);
        }
        this.settings.onUpdate(data);
      } else {
        this.animateButton(target, 0, 0);
        if (this.isEnter) {
          this.isEnter = false;
          target.classList.remove(this.settings.activeClass);
          this.settings.onExit(data);
        }
      }
    }
    /**
     * Applies smooth animation to the button using transform
     * @param target - The target element
     * @param endX - Target X position
     * @param endY - Target Y position
     */
    animateButton(target, endX, endY) {
      this.lerpPos.x = b(this.lerpPos.x, endX, this.settings.fraction);
      this.lerpPos.y = b(this.lerpPos.y, endY, this.settings.fraction);
      target.style.transform = `translate(${this.lerpPos.x}px, ${this.lerpPos.y}px)`;
    }
    /**
     * Calculates distances and coordinates between mouse and element center
     * @param target - The target element
     * @param mouseX - Mouse X coordinate
     * @param mouseY - Mouse Y coordinate
     * @returns Object containing delta values and distance
     */
    calculateCoordinates(target, mouseX, mouseY) {
      const viewportOffset = target.getBoundingClientRect();
      const centerX = viewportOffset.left + target.offsetWidth / 2;
      const centerY = viewportOffset.top + target.offsetHeight / 2;
      const deltaX = (mouseX - centerX) * this.settings.attraction;
      const deltaY = (mouseY - centerY) * this.settings.attraction;
      const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
      return { deltaX, deltaY, distance };
    }
  };
  // Track initialized elements to avoid duplicates
  _MagneticButton.initializedElements = /* @__PURE__ */ new WeakSet();
  var MagneticButton = _MagneticButton;
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => new MagneticButton());
    } else {
      new MagneticButton();
    }
  }

  // src/umd.ts
  new MagneticButton();
  var MagneticButtonAPI = MagneticButton;
  MagneticButtonAPI.init = (target, options) => {
    return new MagneticButton(target, options);
  };
  var umd_default = MagneticButtonAPI;
  if (typeof window !== "undefined") {
    ;
    window.MagneticButton = MagneticButtonAPI;
  }
  return __toCommonJS(umd_exports);
})();
/*! Bundled license information:

@phucbm/lerp/dist/index.js:
  (*!
   * @phucbm/lerp 1.0.1
   * https://github.com/phucbm/lerp#readme
   *
   * @license MIT
   * @author: phucbm, https://github.com/phucbm
   *)
*/
//# sourceMappingURL=magnetic-button.js.map