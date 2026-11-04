# Reliv — Editable Dotted Scroll Journey

A standalone HTML/CSS/JavaScript website component with **separate image files** and no bundled frameworks.

## What is inside?

```
Reliv_Dotted_Journey_Editable_Source/
  index.html             ← Open this page
  css/style.css          ← Colors, fonts, layout, runway height, dotted line styling
  js/content.js          ← Which picture is used and all visible text; flow order
  js/app.js              ← Scroll animation, path generation, object movement
  assets/images/         ← 12 optimized and individually replaceable WebP images
  assets/original-png/   ← Reference PNG originals for editing in Photoshop/Canva/etc.
  assets/IMAGE_INDEX.md  ← Picture-to-page reference
  README.md
```

## How to run

1. Extract this ZIP, keeping all files and folders together.
2. Open `index.html` directly in a browser. The page has **no external dependencies**, so it can work offline.
3. For a local web server (recommended during development), open a terminal in this folder and run:

```powershell
py -m http.server 8000
```

Then browse `http://localhost:8000/`.

## How to change the pictures

- Easiest: replace `assets/images/campus.webp` or another WebP with your replacement **using exactly the same filename**. Refresh the browser.
- Or edit `js/content.js`, changing e.g. `campus: 'assets/images/campus.webp'` to `campus: 'assets/images/my-new-campus.png'`.
- WebP, PNG, JPG and SVG are valid for artwork. **Only relative local image file paths** are needed.
- For better quality, start from `assets/original-png/` when a matching source is available, edit in an image editor, and export a WebP/PNG to `assets/images/`.

## How to edit text, section order, route

Open `js/content.js`:

- `FLOW.health.stops` contains every scene in the **Health Checkup** journey.
- `FLOW.kits.stops` contains every scene in the **Health Kits** journey.
- Each stop supports `title`, `sub`, `label`, `step`, `art`, `handoff` and optionally `object:true`.
- Each stop shows its short explanation above the complete illustration, which spans the full browser width without cropping.
- The campus illustration includes clickable **Health Checkup** and **Health Kits** journey choices.
- `art:'campus'` picks an entry from `IMAGES`.
- In `transfers`, `img:'data'` selects the traveling artwork, `name` its short label and `size` its desktop width in pixels.
- Keep **one transfer per gap between stops** (5 stops = 4 transfers). Rearrange stops and transfers together.
- Both routes are independent and can have different scenes/pictures.

## Edit appearance and scroll speed

In `css/style.css`:

- `:root` CSS variables: orange and background colors.
- `.stop { min-height: ... }`: vertical scene size.
- `.runway { height: ... }`: **gap between images**; increase it to make the object travel longer and more visibly.
- `.stop-inner`, `.visual`, `.copy`: full-width image and explanation layout.
- `.flow-path` and `.flow-path.highlight`: dotted path appearance and active path.
- `.traveler`: floating object appearance.
- `@media(max-width:690px)`: mobile layout.

In `js/app.js`:

- `scrollUpdate()`: object scale, opacity, rotation, relative to scroll progress.
- `recalculate()`: dotted Bézier path coordinates.
- `const focus = ... window.innerHeight*.50`: where your scroll viewport tracks the traveler.

**Important:** The object advances according to actual page scroll; no AI-generated video is necessary. The animation reverses when you scroll up.

## Add to your existing reliv- site

Copy the **entire folder** inside the existing `faizan3234/reliv-` repository, for example as `reliv-journey/`, then link your homepage to `reliv-journey/index.html`. This avoids changing the operational kiosk or other systems. If you later embed it in your homepage, scope the CSS and scripts carefully so they do not conflict with existing global styles.

## Notes

- The journeys are an **illustrative website animation**, not a live payment, health or dispensing flow.
- No real purchase, patient data transfer, 4-digit code validation or medical diagnosis is performed.
- Replace or label sample codes/measurements/overall wellness claims before final public deployment.
- No personal name or pricing needs to be hard-coded into this animation.
- Images were supplied earlier in this conversation and/or derived from them, rather than newly generated here.
