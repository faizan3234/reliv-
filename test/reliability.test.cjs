const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const path = require('node:path');
const server = fs.readFileSync(path.join(__dirname, '../backend/server.js'), 'utf8');
const client = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
function backend(fetchImpl, persisted = null) {
  const routes = new Map();
  let writes = true, snapshot;
  const context = vm.createContext({ process: { env: { RAZORPAY_KEY_ID: 'test', RAZORPAY_KEY_SECRET: 'secret' } },
    app: { get: () => {}, post: (p, fn) => routes.set(p, fn) }, Buffer, crypto, path, __dirname: '/test',
    readJsonSafe: () => persisted, writeJsonAtomic: (_p, value) => { if (writes) snapshot = JSON.parse(JSON.stringify(value)); return writes; },
    console: { error() {} }, fetch: fetchImpl, AbortSignal, Date });
  const start = server.indexOf('const RAZORPAY_KEY_ID');
  const end = server.indexOf('// ==========================================================================', start);
  vm.runInContext(server.slice(start, end), context);
  return { context, storage: value => { writes = value; }, snapshot: () => snapshot,
    async request(route, body) { const res = { code: 200, status(n) { this.code = n; return this; }, json(value) { this.body = value; return this; } }; await routes.get('/api/streak/restore/' + route)({ body }, res); return res; } };
}
const orderInput = { userId: 'user-test', lostStreak: 8, intentId: 'intent-12345678' };
const json = (data, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => data });
const signature = (o = 'order_test', p = 'pay_test') => crypto.createHmac('sha256', 'secret').update(`${o}|${p}`).digest('hex');
const verification = { orderId: 'order_test', paymentId: 'pay_test', signature: signature() };
const record = { userId: 'user-test', lostStreak: 8, rupees: 10, intentId: orderInput.intentId };
const payment = { id: 'pay_test', order_id: 'order_test', amount: 1000, currency: 'INR', status: 'captured' };

test('concurrent order requests and different-tab intents create only one provider order', async () => {
  let unblock, calls = 0;
  const b = backend(async () => { calls++; await new Promise(resolve => { unblock = resolve; }); return json({ id: 'order_test' }); });
  const first = b.request('order', orderInput);
  const second = await b.request('order', { ...orderInput, intentId: 'other-tab-123' });
  assert.equal(second.code, 409); unblock();
  const result = await first;
  assert.equal(result.body.orderId, 'order_test');
  const retry = await b.request('order', { ...orderInput, intentId: 'third-tab-123' });
  assert.equal(retry.body.orderId, 'order_test'); assert.equal(calls, 1);
  const restarted = backend(() => { throw new Error('must reuse ledger'); }, b.snapshot());
  assert.equal((await restarted.request('order', orderInput)).body.orderId, 'order_test');
});
test('ambiguous provider timeout blocks new charges across restarts', async () => {
  let calls = 0;
  const b = backend(async () => { calls++; throw new Error('network timeout'); });
  assert.equal((await b.request('order', orderInput)).code, 503);
  assert.equal((await b.request('order', orderInput)).code, 409);
  const restarted = backend(async () => { calls++; }, b.snapshot());
  assert.equal((await restarted.request('order', orderInput)).code, 409);
  assert.equal(calls, 1);
});
test('storage failure stops checkout before reaching the payment provider', async () => {
  let calls = 0; const b = backend(async () => { calls++; }); b.storage(false);
  assert.equal((await b.request('order', orderInput)).code, 503); assert.equal(calls, 0);
});
test('invalid streaks are rejected without contacting provider', async () => {
  const b = backend(() => { throw new Error('unexpected fetch'); });
  for (const lostStreak of [0, -1, 1.2, '8', null]) assert.equal((await b.request('order', { ...orderInput, lostStreak })).code, 400);
});
test('verify checks capture, amount, currency and order; retries do not duplicate ledger', async () => {
  let current = { ...payment, status: 'authorized' };
  const b = backend(async () => json(current), { orders: { order_test: { ...record } }, paid: [] });
  for (const overrides of [{ status: 'authorized' }, { amount: 1 }, { currency: 'USD' }, { order_id: 'other' }]) {
    current = { ...payment, ...overrides };
    assert.equal((await b.request('verify', verification)).code, 409);
  }
  current = payment;
  assert.equal((await b.request('verify', verification)).body.ok, true);
  assert.equal((await b.request('verify', verification)).body.ok, true);
  assert.equal(b.snapshot().paid.length, 1);
  assert.equal((await b.request('verify', { ...verification, signature: 'forged' })).code, 409);
});
test('claim survives dropped responses and repeated acknowledgements', async () => {
  const b = backend(async () => json({ items: [payment] }), { orders: { order_test: { ...record } }, paid: [] });
  const body = { userId: 'user-test', orderId: 'order_test' };
  assert.equal((await b.request('claim', body)).body.restoreStreak, 8);
  assert.equal(b.snapshot().orders.order_test.claimedAt, undefined);
  assert.equal((await b.request('claim', body)).body.restoreStreak, 8);
  assert.equal(b.snapshot().paid.length, 1);
  await b.request('claim', { ...body, acknowledge: true });
  assert.ok(b.snapshot().orders.order_test.claimedAt);
  assert.equal((await b.request('claim', { ...body, acknowledge: true })).body.ok, true);
  assert.equal((await b.request('claim', { userId: 'different-user', orderId: 'order_test' })).body.ok, false);
});
test('failed ledger write during verification remains retryable and never reports success', async () => {
  const b = backend(async () => json(payment), { orders: { order_test: { ...record } }, paid: [] });
  b.storage(false); assert.equal((await b.request('verify', verification)).body.ok, false);
  b.storage(true); assert.equal((await b.request('verify', verification)).body.ok, true);
  assert.equal(b.snapshot().paid.length, 1);
});
function memoryStorage() { const m = new Map(); return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: k => m.delete(k) }; }
function checkoutContext(extra = {}) {
  const context = vm.createContext({ localStorage: memoryStorage(), BACKEND_URL: '/api', RELIV_USER_ID: 'user-test',
    state: { restorableStreak: 8 }, crypto, setTimeout, clearTimeout, window: {},
    document: { getElementById: () => null }, showToast() {}, renderStreakBanner() {}, ...extra });
  vm.runInContext(client.slice(client.indexOf('let checkoutBusy ='), client.indexOf('function recalculateDeservedXP')), context);
  return context;
}
test('rapid Restore taps launch exactly one checkout and use one order', async () => {
  let orders = 0, opened = 0, options;
  const ctx = checkoutContext({ window: { Razorpay: function(o) { options = o; this.open = () => opened++; } },
    fetchWithBackendFallback: async route => route.endsWith('claim') ? json({ ok: false }) : (orders++, json({ orderId: 'order_test', rupees: 10, amount: 1000, currency: 'INR' })) });
  await Promise.all([vm.runInContext('restoreStreak()', ctx), vm.runInContext('restoreStreak()', ctx)]);
  assert.equal(orders, 1); assert.equal(opened, 1);
  await vm.runInContext('restoreStreak()', ctx); assert.equal(opened, 1);
  options.modal.ondismiss(); assert.equal(vm.runInContext('checkoutBusy', ctx), false);
});
test('lost acknowledgement retries without applying a paid streak twice', async () => {
  let applied = 0, fail = true;
  const ctx = checkoutContext({ applyStreakRestore: () => applied++, fetchWithBackendFallback: async () => { if (fail) throw new Error('offline'); return json({ ok: true }); } });
  await assert.rejects(vm.runInContext("applyAndAcknowledgeRestore({ok:true,orderId:'order_test',restoreStreak:8})", ctx));
  fail = false;
  await vm.runInContext("applyAndAcknowledgeRestore({ok:true,orderId:'order_test',restoreStreak:8})", ctx);
  assert.equal(applied, 1);
});
test('denied/unrequested notifications never subscribe or reject on startup', async () => {
  const slice = client.slice(client.indexOf('let pushSyncPromise'), client.indexOf('async function performHardRefresh'));
  for (const permission of ['default', 'denied']) {
    const ctx = vm.createContext({ state: { notifications: true, remindersPaused: false }, window: { Notification: {} }, Notification: { permission }, showToast() {} });
    vm.runInContext(slice, ctx);
    assert.equal(await vm.runInContext('subscribeToPushNotifications()', ctx), false);
  }
});
test('voice error does not send stale text; successful speech fills the actual chat input for review', async () => {
  let recognition, sent = 0;
  const ctx = vm.createContext({ voiceRecorder: null, voiceTranscribing: false, speechRecognition: null,
    window: { SpeechRecognition: function() { recognition = this; this.start = () => {}; } },
    els: { chatInput: { value: 'old unsent message' } }, updateVoiceUi() {}, sendCoachMessage: () => sent++ });
  vm.runInContext(client.slice(client.indexOf('async function startVoiceNoteCapture'), client.indexOf('// Meal notes are')), ctx);
  await vm.runInContext('startVoiceNoteCapture()', ctx);
  recognition.onerror({ error: 'not-allowed' }); recognition.onend(); assert.equal(sent, 0);
  await vm.runInContext('startVoiceNoteCapture()', ctx);
  recognition.onresult({ resultIndex: 0, results: [Object.assign([{ transcript: 'rice and dal' }], { isFinal: true })] });
  recognition.onend(); assert.equal(ctx.els.chatInput.value, 'rice and dal'); assert.equal(sent, 0);
});
test('Safari MP4 recordings retain their MIME type and release microphone tracks', async () => {
  let recorder, stopped = 0, captured;
  class Recorder { static isTypeSupported(t) { return t === 'audio/mp4'; } constructor(_s, opts) { recorder = this; this.mimeType = opts.mimeType; } start() {} }
  const ctx = vm.createContext({ voiceRecorder: null, voiceTranscribing: false, speechRecognition: null, voiceChunks: [],
    window: { MediaRecorder: Recorder }, MediaRecorder: Recorder, navigator: { mediaDevices: { getUserMedia: async () => ({ getTracks: () => [{ stop: () => stopped++ }] }) } },
    Blob, els: { chatInput: { value: '' } }, updateVoiceUi() {}, showToast() {}, console,
    transcribeGroqVoiceNote: async blob => { captured = blob; return 'one bowl of rice'; } });
  vm.runInContext(client.slice(client.indexOf('async function startVoiceNoteCapture'), client.indexOf('// Meal notes are')), ctx);
  await vm.runInContext('startVoiceNoteCapture()', ctx);
  recorder.ondataavailable({ data: new Blob(['test'], { type: 'audio/mp4' }) }); await recorder.onstop();
  assert.equal(captured.type, 'audio/mp4'); assert.equal(stopped, 1); assert.equal(ctx.els.chatInput.value, 'one bowl of rice');
});
test('offline service worker returns HTML only for navigations', async () => {
  const handlers = {};
  const ctx = vm.createContext({ self: { addEventListener: (n, fn) => handlers[n] = fn, location: { origin: 'https://example.test' } },
    URL, Response, caches: { match: async request => request === './index.html' ? new Response('<html>shell</html>') : undefined },
    fetch: async () => { throw new Error('offline'); } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8'), ctx);
  let result;
  handlers.fetch({ request: { method: 'GET', url: 'https://example.test/missing.js', mode: 'cors' }, respondWith: p => result = p });
  assert.equal((await result).type, 'error');
  handlers.fetch({ request: { method: 'GET', url: 'https://example.test/path', mode: 'navigate' }, respondWith: p => result = p });
  assert.match(await (await result).text(), /shell/);
});
test('partial meal notes preserve unknown amounts, deduplicate taps, retain drafts and never change nutrition totals', () => {
  class Element {
    constructor() { this.value = ''; this.checked = true; this.listeners = {}; this.children = []; }
    addEventListener(n, fn) { this.listeners[n] = fn; }
    replaceChildren() { this.children = []; }
    append(...items) { this.children.push(...items); }
    focus() {}
  }
  const ids = ['meal-memory-form', 'meal-memory-text', 'meal-memory-place', 'meal-memory-portion', 'meal-memory-partial', 'meal-memory-list', 'meal-checkin-feedback'];
  const elements = Object.fromEntries(ids.map(id => [id, new Element()]));
  const storage = memoryStorage();
  const ctx = vm.createContext({ document: { getElementById: id => elements[id], createElement: () => new Element() },
    localStorage: storage, Date, showToast() {}, state: { consumedCalories: 100, consumedProtein: 20 } });
  vm.runInContext(client.slice(client.indexOf('// Meal notes are'), client.indexOf('function init()')), ctx);
  vm.runInContext('initMealMemories()', ctx);
  elements['meal-memory-text'].value = 'Rice and starters; other dishes unknown';
  elements['meal-memory-place'].value = 'Restaurant / buffet';
  elements['meal-memory-portion'].value = 'Not sure';
  elements['meal-memory-form'].listeners.input();
  assert.match(storage.getItem('reliv-meal-draft'), /unknown/);
  elements['meal-memory-form'].listeners.submit({ preventDefault() {} });
  const notes = JSON.parse(storage.getItem('reliv-meal-memories'));
  assert.equal(notes[0].partial, true); assert.equal(notes[0].portion, 'Not sure');
  assert.equal(storage.getItem('reliv-meal-draft'), null);
  elements['meal-memory-text'].value = notes[0].text;
  elements['meal-memory-form'].listeners.submit({ preventDefault() {} });
  assert.equal(JSON.parse(storage.getItem('reliv-meal-memories')).length, 1);
  assert.equal(ctx.state.consumedCalories, 100); assert.equal(ctx.state.consumedProtein, 20);
  vm.runInContext('renderMealMemories()', ctx); assert.equal(elements['meal-memory-list'].children.length, 1);
});
