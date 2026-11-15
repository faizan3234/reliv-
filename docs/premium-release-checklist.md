# Reliv — premium experience release checklist

## Scope of this change
- Retains the current orange/ivory visual identity, original kiosk photography and existing interactive sensor tour.
- Adds a clear two-audience home decision point (individuals vs organisations).
- Applies the shared editorial refinement stylesheet to key marketing, solution and legal pages.
- Makes the kiosk/payment/report journey conditional on actual kiosk setup rather than promising a universal free/paid flow.
- Rephrases unverified technical claims ("zero storage", "calibrated", universal zero capital expenditure).
- Updates the service-worker cache to include the new stylesheet.

## Required before merging into production
- [ ] **Product owner:** Confirm which deployed kiosk configurations require payment QR activation, what is free, and when a report is paid. Update copy everywhere if there are known prices.
- [ ] **Privacy/legal owner:** Review the live kiosk + companion app privacy notice, including sensitive health data, QR identifiers, payment service, consent, sharing, retention and deletion. The marketing-page policy is not a substitute for a complete product-specific notice.
- [ ] **Clinical/operations owner:** Verify kiosk sensors, screening duration, claims of calibration, warnings, and interpretation boundaries. Do not imply diagnostic or medical-device certification without documentation.
- [ ] **Operations owner:** Verify pilot location access, posted operating hours, on-site support and availability before inviting visitors.
- [ ] **Marketing owner:** Verify recognitions, links, product photography and any case-study attribution.

## QA matrix
| Test | Device / target | Pass condition |
| --- | --- | --- |
| Hero + product photo | 320, 375, 390, 768, 1024, 1440 px | Kiosk photo, headline and CTAs are legible; no horizontal scrolling. |
| Conversion routes | Home / location / organisation | Both audience paths work and land on relevant content. |
| Navigation | Keyboard only and touch | Focus visible; mobile dialog opens, closes and restores focus. |
| Interactive tour | Desktop scroll and mobile tap | Markers can be selected without losing control; all details remain readable. |
| Reduced motion | OS reduced-motion setting | No forced continuous motion; relevant controls remain available. |
| Reading accessibility | Automated axe + manual checks | Work toward WCAG 2.2 AA including form labels, contrast and focus behavior. |
| Performance | Real-device Lighthouse and Web Vitals | Good CWV at p75: LCP ≤2.5 s; INP ≤200 ms; CLS ≤0.1. |
| PWA update | Existing installed copy | v6 service worker installs and new CSS appears after update/reopen. |
| Health/payment journey | Real device and companion app | QR, payment, activation, results and optional report wording matches production. |
| Legal and enquiry | Privacy, Terms, B2B form | Current reviewed policies; enquiry form submitted and confirmation tested. |

## Testing status
Static source checks confirmed the shared stylesheet link is present on 14 key HTML pages and that the modified source is well formed enough to preserve the existing head/main structure. **A full browser screenshot sweep, production kiosk payment test, axe audit and Lighthouse run were not performed in this change.** They are required for a credible top-tier release claim.


## Quality improvement pass — 05 November 2026 (branch only)

### Source work completed
- Corrected the homepage's mobile-first "Find a kiosk" action and replaced confusing deep demo URLs in primary navigation.
- Reduced duplicate navigation entries across key pages and made the secondary navigation drawer inert when closed, keyboard focus-trapped when open, and focus-restoring on dismissal.
- Removed the static "Live & Open Today" label from the location listing and added guidance to verify venue access, hours and charges before travel.
- Fixed broken About-page footer routes and added a genuine `#vitals` destination; `#iphone`/`#android` links are intentional virtual anchors handled by `videos.js`.
- Replaced unsupported prevention/diagnosis claims with appropriately cautious screening information. Removed an attributed claim that three minutes of screening prevents a three-week hospitalization.
- Improved responsive action spacing, touch targets, reduced-motion behavior and avoided duplicate Google Fonts imports on the homepage.
- Reworked the public site's service worker to use network-first navigation, resilient precaching and exclusion of sensitive account/payment/report paths.
- Added `npm run test:site` for automated static HTML links/anchors, JavaScript syntax, CSS structure and cache guard checks.

### Release gate still NOT passed
These cannot be signed off from source inspection and are necessary before anyone calls the site "9.9/10", "top 3%", or releases this branch:
- [ ] **Live visual audit** of actual Vercel deployment/screenshots at 320, 375, 390, 768, 1024, 1440 pixels.
- [ ] **Measured mobile performance:** Lighthouse plus real-user Core Web Vitals at 75th percentile (good LCP ≤2.5s, INP ≤200ms, CLS ≤0.1).
- [ ] **Accessibility:** automated axe + keyboard + VoiceOver/TalkBack, contrast, 200% text zoom, focus-visible, videos and captions; review against WCAG 2.2 AA.
- [ ] **Real kiosk and app integration:** confirm exact payment activation, whether any vitals are free, report pricing, session handling, QR codes, email and refunds (if applicable).
- [ ] **Clinical and legal approval:** verifiable sensor/configuration claims, published instructions, privacy retention/deletion terms, medical disclaimers and actual deployment availability.
- [ ] **Competitive UX study:** a defined benchmark sample and actual user task testing; there is no defensible statistical top-3% conclusion without it.

**Decision:** No PR should be opened from this branch until the release gate is satisfied. Static code checks alone do not validate deployment quality or clinical trustworthiness.
