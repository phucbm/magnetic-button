// Initialize all magnetic buttons
import MagneticButton from "../src";

new MagneticButton()

// Interactive controls for the controlled button
const distanceSlider = document.getElementById('distance') as HTMLInputElement
const attractionSlider = document.getElementById('attraction') as HTMLInputElement
const fractionSlider = document.getElementById('fraction') as HTMLInputElement
const controlledBtn = document.getElementById('controlled-btn') as HTMLElement

const distanceValue = document.getElementById('distance-value')!
const attractionValue = document.getElementById('attraction-value')!
const fractionValue = document.getElementById('fraction-value')!

// Update display values and button attributes
function updateControlledButton() {
    const distance = distanceSlider.value
    const attraction = attractionSlider.value
    const fraction = fractionSlider.value

    // Update display values
    distanceValue.textContent = distance
    attractionValue.textContent = attraction
    fractionValue.textContent = fraction

    // Update button attributes
    controlledBtn.setAttribute('data-distance', distance)
    controlledBtn.setAttribute('data-attraction', attraction)
    controlledBtn.setAttribute('data-fraction', fraction)

    // Reinitialize the magnetic effect for this button
    new MagneticButton(controlledBtn)
}

// Add event listeners
distanceSlider.addEventListener('input', updateControlledButton)
attractionSlider.addEventListener('input', updateControlledButton)
fractionSlider.addEventListener('input', updateControlledButton)

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