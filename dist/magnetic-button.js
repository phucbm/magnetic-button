/*!
 * @phucbm/magnetic-button 1.1.0
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
        distance: 50,
        speed: 0.1,
        disableOnTouch: true,
        // @ts-ignore
        maxX: void 0,
        // @ts-ignore
        maxY: void 0,
        onEnter: () => {
        },
        onExit: () => {
        },
        onUpdate: () => {
        }
      };
      this.isEnter = false;
      this.lerpPos = { x: 0, y: 0 };
      this.target = null;
      this.boundMagnetize = null;
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
      const dataSpeed = parseFloat(target.getAttribute("data-speed") || "");
      const dataMaxX = parseFloat(target.getAttribute("data-max-x") || "");
      const dataMaxY = parseFloat(target.getAttribute("data-max-y") || "");
      this.settings = {
        ...this.settings,
        attraction: !isNaN(dataAttraction) ? dataAttraction : options.attraction ?? this.settings.attraction,
        distance: !isNaN(dataDistance) ? dataDistance : options.distance ?? this.settings.distance,
        speed: !isNaN(dataSpeed) ? dataSpeed : options.speed ?? this.settings.speed,
        maxX: !isNaN(dataMaxX) ? dataMaxX : options.maxX ?? this.settings.maxX,
        maxY: !isNaN(dataMaxY) ? dataMaxY : options.maxY ?? this.settings.maxY,
        ...options
      };
      if (this.settings.disableOnTouch && _MagneticButton.isTouchDevice()) {
        _MagneticButton.initializedElements.delete(target);
        return;
      }
      this.target = target;
      this.boundMagnetize = (e) => this.magnetize(target, e);
      window.addEventListener("mousemove", this.boundMagnetize);
      target.classList.add("is-magnetized");
    }
    /**
     * Detects if the device is primarily a touch device
     * @returns true if the device uses touch as primary input
     */
    static isTouchDevice() {
      return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
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
      this.lerpPos.x = b(this.lerpPos.x, endX, this.settings.speed);
      this.lerpPos.y = b(this.lerpPos.y, endY, this.settings.speed);
      let finalX = this.lerpPos.x;
      let finalY = this.lerpPos.y;
      if (this.settings.maxX !== void 0) {
        finalX = Math.max(-this.settings.maxX, Math.min(this.settings.maxX, finalX));
      }
      if (this.settings.maxY !== void 0) {
        finalY = Math.max(-this.settings.maxY, Math.min(this.settings.maxY, finalY));
      }
      target.style.transform = `translate(${finalX}px, ${finalY}px)`;
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
      const distanceX = Math.max(0, Math.abs(mouseX - centerX) - target.offsetWidth / 2);
      const distanceY = Math.max(0, Math.abs(mouseY - centerY) - target.offsetHeight / 2);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      return { deltaX, deltaY, distance };
    }
    /**
     * Returns the total magnetized area dimensions
     * @returns Object containing width and height of the magnetized area
     */
    getMagnetizedArea() {
      if (!this.target) {
        return { width: 0, height: 0 };
      }
      return {
        width: this.target.offsetWidth + this.settings.distance * 2,
        height: this.target.offsetHeight + this.settings.distance * 2
      };
    }
    /**
     * Destroys the magnetic button instance and cleans up all event listeners
     */
    destroy() {
      if (this.boundMagnetize) {
        window.removeEventListener("mousemove", this.boundMagnetize);
        this.boundMagnetize = null;
      }
      if (this.target) {
        this.target.classList.remove("is-magnetized", this.settings.activeClass);
        this.target.style.transform = "";
        _MagneticButton.initializedElements.delete(this.target);
        this.target = null;
      }
      this.isEnter = false;
      this.lerpPos = { x: 0, y: 0 };
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