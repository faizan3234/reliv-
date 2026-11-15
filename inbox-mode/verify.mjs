#!/usr/bin/env node
/**
 * Automated verification for Secret Inbox Mode middleware & rendered output.
 */
import assert from 'node:assert/strict';
import proxy, { handleInboxModeRequest, isInboxModeEnabled } from './proxy.js';

const EXPECTED_COPY = [
  'RELIV — A LITTLE SOMETHING IS HAPPENING.',
  'Hello, Healthcare World.',
  "You've Got Mail.",
  "We've been building something interesting.",
  'And today, we decided to knock on a few inboxes instead of a few doors.',
  'Dear Healthcare Teams,',
  'a little something from Reliv might be waiting in your inbox.',
  'No spoilers here. The interesting conversations happen privately.',
  "Our website is taking a coffee break. Our ambitions aren't.",
  'RELIV®',
  'YOU MATTER. RELIV CARES.',
];

// 1. Flag resolution tests
assert.equal(isInboxModeEnabled({}), false);
assert.equal(isInboxModeEnabled({ INBOX_MODE: 'false' }), false);
assert.equal(isInboxModeEnabled({ VITE_INBOX_MODE: 'false' }), false);
assert.equal(isInboxModeEnabled({ INBOX_MODE: 'true' }), true);
assert.equal(isInboxModeEnabled({ INBOX_MODE: ' TRUE ' }), true);
assert.equal(isInboxModeEnabled({ VITE_INBOX_MODE: 'true' }), true);
assert.equal(isInboxModeEnabled({ INBOX_MODE: 'false', VITE_INBOX_MODE: 'true' }), false);
assert.equal(isInboxModeEnabled({ INBOX_MODE: '"true"' }), true);
assert.equal(isInboxModeEnabled({ VITE_INBOX_MODE: ' "true" ' }), true);

const publicRoutes = [
  '/',
  '/index.html',
  '/about.html',
  '/pricing.html',
  '/organisations.html',
  '/how-it-works.html',
  '/locations.html',
  '/contact.html',
  '/media.html',
  '/demo.html',
  '/simulator.html',
  '/careers.html',
  '/health-kiosk.html',
  '/health-atm.html',
  '/solutions/colleges.html',
  '/legal/privacy.html',
  '/Reliv_Dotted_Scroll_Journey_Editable_Code_Images/Reliv_Dotted_Journey_Editable_Source/index.html',
  '/partner.html',
  '/nonexistent-preview-route',
];

const bypassedRoutes = [
  ['GET', '/api/health'],
  ['POST', '/api/enquiry'],
  ['POST', '/contact.html'],
  ['GET', '/admin'],
  ['GET', '/admin/panel'],
  ['GET', '/dashboard'],
  ['GET', '/app'],
  ['GET', '/kiosk/live'],
  ['GET', '/reports/sample'],
  ['GET', '/_vercel/insights/view'],
  ['GET', '/robots.txt'],
  ['GET', '/sitemap.xml'],
  ['GET', '/site.webmanifest'],
  ['GET', '/sw.js'],
  ['GET', '/certificate.pdf'],
  ['GET', '/llms.txt'],
  ['GET', '/googled52447afa2fa397c.html'],
  ['GET', '/252f36135233abf649f9b2a12b0c68f9.txt'],
  ['GET', '/icons/favicon.svg'],
  ['GET', '/assets/reliv-health-kiosk-kolkata.jpg'],
  ['GET', '/assets/reliv-health-kiosk-transparent.png'],
  ['GET', '/assets/awards/medverse-oscars-of-healthcare-trophy.jpg'],
  ['GET', '/assets/awards/bengal-e-summit-investopia-trophy.jpg'],
  ['GET', '/assets/awards/medverse-oscars-of-healthcare-certificate.jpg'],
  ['GET', '/assets/dpiit-recognition-certificate.jpg'],
  ['GET', '/assets/inbox/editorial-confidential-dossier.jpg'],
  ['GET', '/assets/inbox/editorial-coffee-break.jpg'],
  ['GET', '/assets/inbox/editorial-classified-archive.jpg'],
  ['GET', '/style.css'],
  ['GET', '/immersive.js'],
];

for (const env of [{ INBOX_MODE: 'true' }, { VITE_INBOX_MODE: 'true' }]) {
  for (const path of publicRoutes) {
    const req = new Request(`https://relivkiosk.vercel.app${path}`, {
      headers: { Accept: 'text/html,application/xhtml+xml' },
    });
    const res = handleInboxModeRequest(req, env);
    assert.equal(res.status, 200, `Expected 200 on ${path}`);
    assert.equal(res.headers.get('location'), null, `Unexpected redirect on ${path}`);
    assert.equal(res.headers.get('x-middleware-next'), null, `Should intercept ${path}`);
    assert.match(res.headers.get('content-type') || '', /text\/html/);
    assert.match(res.headers.get('cache-control') || '', /no-store/);
    assert.match(res.headers.get('x-robots-tag') || '', /noindex/);

    const html = await res.text();
    for (const phrase of EXPECTED_COPY) {
      assert.ok(html.includes(phrase), `Missing exact copy "${phrase}" on ${path}`);
    }
    assert.ok(!/<nav\b|<footer\b|<form\b/i.test(html), `Unexpected nav/footer/form tags on ${path}`);
    assert.ok(!/95,000|RELIV KIOSK\./i.test(html), `Normal site pricing/product leak on ${path}`);
    assert.ok(html.includes('href="mailto:relivcustomercare.in@gmail.com?subject='), 'Customer care mailto CTA missing');
    assert.ok(html.includes('href="tel:+919163606455"') && html.includes('+91 91636 06455'), 'Contact number CTA missing');
    assert.ok(
      html.includes('/assets/awards/medverse-oscars-of-healthcare-trophy.jpg') &&
        html.includes('/assets/dpiit-recognition-certificate.jpg') &&
        html.includes('/assets/awards/bengal-e-summit-investopia-trophy.jpg') &&
        html.includes('/assets/awards/medverse-oscars-of-healthcare-certificate.jpg'),
      'Awards & recognitions assets missing'
    );
    assert.ok(
      html.includes('/assets/inbox/editorial-confidential-dossier.jpg') &&
        html.includes('/assets/inbox/editorial-coffee-break.jpg') &&
        html.includes('/assets/inbox/editorial-classified-archive.jpg') &&
        html.includes('CONFIDENTIAL'),
      'Confidential editorial archive assets or branding missing'
    );
    assert.ok(html.includes('M39.77 106.00'), 'Real Reliv wordmark SVG missing');
    assert.ok(html.includes('/icons/favicon.svg'), 'Favicon missing');
    assert.ok(html.includes('/assets/reliv-health-kiosk-transparent.png'), 'Real Reliv kiosk asset missing');
    assert.ok(
      html.includes('id="envelopeButton"') &&
        html.includes('id="openLetterButton"') &&
        html.includes('id="letterOverlay"') &&
        html.includes('id="closeLetter"'),
      'Interactive envelope/letter controls missing'
    );
    assert.ok(
      html.includes('#FF7A00') &&
        html.includes('#050505') &&
        html.includes('#FFFFFF') &&
        html.includes('#F4F4F2'),
      'Swiss orange/black/white/offwhite palette tokens missing'
    );
    assert.ok(!/#fff9f2|#f6f0e6|#f7db88/i.test(html), 'Legacy beige/yellow tokens should not appear');
  }

  // HEAD request must succeed with empty body
  const headRes = handleInboxModeRequest(new Request('https://relivkiosk.vercel.app/', { method: 'HEAD' }), env);
  assert.equal(headRes.status, 200);
  assert.equal(await headRes.text(), '');

  // JSON API accepts should bypass even on arbitrary endpoint
  const jsonReq = new Request('https://relivkiosk.vercel.app/status', {
    headers: { Accept: 'application/json' },
  });
  assert.equal(handleInboxModeRequest(jsonReq, env).headers.get('x-middleware-next'), '1');

  for (const [method, path] of bypassedRoutes) {
    const res = handleInboxModeRequest(new Request(`https://relivkiosk.vercel.app${path}`, { method }), env);
    assert.equal(res.headers.get('x-middleware-next'), '1', `Expected pass-through for ${method} ${path}`);
  }
}

// 3. Disabled state passes every public route through and blocks raw internal source
for (const env of [{}, { INBOX_MODE: 'false' }, { INBOX_MODE: 'false', VITE_INBOX_MODE: 'true' }]) {
  for (const path of publicRoutes) {
    const res = handleInboxModeRequest(new Request(`https://relivkiosk.vercel.app${path}`), env);
    assert.equal(res.headers.get('x-middleware-next'), '1', `Expected pass-through when disabled on ${path}`);
  }
  const internalRes = handleInboxModeRequest(new Request('https://relivkiosk.vercel.app/inbox-mode/proxy.js'), env);
  assert.equal(internalRes.status, 404);
}

// 4. Vercel Routing Middleware regression: second `context` arg must NEVER shadow process.env
const prevInbox = process.env.INBOX_MODE;
const prevViteInbox = process.env.VITE_INBOX_MODE;
try {
  delete process.env.INBOX_MODE;
  delete process.env.VITE_INBOX_MODE;
  assert.equal(
    proxy(new Request('https://relivkiosk.vercel.app/'), { waitUntil() {} }).headers.get('x-middleware-next'),
    '1'
  );

  process.env.INBOX_MODE = 'true';
  assert.equal(
    proxy(new Request('https://relivkiosk.vercel.app/about.html'), { waitUntil() {} }).status,
    200
  );
  assert.equal(
    proxy(new Request('https://relivkiosk.vercel.app/pricing.html'), {}).headers.get('x-middleware-next'),
    null
  );

  delete process.env.INBOX_MODE;
  process.env.VITE_INBOX_MODE = '"true"';
  assert.equal(
    proxy(new Request('https://relivkiosk.vercel.app/'), { waitUntil() {} }).status,
    200
  );

  // Malformed request URL must safely fall back without throwing 500
  assert.equal(
    proxy({ url: 'http://[::1', method: 'GET', headers: new Headers({ Accept: 'text/html' }) }, { waitUntil() {} }).status,
    200
  );
} finally {
  if (prevInbox === undefined) delete process.env.INBOX_MODE;
  else process.env.INBOX_MODE = prevInbox;
  if (prevViteInbox === undefined) delete process.env.VITE_INBOX_MODE;
  else process.env.VITE_INBOX_MODE = prevViteInbox;
}

console.log('Secret Inbox Mode checks passed: 19 public routes intercepted, 22 preserved paths passed through, Vercel context isolation + real logo + Lando/Reliv theme + mailto CTA verified.');
