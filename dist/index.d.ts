/**
 * Configuration options for the magnetic button effect
 */
interface MagneticButtonOptions {
    /** CSS class added when the magnetic effect is active */
    activeClass?: string;
    /** Controls the strength of the magnetic pull (0 = weak, 1 = strong) */
    attraction?: number;
    /** Defines the range within which the magnetic effect is active (in pixels) */
    distance?: number;
    /** Controls the speed of the magnetic movement (0 = slow, 1 = instant) */
    speed?: number;
    /** Disable magnetic effect on touch devices (default: true) */
    disableOnTouch?: boolean;
    /** Callback fired when mouse enters the magnetic area */
    onEnter?: (data: MagneticData) => void;
    /** Callback fired when mouse exits the magnetic area */
    onExit?: (data: MagneticData) => void;
    /** Callback fired continuously while mouse is in the magnetic area */
    onUpdate?: (data: MagneticData) => void;
}
/**
 * Data object containing magnetic effect calculations
 */
interface MagneticData {
    /** Horizontal offset from element center */
    deltaX: number;
    /** Vertical offset from element center */
    deltaY: number;
    /** Distance between mouse and element center */
    distance: number;
}
/**
 * MagneticButton class creates magnetic attraction effects for HTML elements
 *
 * Usage:
 * ```html
 * <button data-magnetic data-distance="150" data-attraction="0.3" data-speed="0.2">
 *   Hover me!
 * </button>
 * ```
 *
 * ```typescript
 * import { MagneticButton } from 'magnetic-button';
 *
 * // Auto-initialize all elements with data-magnetic attribute
 * new MagneticButton();
 *
 * // Or target specific element
 * const button = document.querySelector('.my-button');
 * new MagneticButton(button, { distance: 200, attraction: 0.5 });
 * ```
 */
declare class MagneticButton {
    private readonly settings;
    private isEnter;
    private lerpPos;
    private target;
    private boundMagnetize;
    private static initializedElements;
    /**
     * Detects if the device is primarily a touch device
     * @returns true if the device uses touch as primary input
     */
    private static isTouchDevice;
    /**
     * Creates a new MagneticButton instance
     * @param target - The HTML element to apply magnetic effect to. If null, auto-initializes all elements with data-magnetic attribute
     * @param options - Configuration options for the magnetic effect
     */
    constructor(target?: HTMLElement | null, options?: MagneticButtonOptions);
    /**
     * Main magnetization logic - processes mouse movement and applies magnetic effect
     * @param target - The target element
     * @param e - Mouse event
     */
    private magnetize;
    /**
     * Applies smooth animation to the button using transform
     * @param target - The target element
     * @param endX - Target X position
     * @param endY - Target Y position
     */
    private animateButton;
    /**
     * Calculates distances and coordinates between mouse and element center
     * @param target - The target element
     * @param mouseX - Mouse X coordinate
     * @param mouseY - Mouse Y coordinate
     * @returns Object containing delta values and distance
     */
    private calculateCoordinates;
    /**
     * Returns the total magnetized area dimensions
     * @returns Object containing width and height of the magnetized area
     */
    getMagnetizedArea(): {
        width: number;
        height: number;
    };
    /**
     * Destroys the magnetic button instance and cleans up all event listeners
     */
    destroy(): void;
}

export { MagneticButton, type MagneticButtonOptions, type MagneticData, MagneticButton as default };
