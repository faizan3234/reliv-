import assert from 'node:assert/strict';
import { pageProblems } from './seo-response.mjs';
const url = 'https://relivkiosk.vercel.app/';
const html = `<TITLE>RELIV Kiosk</TITLE><LINK href='${url}' REL='canonical'><main>Screening information</main>`;
const response = (status = 200, extra = {}) => ({ status, headers: new Headers({ 'content-type': 'text/html', ...extra }) });
assert.deepEqual(pageProblems(url, response(), html), []);
for (const tag of [
  '<meta content="noindex,follow" name="robots">',
  "<META NAME='Googlebot' CONTENT='none'>",
  '<meta name=bingbot content=noindex>'
]) assert.ok(pageProblems(url, response(), html + tag).includes('HTML noindex'));
assert.ok(pageProblems(url, response(200, { 'x-robots-tag': 'googlebot: noindex' }), html).includes('HTTP noindex'));
assert.ok(pageProblems(url, response(200, { 'content-type': 'application/json' }), html).includes('Expected HTML'));
assert.ok(pageProblems(url, response(308), html).includes('Expected HTTP 200'));
assert.ok(pageProblems(url, response(), html + `<link rel="canonical" href="${url}">`).some(value => value.includes('canonical')));
assert.ok(pageProblems(url, response(), html.replace(url, url + 'other')).some(value => value.includes('canonical')));
console.log('SEO response checks passed: reversed attributes, casing, bot noindex, duplicates, redirects and non-HTML responses.');
