# Reliv search and AI discovery

Prepared 11 November 2026. These are proposed repository changes, not a claim that a PR has been merged, deployed or indexed.

## Search intent and destination

| Intent | Primary page |
| --- | --- |
| Reliv kiosk / healthcare kiosk India | `/health-kiosk.html` |
| Health ATM meaning | `/health-atm.html` |
| Purchase price / monthly plans / checkup fees | `/pricing.html` |
| Phone, email, official website | `/contact.html` |
| Health kiosk Kolkata | `/health-kiosk-kolkata.html` |
| Station access and directory | `/locations.html` |
| Institutional deployment | `/organisations.html` |
| Campus, workplace and fitness use cases | `/solutions/colleges.html`, `/solutions/offices.html`, `/solutions/gyms.html` |

The pages use visible HTML, descriptive titles, canonical URLs, social metadata and links from the homepage and public footers. Company, website and product identifiers are shared in JSON-LD. FAQ markup comes from the visible questions and answers. The interactive journey remains in the sitemap; draft archives and supplementary text files are not sitemap landing pages.

The robots policy applies internal-path exclusions to named search/AI agents and the wildcard. Earlier separate Allow-only groups could bypass the wildcard restrictions. Vercel redirects consolidate `/index.html` into `/` and `/partner.html` into `/organisations.html`. Draft HTML has noindex metadata, with additional noindex headers for draft and source paths on Vercel.

## Owner facts still needed

- No approved numeric starting price was found. The site says **request current pricing**. `content/reliv-facts.json` records `startingPriceINR: null`. Never use the free simulator price as the machine price.
- Before publishing “starts from ₹…”, confirm the amount, billing unit (machine/month/checkup/report), GST, included configuration, installation/delivery, eligibility and expiry. Update visible homepage/product/pricing copy, facts and the generator's pricing summary together. Add Offer markup only for a genuine, fully described public offer.
- Listed Kolkata stations come from the existing website, not a new physical visit. Confirm operational status, exact address, access rules and hours before strengthening claims. A partner venue is not necessarily the company office or a public clinic.
- Core measurements, calculated BMI and optional features are distinct. Obtain the specification sheet and clinical evidence before claiming accuracy, regulatory approval or a number of independent medical tests. DPIIT is startup recognition, not device approval.

## Release and indexing

1. Review and merge the PR; confirm Vercel's production deployment succeeds.
2. Verify production homepage, product, pricing, contact and Kolkata pages return 200 with the intended canonical URLs and no unintended noindex, login or bot challenge. Check the alias redirects and draft noindex headers on Vercel.
3. In [Google Search Console](https://search.google.com/search-console), verify ownership, submit `https://relivkiosk.vercel.app/sitemap.xml`, inspect important URLs and request indexing. The preserved Google verification HTML file does not prove that the property is verified or indexed.
4. In [Bing Webmaster Tools](https://www.bing.com/webmasters), verify ownership and submit the same sitemap. After deployment, use the guarded IndexNow helper below. Submission acceptance is not proof of indexing or ranking.
5. Check public URLs with [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/). Product markup without an offer/review may not qualify for product rich results. Do not invent prices or ratings to remove warnings. FAQ markup does not guarantee a rich result.
6. Check Vercel/CDN logs and bot protection for crawler access. A robots allow cannot override a firewall challenge; do not disable security wholesale.

## Build genuine authority

Keep the same company name, URL, phone and email across real profiles, venue pages and media material. Ask genuine partner venues to describe their installation and link to Reliv. Publish actual demonstration videos, configuration sheets, pricing terms and deployment case studies with permission. Avoid fake testimonials, fabricated citations, paid-link schemes and near-identical keyword/city pages.

Check Google Business Profile eligibility and venue authorization before adding locations. Do not create a listing for each station without establishing eligibility. The exception for ATMs is not proof that every machine called a “Health ATM” qualifies.

A custom domain can help brand consistency and ownership. The `vercel.app` hostname alone does not establish a ranking penalty. A move requires redirects, canonical updates and a planned Search Console migration.

## Maintain and validate

```sh
npm run seo:generate
npm run test:seo
npm run test:site
node scripts/submit-indexnow.mjs
# Actual submission, only after production deployment:
node scripts/submit-indexnow.mjs --submit
```

The generator produces committed static HTML and optional llms summaries using Node with no extra dependencies. No browser JavaScript is needed to read the facts. Tests check generated drift, sitemap targets, canonicals, unique titles, JSON-LD, links, contact consistency, missing-price behavior and crawler rules. Tests and the default IndexNow dry run do not submit anything externally.

Local checks: 20 sitemap pages, 15 JSON-LD blocks and an 18-page source smoke audit. New product/contact/pricing pages were inspected in narrow browser frames with 345–375 CSS pixels of content; pricing was inspected on desktop. The pricing FAQ opened successfully. This is not a full device lab, Lighthouse audit, clinical validation, public indexing audit or test of every AI platform.

## Measure results

Record Google/Bing impressions, indexed URLs, clicks, enquiries and referring domains. For AI spot checks record question, platform, date, browsing/search mode and citations. Sample “Reliv kiosk”, “health kiosk India”, “health kiosk Kolkata”, “fitness kiosk for gyms India” and “Reliv kiosk price”. One answer does not establish a stable ranking. Offline models may lack current web information.

No code can guarantee first position or mentions everywhere. Google says normal SEO fundamentals apply to its AI features and no special AI file or schema is required. `llms.txt` is an optional summary, not an indexing protocol or universal AI feed. Search access and training permission serve different purposes; neither forces learning or recommendations.

References:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
- https://support.google.com/business/answer/13763036
- https://support.google.com/business/answer/3038177
- https://www.indexnow.org/documentation
