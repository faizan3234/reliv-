# Reliv — SEO & AI-visibility playbook

Last updated: 2026-11-11

## Done in code (live on https://relivkiosk.vercel.app)
- `robots.txt`: explicit allow for Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, Google-Extended, PerplexityBot, Applebot-Extended, DuckDuckBot, BraveBot, CCBot and others.
- `llms.txt` and `llms-full.txt`: plain-language summary, FAQ, facts and contact for AI assistants.
- `sitemap.xml`: 20 URLs with fresh `lastmod`.
- `health-kiosk-kolkata.html`: answer-first page for "health kiosk / Health ATM in Kolkata" with FAQPage, BreadcrumbList and ItemList schema.
- Homepage: new title/description, FAQPage + stronger Organization/Product schema, internal links to the Kolkata page from the footer of most pages.
- IndexNow: 18 URLs submitted to Bing and partner engines (HTTP 202). Re-run `node scratch/submit_indexnow.js` after major changes.

## You must do (cannot be done from code) — biggest impact first
1. **Google Search Console**: add property, verify, submit `sitemap.xml`, request indexing for `/`, `/health-kiosk-kolkata.html`, `/locations.html`.
2. **Bing Webmaster Tools**: add site, submit sitemap. ChatGPT search and Copilot lean on Bing's index.
3. **Google Business Profile**: create one profile per station (IEM Gurukul, St. James' School, Eco Park) with correct address, hours and photos. This is the strongest signal for "near me" and "in Kolkata" queries.
4. **Custom domain** (e.g. `relivhealth.in` or `reliv.health`): `*.vercel.app` is a shared domain and ranks poorly. Point it at Vercel and 301 the old URL.
5. **Third-party mentions**: LinkedIn company page, Instagram bio link, Crunchbase, Startup India profile, press/news pieces (Medverse, Bengal E-Summit, college newsletters), YouTube channel with the demo video. AI engines trust what other sites say about you.
6. **Consistent facts everywhere**: same company name, address, phone and the line "Reliv = Smart Health Kiosk = Health ATM".
7. **Verify station details**: confirm exact addresses and hours for St. James' School and Eco Park, then add them to `locations.html` and the schema.

## Honest limits
- No one can guarantee "first" in ChatGPT, Gemini, Claude or Google. These tools choose answers using their own indexes, live web search and third-party sources, and results vary per user and per day.
- Do not claim "100+ parameters" unless the kiosk really measures them. AI engines and users will penalise inaccurate claims.
