// Initialize all magnetic buttons
import MagneticButton from "../src";

// Preset configurations
const presets = {
    default: {
        distance: 50,
        attraction: 0.3,
        speed: 0.1
    },
    strong: {
        distance: 120,
        attraction: 0.2,
        speed: 0.15
    },
    quick: {
        distance: 80,
        attraction: 0.8,
        speed: 0.05
    }
}

type PresetKey = keyof typeof presets

// Elements
const demoWrapper = document.getElementById('demo-wrapper') as HTMLElement
const demoBtn = document.getElementById('demo-btn') as HTMLElement
const distanceSlider = document.getElementById('distance') as HTMLInputElement
const attractionSlider = document.getElementById('attraction') as HTMLInputElement
const speedSlider = document.getElementById('speed') as HTMLInputElement
const distanceValue = document.getElementById('distance-value')!
const attractionValue = document.getElementById('attraction-value')!
const speedValue = document.getElementById('speed-value')!
const debugToggle = document.getElementById('debug-toggle')!
const destroyBtn = document.getElementById('destroy-btn') as HTMLElement
const reinitBtn = document.getElementById('reinit-btn') as HTMLElement
const styleButtons = document.querySelectorAll('.style-btn')

// State
let demoInstance: MagneticButton | null = null
let currentStyle: PresetKey = 'default'
let debugEnabled: boolean = true

// Update debug area visualization
function updateDebugArea(distance: number) {
    const btnWidth = demoBtn.offsetWidth
    const btnHeight = demoBtn.offsetHeight
    const areaWidth = btnWidth + distance * 2
    const areaHeight = btnHeight + distance * 2

    const style = document.createElement('style')
    style.id = 'debug-area-style'
    const existingStyle = document.getElementById('debug-area-style')
    if (existingStyle) existingStyle.remove()

    style.textContent = `
        .magnetic-wrapper.debug-area::after {
            width: ${areaWidth}px;
            height: ${areaHeight}px;
        }
    `
    document.head.appendChild(style)

    // Update area display position - 10px below the debug area
    const areaDisplay = document.getElementById('area-display')!
    const offsetFromTop = (areaHeight / 2) + 10
    areaDisplay.style.top = `${offsetFromTop}px`
    areaDisplay.textContent = `Area: ${areaWidth}px × ${areaHeight}px`
}

// Update display values
function updateDisplayValues(distance: number, attraction: number, speed: number) {
    distanceValue.textContent = distance + 'px'
    attractionValue.textContent = attraction.toString()
    speedValue.textContent = speed.toString()
}

// Update sliders
function updateSliders(distance: number, attraction: number, speed: number) {
    distanceSlider.value = distance.toString()
    attractionSlider.value = attraction.toString()
    speedSlider.value = speed.toString()
}

// Reinitialize the magnetic effect
function reinitMagnetic(distance: number, attraction: number, speed: number) {
    // Destroy old instance
    if (demoInstance) {
        demoInstance.destroy()
    }

    // Create new instance
    demoInstance = new MagneticButton(demoWrapper, {
        distance: distance,
        attraction: attraction,
        speed: speed
    })

    // Update debug area
    updateDebugArea(distance)
}

// Initialize demo
function initDemo() {
    const preset = presets[currentStyle]
    updateDisplayValues(preset.distance, preset.attraction, preset.speed)
    updateSliders(preset.distance, preset.attraction, preset.speed)
    reinitMagnetic(preset.distance, preset.attraction, preset.speed)
}

// Style preset buttons
styleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        styleButtons.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')

        // Get preset
        const styleAttr = btn.getAttribute('data-style')!
        currentStyle = styleAttr as PresetKey
        const preset = presets[currentStyle]

        // Update everything
        updateDisplayValues(preset.distance, preset.attraction, preset.speed)
        updateSliders(preset.distance, preset.attraction, preset.speed)
        reinitMagnetic(preset.distance, preset.attraction, preset.speed)
    })
})

// Sliders
distanceSlider.addEventListener('input', () => {
    const distance = parseFloat(distanceSlider.value)
    const attraction = parseFloat(attractionSlider.value)
    const speed = parseFloat(speedSlider.value)

    updateDisplayValues(distance, attraction, speed)
    reinitMagnetic(distance, attraction, speed)
})

attractionSlider.addEventListener('input', () => {
    const distance = parseFloat(distanceSlider.value)
    const attraction = parseFloat(attractionSlider.value)
    const speed = parseFloat(speedSlider.value)

    updateDisplayValues(distance, attraction, speed)
    reinitMagnetic(distance, attraction, speed)
})

speedSlider.addEventListener('input', () => {
    const distance = parseFloat(distanceSlider.value)
    const attraction = parseFloat(attractionSlider.value)
    const speed = parseFloat(speedSlider.value)

    updateDisplayValues(distance, attraction, speed)
    reinitMagnetic(distance, attraction, speed)
})

// Debug toggle
debugToggle.addEventListener('click', () => {
    debugEnabled = !debugEnabled
    debugToggle.classList.toggle('active', debugEnabled)
    demoWrapper.classList.toggle('show-debug', debugEnabled)
})

// Destroy button
destroyBtn.addEventListener('click', () => {
    if (demoInstance) {
        demoInstance.destroy()
        demoInstance = null
    }
})

// Reinitialize button
reinitBtn.addEventListener('click', () => {
    if (!demoInstance) {
        const distance = parseFloat(distanceSlider.value)
        const attraction = parseFloat(attractionSlider.value)
        const speed = parseFloat(speedSlider.value)
        reinitMagnetic(distance, attraction, speed)
    }
})

// Initialize on load
initDemo()

// Optional: Add some visual feedback
new MagneticButton(null, {
    onEnter: (data) => {
        console.log('🧲 Magnetic field entered:', data)
    },
    onExit: (data) => {
        console.log('🚀 Magnetic field exited:', data)
    }
})

// Development helpers
// @ts-ignore
if (import.meta.hot) {
    // @ts-ignore
    import.meta.hot.accept('@/index', () => {
        console.log('🔄 Magnetic Button library reloaded!')
        // Reinitialize all buttons on HMR
        new MagneticButton()
    })
}