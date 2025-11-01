// tests/MagneticButton.test.ts
import {MagneticButton, MagneticButtonOptions} from '../src/';

describe('MagneticButton', () => {
    let element: HTMLElement;
    let mouseMoveEvent: (e: MouseEvent) => void;

    beforeEach(() => {
        // Create test element
        element = document.createElement('button');
        element.textContent = 'Test Button';
        document.body.appendChild(element);

        // Mock getBoundingClientRect for consistent testing
        element.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            left: 100,
            bottom: 150,
            right: 200,
            width: 100,
            height: 50,
            x: 100,
            y: 100,
            toJSON: () => {
            }
        }));

        // Capture the mousemove event listener
        const originalAddEventListener = window.addEventListener;
        window.addEventListener = jest.fn((event, handler) => {
            if (event === 'mousemove') {
                mouseMoveEvent = handler as (e: MouseEvent) => void;
            }
            return originalAddEventListener.call(window, event, handler);
        });
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });

    // Test 1: Initialization
    describe('Initialization', () => {
        it('should initialize with correct settings and add is-magnetized class', () => {
            new MagneticButton(element);

            expect(element.classList.contains('is-magnetized')).toBe(true);
            expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
        });

        it('should merge custom options with defaults', () => {
            const options: MagneticButtonOptions = {
                distance: 300,
                attraction: 0.5,
                activeClass: 'custom-active'
            };

            new MagneticButton(element, options);

            // Test that custom options are used by triggering mouse event
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: 150, // Within element bounds
                clientY: 125
            });

            mouseMoveEvent(mouseEvent);

            // Should add custom active class when within distance
            expect(element.classList.contains('custom-active')).toBe(true);
        });
    });

    // Test 2: Data Attributes
    describe('Data Attributes', () => {
        it('should use data attributes to override default settings', () => {
            element.setAttribute('data-distance', '50');
            element.setAttribute('data-attraction', '0.8');
            element.setAttribute('data-speed', '0.5');

            new MagneticButton(element);

            // Test close mouse position (within 50px)
            const closeMouseEvent = new MouseEvent('mousemove', {
                clientX: 140, // 10px from center (150, 125)
                clientY: 120
            });

            mouseMoveEvent(closeMouseEvent);
            expect(element.classList.contains('magnetizing')).toBe(true);

            // Test far mouse position (beyond 50px)
            const farMouseEvent = new MouseEvent('mousemove', {
                clientX: 220, // 70px from center
                clientY: 125
            });

            mouseMoveEvent(farMouseEvent);
            expect(element.classList.contains('magnetizing')).toBe(false);
        });
    });

    // Test 3: Mouse Distance Logic
    describe('Mouse Distance Logic', () => {
        it('should activate when mouse is within distance, deactivate when outside', () => {
            new MagneticButton(element, {distance: 100});

            // Mouse within distance (element center is at 150, 125)
            const nearMouseEvent = new MouseEvent('mousemove', {
                clientX: 180, // 30px from center
                clientY: 125
            });

            mouseMoveEvent(nearMouseEvent);
            expect(element.classList.contains('magnetizing')).toBe(true);

            // Mouse outside distance
            const farMouseEvent = new MouseEvent('mousemove', {
                clientX: 300, // 150px from center
                clientY: 125
            });

            mouseMoveEvent(farMouseEvent);
            expect(element.classList.contains('magnetizing')).toBe(false);
        });
    });

    // Test 4: Transform Application
    describe('Transform Application', () => {
        it('should apply CSS transform based on mouse position and return to origin', () => {
            new MagneticButton(element, {attraction: 0.5, speed: 0.2});

            // Mouse near element should apply transform
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: 170, // 20px right of center
                clientY: 135  // 10px below center
            });

            mouseMoveEvent(mouseEvent);

            // Should apply transform
            expect(element.style.transform).toContain('translate');

            // Mouse far away should animate toward origin (but may not be exactly 0,0 due to lerp)
            const farMouseEvent = new MouseEvent('mousemove', {
                clientX: 400,
                clientY: 400
            });

            mouseMoveEvent(farMouseEvent);

            // Check that transform values are small (approaching 0)
            const transform = element.style.transform;
            const matches = transform.match(/translate\(([^,]+)px, ([^)]+)px\)/);
            if (matches) {
                const x = Math.abs(parseFloat(matches[1]));
                const y = Math.abs(parseFloat(matches[2]));
                expect(x).toBeLessThan(10); // Should be moving toward 0
                expect(y).toBeLessThan(10); // Should be moving toward 0
            }
        });
    });

    // Test 5: Callbacks
    describe('Callbacks', () => {
        it('should trigger onEnter/onExit callbacks correctly', () => {
            const onEnter = jest.fn();
            const onExit = jest.fn();
            const onUpdate = jest.fn();

            new MagneticButton(element, {
                distance: 100,
                onEnter,
                onExit,
                onUpdate
            });

            // Enter magnetic area
            const enterEvent = new MouseEvent('mousemove', {
                clientX: 160,
                clientY: 130
            });

            mouseMoveEvent(enterEvent);

            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter).toHaveBeenCalledWith(expect.objectContaining({
                deltaX: expect.any(Number),
                deltaY: expect.any(Number),
                distance: expect.any(Number)
            }));
            expect(onUpdate).toHaveBeenCalledTimes(1);

            // Move within area (should only call onUpdate)
            const moveEvent = new MouseEvent('mousemove', {
                clientX: 165,
                clientY: 135
            });

            mouseMoveEvent(moveEvent);

            expect(onEnter).toHaveBeenCalledTimes(1); // Still only 1
            expect(onUpdate).toHaveBeenCalledTimes(2); // Now 2

            // Exit magnetic area
            const exitEvent = new MouseEvent('mousemove', {
                clientX: 300,
                clientY: 300
            });

            mouseMoveEvent(exitEvent);

            expect(onExit).toHaveBeenCalledTimes(1);
            expect(onExit).toHaveBeenCalledWith(expect.objectContaining({
                deltaX: expect.any(Number),
                deltaY: expect.any(Number),
                distance: expect.any(Number)
            }));
        });
    });
});