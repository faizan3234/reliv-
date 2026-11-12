#!/usr/bin/env node
// Static output: crawlers and visitors receive the same facts without JavaScript.
// Run after editing facts or page copy. --check detects stale generated content.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const facts = JSON.parse(readFileSync(resolve(root, 'content/reliv-facts.json'), 'utf8'));
const check = process.argv.includes('--check');
const changed = [];
const htmlEscape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const textOnly = html => html.replace(/<[^>]*>/g, '').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replace(/\s+/g, ' ').trim();
const pages = {
  'index.html': ['Reliv Kiosk | Smart Health Kiosk & Health ATM in India', 'Meet Reliv Kiosk from Kolkata: guided health, fitness and wellness screening. Explore checks, kiosk pricing, locations and contact Reliv Medicare.'],
  'health-kiosk.html': ['Reliv Health Kiosk in India | Features, Pricing & Contact', 'Explore Reliv Smart Health Kiosk: BP, SpO₂, pulse, temperature, height, weight and BMI. See configuration options, pricing enquiries and Kolkata stations.'],
  'health-atm.html': ['What Is a Health ATM? | Reliv Health Kiosk India', 'Understand Health ATMs and the Reliv self-service health kiosk. Explore guided screening, configuration options, digital reports and deployment pricing.'],
  'health-kiosk-kolkata.html': ['Health Kiosk in Kolkata | Reliv Locations & Screening', 'Find Reliv health kiosk stations in Kolkata at IEM Gurukul, St. James’ School and Eco Park. See available checks and confirm access before visiting.'],
  'pricing.html': ['Reliv Kiosk Price in India | Purchase, Lease & Checkup Costs', 'Request current Reliv health kiosk pricing for purchase or monthly plans. Compare deployment costs with individual checkup charges and contact the team.'],
  'contact.html': ['Contact Reliv Kiosk | Phone, Email & Pricing Enquiries', 'Contact Reliv Medicare in Kolkata: +91 91636 06455 or relivcustomercare.in@gmail.com. Ask about health kiosks, pricing, demonstrations and venue access.'],
  'organisations.html': ['Health Kiosks for Organisations in India | Reliv', 'Bring Reliv health screening to your college, workplace, gym or community venue. Discuss purchase, monthly plans, configuration and installation.'],
  'solutions/gyms.html': ['Fitness & Wellness Kiosks for Gyms in India | Reliv', 'Explore Reliv fitness and wellness kiosks for gyms: guided vital checks, height, weight and BMI. Confirm optional features and request deployment pricing.'],
  'solutions/colleges.html': ['Health Kiosks for Colleges in India | Reliv Campus Wellness', 'Explore Reliv health screening kiosks for colleges and universities. Discuss campus deployment, guided checks, configuration, pricing and support.'],
  'solutions/offices.html': ['Workplace Health & Wellness Kiosks in India | Reliv', 'Explore Reliv health screening for offices and employee wellbeing. Request a workplace kiosk proposal with configuration, installation and pricing.'],
  'locations.html': ['Find a Reliv Health Kiosk | Kolkata Station Directory', 'Explore Reliv kiosk locations at IEM Gurukul, St. James’ School and Eco Park in Kolkata. Confirm station availability, venue access and hours before visiting.'],
  'about.html': ['About Reliv Medicare | Health Kiosk Company in Kolkata', 'Meet Reliv Medicare Private Limited, the Kolkata company behind Reliv Smart Health Kiosk. Explore its team, DPIIT startup recognition and story.'],
  'how-it-works.html': ['How Reliv Kiosk Works | Health Checks, Videos & App Guide', 'Watch the Reliv health kiosk walkthrough. Learn about guided checks, payment and health QR codes, digital reports and the companion app.'],
  'media.html': ['Reliv Kiosk Media | Official Photos, Videos & Recognition', 'Explore official Reliv kiosk photographs, demonstration videos and startup recognition. Contact Reliv Medicare for product information and media enquiries.']
};
function output(path, content) {
  const full = resolve(root, path);
  let previous;
  try { previous = readFileSync(full, 'utf8'); } catch { previous = ''; }
  if (content !== previous) {
    changed.push(path);
    if (!check) writeFileSync(full, content);
  }
}
const org = {
  '@type': 'Organization', '@id': facts.url + '/#organization',
  name: facts.brand, legalName: facts.legalName, alternateName: ['Reliv Medicare', 'Reliv Care'],
  url: facts.url + '/', logo: facts.url + '/icons/icon-512.png',
  description: facts.description, email: facts.email, telephone: facts.telephone,
  address: { '@type': 'PostalAddress', addressLocality: facts.city, addressRegion: facts.region, addressCountry: facts.country },
  sameAs: [facts.instagram],
  contactPoint: { '@type': 'ContactPoint', telephone: facts.telephone, email: facts.email, contactType: 'Customer support and kiosk enquiries', url: facts.url + '/contact.html' }
};
const website = { '@type': 'WebSite', '@id': facts.url + '/#website', url: facts.url + '/', name: 'Reliv Kiosk', alternateName: ['Reliv', 'Reliv Medicare'], publisher: { '@id': org['@id'] } };
const product = {
  '@type': 'Product', '@id': facts.url + '/#product', name: facts.productName,
  alternateName: ['Reliv Kiosk', 'Reliv Health ATM', 'Reliv Health Kiosk'],
  url: facts.url + '/health-kiosk.html',
  image: [facts.url + '/assets/reliv-health-kiosk-kolkata.jpg'],
  description: facts.description + ' Core checks include ' + facts.measurements.join(', ') + ', with calculated BMI. ' + facts.configurationNote,
  brand: { '@type': 'Brand', name: facts.brand }, manufacturer: { '@id': org['@id'] },
  category: 'Self-service health screening kiosks',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Screening measurements', value: facts.measurements.join(', ') },
    { '@type': 'PropertyValue', name: 'Calculated indicator', value: facts.calculatedMetrics.join(', ') },
    { '@type': 'PropertyValue', name: 'Guidance languages', value: facts.languages.join(', ') }
  ]
  // No Offer, AggregateOffer or ratings without an approved price or genuine reviews.
};
for (const [path, [title, description]] of Object.entries(pages)) {
  let html = readFileSync(resolve(root, path), 'utf8');
  const url = facts.url + (path === 'index.html' ? '/' : '/' + path);
  // Strip generated block and the old equivalent tags so each page has one canonical.
  html = html.replace(/\s*<!-- RELIV SEO START -->[\s\S]*?<!-- RELIV SEO END -->/g, '');
  html = html.replace(/\s*<title>[\s\S]*?<\/title>/gi, '');
  html = html.replace(/\s*<meta\b(?=[^>]*(?:name|property)=["'](?:description|keywords|robots|og:[^"']+|twitter:[^"']+)["'])[^>]*>/gi, '');
  html = html.replace(/\s*<link\b(?=[^>]*rel=["']canonical["'])[^>]*>/gi, '');
  // Retain existing videos and location lists, but use one common company/product identity.
  const retained = [];
  html = html.replace(/\s*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (_, json) => {
    const parsed = JSON.parse(json);
    for (const node of parsed['@graph'] || [parsed]) {
      const types = [].concat(node['@type'] || []);
      if (types.some(t => ['Organization', 'MedicalOrganization', 'WebSite', 'WebPage', 'ContactPage', 'Product', 'BreadcrumbList', 'FAQPage'].includes(t))) continue;
      if (path === 'index.html' && types.includes('VideoObject')) continue;
      // A station inside a venue is not a separately verified local business.
      const clean = JSON.parse(JSON.stringify(node).replaceAll('"LocalBusiness"', '"Place"'));
      if (clean.description?.startsWith('Active self-service')) clean.description = facts.visitNote;
      retained.push(clean);
    }
    return '';
  });
  const webpage = {
    '@type': path === 'contact.html' ? 'ContactPage' : 'WebPage', '@id': url + '#webpage', url, name: title, description,
    inLanguage: 'en-IN', isPartOf: { '@id': website['@id'] }, publisher: { '@id': org['@id'] }, about: { '@id': product['@id'] }
  };
  const graph = [org, website, webpage];
  if (path === 'health-kiosk.html') graph.push(product);
  if (path !== 'index.html') {
    webpage.breadcrumb = { '@id': url + '#breadcrumb' };
    graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Reliv Kiosk', item: facts.url + '/' },
      { '@type': 'ListItem', position: 2, name: title.split(' | ')[0], item: url }
    ] });
  }
  // FAQ answers are extracted from the visible HTML, never hidden ranking instructions.
  const questions = [...html.matchAll(/<details\b[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)].map(([,q,a]) => ({
    '@type': 'Question', name: textOnly(q.replace(/<span[^>]*>[\s\S]*?<\/span>/g, '')),
    acceptedAnswer: { '@type': 'Answer', text: textOnly(a) }
  }));
  if (questions.length) graph.push({ '@type': 'FAQPage', '@id': url + '#faq', mainEntity: questions });
  graph.push(...retained);
  const tags = [
    `<title>${htmlEscape(title)}</title>`,
    `<meta name="description" content="${htmlEscape(description)}">`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
    `<link rel="canonical" href="${url}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${htmlEscape(title)}">`,
    `<meta property="og:description" content="${htmlEscape(description)}">`,
    '<meta property="og:site_name" content="Reliv Kiosk">',
    '<meta property="og:locale" content="en_IN">',
    `<meta property="og:image" content="${facts.url}/assets/reliv-health-kiosk-kolkata.jpg">`,
    '<meta property="og:image:alt" content="Reliv Smart Health Kiosk in Kolkata, India">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${htmlEscape(title)}">`,
    `<meta name="twitter:description" content="${htmlEscape(description)}">`,
    `<meta name="twitter:image" content="${facts.url}/assets/reliv-health-kiosk-kolkata.jpg">`,
    '<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replaceAll('<', '\\u003c') + '\n</script>'
  ];
  // Existing retained nodes are inside the generated block; preserve them on regeneration.
  const original = readFileSync(resolve(root, path), 'utf8');
  const previousBlock = original.match(/<!-- RELIV SEO START -->([\s\S]*?)<!-- RELIV SEO END -->/);
  if (previousBlock) {
    const oldGraph = JSON.parse(previousBlock[1].match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const extra = oldGraph.filter(n => !['Organization', 'WebSite', 'WebPage', 'ContactPage', 'Product', 'BreadcrumbList', 'FAQPage'].includes(n['@type']));
    const unique = extra.filter(n => !retained.some(r => JSON.stringify(r) === JSON.stringify(n)));
    graph.push(...unique);
    tags[tags.length - 1] = '<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replaceAll('<', '\\u003c') + '\n</script>';
  }
  html = html.replace('</head>', '\n  <!-- RELIV SEO START -->\n  ' + tags.join('\n  ') + '\n  <!-- RELIV SEO END -->\n</head>');
  output(path, html);
}
const links = Object.entries(pages).map(([p,[t]]) => `- [${t}](${facts.url}${p === 'index.html' ? '/' : '/' + p})`).join('\n');
const summary = `# Reliv Kiosk\n\n> ${facts.description}\n\nCompany: ${facts.legalName}\nOfficial website: ${facts.url}/\nEmail: ${facts.email}\nPhone: ${facts.displayPhone}\nWhatsApp: ${facts.whatsapp}\nCompanion app: ${facts.appUrl}\n\n## Screening\n${facts.measurements.join(', ')}. Calculated indicator: ${facts.calculatedMetrics.join(', ')}.\n${facts.configurationNote}\n${facts.sessionTime}\nGuidance: ${facts.languages.join(', ')}.\n${facts.disclaimer}\n\n## Pricing\nKiosk purchase: ${facts.pricing.purchase}\nMonthly plans: ${facts.pricing.lease}\nIndividual checkups: ${facts.pricing.checkup}\nNo numeric starting price is published here. Machine purchase costs and session charges are different.\n\n## Kolkata stations\n${facts.stations.map(s => '- ' + s).join('\n')}\n${facts.visitNote}\n\n## Official pages\n${links}\n`;
output('llms.txt', summary);
output('llms-full.txt', summary + `\n## Company recognition\n${facts.recognition}\nCertificate: ${facts.url}/certificate.pdf\nCompany and team: ${facts.url}/about.html\n\n## Product scope\nHealth kiosk and Health ATM are category terms; Reliv is one product within the category. Reliv Medicare is the company, Reliv is the brand, and Reliv Smart Health Kiosk is the product. Optional metrics are configuration dependent. Measurements and calculated estimates are not equivalent to independent medical tests.\n\n## Reporting and the app\nFollow the kiosk instructions to access the report where offered. A payment QR is used for checkout or activation when requested. A health-data QR imports measurements where supported. Review any displayed charges before payment.\n\n## Evidence and updates\nThese files summarise the public website for convenience. They do not establish search ranking or inclusion in AI answers. Confirm current features, pricing and venue access with Reliv using the contact details above.\n`);
console.log(`${check ? 'Checked' : 'Generated'} SEO: ${changed.length} ${check ? 'stale' : 'updated'} files.`);
if (check && changed.length) { console.error(changed.join('\n')); process.exitCode = 1; }
