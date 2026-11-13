// Shared validation for production audits and IndexNow submission preflight.
export function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(([, key, double, single, bare]) => [key.toLowerCase(), double ?? single ?? bare]));
}
export function pageProblems(url, response, html) {
  const problems = [];
  if (response.status !== 200) problems.push('Expected HTTP 200');
  if (!response.headers.get('content-type')?.includes('text/html')) problems.push('Expected HTML');
  if (/\b(noindex|none)\b/i.test(response.headers.get('x-robots-tag') || '')) problems.push('HTTP noindex');
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
  if (metas.some(meta => /^(robots|googlebot|bingbot)$/i.test(meta.name || '') && /\b(noindex|none)\b/i.test(meta.content || ''))) problems.push('HTML noindex');
  const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag))
    .filter(link => /(^|\s)canonical(\s|$)/i.test(link.rel || ''));
  if (canonicals.length !== 1 || canonicals[0].href !== url) problems.push('Missing, duplicate or incorrect canonical');
  if (!/<title\b[^>]*>\s*[^<\s][^<]*<\/title>/i.test(html)) problems.push('Missing title in response HTML');
  if (!/<main\b/i.test(html)) problems.push('Missing main content in response HTML');
  return problems;
}
