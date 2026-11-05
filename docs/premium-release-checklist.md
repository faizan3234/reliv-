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
