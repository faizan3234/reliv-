/**
 * Renders the self-contained HTML for Reliv's Secret Inbox Mode takeover.
 * Zero external CSS/JS dependencies so it renders immediately with zero flash
 * of the underlying site and keeps confidential/internal info untouched.
 */
export function renderInboxModeHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#FF6B24">
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
  <link href="https://fonts.googleapis.com/css2?family=Manrope:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet">

  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --reliv-orange: #FF6B24;
      --reliv-orange-light: #FF7E3D;
      --reliv-orange-deep: #F15811;
      --ink-white: #FFFFFF;
      --ink-charcoal: #17120F;
      --ink-charcoal-soft: rgba(23, 18, 15, 0.84);
      --font-sans: 'Manrope', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    html {
      height: 100%;
      background-color: var(--reliv-orange);
      -webkit-text-size-adjust: 100%;
    }

    body {
      min-height: 100dvh;
      width: 100%;
      overflow-x: clip;
      font-family: var(--font-sans);
      background-color: var(--reliv-orange);
      color: var(--ink-charcoal);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: clamp(28px, 5.5vh, 56px) clamp(20px, 5vw, 48px) clamp(24px, 4.5vh, 44px);
      position: relative;
      isolation: isolate;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Ultra-slow ambient warm gradient sweep over signature #FF6B24 canvas */
    .ambient-bg {
      position: fixed;
      inset: -25%;
      z-index: -1;
      pointer-events: none;
      background:
        radial-gradient(65% 55% at 22% 24%, rgba(255, 160, 102, 0.34) 0%, rgba(255, 107, 36, 0) 70%),
        radial-gradient(60% 55% at 78% 76%, rgba(214, 62, 0, 0.32) 0%, rgba(255, 107, 36, 0) 72%),
        linear-gradient(135deg, var(--reliv-orange-light) 0%, var(--reliv-orange) 48%, var(--reliv-orange-deep) 100%);
      background-size: 140% 140%;
      animation: ambientDrift 30s ease-in-out infinite alternate;
    }

    .top-balance {
      height: clamp(0px, 1.5vh, 18px);
      flex-shrink: 0;
    }

    .stage {
      width: 100%;
      max-width: 780px;
      margin: auto 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Subtle floating envelope with restrained 3s loop */
    .envelope-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: clamp(18px, 3.2vh, 30px);
      animation: fadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .envelope-float {
      position: relative;
      width: clamp(58px, 11vw, 76px);
      height: auto;
      animation: envelopeFloat 3s ease-in-out infinite;
      will-change: transform;
    }

    .envelope-svg {
      display: block;
      width: 100%;
      height: auto;
      filter: drop-shadow(0 14px 28px rgba(130, 36, 0, 0.18));
    }

    /* Occasional quiet notification dot pulse */
    .notify-dot {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--ink-white);
      border: 2px solid var(--reliv-orange);
      box-shadow: 0 2px 8px rgba(120, 32, 0, 0.25);
    }

    .notify-dot::after {
      content: "";
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.85);
      opacity: 0;
      animation: dotPulse 4.6s ease-out infinite;
    }

    .eyebrow {
      font-size: clamp(10.5px, 2vw, 12px);
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--ink-charcoal);
      opacity: 0.9;
      margin-bottom: clamp(12px, 2vh, 20px);
      line-height: 1.5;
      animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
    }

    .headline {
      font-size: clamp(2rem, 5.1vw, 3.75rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -0.035em;
      color: var(--ink-white);
      margin-bottom: clamp(18px, 3.2vh, 30px);
      animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.14s both;
    }

    .copy {
      max-width: 580px;
      display: flex;
      flex-direction: column;
      gap: clamp(11px, 1.9vh, 16px);
      font-size: clamp(0.94rem, 1.95vw, 1.06rem);
      font-weight: 500;
      line-height: 1.58;
      color: var(--ink-charcoal-soft);
      animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.24s both;
    }

    .copy p {
      text-wrap: pretty;
    }

    .copy .callout {
      color: var(--ink-charcoal);
      font-weight: 700;
      padding: clamp(2px, 0.5vh, 5px) 0;
    }

    .closing {
      margin-top: clamp(18px, 3.2vh, 30px);
      font-size: clamp(0.875rem, 1.85vw, 0.98rem);
      font-weight: 500;
      font-style: italic;
      line-height: 1.55;
      color: var(--ink-charcoal);
      opacity: 0.88;
      max-width: 500px;
      animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.34s both;
    }

    .signature {
      margin-top: clamp(22px, 4vh, 42px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      text-align: center;
      color: var(--ink-charcoal);
      animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both;
    }

    .signature-brand {
      font-size: clamp(11.5px, 2.2vw, 13px);
      font-weight: 800;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--ink-white);
    }

    .signature-brand sup {
      font-size: 0.65em;
      letter-spacing: 0;
      vertical-align: super;
      margin-left: 1px;
    }

    .signature-tagline {
      font-size: clamp(9.5px, 1.8vw, 11px);
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink-charcoal);
      opacity: 0.82;
    }

    @keyframes ambientDrift {
      0% {
        transform: translate3d(-2%, -1.5%, 0) scale(1);
        background-position: 0% 35%;
      }
      100% {
        transform: translate3d(2%, 1.5%, 0) scale(1.04);
        background-position: 100% 65%;
      }
    }

    @keyframes envelopeFloat {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-7px);
      }
    }

    @keyframes dotPulse {
      0%, 62% {
        transform: scale(0.85);
        opacity: 0;
      }
      72% {
        transform: scale(1);
        opacity: 0.9;
      }
      92%, 100% {
        transform: scale(2.15);
        opacity: 0;
      }
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(14px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 480px) {
      .eyebrow {
        letter-spacing: 0.14em;
      }
      .headline {
        font-size: clamp(1.85rem, 8.2vw, 2.5rem);
        line-height: 1.09;
      }
    }

    @media (max-width: 360px), (max-height: 640px) {
      body {
        padding: 20px 16px 18px;
      }
      .top-balance {
        display: none;
      }
      .envelope-wrap {
        margin-bottom: 14px;
      }
      .envelope-float {
        width: 54px;
      }
      .eyebrow {
        font-size: 10px;
        letter-spacing: 0.13em;
        margin-bottom: 10px;
      }
      .headline {
        font-size: clamp(1.7rem, 7.6vw, 2.15rem);
        margin-bottom: 14px;
      }
      .copy {
        gap: 9px;
        font-size: 0.875rem;
        line-height: 1.5;
      }
      .closing {
        margin-top: 14px;
        font-size: 0.83rem;
      }
      .signature {
        margin-top: 18px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .ambient-bg,
      .envelope-wrap,
      .envelope-float,
      .notify-dot::after,
      .eyebrow,
      .headline,
      .copy,
      .closing,
      .signature {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
      .notify-dot::after {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="ambient-bg" aria-hidden="true"></div>
  <div class="top-balance" aria-hidden="true"></div>

  <main class="stage">
    <div class="envelope-wrap" aria-hidden="true">
      <div class="envelope-float">
        <svg class="envelope-svg" viewBox="0 0 84 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="80" height="56" rx="12" fill="rgba(255, 255, 255, 0.14)" stroke="rgba(255, 255, 255, 0.92)" stroke-width="2.2"/>
          <path d="M5 10L39.04 34.43C40.81 35.7 43.19 35.7 44.96 34.43L79 10" stroke="rgba(255, 255, 255, 0.94)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 51L30 31.5M77 51L54 31.5" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <span class="notify-dot"></span>
      </div>
    </div>

    <p class="eyebrow">RELIV — A LITTLE SOMETHING IS HAPPENING.</p>

    <h1 class="headline">
      Hello, Healthcare World.<br>
      You've Got Mail.
    </h1>

    <div class="copy">
      <p>We've been building something interesting.</p>
      <p>And today, we decided to knock on a few inboxes instead of a few doors.</p>
      <p class="callout">Dear Healthcare Teams,<br>a little something from Reliv might be waiting in your inbox.</p>
      <p>No spoilers here. The interesting conversations happen privately.</p>
    </div>

    <p class="closing">Our website is taking a coffee break. Our ambitions aren't.</p>
  </main>

  <div class="signature" aria-label="Reliv signature">
    <span class="signature-brand">RELIV<sup>&reg;</sup></span>
    <span class="signature-tagline">YOU MATTER. RELIV CARES.</span>
  </div>
</body>
</html>`;
}

