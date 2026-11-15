/**
 * Renders the self-contained HTML for Reliv's Secret Inbox Mode takeover.
 * Built in a sharp Swiss-editorial visual system (Signature Orange #FF7A00 /
 * #FF5A0A, Carbon Black #050505, Pure White #FFFFFF, Off-White #F4F4F2)
 * showcasing Reliv Medicare Private Limited's mission, turnkey preventive
 * health hardware presence, Kolkata deployment, leadership, and verified honours —
 * keeping medicine kiosk workings, software, and pricing strictly confidential.
 */

const COMPANY_PILLARS = [
  {
    num: '01 / IOT HEALTH HARDWARE',
    title: 'Walk-Up Health Station',
    desc: 'Purpose-built self-service preventive hardware engineered for dependable daily operation across hospitals, diagnostic centers, and public lobbies.',
    icon: '<path d="M20 33C20 33 7 24.5 7 15.2C7 10.7 10.6 7.5 14.5 7.5C17 7.5 19.1 8.8 20 10.8C20.9 8.8 23 7.5 25.5 7.5C29.4 7.5 33 10.7 33 15.2C33 24.5 20 33 20 33Z" fill="#FF7A00" stroke="#050505" stroke-width="2"/><path d="M11 20H15.5L17.8 15L21.2 24.5L23.5 19H29" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    num: '02 / GOVT. ACCREDITED',
    title: 'DPIIT Recognised',
    desc: 'Certified under Startup India (DIPP287544) by the Department for Promotion of Industry & Internal Trade, Government of India.',
    icon: '<circle cx="20" cy="20" r="13" fill="#FFFFFF" stroke="#050505" stroke-width="2"/><path d="M20 7C16 11 16 29 20 33M20 7C24 11 24 29 20 33M8 16H32M8 24H32" fill="none" stroke="#FF7A00" stroke-width="2"/>',
  },
  {
    num: '03 / INSTITUTION SCALE',
    title: 'Campuses to Hospitals',
    desc: 'Compact institutional footprint active at IEM Gurukul Campus, Salt Lake Sector V, Kolkata — designed for hospitals, clinics, colleges, offices, and gyms.',
    icon: '<rect x="7" y="13" width="26" height="20" fill="#FFFFFF" stroke="#050505" stroke-width="2"/><path d="M20 18V26M16 22H24" stroke="#FF7A00" stroke-width="2.8" stroke-linecap="round"/><rect x="14" y="8" width="12" height="5" fill="#FF7A00" stroke="#050505" stroke-width="2"/>',
  },
  {
    num: '04 / STRICTLY PRIVATE IP',
    title: 'Confidential Walkthroughs',
    desc: 'Internal hardware workings, capabilities, and commercial economics stay offline and private — shared strictly one-to-one with invited partners.',
    icon: '<rect x="9" y="8" width="22" height="24" rx="2" fill="#FFFFFF" stroke="#050505" stroke-width="2"/><circle cx="20" cy="19" r="3.5" fill="#FF7A00" stroke="#050505" stroke-width="2"/><path d="M20 22.5V26" stroke="#050505" stroke-width="2.2" stroke-linecap="round"/>',
  },
];

const LEADERSHIP_ROSTER = [
  { role: 'FOUNDER & CEO', name: 'Faizan Khan' },
  { role: 'CTO & CO-FOUNDER', name: 'Jiya Bhati' },
  { role: 'CHIEF FINANCIAL OFFICER', name: 'Vaibhav Pasari' },
];

const CORPORATE_RECORDS = [
  { label: 'LEGAL ENTITY', value: 'RELIV MEDICARE PRIVATE LIMITED' },
  { label: 'DPIIT RECOGNITION', value: 'DIPP287544 · Startup India (Valid till 2036)' },
  { label: 'LIVE DEPLOYMENT', value: 'IEM Gurukul Campus, Salt Lake, Kolkata' },
  { label: 'SECTOR', value: 'Healthcare & Life Sciences · IoT MedTech' },
];

function renderCompanyPillarsMarkup() {
  return COMPANY_PILLARS.map(
    (p) => `
          <article class="pillar-card">
            <div class="pillar-head">
              <span class="pillar-num">${p.num}</span>
              <svg class="pillar-icon" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">${p.icon}</svg>
            </div>
            <h3 class="pillar-title">${p.title}</h3>
            <p class="pillar-desc">${p.desc}</p>
          </article>`
  ).join('\n');
}

function renderLeadershipMarkup() {
  return LEADERSHIP_ROSTER.map(
    (m) => `
              <div class="leader-cell">
                <span class="leader-role">${m.role}</span>
                <strong class="leader-name">${m.name}</strong>
              </div>`
  ).join('\n');
}

function renderCorpRecordsMarkup() {
  return CORPORATE_RECORDS.map(
    (r) => `
          <div class="corp-cell">
            <span class="corp-label">${r.label}</span>
            <strong class="corp-value">${r.value}</strong>
          </div>`
  ).join('\n');
}

export function renderInboxModeHtml() {
  const mailtoSubject = encodeURIComponent("Re: Reliv — Knocked on our inbox");
  const mailtoBody = encodeURIComponent(
    "Hi Reliv Team,\n\nSaw your Inbox Mode note — opening a direct thread from our end.\n\nName / Team: \nOrganisation: \nBest contact details: \n"
  );
  const mailtoHref = `mailto:relivcustomercare.in@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#FF7A00">
  <meta name="robots" content="noindex, nofollow">
  <title>Reliv — You've Got Mail.</title>

  <!-- Preserve existing Reliv favicons & brand identity across every route depth -->
  <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
  <link rel="shortcut icon" href="/icons/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      /* Exact palette sampled from immutable Reliv vector + strict Swiss tones */
      --orange: #FF7A00;
      --orange-accent: #FF5A0A;
      --orange-deep: #D94E00;
      --black: #050505;
      --black-ink: #111111;
      --white: #FFFFFF;
      --offwhite: #F4F4F2;
      --offwhite-shade: #E7E7E2;
      --rule-light: #E2E2DC;
      --rule-dark: #262624;
      --muted: #52524E;
      --muted-dark: #A8A8A2;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
      --font-display: 'Barlow Condensed', 'Arial Narrow', Impact, sans-serif;
      --font-serif: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    }

    html {
      scroll-behavior: smooth;
      overflow-x: clip;
      background-color: var(--white);
      -webkit-text-size-adjust: 100%;
      touch-action: pan-y;
      overscroll-behavior-x: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      min-height: 100dvh;
      overflow-x: clip;
      background-color: var(--white);
      color: var(--black);
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      touch-action: pan-y;
      overscroll-behavior-x: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }

    img, svg {
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-drag: none;
      user-drag: none;
    }

    body.modal-open {
      overflow: hidden;
    }

    button, a {
      font: inherit;
      color: inherit;
      touch-action: manipulation;
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;
    }

    button:focus-visible,
    a:focus-visible {
      outline: 2.5px solid var(--black);
      outline-offset: 4px;
    }

    /* Custom subtle cursor follower on desktop fine pointers only */
    .cursor-reticle {
      position: fixed;
      top: -40px;
      left: -40px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px solid var(--orange);
      pointer-events: none;
      z-index: 120;
      transform: translate(-50%, -50%);
      transition: width 0.22s var(--ease-out), height 0.22s var(--ease-out), border-color 0.22s ease, opacity 0.22s ease;
      opacity: 0;
    }

    .cursor-reticle.is-visible {
      opacity: 0.72;
    }

    .cursor-reticle.is-active {
      width: 48px;
      height: 48px;
      border-color: var(--orange-accent);
      opacity: 0.95;
    }

    @media (hover: none), (pointer: coarse) {
      .cursor-reticle {
        display: none;
      }
    }

    /* =====================================================================
       MINIMAL SWISS HEADER BAR (Non-nav, immutable logo on pure white)
       ===================================================================== */
    .topbar {
      position: relative;
      z-index: 40;
      width: 100%;
      background: var(--white);
      border-bottom: 1px solid var(--rule-light);
    }

    .topbar-inner {
      max-width: 1440px;
      margin: 0 auto;
      height: 74px;
      padding: 0 clamp(18px, 4vw, 56px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand-lockup {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      min-width: 0;
    }

    .brand-wordmark {
      display: block;
      width: clamp(90px, 9vw, 114px);
      height: auto;
      flex-shrink: 0;
    }

    .brand-divider {
      width: 1px;
      height: 24px;
      background: var(--rule-light);
      flex-shrink: 0;
    }

    .brand-tag {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
      white-space: nowrap;
    }

    .dispatch-status {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .dispatch-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid var(--black);
      background: var(--white);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .dispatch-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--orange);
      box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.55);
      animation: pulse-dot 2.4s ease-out infinite;
    }

    .dispatch-edition {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      white-space: nowrap;
    }

    /* =====================================================================
       BAND 1 — HERO CANVAS (PURE WHITE + SWISS ORANGE POSTAL STAGE)
       ===================================================================== */
    .hero {
      position: relative;
      background: var(--white);
      color: var(--black);
      overflow: hidden;
      border-bottom: 1px solid var(--rule-light);
    }

    /* Subtle architectural coordinate lines */
    .hero-grid-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(to right, rgba(5, 5, 5, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(5, 5, 5, 0.04) 1px, transparent 1px);
      background-size: 88px 88px;
      mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.15));
      -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.15));
    }

    .hero-shell {
      position: relative;
      z-index: 2;
      max-width: 1440px;
      margin: 0 auto;
      padding: clamp(32px, 4.5vh, 56px) clamp(18px, 4vw, 56px) 28px;
      min-height: calc(100svh - 75px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 28px;
    }

    .hero-columns {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
      align-items: center;
      gap: clamp(28px, 4.5vw, 72px);
      flex: 1;
    }

    .hero-copy {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: clamp(18px, 2.4vh, 26px);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--black);
      opacity: 0;
      animation: fade-up 0.65s var(--ease-out) 0.05s forwards;
    }

    .eyebrow-star {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--orange);
      animation: spin-slow 18s linear infinite;
    }

    .eyebrow-rule {
      width: 24px;
      height: 1.5px;
      background: var(--orange);
      flex-shrink: 0;
    }

    .hero-title {
      font-family: var(--font-display);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.025em;
      line-height: 0.88;
      font-size: clamp(46px, 6.2vw, 96px);
      margin-bottom: clamp(20px, 2.8vh, 28px);
      max-width: 100%;
    }

    .hero-title .line-mask {
      display: block;
      overflow: hidden;
      padding-bottom: 0.04em;
    }

    .hero-title .line-inner {
      display: block;
      animation: line-rise 0.85s var(--ease-out) both;
    }

    .hero-title .line-accent .line-inner {
      color: var(--orange);
      animation-delay: 0.12s;
    }

    .hero-lead {
      font-size: clamp(16px, 1.35vw, 19px);
      line-height: 1.58;
      color: var(--black);
      max-width: 520px;
      font-weight: 500;
      margin-bottom: 18px;
      opacity: 0;
      animation: fade-up 0.7s var(--ease-out) 0.18s forwards;
    }

    .hero-lead strong {
      font-weight: 700;
    }

    .hero-note {
      width: 100%;
      max-width: 520px;
      padding: 15px 18px;
      background: var(--offwhite);
      border-left: 4px solid var(--orange);
      font-size: 15px;
      line-height: 1.55;
      color: var(--black);
      margin-bottom: clamp(22px, 3vh, 30px);
      opacity: 0;
      animation: fade-up 0.7s var(--ease-out) 0.25s forwards;
    }

    .hero-note strong {
      display: block;
      font-weight: 800;
      color: var(--black);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      opacity: 0;
      animation: fade-up 0.7s var(--ease-out) 0.32s forwards;
    }

    .cta-dark,
    .cta-orange {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 8px 8px 8px 20px;
      border-radius: 999px;
      text-decoration: none;
      border: 1.5px solid var(--black);
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
      transition: transform 0.24s var(--ease-out), background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.24s var(--ease-out);
    }

    .cta-dark {
      background: var(--black);
      color: var(--white);
      box-shadow: 0 12px 28px rgba(5, 5, 5, 0.14);
    }

    .cta-dark:hover {
      transform: translateY(-2px);
      background: #1c1c1a;
      box-shadow: 0 16px 32px rgba(5, 5, 5, 0.2);
    }

    .cta-dark .cta-circle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--orange);
      color: var(--black);
      display: grid;
      place-items: center;
      transition: transform 0.24s var(--ease-out);
    }

    .cta-dark:hover .cta-circle {
      transform: rotate(45deg);
    }

    .cta-orange {
      background: var(--orange);
      border-color: var(--orange);
      color: var(--black);
      box-shadow: 0 10px 24px rgba(255, 122, 0, 0.24);
    }

    .cta-orange:hover {
      transform: translateY(-2px);
      background: var(--orange-accent);
      border-color: var(--orange-accent);
      box-shadow: 0 16px 30px rgba(255, 90, 10, 0.3);
    }

    .cta-orange .cta-circle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--black);
      color: var(--white);
      display: grid;
      place-items: center;
      transition: transform 0.24s var(--ease-out);
    }

    .cta-orange:hover .cta-circle {
      transform: translateX(2px);
    }

    /* =====================================================================
       INTERACTIVE POSTAL STAGE (Architectural White & Orange 3D Envelope)
       ===================================================================== */
    .envelope-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: clamp(360px, 46vw, 540px);
      width: 100%;
      isolation: isolate;
      padding: 20px;
    }

    /* Bold signature orange geometric backdrop disc + clean Swiss orbit rings */
    .stage-disc {
      position: absolute;
      width: min(86%, 430px);
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--orange);
      z-index: -2;
      transition: transform 0.55s var(--ease-out);
    }

    .stage-orbit {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
    }

    .stage-orbit-outer {
      width: min(104%, 520px);
      aspect-ratio: 1;
      border: 1px solid var(--rule-light);
    }

    .stage-orbit-dashed {
      width: min(94%, 476px);
      aspect-ratio: 1;
      border: 1px dashed rgba(5, 5, 5, 0.2);
      animation: spin-slow 44s linear infinite;
    }

    /* Grounded contact shadow beneath hovering envelope */
    .envelope-floor-shadow {
      position: absolute;
      bottom: clamp(22px, 4vh, 42px);
      width: min(64%, 310px);
      height: 18px;
      border-radius: 50%;
      background: radial-gradient(closest-side, rgba(5, 5, 5, 0.24), transparent 82%);
      z-index: -1;
      animation: shadow-breathe 3.4s ease-in-out infinite;
    }

    /* Circular Swiss stamp seal in upper-right corner */
    .swiss-seal {
      position: absolute;
      top: 10px;
      right: clamp(4px, 2vw, 24px);
      width: 96px;
      height: 96px;
      z-index: 6;
      pointer-events: none;
      transform: translate3d(calc(var(--mx, 0px) * -0.45), calc(var(--my, 0px) * -0.45), 0);
      transition: transform 0.28s var(--ease-out);
    }

    .swiss-seal svg {
      width: 100%;
      height: 100%;
      animation: spin-slow 24s linear infinite;
    }

    /* Cheeky interactive postage tag in lower-left orbit */
    .stamp-tag {
      position: absolute;
      left: clamp(0px, 1.5vw, 18px);
      bottom: 34px;
      z-index: 6;
      background: var(--black);
      color: var(--white);
      border: 1.5px solid var(--black);
      padding: 9px 12px;
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      box-shadow: 4px 4px 0 var(--white), 5.5px 5.5px 0 var(--black);
      pointer-events: none;
      transform: rotate(-5deg) translate3d(calc(var(--mx, 0px) * 0.6), calc(var(--my, 0px) * 0.6), 0);
      transition: transform 0.22s var(--ease-out);
    }

    .stamp-tag-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--orange);
    }

    /* Interactive 3D Envelope Control */
    .envelope-parallax {
      transform: translate3d(var(--mx, 0px), var(--my, 0px), 0);
      transition: transform 0.24s var(--ease-out);
      width: min(92%, 410px);
    }

    .envelope-btn {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 1.38;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      perspective: 1100px;
      animation: envelope-float 3.4s ease-in-out infinite;
      transform: rotate(-4deg);
      transition: transform 0.35s var(--ease-out), filter 0.35s var(--ease-out);
      filter: drop-shadow(0 22px 24px rgba(5, 5, 5, 0.22));
    }

    .envelope-btn:hover {
      transform: rotate(-1.5deg) scale(1.025);
      filter: drop-shadow(0 28px 32px rgba(5, 5, 5, 0.28));
    }

    .envelope-btn.is-open {
      animation: none;
      transform: rotate(0deg) translateY(8px);
    }

    .env-shell {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
    }

    /* Inner rear backplate + bold orange liner inside the envelope pocket */
    .env-back {
      position: absolute;
      inset: 14% 2% 4%;
      background: var(--offwhite);
      border: 1.5px solid var(--black);
      border-radius: 6px;
      z-index: 1;
    }

    .env-liner {
      position: absolute;
      inset: 14.5% 2.8% 12%;
      background: var(--orange);
      border-radius: 4px;
      z-index: 2;
      background-image: repeating-linear-gradient(
        -45deg,
        var(--orange),
        var(--orange) 10px,
        var(--orange-accent) 10px,
        var(--orange-accent) 20px
      );
    }

    /* Emerging interior white letter card (safely inset above bottom pocket edge) */
    .env-letter-sheet {
      position: absolute;
      left: 10%;
      right: 10%;
      top: 19%;
      height: 68%;
      background: var(--white);
      border: 1.5px solid var(--black);
      border-radius: 3px;
      padding: 16px 18px;
      z-index: 3;
      text-align: left;
      box-shadow: 0 -4px 12px rgba(5, 5, 5, 0.08);
      transform: translateY(4%);
      transition: transform 0.65s var(--ease-out);
      overflow: hidden;
    }

    .envelope-btn:hover .env-letter-sheet {
      transform: translateY(-6%);
    }

    .envelope-btn.is-open .env-letter-sheet {
      transform: translateY(-38%);
    }

    .env-sheet-kicker {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
      border-bottom: 1px solid var(--black);
      padding-bottom: 8px;
    }

    .env-sheet-title {
      display: block;
      margin-top: 12px;
      font-family: var(--font-display);
      font-size: clamp(22px, 2.5vw, 34px);
      font-weight: 800;
      line-height: 0.94;
      text-transform: uppercase;
      color: var(--black);
    }

    .env-sheet-bar {
      display: block;
      width: 38px;
      height: 4px;
      background: var(--orange);
      margin-top: 10px;
    }

    .env-sheet-sub {
      display: block;
      margin-top: 8px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--muted);
    }

    /* Envelope Pocket Side + Bottom Paper Folds (Crisp White & Cool Off-White only) */
    .env-pocket {
      position: absolute;
      inset: 14% 2% 4%;
      z-index: 5;
      border-radius: 6px;
      overflow: hidden;
      pointer-events: none;
    }

    .env-fold-left {
      position: absolute;
      inset: 0;
      background: var(--white);
      clip-path: polygon(0 0, 52% 52%, 0 100%);
      border-left: 1.5px solid var(--black);
      border-bottom: 1.5px solid var(--black);
    }

    .env-fold-right {
      position: absolute;
      inset: 0;
      background: var(--offwhite);
      clip-path: polygon(100% 0, 48% 52%, 100% 100%);
      border-right: 1.5px solid var(--black);
      border-bottom: 1.5px solid var(--black);
    }

    .env-fold-bottom {
      position: absolute;
      inset: 0;
      background: var(--white);
      clip-path: polygon(0 100%, 50% 44%, 100% 100%);
      filter: drop-shadow(0 -1.5px 0 var(--black));
    }

    /* Crisp pocket border overlay to keep razor-sharp dark outline */
    .env-pocket-frame {
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--black);
      border-radius: 6px;
      z-index: 6;
    }

    /* Top hinged postal flap */
    .env-flap {
      position: absolute;
      left: 2%;
      right: 2%;
      top: 14%;
      height: 52%;
      background: var(--white);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      transform-origin: top center;
      transform: rotateX(0deg);
      transition: transform 0.62s var(--ease-out), z-index 0s 0.18s;
      z-index: 7;
      filter: drop-shadow(0 2px 0 var(--black)) drop-shadow(0 8px 12px rgba(5, 5, 5, 0.08));
    }

    .env-flap-inner {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, var(--white) 0%, var(--offwhite) 100%);
      clip-path: polygon(2px 0, calc(100% - 2px) 0, 50% calc(100% - 2px));
    }

    .envelope-btn:hover .env-flap {
      transform: rotateX(24deg);
    }

    .envelope-btn.is-open .env-flap {
      transform: rotateX(174deg);
      z-index: 2;
    }

    /* Centered embossed R® stamp on the envelope seam */
    .env-wax-seal {
      position: absolute;
      left: 50%;
      top: 57%;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--black);
      color: var(--white);
      border: 2px solid var(--white);
      box-shadow: 0 4px 12px rgba(5, 5, 5, 0.25);
      transform: translate(-50%, -50%) scale(1);
      z-index: 8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: transform 0.35s var(--ease-out), opacity 0.25s ease, background-color 0.2s ease;
    }

    .env-wax-seal strong {
      font-family: var(--font-display);
      font-size: 20px;
      line-height: 0.9;
      color: var(--orange);
    }

    .env-wax-seal span {
      font-size: 7px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .envelope-btn:hover .env-wax-seal {
      transform: translate(-50%, -50%) scale(1.08);
    }

    .envelope-btn.is-open .env-wax-seal {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.7);
    }

    /* Cheeky corner stamp pinned directly on pocket front */
    .env-postage-stamp {
      position: absolute;
      right: 6%;
      bottom: 10%;
      z-index: 8;
      width: 56px;
      padding: 5px 4px;
      background: var(--offwhite);
      border: 1.5px dashed var(--black);
      color: var(--black);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 7px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transform: rotate(6deg);
      transition: transform 0.28s var(--ease-out);
    }

    .env-postage-stamp b {
      font-family: var(--font-display);
      font-size: 15px;
      line-height: 1;
      color: var(--orange);
    }

    .envelope-btn:hover .env-postage-stamp {
      transform: rotate(12deg) translateY(-3px);
    }

    .stage-caption {
      position: absolute;
      bottom: 4px;
      right: 12px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .hero-bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--rule-light);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .scroll-cue {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--black);
      font-weight: 800;
    }

    .scroll-cue-arrow {
      display: inline-block;
      color: var(--orange);
      animation: bounce-down 2s ease-in-out infinite;
    }

    /* =====================================================================
       KINETIC SWISS MARQUEE DIVIDER (#050505)
       ===================================================================== */
    .ticker {
      background: var(--black);
      color: var(--white);
      border-top: 1px solid var(--black);
      border-bottom: 1px solid var(--black);
      height: 58px;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .ticker-track {
      display: flex;
      align-items: center;
      gap: 38px;
      white-space: nowrap;
      width: max-content;
      animation: ticker-scroll 26s linear infinite;
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .ticker-star {
      color: var(--orange);
      margin-right: 10px;
    }

    /* =====================================================================
       BAND 2 — REAL RELIV KIOSK SHOWCASE (#F4F4F2 SWISS EDITORIAL STAGE)
       ===================================================================== */
    .kiosk-section {
      background: var(--offwhite);
      color: var(--black);
      padding: clamp(56px, 8vw, 108px) clamp(18px, 4vw, 56px);
      border-bottom: 1px solid var(--rule-light);
    }

    .kiosk-container {
      max-width: 1440px;
      margin: 0 auto;
    }

    .section-index-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--black);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .kiosk-grid {
      display: grid;
      grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
      align-items: center;
      gap: clamp(36px, 6vw, 96px);
      margin-top: clamp(36px, 5vw, 68px);
    }

    /* Isolated Kiosk Architectural Stage (Zero image distortion) */
    .kiosk-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: clamp(380px, 48vw, 590px);
      padding: 20px 12px 32px;
      isolation: isolate;
    }

    .kiosk-orbit-ring {
      position: absolute;
      width: min(94%, 500px);
      aspect-ratio: 1;
      border-radius: 50%;
      border: 1px solid #D8D8D2;
      z-index: -2;
      pointer-events: none;
    }

    .kiosk-orange-disc {
      position: absolute;
      width: min(76%, 390px);
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--orange);
      z-index: -1;
      pointer-events: none;
      transition: transform 0.45s var(--ease-out);
    }

    .kiosk-stage:hover .kiosk-orange-disc {
      transform: scale(1.03);
    }

    .kiosk-pedestal-shadow {
      position: absolute;
      bottom: 18px;
      width: clamp(140px, 34%, 220px);
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(closest-side, rgba(5, 5, 5, 0.28), rgba(5, 5, 5, 0.08) 55%, transparent 82%);
      z-index: 0;
    }

    .kiosk-photo {
      position: relative;
      z-index: 2;
      width: auto;
      height: clamp(340px, 44vw, 530px);
      max-width: 100%;
      object-fit: contain;
      display: block;
      filter: drop-shadow(0 18px 26px rgba(5, 5, 5, 0.14));
      transition: transform 0.45s var(--ease-out);
    }

    .kiosk-stage:hover .kiosk-photo {
      transform: translateY(-6px);
    }

    /* Clean Swiss hardware status callout tags */
    .kiosk-tag {
      position: absolute;
      z-index: 4;
      padding: 9px 13px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      line-height: 1.35;
      border: 1.5px solid var(--black);
      pointer-events: none;
    }

    .kiosk-tag-top {
      top: 18px;
      left: 0;
      background: var(--white);
      color: var(--black);
      box-shadow: 4px 4px 0 var(--black);
    }

    .kiosk-tag-bottom {
      bottom: 38px;
      right: 0;
      background: var(--black);
      color: var(--white);
      box-shadow: 4px 4px 0 var(--orange);
    }

    .kiosk-tag-accent {
      color: var(--orange);
    }

    .kiosk-copy {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
    }

    .kiosk-label {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .kiosk-label-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--orange);
    }

    .kiosk-heading {
      font-family: var(--font-display);
      font-weight: 800;
      text-transform: uppercase;
      font-size: clamp(46px, 5.6vw, 84px);
      line-height: 0.9;
      letter-spacing: -0.025em;
      margin-bottom: 24px;
    }

    .kiosk-heading .outline-word {
      color: transparent;
      -webkit-text-stroke: 1.8px var(--black);
    }

    .kiosk-heading .orange-dot {
      color: var(--orange);
    }

    .kiosk-body {
      font-size: clamp(16px, 1.25vw, 18px);
      line-height: 1.65;
      color: var(--black);
      max-width: 540px;
      margin-bottom: 18px;
    }

    .kiosk-quips {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: clamp(22px, 2.2vw, 31px);
      line-height: 1.25;
      color: var(--orange-deep);
      margin: 8px 0 24px;
    }

    /* Clean architectural telemetry spec row (No SaaS cards) */
    .telemetry-strip {
      width: 100%;
      max-width: 540px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      border-top: 1px solid var(--black);
      border-bottom: 1px solid var(--black);
      margin-bottom: 26px;
    }

    .telemetry-cell {
      padding: 14px 12px 14px 0;
    }

    .telemetry-cell + .telemetry-cell {
      padding-left: 16px;
      border-left: 1px solid #D5D5CF;
    }

    .telemetry-k {
      display: block;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .telemetry-v {
      display: block;
      font-size: 13px;
      font-weight: 800;
      color: var(--black);
    }

    .text-trigger-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 0 0 4px;
      border: 0;
      border-bottom: 2px solid var(--black);
      background: transparent;
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }

    .text-trigger-btn:hover {
      color: var(--orange-deep);
      border-color: var(--orange);
      transform: translateX(3px);
    }

    .hero-direct-line {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .hero-direct-line a {
      color: var(--black);
      text-decoration: underline;
      text-decoration-color: var(--orange);
      text-underline-offset: 4px;
    }

    .hero-direct-line a:hover {
      color: var(--orange-deep);
    }

    /* =====================================================================
       BAND 2.5 — AWARDS & RECOGNITIONS (#FFFFFF SWISS GALLERY)
       ===================================================================== */
    .awards-section {
      background: var(--white);
      color: var(--black);
      padding: clamp(56px, 8vw, 100px) clamp(18px, 4vw, 56px);
      border-bottom: 1px solid var(--rule-light);
    }

    .awards-container {
      max-width: 1440px;
      margin: 0 auto;
    }

    .awards-header-row {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: end;
      gap: clamp(20px, 4vw, 64px);
      margin: clamp(28px, 4vw, 48px) 0 clamp(28px, 4vw, 44px);
    }

    .awards-heading {
      font-family: var(--font-display);
      font-weight: 800;
      text-transform: uppercase;
      font-size: clamp(40px, 4.9vw, 74px);
      line-height: 0.92;
      letter-spacing: -0.025em;
    }

    .awards-heading span {
      color: var(--orange);
    }

    .awards-lead {
      font-size: 15.5px;
      line-height: 1.65;
      color: var(--muted);
      max-width: 470px;
    }

    .awards-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 20px;
    }

    .award-card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      background: var(--offwhite);
      border: 1.5px solid var(--black);
      transition: transform 0.28s var(--ease-out), box-shadow 0.28s var(--ease-out), background-color 0.22s ease;
    }

    .award-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 var(--orange);
      background: var(--white);
    }

    .award-media {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: var(--black);
      border-bottom: 1.5px solid var(--black);
    }

    .award-media img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 4%;
      transition: transform 0.45s var(--ease-out);
    }

    .award-card:hover .award-media img {
      transform: scale(1.03);
    }

    .award-media--doc {
      background: var(--white);
      padding: 10px;
    }

    .award-media--doc img {
      object-fit: contain;
      object-position: center;
    }

    .award-body {
      padding: 18px 18px 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 8px;
    }

    .award-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--orange-deep);
    }

    .award-arrow {
      color: var(--black);
    }

    .award-title {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 800;
      text-transform: uppercase;
      line-height: 0.96;
      letter-spacing: -0.015em;
      color: var(--black);
    }

    .award-desc {
      font-size: 13.5px;
      line-height: 1.55;
      color: var(--muted);
    }

    .letter-phone-link {
      display: inline-block;
      margin-top: 6px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: var(--black);
      text-decoration: underline;
      text-decoration-color: var(--orange);
      text-underline-offset: 4px;
    }

    /* =====================================================================
       BAND 2.2 — CONFIDENTIAL EDITORIAL ARCHIVE (#FF7A00 SIGNATURE ORANGE)
       ===================================================================== */
    .about-band {
      background: var(--orange);
      color: var(--black);
      padding: clamp(56px, 8vw, 102px) clamp(18px, 4vw, 56px);
      border-bottom: 1.5px solid var(--black);
    }

    .about-container {
      max-width: 1440px;
      margin: 0 auto;
    }

    .about-split {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: stretch;
      gap: clamp(24px, 4vw, 56px);
      margin: clamp(28px, 4vw, 48px) 0 clamp(28px, 4vw, 44px);
    }

    .about-copy-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
    }

    .about-badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }

    .about-box-stamp {
      display: inline-block;
      padding: 5px 12px;
      border: 2px solid var(--black);
      background: var(--white);
      color: var(--black);
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      box-shadow: 3px 3px 0 var(--black);
    }

    .about-subtag {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--black);
    }

    .about-heading {
      font-family: var(--font-display);
      font-weight: 800;
      text-transform: uppercase;
      font-size: clamp(40px, 5vw, 74px);
      line-height: 0.92;
      letter-spacing: -0.025em;
    }

    .about-heading span {
      color: var(--white);
    }

    .about-lead {
      font-size: 15.5px;
      line-height: 1.66;
      color: var(--black);
      font-weight: 500;
      max-width: 600px;
    }

    .leadership-bar {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      padding-top: 16px;
      border-top: 1.5px solid rgba(5, 5, 5, 0.25);
    }

    .leader-cell {
      background: var(--white);
      border: 1.5px solid var(--black);
      padding: 12px 14px;
      box-shadow: 3px 3px 0 var(--black);
    }

    .leader-role {
      display: block;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--orange-deep);
      margin-bottom: 4px;
    }

    .leader-name {
      display: block;
      font-family: var(--font-display);
      font-size: 21px;
      font-weight: 800;
      text-transform: uppercase;
      line-height: 1;
      color: var(--black);
    }

    .field-card {
      display: flex;
      flex-direction: column;
      background: var(--white);
      border: 2px solid var(--black);
      box-shadow: 8px 8px 0 var(--black);
    }

    .field-media {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: #141413;
      border-bottom: 2px solid var(--black);
    }

    .field-media img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 45%;
    }

    .field-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 5px 10px;
      background: var(--black);
      color: var(--white);
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .field-body {
      padding: 18px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-kicker {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--orange-deep);
    }

    .field-title {
      font-family: var(--font-display);
      font-size: 25px;
      font-weight: 800;
      text-transform: uppercase;
      line-height: 0.98;
      color: var(--black);
    }

    .field-desc {
      font-size: 13.5px;
      line-height: 1.55;
      color: var(--muted);
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
    }

    .pillar-card {
      background: var(--white);
      border: 2px solid var(--black);
      box-shadow: 6px 6px 0 var(--black);
      padding: 20px 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
    }

    .pillar-card:hover {
      transform: translate(-2px, -2px);
      box-shadow: 8px 8px 0 var(--black);
    }

    .pillar-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .pillar-num {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--orange-deep);
    }

    .pillar-icon {
      flex-shrink: 0;
      display: block;
    }

    .pillar-title {
      font-family: var(--font-display);
      font-size: 25px;
      font-weight: 800;
      text-transform: uppercase;
      line-height: 0.96;
      color: var(--black);
    }

    .pillar-desc {
      font-size: 13.5px;
      line-height: 1.55;
      color: var(--muted);
    }

    .corp-record-strip {
      margin-top: clamp(22px, 3vw, 30px);
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      background: var(--white);
      border: 2px solid var(--black);
      box-shadow: 6px 6px 0 var(--black);
    }

    .corp-cell {
      padding: 15px 18px;
      border-right: 1px solid var(--rule-light);
    }

    .corp-cell:last-child {
      border-right: 0;
    }

    .corp-label {
      display: block;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--orange-deep);
      margin-bottom: 4px;
    }

    .corp-value {
      display: block;
      font-size: 13.5px;
      font-weight: 800;
      line-height: 1.35;
      color: var(--black);
    }

    /* =====================================================================
       BAND 3 — NEAR-BLACK CLOSING DISPATCH + COLOPHON (#050505)
       ===================================================================== */
    .closing-band {
      position: relative;
      background: var(--black);
      color: var(--white);
      padding: clamp(64px, 9vw, 112px) clamp(18px, 4vw, 56px) 32px;
      overflow: hidden;
      isolation: isolate;
    }

    .closing-orbit {
      position: absolute;
      left: 50%;
      top: 50%;
      width: min(860px, 120vw);
      aspect-ratio: 1;
      border-radius: 50%;
      border: 1px solid rgba(255, 122, 0, 0.14);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: -1;
    }

    .closing-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .closing-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 999px;
      border: 1px solid var(--orange);
      color: var(--orange);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-bottom: 26px;
    }

    .closing-title {
      font-family: var(--font-display);
      font-weight: 800;
      text-transform: uppercase;
      font-size: clamp(44px, 6.4vw, 96px);
      line-height: 0.9;
      letter-spacing: -0.02em;
      margin-bottom: 20px;
      max-width: 980px;
    }

    .closing-title span {
      color: var(--orange);
    }

    .closing-sub {
      max-width: 540px;
      font-size: 15px;
      line-height: 1.65;
      color: var(--muted-dark);
      margin-bottom: 30px;
    }

    .closing-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 18px;
    }

    .cta-outline-white {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 13px 22px;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, 0.34);
      background: transparent;
      color: var(--white);
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s var(--ease-out);
    }

    .cta-outline-white:hover {
      border-color: var(--white);
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    .cta-outline-white:focus-visible,
    .closing-band .cta-orange:focus-visible {
      outline: 2.5px solid var(--white);
      outline-offset: 4px;
    }

    .closing-email-hint {
      font-size: 12px;
      letter-spacing: 0.06em;
      color: var(--muted-dark);
      margin-bottom: clamp(48px, 7vw, 76px);
    }

    .closing-email-hint a {
      color: var(--white);
      text-decoration: underline;
      text-decoration-color: var(--orange);
      text-underline-offset: 4px;
      font-weight: 700;
    }

    /* Swiss Colophon Bar (Note: uses div, never a semantic footer element) */
    .colophon {
      width: 100%;
      padding-top: 24px;
      border-top: 1px solid var(--rule-dark);
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 16px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted-dark);
    }

    .colophon-brand-plate {
      justify-self: start;
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      background: var(--white);
      border-radius: 999px;
    }

    .colophon-brand-plate svg {
      display: block;
      width: 68px;
      height: auto;
    }

    .colophon-legal {
      justify-self: center;
      color: var(--white);
    }

    .colophon-tagline {
      justify-self: end;
      color: var(--orange);
    }

    /* =====================================================================
       INTERACTIVE TACTILE LETTER MODAL DIALOG
       ===================================================================== */
    .letter-overlay[hidden] {
      display: none;
    }

    .letter-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: grid;
      place-items: center;
      padding: clamp(14px, 3vw, 28px);
    }

    .overlay-backdrop {
      position: fixed;
      inset: 0;
      border: 0;
      background: rgba(5, 5, 5, 0.8);
      cursor: pointer;
    }

    .letter-card {
      position: relative;
      z-index: 2;
      width: min(100%, 600px);
      max-height: calc(100dvh - 32px);
      overflow-y: auto;
      background: var(--white);
      color: var(--black);
      border: 2px solid var(--black);
      box-shadow: 12px 12px 0 var(--orange);
      padding: clamp(24px, 4vw, 44px);
      animation: card-enter 0.42s var(--ease-out) both;
    }

    .letter-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--black);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--muted);
      padding-right: 44px;
    }

    .close-letter {
      position: absolute;
      top: clamp(18px, 3vw, 24px);
      right: clamp(18px, 3vw, 24px);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1.5px solid var(--black);
      background: var(--black);
      color: var(--white);
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: background-color 0.2s ease, transform 0.2s var(--ease-out);
    }

    .close-letter:hover {
      background: var(--orange);
      border-color: var(--orange);
      color: var(--black);
      transform: rotate(90deg);
    }

    .letter-postmark {
      position: absolute;
      top: 78px;
      right: clamp(20px, 4vw, 38px);
      width: 78px;
      height: 78px;
      border-radius: 50%;
      border: 2px dashed var(--orange);
      color: var(--orange);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: rotate(12deg);
      pointer-events: none;
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 800;
      line-height: 0.9;
    }

    .letter-postmark span {
      font-family: var(--font-sans);
      font-size: 7px;
      font-weight: 800;
      letter-spacing: 0.14em;
      margin-top: 3px;
    }

    .letter-to {
      display: block;
      margin-top: 24px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--orange-deep);
    }

    .letter-headline {
      font-family: var(--font-display);
      font-weight: 800;
      text-transform: uppercase;
      font-size: clamp(38px, 5vw, 62px);
      line-height: 0.92;
      letter-spacing: -0.02em;
      margin: 12px 0 20px;
      padding-right: 76px;
    }

    .letter-headline span {
      color: var(--orange);
    }

    .letter-paragraph {
      font-size: 15.5px;
      line-height: 1.68;
      color: var(--black);
      margin-bottom: 14px;
    }

    .letter-quote {
      padding: 12px 16px;
      margin: 16px 0 22px;
      background: var(--offwhite);
      border-left: 3px solid var(--orange);
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 21px;
      line-height: 1.3;
      color: var(--black);
    }

    .letter-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding-top: 18px;
      border-top: 1px solid var(--rule-light);
    }

    .letter-signoff {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .letter-signoff strong {
      display: block;
      color: var(--black);
    }

    /* Gentle scroll reveal (always readable even before scroll settlement) */
    .reveal-on-scroll {
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }

    .js-ready .reveal-on-scroll:not(.is-visible) {
      opacity: 0.92;
      transform: translateY(10px);
    }

    /* =====================================================================
       KEYFRAMES
       ===================================================================== */
    @keyframes fade-up {
      from {
        opacity: 0;
        transform: translateY(14px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes line-rise {
      from {
        transform: translateY(108%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes envelope-float {
      0%, 100% {
        transform: rotate(-4deg) translateY(0);
      }
      50% {
        transform: rotate(-2.5deg) translateY(-9px);
      }
    }

    @keyframes shadow-breathe {
      0%, 100% {
        transform: scaleX(1);
        opacity: 0.9;
      }
      50% {
        transform: scaleX(0.92);
        opacity: 0.65;
      }
    }

    @keyframes pulse-dot {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.55);
      }
      70% {
        box-shadow: 0 0 0 7px rgba(255, 122, 0, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 122, 0, 0);
      }
    }

    @keyframes spin-slow {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes bounce-down {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(4px);
      }
    }

    @keyframes ticker-scroll {
      to {
        transform: translateX(-50%);
      }
    }

    @keyframes card-enter {
      from {
        opacity: 0;
        transform: translateY(22px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* =====================================================================
       RESPONSIVE BREAKPOINTS (Tablet <= 1024px, Mobile <= 680px, Small <= 380px)
       ===================================================================== */
    @media (max-width: 1024px) {
      .hero-shell {
        min-height: auto;
        padding-bottom: 24px;
      }

      .hero-columns {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .envelope-stage {
        min-height: 370px;
      }

      .kiosk-grid {
        grid-template-columns: 1fr;
        gap: 38px;
      }

      .kiosk-stage {
        min-height: 410px;
      }

      .awards-header-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .awards-grid,
      .pillars-grid,
      .corp-record-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .about-split {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .corp-cell:nth-child(2n) {
        border-right: 0;
      }

      .corp-cell:nth-child(n+3) {
        border-top: 1px solid var(--rule-light);
      }
    }

    @media (max-width: 680px) {
      .topbar-inner {
        height: 60px;
        padding: 0 16px;
        gap: 10px;
      }

      .brand-divider,
      .brand-tag,
      .dispatch-edition {
        display: none;
      }

      .dispatch-pill {
        padding: 7px 11px;
        font-size: 10px;
      }

      .hero-shell {
        padding: 20px 16px 20px;
        gap: 18px;
      }

      .eyebrow {
        font-size: 10px;
        letter-spacing: 0.12em;
        gap: 8px;
        margin-bottom: 14px;
      }

      .eyebrow-rule {
        width: 16px;
      }

      .hero-title {
        font-size: clamp(38px, 11.4vw, 58px);
        margin-bottom: 14px;
      }

      .hero-lead {
        font-size: 15px;
        margin-bottom: 14px;
      }

      .hero-note {
        padding: 12px 14px;
        font-size: 14px;
        margin-bottom: 18px;
      }

      .hero-actions {
        width: 100%;
      }

      .cta-dark,
      .cta-orange {
        width: 100%;
        justify-content: space-between;
      }

      .hero-direct-line {
        margin-top: 12px;
        font-size: 10px;
        letter-spacing: 0.06em;
        gap: 6px 8px;
      }

      .hero-direct-line a {
        overflow-wrap: anywhere;
      }

      .envelope-stage {
        max-width: 420px;
        margin: 0 auto;
        min-height: 310px;
        padding: 14px 6px 28px;
      }

      .stage-disc {
        width: min(74%, 260px);
      }

      .stage-orbit-outer {
        width: min(92%, 332px);
      }

      .stage-orbit-dashed {
        width: min(84%, 302px);
      }

      .envelope-parallax {
        max-width: 340px;
        width: 90%;
      }

      .swiss-seal {
        width: 68px;
        height: 68px;
        top: 0;
        right: 2px;
      }

      .stamp-tag {
        left: 2px;
        bottom: 24px;
        padding: 6px 9px;
        font-size: 9px;
      }

      .stage-caption {
        right: 4px;
        bottom: 0;
        font-size: 9px;
      }

      .hero-bottom-bar > span:first-child {
        display: none;
      }

      .hero-bottom-bar {
        justify-content: center;
      }

      .scroll-cue {
        font-size: 10px;
        letter-spacing: 0.1em;
      }

      .ticker {
        height: 48px;
      }

      .ticker-track {
        font-size: 19px;
        gap: 28px;
      }

      .section-index-bar {
        font-size: 10px;
        flex-wrap: wrap;
        gap: 6px;
      }

      .kiosk-section,
      .about-band,
      .awards-section {
        padding: 46px 16px;
      }

      .closing-band {
        padding: 52px 16px 26px;
      }

      .kiosk-heading,
      .about-heading,
      .awards-heading {
        font-size: clamp(34px, 9.8vw, 48px);
      }

      .closing-title {
        font-size: clamp(36px, 10.5vw, 52px);
      }

      .kiosk-stage {
        max-width: 420px;
        margin: 0 auto;
        min-height: 380px;
        padding: 52px 10px 54px;
      }

      .kiosk-orange-disc {
        width: min(72%, 270px);
      }

      .kiosk-orbit-ring {
        width: min(90%, 336px);
      }

      .kiosk-photo {
        height: 285px;
      }

      .kiosk-pedestal-shadow {
        bottom: 46px;
      }

      .kiosk-tag {
        width: fit-content;
        max-width: calc(100% - 12px);
        font-size: 9px;
        padding: 7px 10px;
        white-space: nowrap;
        text-align: center;
      }

      .kiosk-tag-top {
        top: 4px;
        left: 0;
        right: 0;
        margin-inline: auto;
        transform: none;
      }

      .kiosk-tag-bottom {
        bottom: 4px;
        left: 0;
        right: 0;
        margin-inline: auto;
        transform: none;
      }

      .telemetry-strip {
        grid-template-columns: 1fr;
      }

      .telemetry-cell + .telemetry-cell {
        border-left: 0;
        border-top: 1px solid #D5D5CF;
        padding-left: 0;
      }

      .about-split {
        margin: 22px 0 24px;
        gap: 20px;
      }

      .about-subtag {
        font-size: 10px;
        letter-spacing: 0.1em;
        line-height: 1.4;
      }

      .field-card {
        box-shadow: 5px 5px 0 var(--black);
      }

      .leader-cell {
        padding: 10px 12px;
        box-shadow: 3px 3px 0 var(--black);
      }

      .leader-name {
        font-size: 19px;
      }

      .pillar-card {
        padding: 16px;
        gap: 8px;
        box-shadow: 4px 4px 0 var(--black);
      }

      .pillar-title {
        font-size: 22px;
      }

      .corp-record-strip {
        box-shadow: 4px 4px 0 var(--black);
      }

      .corp-cell {
        padding: 12px 14px;
      }

      .awards-grid {
        gap: 14px;
      }

      .closing-actions .cta-orange,
      .closing-actions .cta-outline-white {
        width: 100%;
        justify-content: center;
      }

      .closing-email-hint {
        overflow-wrap: anywhere;
        font-size: 11px;
        margin-bottom: 36px;
      }

      .colophon {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 12px;
      }

      .colophon-brand-plate,
      .colophon-legal,
      .colophon-tagline {
        justify-self: center;
      }

      .letter-overlay {
        padding: 12px;
        touch-action: pan-y;
        overscroll-behavior: contain;
      }

      .letter-card {
        max-height: calc(100dvh - 24px);
        padding: 20px 18px;
        box-shadow: 6px 6px 0 var(--orange);
      }

      .letter-meta {
        font-size: 9px;
        padding-bottom: 10px;
        padding-right: 40px;
        flex-wrap: wrap;
        gap: 4px 10px;
      }

      .close-letter {
        top: 14px;
        right: 14px;
        width: 32px;
        height: 32px;
        font-size: 20px;
      }

      .letter-postmark {
        display: none;
      }

      .letter-to {
        margin-top: 14px;
        font-size: 9px;
      }

      .letter-headline {
        font-size: clamp(30px, 8.8vw, 40px);
        margin: 8px 0 12px;
        padding-right: 0;
      }

      .letter-paragraph {
        font-size: 13.5px;
        line-height: 1.54;
        margin-bottom: 10px;
      }

      .letter-quote {
        font-size: 17px;
        padding: 10px 12px;
        margin: 12px 0 14px;
      }

      .letter-actions {
        padding-top: 12px;
        gap: 10px;
      }

      .awards-grid,
      .pillars-grid,
      .leadership-bar,
      .corp-record-strip {
        grid-template-columns: 1fr;
      }

      .corp-cell {
        border-right: 0;
        border-top: 1px solid var(--rule-light);
      }

      .corp-cell:first-child {
        border-top: 0;
      }
    }

    @media (max-width: 380px) {
      .hero-title {
        font-size: 36px;
      }

      .kiosk-heading,
      .about-heading,
      .awards-heading {
        font-size: 32px;
      }

      .closing-title {
        font-size: 33px;
      }

      .hero-direct-line {
        font-size: 9.5px;
        letter-spacing: 0.04em;
      }

      .kiosk-tag {
        font-size: 8.5px;
        letter-spacing: 0.07em;
        padding: 6px 9px;
      }

      .about-subtag {
        font-size: 9.5px;
        letter-spacing: 0.08em;
      }

      .dispatch-pill {
        font-size: 9px;
        letter-spacing: 0.06em;
        padding: 6px 10px;
      }

      .envelope-parallax {
        width: 94%;
      }

      .letter-card {
        padding: 16px 14px;
      }

      .letter-headline {
        font-size: 30px;
      }

      .letter-paragraph {
        font-size: 13px;
        line-height: 1.5;
      }

      .letter-quote {
        font-size: 16px;
        margin: 10px 0 12px;
      }
    }

    @media (max-height: 540px) {
      .letter-overlay {
        place-items: start center;
        overflow-y: auto;
      }

      .letter-card {
        max-height: none;
        margin: 4px auto;
      }
    }

    /* =====================================================================
       REDUCED MOTION RESPECT
       ===================================================================== */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }

      .eyebrow,
      .hero-lead,
      .hero-note,
      .hero-actions {
        opacity: 1 !important;
        transform: none !important;
      }

      .js-ready .reveal-on-scroll:not(.is-visible) {
        opacity: 1 !important;
        transform: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="cursor-reticle" id="cursorReticle" aria-hidden="true"></div>

  <!-- Minimal Top Identity Bar (Immutable Reliv Wordmark on Pure White) -->
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand-lockup" aria-label="Reliv">
        <svg class="brand-wordmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 130" role="img" aria-label="Reliv">
          <path d="M39.77 106.00 L17.36 106.00 L17.36 11.42 L56.08 11.42 Q66.75 11.42 74.49 15.26 Q82.24 19.10 86.39 26.15 Q90.55 33.19 90.55 42.84 L90.55 42.84 Q90.55 52.55 86.30 59.44 Q82.05 66.33 74.17 69.88 Q66.30 73.44 55.45 73.44 L55.45 73.44 L30.76 73.44 L30.76 55.73 L51.39 55.73 Q56.66 55.73 60.18 54.33 Q63.70 52.93 65.51 50.08 Q67.32 47.22 67.32 42.84 L67.32 42.84 Q67.32 38.40 65.51 35.48 Q63.70 32.56 60.15 31.07 Q56.59 29.57 51.32 29.57 L51.32 29.57 L39.77 29.57 L39.77 106.00 Z M93.85 106.00 L69.29 106.00 L46.25 62.77 L70.24 62.77 L93.85 106.00 Z M136.45 107.33 L136.45 107.33 Q125.34 107.33 117.28 102.92 Q109.21 98.51 104.93 90.32 Q100.64 82.13 100.64 70.77 L100.64 70.77 Q100.64 59.85 104.93 51.60 Q109.21 43.35 117.08 38.75 Q124.96 34.14 135.62 34.14 L135.62 34.14 Q143.11 34.14 149.36 36.49 Q155.62 38.84 160.22 43.44 Q164.82 48.05 167.33 54.77 Q169.83 61.50 169.83 70.33 L169.83 70.33 L169.83 75.91 L108.52 75.91 L108.52 63.03 L159.30 63.03 L148.95 66.07 Q148.95 61.12 147.46 57.57 Q145.97 54.01 143.05 52.11 Q140.13 50.20 135.81 50.20 L135.81 50.20 Q131.49 50.20 128.51 52.14 Q125.53 54.08 123.97 57.54 Q122.42 61.00 122.42 65.63 L122.42 65.63 L122.42 74.90 Q122.42 80.36 124.23 84.01 Q126.04 87.66 129.27 89.46 Q132.51 91.27 136.83 91.27 L136.83 91.27 Q139.81 91.27 142.25 90.45 Q144.70 89.62 146.44 87.97 Q148.19 86.32 149.08 83.97 L149.08 83.97 L168.82 87.21 Q167.04 93.30 162.69 97.84 Q158.34 102.38 151.71 104.86 Q145.08 107.33 136.45 107.33 Z M229.31 26.72 L229.31 26.72 Q224.61 26.72 221.25 23.58 Q217.89 20.43 217.89 16.05 L217.89 16.05 Q217.89 11.61 221.25 8.50 Q224.61 5.39 229.31 5.39 L229.31 5.39 Q234.07 5.39 237.44 8.47 Q240.80 11.55 240.80 16.05 L240.80 16.05 Q240.80 20.50 237.44 23.61 Q234.07 26.72 229.31 26.72 Z" fill="#FF7A00"/>
          <path d="M181.45 11.42 L203.60 11.42 L203.60 106.00 L181.45 106.00 L181.45 11.42 Z M240.42 106.00 L218.27 106.00 L218.27 35.03 L240.42 35.03 L240.42 106.00 Z M300.53 106.00 L274.89 106.00 L249.18 35.03 L272.54 35.03 L283.14 69.75 Q285.30 76.74 286.88 84.04 Q288.47 91.34 290.12 99.46 L290.12 99.46 L286.06 99.46 Q287.65 91.34 289.20 84.07 Q290.76 76.80 292.85 69.75 L292.85 69.75 L303.26 35.03 L326.37 35.03 L300.53 106.00 Z" fill="#111111"/>
        </svg>
        <span class="brand-divider" aria-hidden="true"></span>
        <span class="brand-tag">Secret Inbox Mode</span>
      </div>

      <div class="dispatch-status">
        <span class="dispatch-edition">DISPATCH NO. 01</span>
        <span class="dispatch-pill">
          <span class="dispatch-dot" aria-hidden="true"></span>
          INBOX MODE ACTIVE
        </span>
      </div>
    </div>
  </header>

  <main>
    <!-- ===================================================================
         BAND 1: WHITE SWISS HERO + INTERACTIVE ORANGE/WHITE POSTAL ENVELOPE
         =================================================================== -->
    <section class="hero" aria-labelledby="hero-headline">
      <div class="hero-grid-bg" aria-hidden="true"></div>
      <div class="hero-shell">
        <div class="hero-columns">
          <div class="hero-copy">
            <div class="eyebrow">
              <svg class="eyebrow-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8Z"/>
              </svg>
              <span class="eyebrow-rule" aria-hidden="true"></span>
              <span>RELIV — A LITTLE SOMETHING IS HAPPENING.</span>
            </div>

            <h1 id="hero-headline" class="hero-title">
              <span class="line-mask"><span class="line-inner">Hello, Healthcare World.</span></span>
              <span class="line-mask line-accent"><span class="line-inner">You've Got Mail.</span></span>
            </h1>

            <p class="hero-lead">
              We've been building something interesting.<br>
              <strong>And today, we decided to knock on a few inboxes instead of a few doors.</strong>
            </p>

            <div class="hero-note">
              <strong>Dear Healthcare Teams,</strong>
              a little something from Reliv might be waiting in your inbox.
            </div>

            <div class="hero-actions">
              <button type="button" class="cta-dark" id="openLetterButton" aria-controls="letterCard" aria-expanded="false">
                <span>Open the Letter</span>
                <span class="cta-circle" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </button>

              <a class="cta-orange" href="${mailtoHref}">
                <span>Write to Reliv Care</span>
                <span class="cta-circle" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2.5 4.25L8 8.75L13.5 4.25M3 3.5H13C13.83 3.5 14.5 4.17 14.5 5V11C14.5 11.83 13.83 12.5 13 12.5H3C2.17 12.5 1.5 11.83 1.5 11V5C1.5 4.17 2.17 3.5 3 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>

            <div class="hero-direct-line">
              <span>DIRECT DESK:</span>
              <a href="tel:+919163606455">+91 91636 06455</a>
              <span aria-hidden="true">·</span>
              <a href="${mailtoHref}">relivcustomercare.in@gmail.com</a>
            </div>
          </div>

          <!-- Cursor-reactive architectural postal stage -->
          <div class="envelope-stage" id="letterStage">
            <div class="stage-orbit stage-orbit-outer" aria-hidden="true"></div>
            <div class="stage-orbit stage-orbit-dashed" aria-hidden="true"></div>
            <div class="stage-disc" aria-hidden="true"></div>
            <div class="envelope-floor-shadow" aria-hidden="true"></div>

            <!-- Rotating circular Swiss seal -->
            <div class="swiss-seal" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="#050505" stroke-width="2"/>
                <circle cx="60" cy="60" r="44" fill="none" stroke="#FF7A00" stroke-width="1.5" stroke-dasharray="4 4"/>
                <text x="60" y="55" text-anchor="middle" font-family="'Barlow Condensed', sans-serif" font-weight="800" font-size="18" fill="#050505">RELIV</text>
                <text x="60" y="71" text-anchor="middle" font-family="'Manrope', sans-serif" font-weight="800" font-size="8" letter-spacing="1.5" fill="#FF7A00">SEALED</text>
              </svg>
            </div>

            <!-- Cheeky cursor-shifted postal status badge -->
            <div class="stamp-tag" aria-hidden="true">
              <span class="stamp-tag-dot"></span>
              <span>CONFIDENTIAL · EYES ONLY</span>
            </div>

            <div class="envelope-parallax">
              <button
                type="button"
                class="envelope-btn"
                id="envelopeButton"
                aria-label="Unfold Reliv's private postal note"
                aria-controls="letterCard"
                aria-expanded="false"
              >
                <span class="env-shell" aria-hidden="true">
                  <span class="env-back"></span>
                  <span class="env-liner"></span>

                  <span class="env-letter-sheet">
                    <span class="env-sheet-kicker">
                      <span>RELIV CONFIDENTIAL</span>
                      <span>NO. 01</span>
                    </span>
                    <span class="env-sheet-title">Dear Healthcare<br>Teams,</span>
                    <span class="env-sheet-bar"></span>
                    <span class="env-sheet-sub">TAP TO READ PRIVATE NOTE ↗</span>
                  </span>

                  <span class="env-pocket">
                    <span class="env-fold-left"></span>
                    <span class="env-fold-right"></span>
                    <span class="env-fold-bottom"></span>
                    <span class="env-pocket-frame"></span>
                  </span>

                  <span class="env-flap"><span class="env-flap-inner"></span></span>

                  <span class="env-wax-seal">
                    <strong>R®</strong>
                    <span>OPEN</span>
                  </span>

                  <span class="env-postage-stamp">
                    <b>INBOX</b>
                    <span>1ST CLASS</span>
                  </span>
                </span>
              </button>
            </div>

            <div class="stage-caption" aria-hidden="true">CLICK ENVELOPE TO UNFOLD ↗</div>
          </div>
        </div>

        <div class="hero-bottom-bar">
          <span>TEMP HOLD · ALL PUBLIC PAGES</span>
          <a class="scroll-cue" href="#reliv-kiosk">
            <span>MEET THE HARDWARE BEHIND THE NOTE</span>
            <span class="scroll-cue-arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ===================================================================
         KINETIC SWISS MARQUEE STRIP (#050505)
         =================================================================== -->
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        <span><span class="ticker-star">✳</span>HELLO, HEALTHCARE WORLD</span>
        <span><span class="ticker-star">✳</span>YOU'VE GOT MAIL</span>
        <span><span class="ticker-star">✳</span>RELIV MEDICARE PRIVATE LIMITED</span>
        <span><span class="ticker-star">✳</span>DPIIT RECOGNISED DIPP287544</span>
        <span><span class="ticker-star">✳</span>AUTONOMOUS IOT HEALTH KIOSK</span>
        <span><span class="ticker-star">✳</span>LIVE AT IEM GURUKUL CAMPUS</span>
        <span><span class="ticker-star">✳</span>HELLO, HEALTHCARE WORLD</span>
        <span><span class="ticker-star">✳</span>YOU'VE GOT MAIL</span>
        <span><span class="ticker-star">✳</span>RELIV MEDICARE PRIVATE LIMITED</span>
        <span><span class="ticker-star">✳</span>DPIIT RECOGNISED DIPP287544</span>
        <span><span class="ticker-star">✳</span>AUTONOMOUS IOT HEALTH KIOSK</span>
        <span><span class="ticker-star">✳</span>LIVE AT IEM GURUKUL CAMPUS</span>
      </div>
    </div>

    <!-- ===================================================================
         BAND 2: REAL RELIV KIOSK SHOWCASE (#F4F4F2 OFF-WHITE CANVAS)
         =================================================================== -->
    <section class="kiosk-section" id="reliv-kiosk" aria-labelledby="kiosk-section-title">
      <div class="kiosk-container">
        <div class="section-index-bar reveal-on-scroll">
          <span>01 / WHAT WE BUILD — AT A GLANCE</span>
          <span>AUTONOMOUS IOT PREVENTIVE HEALTH KIOSK</span>
        </div>

        <div class="kiosk-grid">
          <div class="kiosk-stage reveal-on-scroll">
            <div class="kiosk-orbit-ring" aria-hidden="true"></div>
            <div class="kiosk-orange-disc" aria-hidden="true"></div>
            <div class="kiosk-pedestal-shadow" aria-hidden="true"></div>

            <div class="kiosk-tag kiosk-tag-top" aria-hidden="true">
              HARDWARE: <span class="kiosk-tag-accent">IOT PILOT-READY</span>
            </div>

            <img
              class="kiosk-photo"
              src="/assets/reliv-health-kiosk-transparent.png"
              alt="Reliv autonomous IoT preventive health kiosk hardware"
              width="640"
              height="1280"
              loading="eager"
              draggable="false"
            />

            <div class="kiosk-tag kiosk-tag-bottom" aria-hidden="true">
              SYSTEM &amp; IP: STRICTLY CONFIDENTIAL ♥
            </div>
          </div>

          <div class="kiosk-copy reveal-on-scroll">
            <div class="kiosk-label">
              <span class="kiosk-label-dot" aria-hidden="true"></span>
              <span>FOR HEALTHCARE GIANTS &amp; INVESTORS</span>
            </div>

            <h2 id="kiosk-section-title" class="kiosk-heading">
              NO <span class="outline-word">SPOILERS.</span><br>
              JUST REAL<br>
              HARDWARE<span class="orange-dot">.</span>
            </h2>

            <p class="kiosk-body">
              No spoilers here. The interesting conversations happen privately. Our walk-up IoT hardware helps hospitals, clinics, campuses, and workplaces deploy trusted preventive infrastructure — while keeping proprietary kiosk workings strictly confidential.
            </p>

            <p class="kiosk-quips">Our website is taking a coffee break. Our ambitions aren't.</p>

            <div class="telemetry-strip">
              <div class="telemetry-cell">
                <span class="telemetry-k">CATEGORY</span>
                <span class="telemetry-v">IoT Preventive MedTech</span>
              </div>
              <div class="telemetry-cell">
                <span class="telemetry-k">DEPLOYMENT</span>
                <span class="telemetry-v">Field-Ready Hardware</span>
              </div>
              <div class="telemetry-cell">
                <span class="telemetry-k">FULL BRIEF</span>
                <span class="telemetry-v">Private Inbox Only</span>
              </div>
            </div>

            <button type="button" class="text-trigger-btn" id="openLetterKioskButton" aria-controls="letterCard" aria-expanded="false">
              <span>READ WHY WE EMAILED YOU</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================================================
         BAND 2.2: WHO WE ARE, PREVENTIVE MISSION & FIELD DEPLOYMENT (#FF7A00)
         =================================================================== -->
    <section class="about-band" id="reliv-about" aria-labelledby="about-section-title">
      <div class="about-container">
        <div class="section-index-bar reveal-on-scroll">
          <span>02 / WHO WE ARE &amp; WHAT WE DO</span>
          <span>RELIV MEDICARE PRIVATE LIMITED · KOLKATA</span>
        </div>

        <div class="about-split reveal-on-scroll">
          <div class="about-copy-col">
            <div class="about-badge-row">
              <span class="about-box-stamp">DPIIT RECOGNISED</span>
              <span class="about-subtag">DIPP287544 · GOVT. OF INDIA · STARTUP INDIA</span>
            </div>

            <h2 id="about-section-title" class="about-heading">
              MAKING PREVENTIVE<br>
              <span>HEALTH ACCESSIBLE.</span>
            </h2>

            <p class="about-lead">
              <strong>Reliv Medicare Private Limited</strong> is a Kolkata-based IoT MedTech company on a mission to make everyday preventive healthcare accessible at scale. Because over 70% of fatal health events stem from undetected lifestyle markers, we engineered autonomous field hardware ready for high-footfall institutions — keeping how our system operates internally and unit economics strictly confidential for invited partners and investors.
            </p>

            <div class="leadership-bar" aria-label="Reliv founding leadership">
${renderLeadershipMarkup()}
            </div>
          </div>

          <div class="field-card">
            <div class="field-media">
              <img
                src="/assets/demo-poster.jpg"
                alt="Live Reliv smart IoT health kiosk deployed in Kolkata"
                loading="eager"
                draggable="false"
              />
              <span class="field-badge">FIELD DEPLOYMENT · KOLKATA</span>
            </div>
            <div class="field-body">
              <span class="field-kicker">LIVE CAMPUS PILOT · SALT LAKE SECTOR V</span>
              <h3 class="field-title">Active at IEM Gurukul Campus</h3>
              <p class="field-desc">
                Operating live in Kolkata as a compact, unattended institutional installation engineered cleanly for hospitals, diagnostic networks, colleges, workplaces, and gyms.
              </p>
            </div>
          </div>
        </div>

        <div class="pillars-grid reveal-on-scroll">
${renderCompanyPillarsMarkup()}
        </div>

        <div class="corp-record-strip reveal-on-scroll" aria-label="Company verification records">
${renderCorpRecordsMarkup()}
        </div>
      </div>
    </section>

    <!-- ===================================================================
         BAND 2.5: AWARDS & RECOGNITIONS (#FFFFFF SWISS GALLERY)
         =================================================================== -->
    <section class="awards-section" id="reliv-awards" aria-labelledby="awards-section-title">
      <div class="awards-container">
        <div class="section-index-bar reveal-on-scroll">
          <span>03 / PROOF BEHIND THE PITCH</span>
          <span>AWARDS &amp; RECOGNITIONS</span>
        </div>

        <div class="awards-header-row reveal-on-scroll">
          <div>
            <div class="kiosk-label">
              <span class="kiosk-label-dot" aria-hidden="true"></span>
              <span>VERIFIED HONOURS</span>
            </div>
            <h2 id="awards-section-title" class="awards-heading">
              TAKING A BREAK?<br>
              OUR <span>TROPHIES AREN'T.</span>
            </h2>
          </div>

          <p class="awards-lead">
            Credibility comes first for any hospital pilot or institutional backing. Beyond the playful note, Reliv's hardware already holds clinical jury trophies and Government of India startup accreditation:
          </p>
        </div>

        <div class="awards-grid reveal-on-scroll">
          <a class="award-card" href="/assets/awards/medverse-oscars-of-healthcare-trophy.jpg" target="_blank" rel="noopener noreferrer">
            <div class="award-media">
              <img src="/assets/awards/medverse-oscars-of-healthcare-trophy.jpg" alt="The Oscars of Healthcare trophy awarded to Reliv Medicare at Medverse 2026" loading="eager" draggable="false">
            </div>
            <div class="award-body">
              <div class="award-meta">
                <span>MEDVERSE 2026 · IMA SALEM</span>
                <span class="award-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 class="award-title">The Oscars of Healthcare</h3>
              <p class="award-desc">Winner for Excellence in MedTech Device / Equipment Startup, judged by clinical leaders.</p>
            </div>
          </a>

          <a class="award-card" href="/certificate.pdf" target="_blank" rel="noopener noreferrer">
            <div class="award-media award-media--doc">
              <img src="/assets/dpiit-recognition-certificate.jpg" alt="DPIIT Certificate of Recognition DIPP287544 from Government of India" loading="eager" draggable="false">
            </div>
            <div class="award-body">
              <div class="award-meta">
                <span>GOVT. OF INDIA · DIPP287544</span>
                <span class="award-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 class="award-title">DPIIT Startup India</h3>
              <p class="award-desc">Official startup recognition under the Department for Promotion of Industry &amp; Internal Trade.</p>
            </div>
          </a>

          <a class="award-card" href="/assets/awards/bengal-e-summit-investopia-trophy.jpg" target="_blank" rel="noopener noreferrer">
            <div class="award-media">
              <img src="/assets/awards/bengal-e-summit-investopia-trophy.jpg" alt="Bengal E-Summit 2026 Investopia 1st Runner Up trophy won by Reliv" loading="eager" draggable="false">
            </div>
            <div class="award-body">
              <div class="award-meta">
                <span>IEM &amp; UEM KOLKATA · 2026</span>
                <span class="award-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 class="award-title">Investopia 1st Runner Up</h3>
              <p class="award-desc">Ranked #2 startup across Eastern India at Bengal E-Summit 2026 by engineering &amp; venture juries.</p>
            </div>
          </a>

          <a class="award-card" href="/assets/awards/medverse-oscars-of-healthcare-certificate.jpg" target="_blank" rel="noopener noreferrer">
            <div class="award-media">
              <img src="/assets/awards/medverse-oscars-of-healthcare-certificate.jpg" alt="Official IMA Salem and Medverse 2026 Citation for Reliv Medicare" loading="eager" draggable="false">
            </div>
            <div class="award-body">
              <div class="award-meta">
                <span>IMA SALEM · CITATION</span>
                <span class="award-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 class="award-title">MedTech Excellence Citation</h3>
              <p class="award-desc">Certified honour presented by Medverse and Indian Medical Association Salem for preventive impact.</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ===================================================================
         BAND 3: NEAR-BLACK CLOSING DISPATCH + IMMUTABLE LOGO COLOPHON
         =================================================================== -->
    <section class="closing-band" aria-labelledby="closing-headline">
      <div class="closing-orbit" aria-hidden="true"></div>
      <div class="closing-inner reveal-on-scroll">
        <div class="closing-badge">DIRECT REPLY LINE</div>

        <h2 id="closing-headline" class="closing-title">
          THE INTERESTING CONVERSATIONS<br>
          <span>HAPPEN PRIVATELY.</span>
        </h2>

        <p class="closing-sub">
          Spotted our note in your inbox — or exploring Reliv for your hospital chain, diagnostic network, campus, or portfolio? Reach our founders directly to view live kiosk demos, pilots, and our private roadmap.
        </p>

        <div class="closing-actions">
          <a class="cta-orange" href="${mailtoHref}">
            <span>Open Mail & Write to Reliv</span>
            <span class="cta-circle" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <a class="cta-outline-white" href="tel:+919163606455">
            <span>Call +91 91636 06455</span>
          </a>

          <button type="button" class="cta-outline-white" id="openLetterCloseButton" aria-controls="letterCard" aria-expanded="false">
            <span>Inspect the Letter</span>
          </button>
        </div>

        <div class="closing-email-hint">
          Direct desk: <a href="tel:+919163606455">+91 91636 06455</a> · <a href="${mailtoHref}">relivcustomercare.in@gmail.com</a>
        </div>

        <!-- Bottom signature colophon (non-footer element for clean Inbox Mode boundaries) -->
        <div class="colophon">
          <div class="colophon-brand-plate" aria-label="Reliv">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 130" role="img" aria-label="Reliv">
              <path d="M39.77 106.00 L17.36 106.00 L17.36 11.42 L56.08 11.42 Q66.75 11.42 74.49 15.26 Q82.24 19.10 86.39 26.15 Q90.55 33.19 90.55 42.84 L90.55 42.84 Q90.55 52.55 86.30 59.44 Q82.05 66.33 74.17 69.88 Q66.30 73.44 55.45 73.44 L55.45 73.44 L30.76 73.44 L30.76 55.73 L51.39 55.73 Q56.66 55.73 60.18 54.33 Q63.70 52.93 65.51 50.08 Q67.32 47.22 67.32 42.84 L67.32 42.84 Q67.32 38.40 65.51 35.48 Q63.70 32.56 60.15 31.07 Q56.59 29.57 51.32 29.57 L51.32 29.57 L39.77 29.57 L39.77 106.00 Z M93.85 106.00 L69.29 106.00 L46.25 62.77 L70.24 62.77 L93.85 106.00 Z M136.45 107.33 L136.45 107.33 Q125.34 107.33 117.28 102.92 Q109.21 98.51 104.93 90.32 Q100.64 82.13 100.64 70.77 L100.64 70.77 Q100.64 59.85 104.93 51.60 Q109.21 43.35 117.08 38.75 Q124.96 34.14 135.62 34.14 L135.62 34.14 Q143.11 34.14 149.36 36.49 Q155.62 38.84 160.22 43.44 Q164.82 48.05 167.33 54.77 Q169.83 61.50 169.83 70.33 L169.83 70.33 L169.83 75.91 L108.52 75.91 L108.52 63.03 L159.30 63.03 L148.95 66.07 Q148.95 61.12 147.46 57.57 Q145.97 54.01 143.05 52.11 Q140.13 50.20 135.81 50.20 L135.81 50.20 Q131.49 50.20 128.51 52.14 Q125.53 54.08 123.97 57.54 Q122.42 61.00 122.42 65.63 L122.42 65.63 L122.42 74.90 Q122.42 80.36 124.23 84.01 Q126.04 87.66 129.27 89.46 Q132.51 91.27 136.83 91.27 L136.83 91.27 Q139.81 91.27 142.25 90.45 Q144.70 89.62 146.44 87.97 Q148.19 86.32 149.08 83.97 L149.08 83.97 L168.82 87.21 Q167.04 93.30 162.69 97.84 Q158.34 102.38 151.71 104.86 Q145.08 107.33 136.45 107.33 Z M229.31 26.72 L229.31 26.72 Q224.61 26.72 221.25 23.58 Q217.89 20.43 217.89 16.05 L217.89 16.05 Q217.89 11.61 221.25 8.50 Q224.61 5.39 229.31 5.39 L229.31 5.39 Q234.07 5.39 237.44 8.47 Q240.80 11.55 240.80 16.05 L240.80 16.05 Q240.80 20.50 237.44 23.61 Q234.07 26.72 229.31 26.72 Z" fill="#FF7A00"/>
              <path d="M181.45 11.42 L203.60 11.42 L203.60 106.00 L181.45 106.00 L181.45 11.42 Z M240.42 106.00 L218.27 106.00 L218.27 35.03 L240.42 35.03 L240.42 106.00 Z M300.53 106.00 L274.89 106.00 L249.18 35.03 L272.54 35.03 L283.14 69.75 Q285.30 76.74 286.88 84.04 Q288.47 91.34 290.12 99.46 L290.12 99.46 L286.06 99.46 Q287.65 91.34 289.20 84.07 Q290.76 76.80 292.85 69.75 L292.85 69.75 L303.26 35.03 L326.37 35.03 L300.53 106.00 Z" fill="#111111"/>
            </svg>
          </div>
          <span class="colophon-legal">RELIV®</span>
          <span class="colophon-tagline">YOU MATTER. RELIV CARES.</span>
        </div>
      </div>
    </section>
  </main>

  <!-- ===================================================================
       INTERACTIVE UNFOLDING PAPER LETTER DIALOG
       =================================================================== -->
  <div class="letter-overlay" id="letterOverlay" hidden>
    <button type="button" class="overlay-backdrop" id="closeBackdrop" aria-label="Close letter"></button>
    <div
      class="letter-card"
      id="letterCard"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letterModalTitle"
      tabindex="-1"
    >
      <div class="letter-meta">
        <span>CONFIDENTIAL · HEALTHCARE &amp; INVESTOR BRIEF</span>
        <span>PRIVATE INBOX NOTE</span>
      </div>

      <button type="button" class="close-letter" id="closeLetter" aria-label="Close letter">×</button>

      <div class="letter-postmark" aria-hidden="true">
        HI!
        <span>RELIV 2026</span>
      </div>

      <span class="letter-to">TO: HEALTHCARE LEADERS, HOSPITAL TEAMS &amp; INVESTORS</span>

      <h2 id="letterModalTitle" class="letter-headline">
        WHY WE'RE IN<br>
        YOUR <span>INBOX.</span>
      </h2>

      <p class="letter-paragraph">
        <strong>Dear Healthcare Teams,</strong> a little something from Reliv might be waiting in your inbox. At <strong>Reliv Medicare Private Limited</strong> (Kolkata), we're building turnkey IoT preventive health hardware engineered for hospitals, clinics, campuses, and high-footfall institutional lobbies.
      </p>

      <p class="letter-paragraph">
        No spoilers here. The interesting conversations happen privately. Because our product workings, proprietary architecture, and commercial economics are strictly confidential, we share live demos and partner briefs exclusively one-to-one by email or call.
      </p>

      <div class="letter-quote">
        Our website is taking a coffee break. Our ambitions aren't.
      </div>

      <div class="letter-actions">
        <div class="letter-signoff">
          <strong>RELIV®</strong>
          YOU MATTER. RELIV CARES.
          <br>
          <a class="letter-phone-link" href="tel:+919163606455">+91 91636 06455</a>
        </div>

        <a class="cta-orange" href="${mailtoHref}">
          <span>Reply via Email</span>
          <span class="cta-circle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
    </div>
  </div>

  <script>
    (() => {
      document.documentElement.classList.add('js-ready');

      const envelope = document.getElementById('envelopeButton');
      const letterStage = document.getElementById('letterStage');
      const letterOverlay = document.getElementById('letterOverlay');
      const letterCard = document.getElementById('letterCard');
      const closeLetter = document.getElementById('closeLetter');
      const closeBackdrop = document.getElementById('closeBackdrop');
      const triggers = [
        envelope,
        document.getElementById('openLetterButton'),
        document.getElementById('openLetterKioskButton'),
        document.getElementById('openLetterCloseButton')
      ].filter(Boolean);

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let lastTrigger = null;
      let openDelayTimer = null;

      function setExpanded(state) {
        for (const el of triggers) {
          el.setAttribute('aria-expanded', state ? 'true' : 'false');
        }
      }

      function revealOverlay() {
        letterOverlay.hidden = false;
        document.body.classList.add('modal-open');
        setExpanded(true);
        requestAnimationFrame(() => closeLetter?.focus());
      }

      function openLetterModal(triggerEl) {
        lastTrigger = triggerEl || document.activeElement;
        if (openDelayTimer) {
          clearTimeout(openDelayTimer);
          openDelayTimer = null;
        }
        envelope?.classList.add('is-open');

        // Let the physical envelope unfold for a beat unless reduced motion is preferred
        const delayMs = reducedMotion ? 0 : (triggerEl === envelope ? 280 : 120);
        if (delayMs === 0) {
          revealOverlay();
        } else {
          openDelayTimer = setTimeout(revealOverlay, delayMs);
        }
      }

      function closeLetterModal() {
        if (openDelayTimer) {
          clearTimeout(openDelayTimer);
          openDelayTimer = null;
        }
        letterOverlay.hidden = true;
        document.body.classList.remove('modal-open');
        envelope?.classList.remove('is-open');
        setExpanded(false);
        if (lastTrigger && typeof lastTrigger.focus === 'function') {
          lastTrigger.focus();
        }
      }

      for (const el of triggers) {
        el.addEventListener('click', () => openLetterModal(el));
      }

      closeLetter?.addEventListener('click', closeLetterModal);
      closeBackdrop?.addEventListener('click', closeLetterModal);

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !letterOverlay.hidden) {
          closeLetterModal();
        }
      });

      // Keep keyboard Tab trapped cleanly inside open modal
      letterCard?.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || letterOverlay.hidden) return;
        const focusables = letterCard.querySelectorAll('a[href], button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      // Scroll-linked subtle reveal with guaranteed visibility safety
      const revealNodes = Array.from(document.querySelectorAll('.reveal-on-scroll'));
      const markPassedReveals = () => {
        const cutoff = window.innerHeight + 120;
        for (const node of revealNodes) {
          if (node.classList.contains('is-visible')) continue;
          if (node.getBoundingClientRect().top <= cutoff) {
            node.classList.add('is-visible');
          }
        }
      };

      if ('IntersectionObserver' in window && !reducedMotion) {
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }
        }, { rootMargin: '120px 0px', threshold: 0.01 });

        revealNodes.forEach((node) => observer.observe(node));
        window.addEventListener('scroll', markPassedReveals, { passive: true });
        markPassedReveals();
      } else {
        revealNodes.forEach((node) => node.classList.add('is-visible'));
      }

      // Desktop fine-pointer parallax for the postal stage & cursor reticle
      if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
        const reticle = document.getElementById('cursorReticle');

        document.addEventListener('pointermove', (event) => {
          if (reticle) {
            reticle.classList.add('is-visible');
            reticle.style.left = event.clientX + 'px';
            reticle.style.top = event.clientY + 'px';
          }
        }, { passive: true });

        document.addEventListener('pointerover', (event) => {
          const target = event.target;
          if (reticle && target instanceof Element && target.closest('a, button')) {
            reticle.classList.add('is-active');
          }
        });

        document.addEventListener('pointerout', (event) => {
          const target = event.target;
          if (reticle && target instanceof Element && target.closest('a, button')) {
            reticle.classList.remove('is-active');
          }
        });

        if (letterStage) {
          letterStage.addEventListener('pointermove', (event) => {
            const rect = letterStage.getBoundingClientRect();
            const nx = (event.clientX - rect.left) / rect.width - 0.5;
            const ny = (event.clientY - rect.top) / rect.height - 0.5;
            letterStage.style.setProperty('--mx', (nx * 18).toFixed(1) + 'px');
            letterStage.style.setProperty('--my', (ny * 14).toFixed(1) + 'px');
          }, { passive: true });

          letterStage.addEventListener('pointerleave', () => {
            letterStage.style.setProperty('--mx', '0px');
            letterStage.style.setProperty('--my', '0px');
          });
        }
      }

      // Prevent accidental pinch-zoom, double-tap zoom, and text/image copy across mobile & desktop
      ['gesturestart', 'gesturechange', 'gestureend'].forEach((evt) => {
        document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
      });

      document.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 1) e.preventDefault();
      }, { passive: false });

      document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 1) e.preventDefault();
      }, { passive: false });

      let lastTouchEnd = 0;
      document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 320 && !e.target?.closest?.('a, button')) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      }, { passive: false });

      document.addEventListener('wheel', (e) => {
        if (e.ctrlKey) e.preventDefault();
      }, { passive: false });

      ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'].forEach((evt) => {
        document.addEventListener(evt, (e) => e.preventDefault());
      });

      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'a', 's', 'u'].includes(e.key.toLowerCase())) {
          e.preventDefault();
        }
      });
    })();
  </script>
</body>
</html>`;
}
