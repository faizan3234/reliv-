#!/usr/bin/env node
/**
 * Reliv marketing-site smoke checks. Run: npm run test:site
 * Static checks only — this is NOT a WCAG, medical, visual or Lighthouse audit.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { Script } from 'node:vm';

const root = process.cwd();
const pages = [
  'index.html', 'how-it-works.html', 'locations.html', 'organisations.html',
  'about.html', 'health-kiosk.html', 'health-atm.html', 'media.html',
  'careers.html', 'legal/privacy.html', 'legal/terms.html',
  'legal/disclaimer.html', 'solutions/colleges.html',
  'solutions/offices.html', 'solutions/gyms.html'
];
const errors = [];
const fileCache = new Map();
const getText = file => {
  if (!fileCache.has(file)) fileCache.set(file, readFileSync(file, 'utf8'));
  return fileCache.get(file);
};
const fail = (file, detail) => errors.push(file + ': ' + detail);

for (const page of pages) {
  const filepath = resolve(root, page);
  if (!existsSync(filepath)) { fail(page, 'file missing'); continue; }
  const html = getText(filepath);
  if (!/<main(?:\s|>)/i.test(html) || !/<h1(?:\s|>)/i.test(html)) fail(page, 'main landmark or H1 missing');
  const cssLink = page.includes('/') ? '../reliv-refinement.css' : 'reliv-refinement.css';
  if (!html.includes('href="' + cssLink + '"')) fail(page, 'shared design stylesheet missing');

  for (const match of html.matchAll(/href\s*=\s*["']([^"']+)["']/g)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href) || href.includes('${')) continue;
    const [targetPath, hash] = href.split('#');
    const pathname = (targetPath || '').split('?')[0];
    const destination = pathname ? resolve(dirname(filepath), pathname) : filepath;
    if (!existsSync(destination)) { fail(page, 'link target does not exist: ' + href); continue; }
    if (hash && extname(destination).toLowerCase() === '.html') {
      const content = getText(destination);
      const ids = new Set([...content.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m => m[1]));
      // Video OS tabs intentionally recognize these virtual hashes in videos.js.
      const virtualHash = destination.endsWith('/how-it-works.html') && ['iphone', 'android'].includes(hash);
      if (!ids.has(hash) && !virtualHash) fail(page, 'link anchor missing: ' + href);
    }
  }
  if (/Live & Open Today|guaranteed (?:cure|diagnosis)/i.test(html)) fail(page, 'unverified operational/clinical promise');
}

for (const path of ['immersive.js', 'nav.js', 'sw.js']) {
  const file = resolve(root, path);
  try { new Script(getText(file), { filename: path }); }
  catch (err) { fail(path, 'JavaScript syntax: ' + err.message); }
}
for (const path of ['immersive.css', 'reliv-refinement.css']) {
  const text = getText(resolve(root, path));
  if ((text.match(/{/g) || []).length !== (text.match(/}/g) || []).length) fail(path, 'unbalanced CSS braces');
}
const sw = getText(resolve(root, 'sw.js'));
if (!sw.includes('PERSONAL_ROUTE') || !sw.includes("request.mode === 'navigate'")) fail('sw.js', 'public/private caching safeguards missing');

if (errors.length) {
  console.error('Reliv source audit failed (' + errors.length + ' issues):');
  for (const error of errors) console.error('  - ' + error);
  process.exitCode = 1;
} else {
  console.log('Reliv source audit passed: ' + pages.length + ' pages, links, anchors, core JS and CSS.');
  console.log('Browser, accessibility, performance, venue and medical validation still required.');
}
