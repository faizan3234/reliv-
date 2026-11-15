# Reliv redesign — review package

Repository: https://github.com/faizan3234/reliv-
Base: 69283099f424e8343965dd44ff4991a6cdac7908
Local commit: 754bfca
Proposed branch: design/reliv-cinematic-experience

## Apply with Git

From a clean checkout based on the base commit:

```sh
git switch -c design/reliv-cinematic-experience
git am /path/to/reliv-redesign.patch
git push -u origin design/reliv-cinematic-experience
```

Then open a PR targeting main. The patch includes the binary MP4. The changed-files folder is also included for inspection; copying it over a checkout is an alternative to applying the patch, not a second step.

## What changed

- Orange/cream editorial hero with a kiosk reveal and floating health labels.
- Expanded parameter band and interactive body-composition, vital-sign and wellness categories.
- FFMI, body water, water volume, metabolic age, heart rate and 102+ platform scope.
- Ten-second muted kiosk film, approximately 1 MB, with pause control, offscreen suspension and reduced-motion/save-data guards.
- Native scrolling, keyboard focus styles, mobile/tablet layouts; no blocking intro or custom cursor loop.
- Twelve language choices for introductory copy and key controls, persisted locally. Detailed content, technical descriptions and interior pages remain English. This is not a complete full-site translation.
- Existing sensor explorer, product pages, app instructions, location and contact paths retained.
- app.js video guard scope corrected so unrelated interactions initialize without a demoVideo element.
- Service-worker cache version and experience assets updated.

## Validation

JavaScript syntax checks pass for app.js, premium.js, experience.js and sw.js. The preceding iteration was inspected in the browser at desktop, 390px and 768px widths, including Hindi layout and metric category changes. The restored version has been statically checked; no new browser run is claimed for it.

## Before release

Confirm the deployment-specific parameter inventory behind the user-requested 102+ scope. Have a native speaker review translations and complete full-site localization. Run final browser QA on the PR preview, including film playback, reduced-motion mode and all interior pages.

## Publication status

No PR or deployment was created. GitHub branch creation returned HTTP 403, Resource not accessible by integration. Repository account permissions reported push=true, but the integration did not have usable branch-write access. Direct Git also lacked authenticated push credentials.
