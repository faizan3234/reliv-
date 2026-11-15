#!/usr/bin/env node
// Read-only checks of actual HTTP responses. This does not measure rankings or LCP.
// --paths=/,/pricing.html limits a check; omit it to audit the complete sitemap.
import { readFileSync } from 'node:fs';
import { pageProblems } from './seo-response.mjs';
const facts = JSON.parse(readFileSync(new URL('../content/reliv-facts.json', import.meta.url), 'utf8'));
const sitemap = readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8');
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const selected = process.argv.find(arg => arg.startsWith('--paths='));
const urls = selected ? selected.slice(8).split(',').map(path => new URL(path, facts.url).href) : listed;
if (urls.some(url => !listed.includes(url))) throw new Error('Use only canonical paths from the local sitemap');
const results = [];
async function inspect(url) {
  const problems = [];
  let status;
  try {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    status = response.status;
    problems.push(...pageProblems(url, response, await response.text()));
  } catch (error) { problems.push(error.message); }
  results.push({ url, status, problems });
}
let next = 0;
await Promise.all(Array.from({ length: Math.min(4, urls.length) }, async () => {
  while (next < urls.length) await inspect(urls[next++]);
}));
// Check discovery endpoints and routing separately from indexable HTML pages.
async function inspectEndpoint(path, validate) {
  const url = new URL(path, facts.url).href;
  const problems = [];
  let status;
  try {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    status = response.status;
    validate(response, await response.text(), problems);
  } catch (error) { problems.push(error.message); }
  results.push({ url, status, problems });
}
await Promise.all([
  inspectEndpoint('/robots.txt', (response, body, problems) => {
    if (response.status !== 200) problems.push('Robots unavailable');
    if (!/text\/plain/i.test(response.headers.get('content-type') || '')) problems.push('Expected plain-text robots');
    if (!body.includes(`Sitemap: ${facts.url}/sitemap.xml`)) problems.push('Missing official sitemap declaration');
    if (/^Disallow:\s*\/\s*$/mi.test(body)) problems.push('Robots contains a site-wide crawl block');
  }),
  inspectEndpoint('/sitemap.xml', (response, body, problems) => {
    if (response.status !== 200) problems.push('Sitemap unavailable');
    if (!/xml/i.test(response.headers.get('content-type') || '')) problems.push('Expected XML sitemap');
    const live = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    if (live.length !== new Set(live).size) problems.push('Duplicate sitemap URLs');
    if (live.length !== listed.length || listed.some(url => !live.includes(url))) problems.push('Live sitemap differs from repository');
  }),
  ...[['/index.html', '/'], ['/partner.html', '/organisations.html']].map(([path, target]) =>
    inspectEndpoint(path, (response, body, problems) => {
      if (![301, 308].includes(response.status)) problems.push('Expected permanent redirect');
      const location = response.headers.get('location');
      if (!location || new URL(location, facts.url).href !== new URL(target, facts.url).href) problems.push('Incorrect redirect destination');
    })),
  inspectEndpoint('/reliv-seo-audit-nonexistent-page-7f836.html', (response, body, problems) => {
    if (response.status !== 404) problems.push('Expected real HTTP 404 for missing page');
  })
]);
results.sort((a, b) => a.url.localeCompare(b.url));
const failures = results.filter(result => result.problems.length);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, failed: failures.length, results }, null, 2));
if (failures.length) process.exitCode = 1;
