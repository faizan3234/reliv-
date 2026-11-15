import { renderInboxModeHtml } from './template.js';

const PRESERVED_PREFIXES = [
  '/api',
  '/admin',
  '/dashboard',
  '/portal',
  '/app',
  '/kiosk',
  '/auth',
  '/login',
  '/logout',
  '/checkout',
  '/payment',
  '/payments',
  '/orders',
  '/reports',
  '/records',
  '/patient',
  '/medical-records',
  '/_vercel',
  '/_next',
  '/.well-known',
];

const ASSET_PREFIXES = ['/assets/', '/icons/', '/awards/', '/scripts/', '/content/'];

const PRESERVED_EXACT_PATHS = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/site.webmanifest',
  '/sw.js',
  '/certificate.pdf',
  '/llms.txt',
  '/llms-full.txt',
  '/252f36135233abf649f9b2a12b0c68f9.txt',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
]);

const STATIC_EXT_RE = /\.(?:css|js|mjs|cjs|json|map|xml|txt|webmanifest|pdf|svg|png|jpe?g|webp|gif|avif|ico|woff2?|ttf|otf|eot|mp4|webm|ogg|mp3|wav)$/i;
const SITE_VERIFICATION_RE = /^\/google[a-f0-9]+\.html$/i;

/**
 * Resolves the central Inbox Mode feature flag from server/edge environment variables.
 * Uses `INBOX_MODE` as the primary Vercel/static-site variable and supports
 * `VITE_INBOX_MODE` as a fallback so either configuration works cleanly.
 */
export function isInboxModeEnabled(env = process.env) {
  if (!env) return false;
  const primary = env.INBOX_MODE?.trim();
  const raw = primary ? primary : env.VITE_INBOX_MODE?.trim();
  return raw?.toLowerCase() === 'true';
}

export function isInternalModulePath(pathname) {
  return pathname === '/inbox-mode' || pathname.startsWith('/inbox-mode/');
}

export function isBypassedPath(pathname) {
  const lower = pathname.toLowerCase();

  for (const prefix of PRESERVED_PREFIXES) {
    if (lower === prefix || lower.startsWith(`${prefix}/`)) {
      return true;
    }
  }

  for (const prefix of ASSET_PREFIXES) {
    if (lower.startsWith(prefix)) {
      return true;
    }
  }

  if (PRESERVED_EXACT_PATHS.has(lower) || SITE_VERIFICATION_RE.test(lower)) {
    return true;
  }

  // Non-HTML static assets anywhere in the repository pass through intact.
  const lastSegment = lower.slice(lower.lastIndexOf('/') + 1);
  if (lastSegment && STATIC_EXT_RE.test(lastSegment)) {
    return true;
  }

  return false;
}

export function shouldInterceptRequest(request) {
  if (!request) return false;
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;

  const accept = (request.headers?.get?.('accept') || '').toLowerCase();
  if (
    accept &&
    (accept.includes('application/json') || accept.includes('application/octet-stream')) &&
    !accept.includes('text/html') &&
    !accept.includes('*/*')
  ) {
    return false;
  }

  const { pathname } = new URL(request.url, 'https://relivkiosk.vercel.app');
  if (isBypassedPath(pathname)) {
    return false;
  }

  return true;
}

function nextResponse() {
  // Matches @vercel/functions `next()` pass-through control header without external deps.
  return new Response(null, {
    headers: {
      'x-middleware-next': '1',
    },
  });
}

export default function proxy(request, env = process.env) {
  const { pathname } = new URL(request.url, 'https://relivkiosk.vercel.app');

  if (!isInboxModeEnabled(env)) {
    if (isInternalModulePath(pathname)) {
      return new Response('Not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
    return nextResponse();
  }

  if (!shouldInterceptRequest(request)) {
    return nextResponse();
  }

  const body = request.method === 'HEAD' ? null : renderInboxModeHtml();
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow',
      Vary: 'Accept',
    },
  });
}

