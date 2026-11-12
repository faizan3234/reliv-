#!/usr/bin/env node
// Read-only checks of actual HTTP responses. This does not measure rankings or LCP.
// --paths=/,/pricing.html limits a check; omit it to audit the complete sitemap.
import { readFileSync } from 'node:fs';
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
    if (status !== 200) problems.push('Expected HTTP 200');
    if (!response.headers.get('content-type')?.includes('text/html')) problems.push('Expected HTML');
    if (/noindex/i.test(response.headers.get('x-robots-tag') || '')) problems.push('HTTP noindex');
    const html = await response.text();
    if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) problems.push('HTML noindex');
    const canonical = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/g)];
    if (canonical.length !== 1 || canonical[0][1] !== url) problems.push('Missing, duplicate or incorrect canonical');
    if (!/<title>[^<]+<\/title>/.test(html)) problems.push('Missing title in response HTML');
    if (!/<main\b/.test(html)) problems.push('Missing main content in response HTML');
  } catch (error) { problems.push(error.message); }
  results.push({ url, status, problems });
}
let next = 0;
await Promise.all(Array.from({ length: Math.min(4, urls.length) }, async () => {
  while (next < urls.length) await inspect(urls[next++]);
}));
results.sort((a, b) => a.url.localeCompare(b.url));
const failures = results.filter(result => result.problems.length);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, failed: failures.length, results }, null, 2));
if (failures.length) process.exitCode = 1;
