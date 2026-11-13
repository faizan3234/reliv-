# SEO quality checks

Run `npm test` before opening a PR. The GitHub workflow runs the same dependency-free checks on pull requests and pushes to main. These validate source links, generated metadata, structured data, contact/pricing consistency, enquiry behaviour and HTTP response validation. They do not measure rankings, accessibility or Core Web Vitals.

Run `npm run seo:generate` after editing page FAQs or the shared facts, then review the diff. Generated FAQ answers must match visible page answers.

After deployment, run `npm run seo:audit`. It checks all 25 current sitemap pages plus robots.txt, the deployed sitemap, both canonical redirects and a missing-page 404. Nonzero exit means a failed check. A deployment still in progress can produce a sitemap mismatch; investigate before retrying. In this workspace Node requires `NODE_USE_ENV_PROXY=1` for network access; normal environments may not.

`node scripts/submit-indexnow.mjs` prints the complete sitemap URL list without sending anything. After confirming production deployment, add `--submit` to verify the public key and every URL before notifying IndexNow. HTTP acceptance is not confirmation of indexing. This does not submit URLs to Google or guarantee AI citations.

Revenue examples assume the stated paid checks, fee, 30 operating days and 12 identical months. Collections and rent-only surplus are not net profit; actual costs and demand must be modelled separately. Preserve this distinction when changing visible copy or generated FAQ answers.

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content — reliable, useful information and clear attribution matter; avoid unsupported claims and search-engine-only content.

Review Search Console and Bing Webmaster Tools after deployment for actual indexing, impressions and query performance. Obtain genuine deployment evidence and independent mentions; passing these checks alone is not a 10/10 SEO score.
