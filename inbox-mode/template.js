/**
 * Renders the self-contained HTML for Reliv's Secret Inbox Mode takeover.
 * Styled to match Reliv's signature Lando-inspired editorial motorsport palette
 * (#fff9f2 warm paper, #20211e carbon Barlow Condensed, #f36c21 / #FF6B24 orange,
 * Instrument Serif italic wit, and orbit telemetry hairlines) featuring the real
 * Reliv wordmark SVG and a direct mailto launch to Reliv Customer Care.
 */
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
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#f36c21">
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
      --orange: #f36c21;
      --orange-bright: #FF6B24;
      --orange-deep: #c33c0d;
      --ink: #20211e;
      --ink-soft: #4e4740;
      --paper: #fff9f2;
      --paper-alt: #f5ede2;
      --rule: #ddd4c8;
      --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
      --font-display: 'Barlow Condensed', Impact, sans-serif;
      --font-serif: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    html {
      height: 100%;
      background-color: var(--paper);
      -webkit-text-size-adjust: 100%;
    }

    body {
      min-height: 100dvh;
      width: 100%;
      overflow-x: clip;
      font-family: var(--font-sans);
      background-color: var(--paper);
      color: var(--ink);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: clamp(14px, 2.2vh, 28px) 4% clamp(12px, 2vh, 24px);
      position: relative;
      isolation: isolate;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Subtle Lando-inspired ambient glow & telemetry grid/orbit layer */
    .ambient-bg {
      position: absolute;
      inset: 0;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }

    .ambient-layer {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(62% 52% at 50% 42%, rgba(243, 108, 33, 0.13) 0%, rgba(255, 249, 242, 0) 74%),
        radial-gradient(48% 44% at 15% 88%, rgba(255, 107, 36, 0.08) 0%, rgba(255, 249, 242, 0) 70%),
        radial-gradient(44% 40% at 86% 14%, rgba(243, 108, 33, 0.07) 0%, rgba(255, 249, 242, 0) 70%),
        var(--paper);
      background-size: 130% 130%;
      animation: ambientDrift 30s ease-in-out infinite alternate;
    }

    .orbit-ring {
      position: absolute;
      left: 50%;
      top: 50%;
      width: min(86vw, 880px);
      height: min(38vw, 340px);
      border: 1px solid rgba(243, 108, 33, 0.16);
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(-9deg);
      pointer-events: none;
    }

    .orbit-ring::after {
      content: "";
      position: absolute;
      inset: 18px 28px;
      border: 1px dashed rgba(32, 33, 30, 0.08);
      border-radius: 50%;
      transform: rotate(15deg);
    }

    /* Minimal top brand bar — real Reliv SVG wordmark + live telemetry pill (no nav/menu links) */
    .brand-bar {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: clamp(10px, 1.5vh, 16px);
      border-bottom: 1px solid var(--rule);
      animation: fadeUp 0.7s var(--ease-spring) both;
    }

    .brand-logo {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    .brand-logo svg {
      height: clamp(28px, 3.8vw, 38px);
      width: auto;
      display: block;
    }

    .telemetry-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid #e7d9c8;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink);
      white-space: nowrap;
    }

    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--orange-bright);
      box-shadow: 0 0 0 3px rgba(243, 108, 33, 0.22);
      animation: pulseRing 2.8s ease-in-out infinite;
    }

    /* Center Stage */
    .stage {
      width: 100%;
      max-width: 840px;
      margin: auto;
      padding: clamp(12px, 2vh, 26px) 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Subtle tactile floating envelope emblem */
    .envelope-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: clamp(10px, 1.8vh, 20px);
      animation: fadeUp 0.75s var(--ease-spring) 0.05s both;
    }

    .envelope-float {
      position: relative;
      width: clamp(54px, 7.5vw, 70px);
      height: clamp(40px, 5.8vw, 52px);
      border-radius: 14px;
      background: linear-gradient(155deg, #ffffff 0%, #fff4e8 100%);
      border: 1.5px solid #e6d3be;
      box-shadow: 0 14px 30px -12px rgba(243, 108, 33, 0.35), 0 4px 10px -4px rgba(32, 33, 30, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      animation: envelopeFloat 3s ease-in-out infinite;
      will-change: transform;
    }

    .envelope-svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .notify-dot {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--orange-bright);
      border: 2.5px solid var(--paper);
      box-shadow: 0 3px 8px rgba(243, 108, 33, 0.45);
    }

    .notify-dot::after {
      content: "";
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 1.5px solid var(--orange-bright);
      opacity: 0;
      animation: dotPulse 4.6s ease-out infinite;
    }

    .eyebrow {
      font-size: clamp(10.5px, 1.8vw, 12px);
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--orange-deep);
      margin-bottom: clamp(8px, 1.5vh, 14px);
      line-height: 1.4;
      animation: fadeUp 0.8s var(--ease-spring) 0.1s both;
    }

    .headline {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(2.45rem, min(7.2vw, 9vh), 5.3rem);
      line-height: 0.92;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      color: var(--ink);
      margin-bottom: clamp(12px, 2.2vh, 22px);
      animation: fadeUp 0.85s var(--ease-spring) 0.16s both;
    }

    .headline .accent-line {
      display: block;
      color: var(--orange-bright);
      margin-top: clamp(2px, 0.5vh, 6px);
    }

    .copy {
      max-width: 590px;
      display: flex;
      flex-direction: column;
      gap: clamp(6px, 1.05vh, 12px);
      font-size: clamp(0.9rem, 1.6vw, 1.02rem);
      font-weight: 500;
      line-height: 1.52;
      color: var(--ink-soft);
      animation: fadeUp 0.85s var(--ease-spring) 0.24s both;
    }

    .copy p {
      text-wrap: pretty;
    }

    .copy .callout {
      margin: clamp(3px, 0.6vh, 7px) auto;
      padding: clamp(9px, 1.4vh, 13px) clamp(15px, 3vw, 23px);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.78);
      border: 1px solid #ebd8c4;
      box-shadow: 0 8px 24px -16px rgba(32, 33, 30, 0.16);
      color: var(--ink);
      font-weight: 700;
      line-height: 1.45;
      width: fit-content;
      max-width: 100%;
    }

    .closing {
      margin-top: clamp(10px, 1.8vh, 20px);
      font-family: var(--font-serif);
      font-style: italic;
      font-weight: 400;
      font-size: clamp(1.18rem, 2.2vw, 1.52rem);
      line-height: 1.28;
      color: var(--ink);
      max-width: 520px;
      animation: fadeUp 0.85s var(--ease-spring) 0.32s both;
    }

    /* Tactile Lando-style mail CTA */
    .contact-zone {
      margin-top: clamp(14px, 2.3vh, 25px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 7px;
      animation: fadeUp 0.85s var(--ease-spring) 0.4s both;
    }

    .mail-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-height: 50px;
      padding: 12px 24px 12px 22px;
      border-radius: 999px;
      background: var(--ink);
      color: var(--paper);
      font-family: var(--font-sans);
      font-size: clamp(0.88rem, 1.7vw, 0.96rem);
      font-weight: 800;
      letter-spacing: -0.01em;
      text-decoration: none;
      border: 1.5px solid var(--ink);
      box-shadow: 0 12px 28px -10px rgba(32, 33, 30, 0.36);
      transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s var(--ease-spring), box-shadow 0.25s ease;
    }

    .mail-pill:hover,
    .mail-pill:focus-visible {
      background: var(--orange-bright);
      border-color: var(--orange-bright);
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 16px 34px -10px rgba(243, 108, 33, 0.55);
      outline: none;
    }

    .mail-pill:focus-visible {
      box-shadow: 0 0 0 3px var(--paper), 0 0 0 6px var(--orange-deep);
    }

    .mail-pill-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--orange-bright);
      color: #ffffff;
      flex-shrink: 0;
      transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s var(--ease-spring);
    }

    .mail-pill:hover .mail-pill-badge,
    .mail-pill:focus-visible .mail-pill-badge {
      background: #ffffff;
      color: var(--orange-deep);
      transform: translate(2px, -2px);
    }

    .mail-hint {
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: var(--ink-soft);
      opacity: 0.85;
    }

    /* Bottom telemetry signature rule */
    .signature-bar {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding-top: clamp(10px, 1.5vh, 16px);
      border-top: 1px solid var(--rule);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ink);
      animation: fadeUp 0.85s var(--ease-spring) 0.46s both;
    }

    .signature-bar .sig-tagline {
      color: var(--ink-soft);
    }

    @keyframes ambientDrift {
      0% {
        background-position: 20% 20%;
      }
      100% {
        background-position: 80% 80%;
      }
    }

    @keyframes envelopeFloat {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-6px);
      }
    }

    @keyframes dotPulse {
      0%, 62% {
        transform: scale(0.85);
        opacity: 0;
      }
      72% {
        transform: scale(1);
        opacity: 0.95;
      }
      92%, 100% {
        transform: scale(2.15);
        opacity: 0;
      }
    }

    @keyframes pulseRing {
      0%, 100% {
        box-shadow: 0 0 0 3px rgba(243, 108, 33, 0.24);
      }
      50% {
        box-shadow: 0 0 0 7px rgba(243, 108, 33, 0.05);
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

    @media (max-width: 600px) {
      .telemetry-tag {
        font-size: 9.5px;
        padding: 5px 10px;
        letter-spacing: 0.09em;
      }
      .orbit-ring {
        width: 130vw;
        height: 62vw;
      }
      .signature-bar {
        flex-direction: column;
        text-align: center;
        gap: 4px;
        font-size: 10px;
      }
      .copy .callout {
        border-radius: 14px;
      }
    }

    @media (max-width: 360px), (max-height: 640px) {
      body {
        padding: 14px 4% 12px;
      }
      .brand-bar {
        padding-bottom: 10px;
      }
      .brand-logo svg {
        height: 24px;
      }
      .stage {
        padding: 12px 0;
      }
      .envelope-wrap {
        margin-bottom: 10px;
      }
      .envelope-float {
        width: 48px;
        height: 36px;
        border-radius: 10px;
        padding: 6px;
      }
      .eyebrow {
        font-size: 9.5px;
        letter-spacing: 0.12em;
        margin-bottom: 8px;
      }
      .headline {
        font-size: clamp(2.1rem, 11vw, 2.8rem);
        margin-bottom: 12px;
      }
      .copy {
        gap: 7px;
        font-size: 0.85rem;
        line-height: 1.46;
      }
      .copy .callout {
        padding: 8px 12px;
        font-size: 0.84rem;
      }
      .closing {
        margin-top: 10px;
        font-size: 1.08rem;
      }
      .contact-zone {
        margin-top: 12px;
        gap: 6px;
      }
      .mail-pill {
        min-height: 44px;
        padding: 9px 18px;
        font-size: 0.84rem;
      }
      .mail-hint {
        font-size: 10.5px;
      }
      .signature-bar {
        padding-top: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .ambient-layer,
      .brand-bar,
      .status-dot,
      .envelope-wrap,
      .envelope-float,
      .notify-dot::after,
      .eyebrow,
      .headline,
      .copy,
      .closing,
      .contact-zone,
      .signature-bar {
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
  <div class="ambient-bg" aria-hidden="true">
    <div class="ambient-layer"></div>
    <div class="orbit-ring"></div>
  </div>

  <header class="brand-bar">
    <div class="brand-logo" aria-label="Reliv">
      <!-- Exact Reliv wordmark geometry from /icons/reliv-wordmark.svg -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 130" role="img" aria-label="Reliv">
        <path d="M39.77 106.00 L17.36 106.00 L17.36 11.42 L56.08 11.42 Q66.75 11.42 74.49 15.26 Q82.24 19.10 86.39 26.15 Q90.55 33.19 90.55 42.84 L90.55 42.84 Q90.55 52.55 86.30 59.44 Q82.05 66.33 74.17 69.88 Q66.30 73.44 55.45 73.44 L55.45 73.44 L30.76 73.44 L30.76 55.73 L51.39 55.73 Q56.66 55.73 60.18 54.33 Q63.70 52.93 65.51 50.08 Q67.32 47.22 67.32 42.84 L67.32 42.84 Q67.32 38.40 65.51 35.48 Q63.70 32.56 60.15 31.07 Q56.59 29.57 51.32 29.57 L51.32 29.57 L39.77 29.57 L39.77 106.00 Z M93.85 106.00 L69.29 106.00 L46.25 62.77 L70.24 62.77 L93.85 106.00 Z M136.45 107.33 L136.45 107.33 Q125.34 107.33 117.28 102.92 Q109.21 98.51 104.93 90.32 Q100.64 82.13 100.64 70.77 L100.64 70.77 Q100.64 59.85 104.93 51.60 Q109.21 43.35 117.08 38.75 Q124.96 34.14 135.62 34.14 L135.62 34.14 Q143.11 34.14 149.36 36.49 Q155.62 38.84 160.22 43.44 Q164.82 48.05 167.33 54.77 Q169.83 61.50 169.83 70.33 L169.83 70.33 L169.83 75.91 L108.52 75.91 L108.52 63.03 L159.30 63.03 L148.95 66.07 Q148.95 61.12 147.46 57.57 Q145.97 54.01 143.05 52.11 Q140.13 50.20 135.81 50.20 L135.81 50.20 Q131.49 50.20 128.51 52.14 Q125.53 54.08 123.97 57.54 Q122.42 61.00 122.42 65.63 L122.42 65.63 L122.42 74.90 Q122.42 80.36 124.23 84.01 Q126.04 87.66 129.27 89.46 Q132.51 91.27 136.83 91.27 L136.83 91.27 Q139.81 91.27 142.25 90.45 Q144.70 89.62 146.44 87.97 Q148.19 86.32 149.08 83.97 L149.08 83.97 L168.82 87.21 Q167.04 93.30 162.69 97.84 Q158.34 102.38 151.71 104.86 Q145.08 107.33 136.45 107.33 Z M229.31 26.72 L229.31 26.72 Q224.61 26.72 221.25 23.58 Q217.89 20.43 217.89 16.05 L217.89 16.05 Q217.89 11.61 221.25 8.50 Q224.61 5.39 229.31 5.39 L229.31 5.39 Q234.07 5.39 237.44 8.47 Q240.80 11.55 240.80 16.05 L240.80 16.05 Q240.80 20.50 237.44 23.61 Q234.07 26.72 229.31 26.72 Z" fill="#FF7A00"/>
        <path d="M181.45 11.42 L203.60 11.42 L203.60 106.00 L181.45 106.00 L181.45 11.42 Z M240.42 106.00 L218.27 106.00 L218.27 35.03 L240.42 35.03 L240.42 106.00 Z M300.53 106.00 L274.89 106.00 L249.18 35.03 L272.54 35.03 L283.14 69.75 Q285.30 76.74 286.88 84.04 Q288.47 91.34 290.12 99.46 L290.12 99.46 L286.06 99.46 Q287.65 91.34 289.20 84.07 Q290.76 76.80 292.85 69.75 L292.85 69.75 L303.26 35.03 L326.37 35.03 L300.53 106.00 Z" fill="#111111"/>
      </svg>
    </div>
    <div class="telemetry-tag">
      <span class="status-dot" aria-hidden="true"></span>
      <span>Inbox Mode · Active</span>
    </div>
  </header>

  <main class="stage">
    <div class="envelope-wrap" aria-hidden="true">
      <div class="envelope-float">
        <svg class="envelope-svg" viewBox="0 0 64 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="60" height="42" rx="8" stroke="#20211e" stroke-width="2.4" fill="#fffaf3"/>
          <path d="M4.5 7.5L29.6 25.4C31.05 26.44 32.95 26.44 34.4 25.4L59.5 7.5" stroke="#FF6B24" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 39L22 25.5M57 39L42 25.5" stroke="#d5c6b4" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="notify-dot"></span>
      </div>
    </div>

    <p class="eyebrow">RELIV — A LITTLE SOMETHING IS HAPPENING.</p>

    <h1 class="headline">
      Hello, Healthcare World.
      <span class="accent-line">You've Got Mail.</span>
    </h1>

    <div class="copy">
      <p>We've been building something interesting.</p>
      <p>And today, we decided to knock on a few inboxes instead of a few doors.</p>
      <p class="callout">Dear Healthcare Teams,<br>a little something from Reliv might be waiting in your inbox.</p>
      <p>No spoilers here. The interesting conversations happen privately.</p>
    </div>

    <p class="closing">Our website is taking a coffee break. Our ambitions aren't.</p>

    <div class="contact-zone">
      <a class="mail-pill" href="${mailtoHref}">
        <span>Open Mail &amp; Write to Reliv</span>
        <span class="mail-pill-badge" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </span>
      </a>
      <span class="mail-hint">Launches your email app directly to relivcustomercare.in@gmail.com</span>
    </div>
  </main>

  <div class="signature-bar" aria-label="Reliv signature">
    <span>RELIV®</span>
    <span class="sig-tagline">YOU MATTER. RELIV CARES.</span>
  </div>
</body>
</html>`;
}
