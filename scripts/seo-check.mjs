#!/usr/bin/env node
// Regression checks for search discovery. No network, browser or dependencies.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = p => readFileSync(resolve(root, p), 'utf8');
const facts = JSON.parse(read('content/reliv-facts.json'));
const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, new Set(urls).size, 'Duplicate sitemap URLs');
const titles = new Set();
let graphs = 0;
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, facts.url, 'Sitemap must use the official host');
  assert.equal(parsed.search + parsed.hash, '', 'Sitemap must use clean URLs');
  const path = decodeURI(parsed.pathname === '/' ? 'index.html' : parsed.pathname.slice(1));
  assert.ok(existsSync(resolve(root, path)), `Sitemap target missing: ${path}`);
  const html = read(path);
  assert.ok(!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html), `Noindex in sitemap: ${path}`);
  const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
  assert.equal(canonical.length, 1, `One canonical required: ${path}`);
  assert.equal(canonical[0][1], url, `Canonical mismatch: ${path}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `Unique title required: ${path}`);
  titles.add(title);
  assert.ok(/<meta name="description" content="[^"]+"/.test(html), `Missing description: ${path}`);
  for (const [,body] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(body); graphs++;
    for (const node of data['@graph'] || [data]) {
      if (node['@id'] === facts.url + '/#organization') {
        assert.equal(node.email, facts.email, `Inconsistent contact email: ${path}`);
        assert.equal(node.telephone, facts.telephone, `Inconsistent phone: ${path}`);
        assert.equal(node.legalName, facts.legalName, `Inconsistent company: ${path}`);
      }
      if (node['@type'] === 'Product') {
        assert.ok(!node.aggregateRating, 'No invented review ratings');
        if (facts.pricing.startingPriceINR === null) assert.ok(!node.offers, 'No numeric offer without approved pricing');
      }
    }
  }
  // A successful file fetch is insufficient if important links point nowhere.
  for (const [,href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(href) || href.includes('${')) continue;
    const target = decodeURI(href.split(/[?#]/)[0]);
    const file = target.startsWith('/') ? resolve(root, '.' + target) : resolve(root, dirname(path), target);
    assert.ok(existsSync(file), `Broken link from ${path}: ${href}`);
  }
}
// A video sitemap must describe a real player on that exact landing page.
for (const [,entry] of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const pageURL = entry.match(/<loc>(.*?)<\/loc>/)[1];
  const path = new URL(pageURL).pathname === '/' ? 'index.html' : new URL(pageURL).pathname.slice(1);
  const html = read(path);
  for (const [,video] of entry.matchAll(/<video:video>([\s\S]*?)<\/video:video>/g)) {
    const source = new URL(video.match(/<video:content_loc>(.*?)<\/video:content_loc>/)[1]);
    const poster = new URL(video.match(/<video:thumbnail_loc>(.*?)<\/video:thumbnail_loc>/)[1]);
    assert.ok(/<video\b/.test(html) && html.includes(source.pathname.slice(1)), `Video sitemap has no player/source on ${path}`);
    for (const asset of [source, poster]) assert.ok(existsSync(resolve(root, asset.pathname.slice(1))), `Missing video asset: ${asset}`);
  }
}
if (facts.pricing.startingPriceINR !== null) {
  assert.ok(!read('health-kiosk-buying-guide.html').includes('not published a numeric starting price'), 'Buyer guide must agree with published pricing');
  assert.ok(read('llms.txt').includes('₹95,000'), 'Published machine price must reach the summary');
}
const demo = JSON.parse(read('content/reliv-demo.json'));
for (const path of ['demo.html', 'media.html']) {
  const graph = JSON.parse(read(path).match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const videos = graph.filter(node => node['@type'] === 'VideoObject' && node.contentUrl === facts.url + demo.contentPath);
  assert.equal(videos.length, 1, `One consistent demo video identity required: ${path}`);
  assert.equal(videos[0].url, facts.url + demo.watchPath);
  assert.equal(videos[0].description, demo.description);
  assert.equal(videos[0].duration, demo.duration);
}
assert.ok(/<video\b[^>]*\bcontrols\b[^>]*preload="none"/.test(read('demo.html')), 'Demo must have native controls and defer video download');
assert.ok(!/@import/.test(read('editorial.css')), 'Fonts should be discovered directly from HTML');
for (const path of ['health-kiosk.html', 'pricing.html', 'contact.html', 'health-kiosk-buying-guide.html', 'demo.html']) {
  assert.ok(urls.includes(facts.url + '/' + path), `New page missing from sitemap: ${path}`);
  assert.ok(read('index.html').includes(`href="${path}"`), `Homepage cannot reach ${path}`);
  assert.ok(read(path).includes(facts.email), `Contact email must be visible: ${path}`);
  assert.ok(read(path).includes(`tel:${facts.telephone}`), `Phone must be actionable: ${path}`);
}
assert.ok(read('pricing.html').includes('Request current pricing'), 'Quote pricing must be visible');
assert.ok(read('contact.html').includes(facts.url + '/'), 'Official URL must be visible');
// Consecutive agents intentionally form ONE robots group; no specific agent can
// override the internal-path restrictions with a separate Allow-only group.
const robots = read('robots.txt');
const lines = robots.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
let sawRules = false;
for (const line of lines) {
  if (line.startsWith('Allow:') || line.startsWith('Disallow:')) sawRules = true;
  if (line.startsWith('User-agent:')) assert.ok(!sawRules, 'Unexpected separate robots group');
}
for (const agent of ['*', 'Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']) assert.ok(lines.includes('User-agent: ' + agent));
for (const path of ['/scratch/', '/.git/', '/node_modules/']) assert.ok(lines.includes('Disallow: ' + path));
assert.ok(lines.includes('Allow: /'));
assert.ok(lines.includes('Sitemap: ' + facts.url + '/sitemap.xml'));
const vercel = JSON.parse(read('vercel.json'));
assert.ok(vercel.redirects.some(r => r.source === '/index.html' && r.destination === '/' && r.permanent));
assert.ok(!vercel.headers.some(h => h.source === '/:path*' && h.headers.some(x => x.key === 'X-Robots-Tag')), 'Do not noindex the public site');
for (const path of ['llms.txt', 'llms-full.txt']) {
  const text = read(path);
  for (const value of [facts.email, facts.displayPhone, facts.url, '/pricing.html', '/contact.html']) assert.ok(text.includes(value), `Missing ${value} in ${path}`);
}
console.log(`SEO checks passed: ${urls.length} sitemap pages, ${graphs} JSON-LD blocks, canonical URLs, links, contact consistency, pricing and crawler rules.`);
