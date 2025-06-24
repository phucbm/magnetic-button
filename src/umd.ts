/**
 * UMD entry point with auto-initialization and global API
 * This file creates the browser-friendly version that auto-initializes on load
 */

import {MagneticButton as MagneticButtonClass, type MagneticButtonOptions} from './index'

// Auto-initialize all magnetic buttons when script loads
new MagneticButtonClass()

// Create global API with MagneticButton as constructor
const MagneticButtonAPI = MagneticButtonClass as any

// Add init method for convenience
MagneticButtonAPI.init = (target?: HTMLElement | null, options?: MagneticButtonOptions) => {
    return new MagneticButtonClass(target, options)
}

// Export as default for IIFE global
export default MagneticButtonAPI

// Also attach to window for direct access
if (typeof window !== 'undefined') {
    ;(window as any).MagneticButton = MagneticButtonAPI
}