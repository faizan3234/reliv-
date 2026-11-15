# Secret Inbox Mode (`INBOX_MODE` / `VITE_INBOX_MODE`)

Temporary full-site takeover for the Reliv website, implemented at the Vercel Routing Middleware boundary ([`inbox-mode/proxy.js`](./proxy.js), wired via [`../vercel.json`](../vercel.json)).

Because this repository is a static Vercel project (no Vite runtime), the central flag is adapted to Vercel's standard server/edge environment variable **`INBOX_MODE`** — and **`VITE_INBOX_MODE`** is also supported as an alias so either variable name works seamlessly.

## Enable or Disable on Vercel

1. Open your **Vercel Dashboard** -> Project Settings -> **Environment Variables**.
2. Add or update the flag:
   - **Enable Inbox Mode:** set `INBOX_MODE` = `true` (or `VITE_INBOX_MODE` = `true`) for **Production** (and/or Preview).
   - **Disable Inbox Mode:** set `INBOX_MODE` = `false` (or remove the variable).
3. **Redeploy** the project cleanly so Vercel picks up the updated environment variable:
   - While enabled, every public route (`/`, `/about.html`, `/pricing.html`, `/organisations.html`, `/solutions/*`, interactive experience, etc.) returns the full-screen Reliv Inbox Mode announcement (matching the site's `#fff9f2` / `#FF6B24` palette, real wordmark SVG, and direct mail CTA) on the exact requested URL with zero redirects and zero underlying page HTML flash.
   - APIs (`/api/*`), admin/app/kiosk routes (`/admin/*`, `/app/*`, `/kiosk/*`), `robots.txt`, `sitemap.xml`, Search Console verification (`googled52447afa2fa397c.html`), favicons, and static assets continue passing through untouched.
   - When disabled and redeployed, traffic immediately passes straight to the original site with zero leftover UI or routing changes.

## Local Preview & Verification

- Preview with Inbox Mode **ON**:
  ```bash
  INBOX_MODE=true node inbox-mode/dev-preview.mjs
  ```
  *(PowerShell: `$env:INBOX_MODE="true"; node inbox-mode/dev-preview.mjs`)*

- Preview with Inbox Mode **OFF** (normal site):
  ```bash
  node inbox-mode/dev-preview.mjs
  ```

- Run automated Inbox Mode acceptance & regression verification:
  ```bash
  node inbox-mode/verify.mjs
  ```

## Completely Remove Later (Optional)

When this temporary campaign is permanently finished:
1. Remove the `"proxy"` entry (and optional `/inbox-mode/:path*` header entry) from `vercel.json`.
2. Delete the `inbox-mode/` folder.

