# 🧲 Magnetic Button

A lightweight TypeScript library that creates smooth magnetic attraction effects for HTML elements. Elements with
the `data-magnetic` attribute will gently follow the mouse cursor when it's nearby, creating an engaging hover
interaction.

[![npm version](https://badgen.net/npm/v/@phucbm/magnetic-button?icon=npm)](https://www.npmjs.com/package/@phucbm/magnetic-button)
[![npm downloads](https://badgen.net/npm/dm/@phucbm/magnetic-button?icon=npm)](https://www.npmjs.com/package/@phucbm/magnetic-button)
[![npm downloads](https://badgen.net/npm/dependents/@phucbm/magnetic-button?icon=npm)](https://www.npmjs.com/package/@phucbm/magnetic-button)
[![jsdelivr hits](https://badgen.net/jsdelivr/hits/gh/phucbm/magnetic-button?icon=jsdelivr)](https://www.jsdelivr.com/package/gh/phucbm/magnetic-button)
[![GitHub release](https://badgen.net/jsdelivr/rank/npm/@phucbm/magnetic-button?icon=jsdelivr)](https://github.com/phucbm/magnetic-button/releases)
[![pages-build-deployment](https://github.com/phucbm/magnetic-button/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/phucbm/magnetic-button/actions/workflows/pages/pages-build-deployment)
[![license](https://badgen.net/github/license/phucbm/magnetic-button?icon=github)](https://github.com/phucbm/magnetic-button/blob/main/LICENSE)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)

## ✨ Features

- **Zero dependencies** - Lightweight and fast
- **TypeScript support** - Full type definitions included
- **Auto-initialization** - Works with data attributes out of the box
- **Customizable** - Fine-tune distance, attraction, and animation speed
- **Smooth animations** - Uses linear interpolation for buttery smooth movement
- **Touch device detection** - Automatically disabled on touch devices by default
- **Event callbacks** - Hook into enter, exit, and update events
- **API methods** - Programmatically control instances with `destroy()` and `getMagnetizedArea()`
- **Modern browsers** - Works in all modern browsers that support ES2022

## 🚀 Demo

Check out the [live demo](https://phucbm.github.io/magnetic-button/) to see the magnetic effect in action!

## 📦 Installation

### npm

```bash
npm install @phucbm/magnetic-button
```

### pnpm

```bash
pnpm add @phucbm/magnetic-button
```

### yarn

```bash
yarn add @phucbm/magnetic-button
```

### CDN

```html

<script type="module">
    import {MagneticButton} from 'https://unpkg.com/@phucbm/magnetic-button/dist/index.js'

    new MagneticButton()
</script>
```

```html

<script src="https://unpkg.com/@phucbm/magnetic-button/dist/magnetic-button.js"></script>
<script>
    // MagneticButton is available on the window object
    const magnetic = new window.MagneticButton()
</script>

```

## 🎯 Quick Start

### HTML + Data Attributes (Easiest)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .magnetic-btn {
            padding:1rem 2rem;
            border:2px solid #333;
            background:#1a1a1a;
            color:white;
            border-radius:8px;
            cursor:pointer;
            transition:border-color 0.3s ease;
        }

        .magnetic-btn.magnetizing {
            border-color:#ff6b6b;
            box-shadow:0 0 20px rgba(255, 107, 107, 0.3);
        }
    </style>
</head>
<body>
<!-- Basic usage -->
<button class="magnetic-btn" data-magnetic>
    Hover me!
</button>

<!-- With custom parameters -->
<button
        class="magnetic-btn"
        data-magnetic
        data-distance="150"
        data-attraction="0.3"
        data-fraction="0.2">
    Custom magnetic button
</button>

<script type="module">
    import {MagneticButton} from '@phucbm/magnetic-button'

    new MagneticButton() // Auto-initializes all elements with data-magnetic
</script>
</body>
</html>
```

### JavaScript/TypeScript

```typescript
import {MagneticButton} from '@phucbm/magnetic-button'

// Auto-initialize all elements with data-magnetic attribute
new MagneticButton()

// Or target a specific element
const button = document.querySelector('.my-button')
const instance = new MagneticButton(button, {
    distance: 200,
    attraction: 0.5,
    fraction: 0.1,
    disableOnTouch: true,
    onEnter: (data) => console.log('Magnetized!', data),
    onExit: (data) => console.log('Released!', data)
})

// Get magnetized area dimensions
const area = instance.getMagnetizedArea()
console.log(area) // { width: 300, height: 200 }

// Destroy instance and clean up
instance.destroy()
```

## ⚙️ Configuration Options

### Data Attributes

Add these attributes to your HTML elements to customize the magnetic effect:

| Attribute         | Type     | Default | Description                                                 |
|-------------------|----------|---------|-------------------------------------------------------------|
| `data-magnetic`   | -        | -       | **Required**. Enables magnetic effect on the element        |
| `data-distance`   | `number` | `50`    | Range from element edges where effect is active (pixels)    |
| `data-attraction` | `number` | `0.3`   | Strength of magnetic pull (0 = weak, 1 = strong)            |
| `data-fraction`   | `number` | `0.1`   | Speed of magnetic movement (0 = slow, 1 = instant)          |

### JavaScript Options

When initializing with JavaScript, you can pass these options:

| Option           | Type       | Default         | Description                                                    |
|------------------|------------|-----------------|----------------------------------------------------------------|
| `activeClass`    | `string`   | `'magnetizing'` | CSS class added when magnetic effect is active                 |
| `attraction`     | `number`   | `0.3`           | Strength of magnetic pull (0 = weak, 1 = strong)               |
| `distance`       | `number`   | `50`            | Range from element edges where effect is active (pixels)       |
| `fraction`       | `number`   | `0.1`           | Speed of magnetic movement (0 = slow, 1 = instant)             |
| `disableOnTouch` | `boolean`  | `true`          | Disable magnetic effect on touch devices                       |
| `onEnter`        | `function` | `() => {}`      | Callback fired when mouse enters magnetic area                 |
| `onExit`         | `function` | `() => {}`      | Callback fired when mouse exits magnetic area                  |
| `onUpdate`       | `function` | `() => {}`      | Callback fired continuously while in magnetic area             |

## 🎭 CSS Classes

The library automatically adds CSS classes that you can style:

| Class            | When Applied | Description                                                                       |
|------------------|--------------|-----------------------------------------------------------------------------------|
| `.is-magnetized` | Always       | Added to all magnetic elements for identification                                 |
| `.magnetizing`   | On hover     | Added when mouse is within magnetic range (customizable via `activeClass` option) |

## 📋 API Reference

### Constructor

```typescript
new MagneticButton(target ? : HTMLElement | null, options ? : MagneticButtonOptions)
```

**Parameters:**

- `target` - The HTML element to apply magnetic effect to. If `null` or omitted, auto-initializes all elements
  with `data-magnetic` attribute
- `options` - Configuration options (see table above)

### Methods

#### `getMagnetizedArea()`

Returns the total magnetized area dimensions including the distance parameter.

```typescript
const area = instance.getMagnetizedArea()
console.log(area) // { width: 300, height: 250 }
```

**Returns:** `{ width: number, height: number }`

- For an element with dimensions 100×50px and distance=100px
- Total magnetized area will be: (100 + 100×2) × (50 + 100×2) = 300×250px

#### `destroy()`

Destroys the magnetic button instance and cleans up all event listeners.

```typescript
instance.destroy()
```

This method:
- Removes event listeners
- Cleans up CSS classes
- Resets element transform
- Removes instance from tracking

### Event Data

Callback functions receive a `MagneticData` object with the following properties:

| Property   | Type     | Description                                      |
|------------|----------|--------------------------------------------------|
| `deltaX`   | `number` | Horizontal offset from element center            |
| `deltaY`   | `number` | Vertical offset from element center              |
| `distance` | `number` | Distance from mouse to nearest element edge      |

## 🎨 Examples

### Strong Attraction

```html

<button data-magnetic data-distance="120" data-attraction="0.2">
    Strong Pull
</button>
```

### Subtle Effect

```html

<button data-magnetic data-distance="80" data-attraction="0.8" data-fraction="0.05">
    Subtle Movement
</button>
```

### Large Detection Area

```html

<button data-magnetic data-distance="200" data-attraction="0.4">
    Wide Range
</button>
```

### With Event Callbacks

```typescript
const instance = new MagneticButton(document.querySelector('.special-btn'), {
    distance: 150,
    attraction: 0.3,
    onEnter: (data) => {
        console.log('Entered magnetic field!')
        // Play sound, trigger animation, etc.
    },
    onExit: (data) => {
        console.log('Left magnetic field!')
        // Reset state, stop animation, etc.
    },
    onUpdate: (data) => {
        // Update UI based on mouse position
        if (data.distance < 50) {
            console.log('Very close to button!')
        }
    }
})
```

### Enable on Touch Devices

By default, the magnetic effect is disabled on touch devices. To enable it:

```typescript
new MagneticButton(element, {
    disableOnTouch: false // Enable on touch devices
})
```

## 🎯 Tips and Best Practices

### Performance

- The library is optimized and uses linear interpolation for smooth animations
- Avoid initializing too many magnetic elements simultaneously (recommended max: ~20-30)
- The effect is automatically disabled on touch devices by default for better performance

### Distance Calculation

The `distance` parameter defines the range from the **element's edges** (not center):

- Element size: 100px × 50px
- Distance: 100px
- **Total magnetized area**: 300px × 250px (element + distance on all sides)

### CSS Styling

```css
/* Smooth transitions for non-magnetic properties */
.magnetic-btn {
    transition:border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Active state styling */
.magnetic-btn.magnetizing {
    border-color:#ff6b6b;
    box-shadow:0 0 20px rgba(255, 107, 107, 0.3);
}

/* Important: Avoid adding transition to transform */
.magnetic-btn {
    /* DON'T: transition: transform 0.3s; */
    /* This will conflict with the magnetic effect */
}
```

### Best Practice: Wrap Elements

For best results, wrap your buttons in a container and apply the magnetic effect to the wrapper:

```html
<div class="magnetic-wrapper" data-magnetic>
    <button class="my-button">
        Hover Me
    </button>
</div>
```

This prevents CSS transitions on the button from interfering with the magnetic transform.

### Accessibility

The magnetic effect doesn't interfere with keyboard navigation or screen readers, making it accessible by default. It's also automatically disabled on touch devices where the hover effect wouldn't work properly.

### Framework Integration

**React:**

```jsx
import {useEffect, useRef} from 'react'
import {MagneticButton} from '@phucbm/magnetic-button'

function MyButton(){
    const buttonRef = useRef(null)
    const instanceRef = useRef(null)

    useEffect(() => {
        instanceRef.current = new MagneticButton(buttonRef.current, {
            distance: 150,
            attraction: 0.3
        })

        // Cleanup on unmount
        return () => {
            instanceRef.current?.destroy()
        }
    }, [])

    return <button ref={buttonRef}>Magnetic Button</button>
}
```

**Vue:**

```vue

<template>
  <button ref="buttonRef">Magnetic Button</button>
</template>

<script setup>
  import {ref, onMounted, onUnmounted} from 'vue'
  import {MagneticButton} from '@phucbm/magnetic-button'

  const buttonRef = ref(null)
  let instance = null

  onMounted(() => {
    instance = new MagneticButton(buttonRef.value, {
      distance: 150,
      attraction: 0.3
    })
  })

  onUnmounted(() => {
    instance?.destroy()
  })
</script>
```

## 🌐 Browser Support

- Chrome 63+
- Firefox 61+
- Safari 13.1+
- Edge 79+

## 📄 License

MIT © [phucbm](https://github.com/phucbm)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [GitHub Repository](https://github.com/phucbm/magnetic-button)
- [Live Demo](https://phucbm.github.io/magnetic-button/)
- [npm Package](https://www.npmjs.com/package/@phucbm/magnetic-button)
