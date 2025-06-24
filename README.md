# 🧲 Magnetic Button

A lightweight TypeScript library that creates smooth magnetic attraction effects for HTML elements. Elements with
the `data-magnetic` attribute will gently follow the mouse cursor when it's nearby, creating an engaging hover
interaction.

[![npm version](https://badge.fury.io/js/%40phucbm%2Fmagnetic-button.svg)](https://www.npmjs.com/package/@phucbm/magnetic-button)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **Zero dependencies** - Lightweight and fast
- **TypeScript support** - Full type definitions included
- **Auto-initialization** - Works with data attributes out of the box
- **Customizable** - Fine-tune distance, attraction, and animation speed
- **Smooth animations** - Uses linear interpolation for buttery smooth movement
- **Event callbacks** - Hook into enter, exit, and update events
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
new MagneticButton(button, {
    distance: 200,
    attraction: 0.5,
    fraction: 0.1,
    onEnter: (data) => console.log('Magnetized!', data),
    onExit: (data) => console.log('Released!', data)
})
```

## ⚙️ Configuration Options

### Data Attributes

Add these attributes to your HTML elements to customize the magnetic effect:

| Attribute         | Type     | Default | Description                                               |
|-------------------|----------|---------|-----------------------------------------------------------|
| `data-magnetic`   | -        | -       | **Required**. Enables magnetic effect on the element      |
| `data-distance`   | `number` | `200`   | Range within which the magnetic effect is active (pixels) |
| `data-attraction` | `number` | `0.3`   | Strength of magnetic pull (0 = strong, 1 = weak)          |
| `data-fraction`   | `number` | `0.1`   | Speed of magnetic movement (0 = instant, 1 = slow)        |

### JavaScript Options

When initializing with JavaScript, you can pass these options:

| Option        | Type       | Default         | Description                                           |
|---------------|------------|-----------------|-------------------------------------------------------|
| `activeClass` | `string`   | `'magnetizing'` | CSS class added when magnetic effect is active        |
| `attraction`  | `number`   | `0.3`           | Strength of magnetic pull (0 = strong, 1 = weak)      |
| `distance`    | `number`   | `200`           | Range within which magnetic effect is active (pixels) |
| `fraction`    | `number`   | `0.1`           | Speed of magnetic movement (0 = instant, 1 = slow)    |
| `onEnter`     | `function` | `() => {}`      | Callback fired when mouse enters magnetic area        |
| `onExit`      | `function` | `() => {}`      | Callback fired when mouse exits magnetic area         |
| `onUpdate`    | `function` | `() => {}`      | Callback fired continuously while in magnetic area    |

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

### Event Data

Callback functions receive a `MagneticData` object with the following properties:

| Property   | Type     | Description                               |
|------------|----------|-------------------------------------------|
| `deltaX`   | `number` | Horizontal offset from element center     |
| `deltaY`   | `number` | Vertical offset from element center       |
| `distance` | `number` | Distance between mouse and element center |

## 🎨 Examples

### Strong Attraction

```html

<button data-magnetic data-distance="120" data-attraction="0.1">
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

<button data-magnetic data-distance="300" data-attraction="0.4">
    Wide Range
</button>
```

### With Event Callbacks

```typescript
new MagneticButton(document.querySelector('.special-btn'), {
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

## 🎯 Tips and Best Practices

### Performance

- The library is optimized and uses `requestAnimationFrame` internally
- Avoid initializing too many magnetic elements simultaneously (recommended max: ~20-30)

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

/* Ensure transform doesn't interfere with other transforms */
.magnetic-btn {
    transform-origin:center;
}
```

### Accessibility

The magnetic effect doesn't interfere with keyboard navigation or screen readers, making it accessible by default.

### Framework Integration

**React:**

```jsx
import {useEffect, useRef} from 'react'
import {MagneticButton} from '@phucbm/magnetic-button'

function MyButton(){
    const buttonRef = useRef(null)

    useEffect(() => {
        const magnetic = new MagneticButton(buttonRef.current, {
            distance: 150,
            attraction: 0.3
        })
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
  import {ref, onMounted} from 'vue'
  import {MagneticButton} from '@phucbm/magnetic-button'

  const buttonRef = ref(null)

  onMounted(() => {
    new MagneticButton(buttonRef.value, {
      distance: 150,
      attraction: 0.3
    })
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
