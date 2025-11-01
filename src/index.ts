import lerp from "@phucbm/lerp";

/**
 * Configuration options for the magnetic button effect
 */
export interface MagneticButtonOptions {
    /** CSS class added when the magnetic effect is active */
    activeClass?: string;
    /** Controls the strength of the magnetic pull (0 = weak, 1 = strong) */
    attraction?: number;
    /** Defines the range within which the magnetic effect is active (in pixels) */
    distance?: number;
    /** Controls the speed of the magnetic movement (0 = slow, 1 = instant) */
    fraction?: number;
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
export interface MagneticData {
    /** Horizontal offset from element center */
    deltaX: number;
    /** Vertical offset from element center */
    deltaY: number;
    /** Distance between mouse and element center */
    distance: number;
}

/**
 * Position coordinates for interpolation
 */
interface LerpPosition {
    x: number;
    y: number;
}

/**
 * MagneticButton class creates magnetic attraction effects for HTML elements
 *
 * Usage:
 * ```html
 * <button data-magnetic data-distance="150" data-attraction="0.3" data-fraction="0.2">
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
export class MagneticButton {
    private readonly settings: Required<MagneticButtonOptions> = {
        activeClass: 'magnetizing',
        attraction: 0.3,
        distance: 50,
        fraction: 0.1,
        disableOnTouch: true,
        onEnter: () => {
        },
        onExit: () => {
        },
        onUpdate: () => {
        },
    };
    private isEnter: boolean = false;
    private lerpPos: LerpPosition = {x: 0, y: 0};
    private target: HTMLElement | null = null;
    private boundMagnetize: ((e: MouseEvent) => void) | null = null;

    // Track initialized elements to avoid duplicates
    private static initializedElements = new WeakSet<HTMLElement>();

    /**
     * Detects if the device is primarily a touch device
     * @returns true if the device uses touch as primary input
     */
    private static isTouchDevice(): boolean {
        // Check if primary input is touch (coarse pointer without hover capability)
        return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    }

    /**
     * Creates a new MagneticButton instance
     * @param target - The HTML element to apply magnetic effect to. If null, auto-initializes all elements with data-magnetic attribute
     * @param options - Configuration options for the magnetic effect
     */
    constructor(target?: HTMLElement | null, options: MagneticButtonOptions = {}) {
        // If no target is provided, select all elements with data-magnetic attribute
        if (!target) {
            document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(element => {
                // Skip if already initialized
                if (!MagneticButton.initializedElements.has(element)) {
                    new MagneticButton(element, options);
                }
            });
            return; // Exit constructor if initializing multiple instances
        }

        // Skip if this element is already initialized
        if (MagneticButton.initializedElements.has(target)) {
            return;
        }

        // Mark as initialized
        MagneticButton.initializedElements.add(target);

        // Extract and validate data attributes
        const dataDistance = parseFloat(target.getAttribute('data-distance') || '');
        const dataAttraction = parseFloat(target.getAttribute('data-attraction') || '');
        const dataFraction = parseFloat(target.getAttribute('data-fraction') || '');

        // Merge default settings with options and data attributes
        this.settings = {
            ...this.settings,
            attraction: !isNaN(dataAttraction) ? dataAttraction : options.attraction ?? this.settings.attraction,
            distance: !isNaN(dataDistance) ? dataDistance : options.distance ?? this.settings.distance,
            fraction: !isNaN(dataFraction) ? dataFraction : options.fraction ?? this.settings.fraction,
            ...options,
        };

        // Skip initialization on touch devices if disableOnTouch is true
        if (this.settings.disableOnTouch && MagneticButton.isTouchDevice()) {
            // Remove from initialized elements so it can be retried if needed
            MagneticButton.initializedElements.delete(target);
            return;
        }

        this.target = target;
        this.boundMagnetize = (e: MouseEvent) => this.magnetize(target, e);

        // Watch for mouse move events
        window.addEventListener('mousemove', this.boundMagnetize);

        // Add identification class
        target.classList.add('is-magnetized');
    }

    /**
     * Main magnetization logic - processes mouse movement and applies magnetic effect
     * @param target - The target element
     * @param e - Mouse event
     */
    private magnetize(target: HTMLElement, e: MouseEvent): void {
        const data = this.calculateCoordinates(target, e.clientX, e.clientY);

        if (data.distance < this.settings.distance) {
            // Mouse is inside magnetized area
            this.animateButton(target, data.deltaX, data.deltaY);

            if (!this.isEnter) {
                this.isEnter = true;
                target.classList.add(this.settings.activeClass);
                this.settings.onEnter(data);
            }

            this.settings.onUpdate(data);
        } else {
            // Mouse is outside - return to origin
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
    private animateButton(target: HTMLElement, endX: number, endY: number): void {
        // Get interpolated position values
        this.lerpPos.x = lerp(this.lerpPos.x, endX, this.settings.fraction);
        this.lerpPos.y = lerp(this.lerpPos.y, endY, this.settings.fraction);

        // Apply transform
        target.style.transform = `translate(${this.lerpPos.x}px, ${this.lerpPos.y}px)`;
    }

    /**
     * Calculates distances and coordinates between mouse and element center
     * @param target - The target element
     * @param mouseX - Mouse X coordinate
     * @param mouseY - Mouse Y coordinate
     * @returns Object containing delta values and distance
     */
    private calculateCoordinates(target: HTMLElement, mouseX: number, mouseY: number): MagneticData {
        const viewportOffset = target.getBoundingClientRect();

        // Center point of target relative to viewport
        const centerX = viewportOffset.left + target.offsetWidth / 2;
        const centerY = viewportOffset.top + target.offsetHeight / 2;

        // Calculate delta with attraction factor
        const deltaX = (mouseX - centerX) * this.settings.attraction;
        const deltaY = (mouseY - centerY) * this.settings.attraction;

        // Calculate distance from bounding rect edges
        const distanceX = Math.max(0, Math.abs(mouseX - centerX) - target.offsetWidth / 2);
        const distanceY = Math.max(0, Math.abs(mouseY - centerY) - target.offsetHeight / 2);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        return {deltaX, deltaY, distance};
    }

    /**
     * Returns the total magnetized area dimensions
     * @returns Object containing width and height of the magnetized area
     */
    public getMagnetizedArea(): { width: number; height: number } {
        if (!this.target) {
            return {width: 0, height: 0};
        }

        return {
            width: this.target.offsetWidth + this.settings.distance * 2,
            height: this.target.offsetHeight + this.settings.distance * 2
        };
    }

    /**
     * Destroys the magnetic button instance and cleans up all event listeners
     */
    public destroy(): void {
        if (this.boundMagnetize) {
            window.removeEventListener('mousemove', this.boundMagnetize);
            this.boundMagnetize = null;
        }

        if (this.target) {
            this.target.classList.remove('is-magnetized', this.settings.activeClass);
            this.target.style.transform = '';
            MagneticButton.initializedElements.delete(this.target);
            this.target = null;
        }

        this.isEnter = false;
        this.lerpPos = {x: 0, y: 0};
    }
}

/**
 * Auto-initialize magnetic buttons when DOM is ready (only in browser environment)
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new MagneticButton());
    } else {
        new MagneticButton();
    }
}

export default MagneticButton;