/**
 * RELIV JOURNEY — CONTENT & CONFIGURATION
 * ---------------------------------------------------------------
 * IMAGES     : WebP image asset mappings.
 * JOURNEY    : Two journeys: `health` (Checkup) & `kits` (Health Kits).
 *              Each has `stops` (scenes) and `transfers` (floating traveling objects).
 * SETTINGS   : Animation physics, runway heights, and tuning.
 */

const IMAGES = {
  campus:        'assets/images/campus.webp',
  kiosk_done:    'assets/images/kiosk_done.webp',
  kiosk_code:    'assets/images/kiosk_code.webp',
  person_report: 'assets/images/person_report.webp',
  person_phone:  'assets/images/person_phone.webp',
  data:          'assets/images/data.webp',
  payment_code:  'assets/images/payment_code.webp',
  report:        'assets/images/report.webp',
  phone:         'assets/images/phone.webp',
  kits:          'assets/images/kits.webp',
  receipt:       'assets/images/receipt.webp',
  payment_scene: 'assets/images/payment_scene.webp'
};

const JOURNEY = {
  health: {
    label: 'Health Checkup',
    headline: 'From first checkup *to everyday care.*',
    intro: 'Follow your health data as it travels from the campus station to verified vitals, secure access code, clear summary report, and your phone.',
    outro: 'From one checkup *to everyday care.*',
    stops: [
      {
        step: '01',
        chapter: 'Arrive',
        serial: 'LAT: 28.6139° N · LON: 77.2090° E // STN-01',
        tag: 'CAMPUS STATION',
        art: 'campus',
        pin: [43, 62],
        title: 'It begins *on campus.*',
        lead: 'Step up to the Reliv kiosk between classes. No queue, no appointment — just a few calm, guided minutes.',
        handoff: 'Data package moving to vitals screening'
      },
      {
        step: '02',
        chapter: 'Measure',
        serial: 'BIO: OPTICAL-PULSE // SENS-02 · VERIFIED',
        tag: 'VITALS SCREENING',
        art: 'kiosk_done',
        pin: [49, 50],
        title: 'Every reading, *captured.*',
        lead: 'Blood pressure, SpO₂, temperature, height and BMI are measured and saved in a single seamless sitting.',
        handoff: 'Vitals verified · Access code generated'
      },
      {
        step: '03',
        chapter: 'Unlock',
        serial: 'SEC: OTP-AUTH // GATE-03 · ENCRYPTED',
        tag: 'ACCESS CODE',
        art: 'kiosk_code',
        pin: [57, 62],
        title: 'One code *unlocks it.*',
        lead: 'Enter your four-digit access code on the kiosk to securely release your personal health report.',
        handoff: 'Personal health report prepared'
      },
      {
        step: '04',
        chapter: 'Understand',
        serial: 'ENC: AES-256 // REP-04 · CLINICAL SUMMARY',
        tag: 'HEALTH REPORT',
        art: 'person_report',
        pin: [62, 46],
        title: 'Your report, *in plain words.*',
        lead: 'Every measurement laid out clearly, so you know where you stand — a summary, never a stressful diagnosis.',
        handoff: 'Syncing to your Reliv companion app'
      },
      {
        step: '05',
        chapter: 'Continue',
        serial: 'SYNC: PWA-2026 // MOB-05 · RELIV POCKET',
        tag: 'RELIV COMPANION',
        art: 'person_phone',
        pin: [60, 40],
        title: 'Care that *travels with you.*',
        lead: 'Open the Reliv app to revisit your history, spot subtle trends, and stay proactive about your wellbeing.',
        handoff: 'Journey complete · Always in your pocket'
      }
    ],
    transfers: [
      { img: 'data',         name: 'Health Data',   badge: 'Health Data Package',   size: 280 },
      { img: 'payment_code', name: 'Access Code',   badge: '4-Digit Access Code',  size: 210 },
      { img: 'report',       name: 'Health Report', badge: 'Personal Summary',      size: 230 },
      { img: 'phone',        name: 'Reliv App',     badge: 'Mobile Companion',      size: 175 }
    ]
  },

  kits: {
    label: 'Health Kits',
    headline: 'Everyday essentials, *within reach.*',
    intro: 'Pick essential health supplies, make a fast digital payment, unlock your kit at the campus station, and track it all in your phone.',
    outro: 'Everyday essentials, *one tap away.*',
    stops: [
      {
        step: '01',
        chapter: 'Choose',
        serial: 'LAT: 28.6139° N · LON: 77.2090° E // DISP-01',
        tag: 'CAMPUS STATION',
        art: 'campus',
        pin: [30, 60],
        title: 'Essentials, *within reach.*',
        lead: 'Pick a health kit at the campus kiosk — first-aid, hygiene and wellness essentials, ready 24/7.',
        handoff: 'Kit selected · Moving to secure payment'
      },
      {
        step: '02',
        chapter: 'Pay',
        serial: 'TXN: UPI-GATEWAY // SEC-02 · CONTACTLESS',
        tag: 'DIGITAL PAYMENT',
        art: 'payment_scene',
        pin: [54, 47],
        title: 'Pay *in seconds.*',
        lead: 'Complete a quick contactless payment and receive an instant one-time collection code.',
        handoff: 'Payment confirmed · Code sent to kiosk'
      },
      {
        step: '03',
        chapter: 'Unlock',
        serial: 'REL: MECH-LOCK // DISP-03 · PIN VERIFY',
        tag: 'DISPENSE CODE',
        art: 'kiosk_code',
        pin: [57, 62],
        title: 'Enter *your code.*',
        lead: 'Type your collection code on the kiosk touchscreen to verify and release your kit.',
        handoff: 'Door unlocks · Kit dispensed with receipt'
      },
      {
        step: '04',
        chapter: 'Collect',
        serial: 'RCPT: SHA-256 // INV-04 · ITEM AUDIT',
        tag: 'VERIFIED RECEIPT',
        art: 'receipt',
        pin: [50, 50],
        title: 'Collect, *with a receipt.*',
        lead: 'Your kit is released with an itemized paper & digital receipt for complete peace of mind.',
        handoff: 'Adding purchase to your Reliv account'
      },
      {
        step: '05',
        chapter: 'Continue',
        serial: 'SYNC: PWA-2026 // MOB-05 · RELIV WALLET',
        tag: 'RELIV COMPANION',
        art: 'person_phone',
        pin: [60, 40],
        title: 'Reliv *stays with you.*',
        lead: 'Keep supplies, receipts, and routine checkups organized in one unified companion app.',
        handoff: 'Journey complete · Ready when you need it'
      }
    ],
    transfers: [
      { img: 'kits',         name: 'Health Kit',    badge: 'Essential Health Kit', size: 240 },
      { img: 'payment_code', name: 'Access Code',   badge: 'Collection Code',      size: 210 },
      { img: 'receipt',      name: 'Item Receipt',  badge: 'Verified Receipt',     size: 220 },
      { img: 'phone',        name: 'Reliv App',     badge: 'Mobile Companion',      size: 175 }
    ]
  }
};

const SETTINGS = {
  // Runway height in px: calibrated gap between stops
  runwayHeight: 220,
  // Smoothing easing factor for traveler animation
  smoothing: 0.12,
  // Curve lateral sway amount in px
  curveSway: 60
};
