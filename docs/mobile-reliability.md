# Mobile reliability changes and release checks

This patch reduces checkout and logging failures. It does not establish support for every phone or prove improved seven-day retention.

## Implemented

- Single-flight checkout; persistent browser payment intent; server-side order reuse across tabs and restart. Ambiguous provider creation failures are blocked for operator reconciliation rather than creating another order.
- Verify signature and independently check captured amount, currency and order. Recover a captured payment through the provider even if the browser never received its callback. Claim reads are non-destructive; the browser acknowledges after saving, with a receipt journal for repeated responses.
- No automatic mutation retry against another backend. HTTP errors remain available to callers. Backend reachability can recover after a transient outage.
- Push sync requires granted permission and the user's enabled setting, coalesces concurrent calls, validates VAPID key bytes, checks subscription persistence, and avoids unhandled background rejections. Refresh preserves working subscriptions and reports sync results honestly. Generated private VAPID keys are no longer printed.
- Voice input uses the actual chat field and stays editable before Send. Speech errors cannot send stale text. MP4/WebM/OGG formats retain the recorder MIME type, and tracks close after recording/errors.
- Zoom restored, modal height uses dynamic viewport units with fallback, scrollable sheets, safe areas, small-width form wrapping, touch targets and reduced motion.
- Buffet/home meal notes support partial recall, familiar portion labels, draft persistence, undo, local history and JSON export. They deliberately do not invent nutrition for unknown meals. Latest 200 notes are retained; the UI shows the latest 10.
- Versioned offline assets are precached. Missing scripts never receive HTML as an offline fallback. Updates no longer reload unexpectedly during editing or checkout.

## Validation completed

- `node test/verify_all.js`: 31 existing checks.
- `node --test test/reliability.test.cjs`: 14 behavior tests, executing production function/route source with controlled browser/provider/storage doubles.
- JavaScript syntax checks and `git diff --check`.
- Production browser inspection reproduced push permission errors on launch. Browser-extension errors were excluded from app findings.

The controlled tests are not live Razorpay, APNs/FCM, microphone hardware, or Safari/Android rendering tests. The available browser blocked the local preview URL; changed UI visual verification remains outstanding.

## Before merge / rollout

Deploy backend before the new frontend: the new checkout requires `intentId` and claim acknowledgement. Old cached frontend builds may get a safe checkout rejection rather than accepting a new charge; ask those users to reload. Retain backups of `backend/restores.json`. This implementation assumes one Node backend process with a persistent writable disk. Multiple replicas require a transactional shared database and distributed locking. A disk failure or lost/corrupt ledger is not recoverable by this patch alone.

Configure persistent VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY on the backend. Do not rotate healthy keys for a refresh or add separate keys for each phone. Verify auto-capture settings with Razorpay; authorized-only payments are intentionally not fulfilled. No production payment was made during validation.

Test at 320, 360, 390, 430 and 768 CSS pixels, portrait/landscape, keyboard open, large text and reduced motion. Use Safari and installed iPhone PWA, Chrome/Samsung Internet on Android, and a browser without speech/push support. Test all five tabs, setup/settings sheets, meal drafts after reload/offline, microphone allowed/denied/stopped, push allowed/denied, repeated refresh, checkout cancel/double-tap, network loss, and captured payment recovery in Razorpay test mode.

For iOS/iPadOS push, use a supported Home Screen web app (16.4+); push permission must follow a user gesture. See https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ and https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers .

## Remaining product and architecture limits

Anonymous installation IDs are not authenticated accounts. Clearing browser data loses that identity and local notes; cross-device recovery/account authorization is not solved here. Existing profile/refund APIs and the HTTP Oracle upstream need a separate security review before treating the app as a secure account-based financial service. The existing 23-hour streak cycle is unchanged. Measure return rates with consented analytics and customer feedback; a meal-note feature cannot guarantee retention.

For a `pending_...` uncertain order record: inspect its receipt in the Razorpay dashboard and reconcile the ledger before allowing another order. Do not delete the record merely to unblock a payment retry.
