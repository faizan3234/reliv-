#!/usr/bin/env node
// Dry run by default. Never submit preview URLs or pages that are not live yet.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { pageProblems } from './seo-response.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const facts = JSON.parse(readFileSync(resolve(root, 'content/reliv-facts.json'), 'utf8'));
const key = readFileSync(resolve(root, '252f36135233abf649f9b2a12b0c68f9.txt'), 'utf8').trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid public IndexNow verification key');
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
const urlList = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]))];
if (!urlList.length || urlList.some(url => new URL(url).origin !== new URL(facts.url).origin)) throw new Error('Sitemap must contain only official site URLs');
if (!process.argv.includes('--submit')) {
  console.log('Dry run only. After production deployment, use --submit to notify IndexNow.');
  console.log(urlList.join('\n'));
} else {
  const keyLocation = facts.url + '/' + key + '.txt';
  const verification = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) });
  if (!verification.ok || (await verification.text()).trim() !== key) throw new Error('Production key verification failed; nothing submitted');
  for (const url of urlList) {
    const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(20000) });
    const problems = pageProblems(url, response, await response.text());
    if (problems.length) throw new Error(`Page preflight failed: ${url}: ${problems.join('; ')}`);
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ host: new URL(facts.url).host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(20000)
  });
  if (![200, 202].includes(response.status)) throw new Error('IndexNow rejected the submission: HTTP ' + response.status);
  console.log(`IndexNow received ${urlList.length} URLs (HTTP ${response.status}). This does not confirm indexing or ranking.`);
}
