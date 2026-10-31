# TeddyPups UAE — Custom Paw Cursor Architecture & Recreation Guide

## 1. Executive Summary

A core signature element of the live TeddyPups UAE reference website ([puppy.instabizweb.com](https://puppy.instabizweb.com/)) is its playful dog-paw custom cursor. Deep inspection of the live DOM, computed styles, and asset servers confirms that the cursor is implemented using native **CSS cursor properties with custom SVG assets and explicit hotspot offsets**, rather than JavaScript mouse-trailing canvas elements.

This approach delivers:
- **Zero input latency / 60+ FPS hardware acceleration** directly handled by the OS/GPU compositor.
- **Zero layout thrashing** or CPU/battery consumption from continuous `mousemove` listeners.
- **Flawless text selection** (`cursor: text`) in form fields without visual interference.
- **Natural tactile feedback**: The paw visibly "presses down" (`scale(0.9)` + translate offset) when hovering over clickable targets.

---

## 2. Reference Website Architecture & Measurements

### A. Asset Specifications

The live reference utilizes two vector SVG assets hosted at `/cursor/`:

| Asset File | Route URL | ViewBox | Render Dimensions | Transform / Visual State |
| :--- | :--- | :--- | :--- | :--- |
| **`paw.svg`** | `https://puppy.instabizweb.com/cursor/paw.svg` | `0 0 64 64` | `32 × 32 px` | `rotate(-18 32 34)` |
| **`paw-press.svg`** | `https://puppy.instabizweb.com/cursor/paw-press.svg` | `0 0 64 64` | `32 × 32 px` | `rotate(-18 32 34) translate(3.2 3.4) scale(0.9)` |

#### Vector Data Breakdown:
- **Fill Colour:** `var(--color-toffee)` (`#C2622B`)
- **Stroke Colour:** `var(--color-cocoa)` (`#2A170E`) with `stroke-width: 3.2`, `stroke-linejoin: round`, `stroke-linecap: round`
- **Anatomy:** Main central heart-shaped metatarsal pad with 4 distinct digital paw pads arranged symmetrically above it.
- **Rotation Angle:** Exactly `-18deg` tilted counter-clockwise, providing a natural pointing angle towards the top-left index.

### B. Hotspot Coordinates

Both cursor states define an explicit hotspot coordinate:
```css
/* Standard State */
cursor: url("/cursor/paw.svg") 9 6, auto;

/* Interactive / Hover State */
cursor: url("/cursor/paw-press.svg") 9 6, pointer;
```
- **X-Coordinate (9px):** Aligns with the tip of the leading upper-left toe pad (the active click point).
- **Y-Coordinate (6px):** Ensures instant visual targeting when hovering over links, buttons, and close icons.

---

## 3. State Behavior Matrix

| Context / Element | Reference CSS Rule | Cursor Graphic | Hotspot | UX Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Default Canvas (`html, body`)** | `cursor: url('/cursor/paw.svg') 9 6, auto` | Default Paw | `9 6` | Tilted paw rests as standard pointer |
| **Clickable Links (`a, a *`)** | `cursor: url('/cursor/paw-press.svg') 9 6, pointer` | Press Paw | `9 6` | Paw scales to 90% and nudges down (press feel) |
| **Buttons (`button, [role="button"]`)** | `cursor: url('/cursor/paw-press.svg') 9 6, pointer` | Press Paw | `9 6` | Tactile pressed feedback |
| **Cards & Doors (`.tp-door, article`)** | `cursor: url('/cursor/paw-press.svg') 9 6, pointer` | Press Paw | `9 6` | Signals interactive 3D door opening |
| **Text Inputs (`input[type="text"], textarea`)**| `cursor: text` | System I-Beam | Native | Unobstructed text insertion & selection |
| **Disabled Controls (`button:disabled`)** | `cursor: not-allowed` | System Not-Allowed | Native | Clear accessibility state |

---

## 4. Local Implementation Deficiencies

In the current local implementation (`http://localhost:5173/`):
1. **Missing Custom Cursor:** The local application currently relies on standard browser default pointers (`default` and `pointer`).
2. **Missing SVG Assets:** The files `/cursor/paw.svg` and `/cursor/paw-press.svg` are not present in the local `public/` directory.
3. **Missing Global CSS Rules:** No cursor definitions exist in `src/styles/tokens.css` or `src/styles/global.css`.

---

## 5. Technical Implementation Blueprint

*(To be implemented during code execution phase following user approval)*

### Step 1: Asset Placement
Place exact vector assets in `public/cursor/`:
- `public/cursor/paw.svg`
- `public/cursor/paw-press.svg`

### Step 2: Global CSS Injection (`src/styles/global.css`)
```css
/* Custom TeddyPups Paw Cursor */
html,
body {
  cursor: url('/cursor/paw.svg') 9 6, auto;
}

/* Interactive Elements — Paw Press State */
a,
button,
[role="button"],
input[type="button"],
input[type="submit"],
input[type="reset"],
select,
summary,
.clickable,
[data-clickable="true"] {
  cursor: url('/cursor/paw-press.svg') 9 6, pointer;
}

/* Preserve Native Text Cursor for Readability & Accessibility */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="search"],
textarea {
  cursor: text;
}

/* Disabled Controls */
button:disabled,
input:disabled {
  cursor: not-allowed;
}
```

### Step 3: Verification Checklist
- [ ] Move mouse across whitespace: Paw cursor renders sharply at `32×32px`.
- [ ] Hover over header links & CTA buttons: Cursor transitions seamlessly to `paw-press.svg`.
- [ ] Hover over puppy card doors: Cursor changes to press state with exact `9 6` click precision.
- [ ] Click and drag across text: Text selection is unobstructed.
- [ ] Test on Chrome, Edge, and Firefox desktop viewports.
