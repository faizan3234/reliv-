# Reliv — The Connected Journey (Interactive Scroll Experience)

A luxury, scroll-driven interactive journey component modeled after **Lando Norris editorial typography** and **Grab&Go motion physics** (`grabandgo.pt`).

---

## 1. What was redesigned & improved

1. **Pinned Stage Architecture (Grab&Go style):**
   * Replaced the previous 8,000px disjointed layout with an interactive **pinned viewport stage**.
   * The text and artwork stay locked in view as you scroll.
   * Eliminated the giant empty vertical gaps ("too below" / "travel time too long").
2. **Editorial Typography (Lando Norris style):**
   * Paired modern bold Inter headlines with **Instrument Serif italic accents** (using `*word*` syntax in `content.js`).
   * Light warm sunset orange palette (`#E25A0C`, `#FF7A1A`, `#FFFAF5`) matching the main Reliv website.
   * Official SVG wordmark (`assets/brand/reliv-wordmark.svg`).
3. **Smooth 60–120 FPS Motion Physics:**
   * Dynamic Bézier flight paths connecting precise scene coordinate pins.
   * Exponential smoothing (lerp) ensures silky movement with trackpads, mouse wheels, and mobile touch.
   * Smooth cross-fading of scenes as the traveler flies between stations.
4. **Interactive Chapter Stepper & Dual Routes:**
   * Quick-jump stepper buttons (`01 Arrive`, `02 Measure`, `03 Unlock`, `04 Understand`, `05 Continue`).
   * Instant switching between **Health Checkup** and **Health Kits** routes in the header.
   * Live motion status pill (`Health data moving to Measure`, etc.).

---

## 2. File Structure

```text
Reliv_Dotted_Journey_Editable_Source/
  ├── index.html            ← Main preview & embed container
  ├── css/
  │   └── style.css         ← Editorial styling, pinned grid, flight paths
  ├── js/
  │   ├── content.js        ← ALL TEXT, PICTURES, PINS & TIMING TUNING
  │   └── app.js            ← Physics engine, Bézier trajectory, lerp loop
  ├── assets/
  │   ├── brand/            ← Official Reliv SVG logos
  │   ├── images/           ← 12 web-optimized WebP scenes and traveling assets
  │   └── original-png/     ← High-res PNG sources for graphic design
  └── _original/            ← Exact backup of the original version before redesign
```

---

## 3. How to Tune Timing & Feel in `js/content.js`

Open `js/content.js` to change any setting:

```javascript
const SETTINGS = {
  sceneScroll: 0.9,  // Scroll distance per scene (x viewport height). Lower = faster journey.
  dwell:       0.34, // Fraction of each scene that stays still so it can be read (0 to 1).
  smoothing:   0.12, // Lerp time constant in seconds. 0.08–0.18 feels like Grab&Go.
  tail:        0.35  // Extra still scroll on the final scene before scrolling to footer.
};
```

* **To make the travel faster/shorter:** Decrease `sceneScroll` (e.g. from `0.9` to `0.75`).
* **To make the motion snappier:** Decrease `smoothing` (e.g. to `0.08`).
* **To make the motion floatier/softer:** Increase `smoothing` (e.g. to `0.15`).

---

## 4. How to Swap Images & Edit Headlines

In `js/content.js`:
* **To swap a picture:** Change the path in `IMAGES` or replace the `.webp` in `assets/images/`.
* **To style an accent word:** Wrap the word in asterisks `*like this*`. It automatically renders in warm orange Instrument Serif italic.
* **To adjust launch/landing coordinates:** Tweak `pin: [x%, y%]` in each stop definition.

---

## 5. Preview Locally

Run from website root:
```powershell
py -m http.server 8000
```
Open:
```text
http://localhost:8000/Reliv_Dotted_Scroll_Journey_Editable_Code_Images/Reliv_Dotted_Journey_Editable_Source/index.html
```
*(No push or commit made — completely self-contained in this directory)*.
