#!/usr/bin/env node
// Static output: crawlers and visitors receive the same facts without JavaScript.
// Run after editing facts or page copy. --check detects stale generated content.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const facts = JSON.parse(readFileSync(resolve(root, 'content/reliv-facts.json'), 'utf8'));
const demo = JSON.parse(readFileSync(resolve(root, 'content/reliv-demo.json'), 'utf8'));
const check = process.argv.includes('--check');
const changed = [];
const htmlEscape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const textOnly = html => html.replace(/<[^>]*>/g, '').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replace(/\s+/g, ' ').trim();
const pages = {
  "health-kiosk-buying-guide.html": [
    "Health ATM & Smart Health Kiosk Buying Guide India (2026) | Reliv",
    "Complete 2026 buyer's guide to Health ATMs & smart health kiosks in India: features, outright vs rental costs, ROI maths, installation, and compliance checklist."
  ],
  "demo.html": [
    "Watch Reliv Health Kiosk Demo | Official Kiosk Walkthrough",
    "Watch the official Reliv health kiosk demonstration. Explore screening features, configuration options and deployment pricing, or arrange a demonstration."
  ],
  "index.html": [
    "Reliv Health ATM & Smart Health Kiosk India | From ₹95,000",
    "Explore Reliv health kiosks from Kolkata: core vital checks, ₹95,000 machine purchase and ₹12,000 monthly rental. Compare plans, watch the demo and contact Reliv."
  ],
  "health-kiosk.html": [
    "Smart Health Kiosk in India | Autonomous Health ATM & Vitals Screening | Reliv",
    "Discover India's smart health kiosk: autonomous vital screening (BP, SpO₂, pulse, BMI), multilingual voice AI guidance, zero operator overhead, and pricing."
  ],
  "health-atm.html": [
    "What is a Health ATM? Guide to Smart Health Kiosks in India | Reliv",
    "What is a Health ATM? Discover how smart health checkup kiosks work in India: self-service 3-minute vital screening, parameters, pricing, and locations."
  ],
  "health-kiosk-kolkata.html": [
    "Health Kiosk in Kolkata | Reliv Locations & Screening",
    "Find Reliv health kiosk stations in Kolkata at IEM Gurukul, St. James’ School and Eco Park. See available checks and confirm access before visiting."
  ],
  "pricing.html": [
    "Reliv Health ATM Price | ₹95,000 Machine & ₹12,000/Month Rental",
    "Compare Reliv kiosk purchase at ₹95,000, rental at ₹12,000/month and venue partnerships. Confirm taxes, configuration and deployment inclusions in your quote."
  ],
  "contact.html": [
    "Contact Reliv Kiosk | Phone, Email & Pricing Enquiries",
    "Contact Reliv Medicare in Kolkata: +91 91636 06455 or relivcustomercare.in@gmail.com. Ask about health kiosks, pricing, demonstrations and venue access."
  ],
  "organisations.html": [
    "Host a Health ATM in Your Space | Free Setup & Revenue Share | Reliv",
    "Install a smart Health ATM kiosk in your college, gym, hospital, or transit space with ₹0 Capex. Earn passive revenue sharing with autonomous self-service healthcare."
  ],
  "solutions/gyms.html": [
    "Fitness & Wellness Kiosks for Gyms in India | Reliv",
    "Explore Reliv fitness and wellness kiosks for gyms: guided vital checks, height, weight and BMI. Confirm optional features and request deployment pricing."
  ],
  "solutions/colleges.html": [
    "Health Kiosks for Colleges in India | Reliv Campus Wellness",
    "Explore Reliv health screening kiosks for colleges and universities. Discuss campus deployment, guided checks, configuration, pricing and support."
  ],
  "solutions/offices.html": [
    "Workplace Health & Wellness Kiosks in India | Reliv",
    "Explore Reliv health screening for offices and employee wellbeing. Request a workplace kiosk proposal with configuration, installation and pricing."
  ],
  "locations.html": [
    "Find a Reliv Health Kiosk | Kolkata Station Directory",
    "Explore Reliv kiosk locations at IEM Gurukul, St. James’ School and Eco Park in Kolkata. Confirm station availability, venue access and hours before visiting."
  ],
  "about.html": [
    "About Reliv Medicare | Health Kiosk Company in Kolkata",
    "Meet Reliv Medicare Private Limited, the Kolkata company behind Reliv Smart Health Kiosk. Explore its team, DPIIT startup recognition and story."
  ],
  "how-it-works.html": [
    "How Reliv Kiosk Works | Health Checks, Videos & App Guide",
    "Watch the Reliv health kiosk walkthrough. Learn about guided checks, payment and health QR codes, digital reports and the companion app."
  ],
  "media.html": [
    "Reliv Kiosk Media | Official Photos, Videos & Recognition",
    "Explore official Reliv kiosk photographs, demonstration videos and startup recognition. Contact Reliv Medicare for product information and media enquiries."
  ],
  "health-atm-franchise.html": [
    "Health ATM Franchise & Business Opportunity India | Cost, ROI & Models | Reliv",
    "Explore Health ATM franchise and business opportunities in India. Compare outright purchase (₹95,000), monthly rental (₹12,000), and zero-cost space profit sharing with full ROI calculations."
  ],
  "health-atm-manufacturers-india.html": [
    "Health ATM Manufacturers in India | Smart Health Kiosk Comparison (2026) | Reliv",
    "Compare leading Health ATM manufacturers in India (2026). Evaluate testing parameters, CDSCO compliance, Make-in-India certifications, costs, and voice AI tech."
  ],
  "solutions/pharmacy.html": [
    "Health ATM for Pharmacies & Medical Stores in India | Reliv",
    "Explore Reliv Health ATMs for pharmacies: guided vital screening, ₹95,000 purchase, ₹12,000 monthly rental, venue requirements and revenue assumptions."
  ]
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
  if (path === 'demo.html' || path === 'media.html') {
    const video = {
      '@type': 'VideoObject', '@id': facts.url + demo.watchPath + '#video',
      name: demo.name, description: demo.description,
      thumbnailUrl: [facts.url + demo.thumbnailPath],
      uploadDate: demo.uploadDate, duration: demo.duration,
      contentUrl: facts.url + demo.contentPath, url: facts.url + demo.watchPath,
      width: demo.width, height: demo.height,
      publisher: { '@id': org['@id'] },
      mainEntityOfPage: { '@id': facts.url + demo.watchPath + '#webpage' }
    };
    graph.push(video);
    if (path === 'demo.html') webpage.mainEntity = { '@id': video['@id'] };
  }
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
  const isManagedVideo = node => node['@type'] === 'VideoObject' && node.contentUrl === facts.url + demo.contentPath;
  graph.push(...retained.filter(node => !isManagedVideo(node)));
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
    const unique = extra.filter(n => !isManagedVideo(n) && !retained.some(r => JSON.stringify(r) === JSON.stringify(n)));
    graph.push(...unique);
    tags[tags.length - 1] = '<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replaceAll('<', '\\u003c') + '\n</script>';
  }
  html = html.replace('</head>', '\n  <!-- RELIV SEO START -->\n  ' + tags.join('\n  ') + '\n  <!-- RELIV SEO END -->\n</head>');
  output(path, html);
}
const links = Object.entries(pages).map(([p,[t]]) => `- [${t}](${facts.url}${p === 'index.html' ? '/' : '/' + p})`).join('\n');
const summary = `# Reliv Kiosk\n\n> ${facts.description}\n\nCompany: ${facts.legalName}\nOfficial website: ${facts.url}/\nEmail: ${facts.email}\nPhone: ${facts.displayPhone}\nWhatsApp: ${facts.whatsapp}\nCompanion app: ${facts.appUrl}\n\n## Screening\n${facts.measurements.join(', ')}. Calculated indicator: ${facts.calculatedMetrics.join(', ')}.\n${facts.configurationNote}\n${facts.sessionTime}\nGuidance: ${facts.languages.join(', ')}.\n${facts.disclaimer}\n\n## Pricing\nKiosk purchase: ${facts.pricing.purchase}\nMonthly plans: ${facts.pricing.lease}\nIndividual checkups: ${facts.pricing.checkup}\nMachine purchase costs, rental fees and session charges are different. Confirm taxes and inclusions with Reliv.\n\n## Kolkata stations\n${facts.stations.map(s => '- ' + s).join('\n')}\n${facts.visitNote}\n\n## Official pages\n${links}\n`;
output('llms.txt', summary);
output('llms-full.txt', summary + `\n## Company recognition\n${facts.recognition}\nCertificate: ${facts.url}/certificate.pdf\nCompany and team: ${facts.url}/about.html\n\n## Product scope\nHealth kiosk and Health ATM are category terms; Reliv is one product within the category. Reliv Medicare is the company, Reliv is the brand, and Reliv Smart Health Kiosk is the product. Optional metrics are configuration dependent. Measurements and calculated estimates are not equivalent to independent medical tests.\n\n## Reporting and the app\nFollow the kiosk instructions to access the report where offered. A payment QR is used for checkout or activation when requested. A health-data QR imports measurements where supported. Review any displayed charges before payment.\n\n## Evidence and updates\nThese files summarise the public website for convenience. They do not establish search ranking or inclusion in AI answers. Confirm current features, pricing and venue access with Reliv using the contact details above.\n`);
console.log(`${check ? 'Checked' : 'Generated'} SEO: ${changed.length} ${check ? 'stale' : 'updated'} files.`);
if (check && changed.length) { console.error(changed.join('\n')); process.exitCode = 1; }
