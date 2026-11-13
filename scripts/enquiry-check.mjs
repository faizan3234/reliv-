// Exercise browser form logic with mocked DOM/network; never send an enquiry.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const source = readFileSync(new URL('../enquiry.js', import.meta.url), 'utf8');
async function scenario(response, { plan = 'purchase', reject = false, invalid = false } = {}) {
  let handler, requests = 0, focused = false;
  const button = { textContent: 'Submit', disabled: false };
  const status = { hidden: true, textContent: '', focus() { focused = true; }, set innerHTML(_) { throw new Error('Unsafe HTML insertion'); } };
  const form = { elements: { model: { value: 'Undecided' } }, reportValidity: () => !invalid,
    querySelector: () => button, setAttribute() {}, removeAttribute() {},
    addEventListener(_, fn) { handler = fn; }, submit() { throw new Error('Unexpected automatic fallback'); } };
  runInNewContext(source, {
    document: { getElementById: id => id === 'orgForm' ? form : status },
    window: { location: { search: '?plan=' + plan }, open() { throw new Error('Unexpected popup'); } },
    URLSearchParams, AbortController, setTimeout, clearTimeout,
    FormData: class {}, fetch: async () => { requests++; if (reject) throw new Error('Network unavailable'); return response; }
  });
  await Promise.all([handler({ preventDefault() {} }), handler({ preventDefault() {} })]);
  return { button, status, form, requests, focused };
}
for (const success of [true, 'true']) {
  const r = await scenario({ ok: true, json: async () => ({ success }) });
  assert.equal(r.requests, 1); assert.equal(r.button.disabled, true);
  assert.match(r.status.textContent, /accepted/); assert.ok(r.focused);
  assert.equal(r.form.elements.model.value, 'Outright Purchase');
}
for (const response of [{ ok: false }, { ok: true, json: async () => ({ success: false }) }, { ok: true, json: async () => { throw new Error('Invalid JSON'); } }]) {
  const r = await scenario(response, { plan: 'monthly' });
  assert.equal(r.button.disabled, false); assert.match(r.status.textContent, /could not confirm/);
  assert.equal(r.form.elements.model.value, 'Monthly Plan'); assert.ok(r.focused);
}
const offline = await scenario(null, { reject: true, plan: 'untrusted' });
assert.equal(offline.button.disabled, false); assert.equal(offline.form.elements.model.value, 'Undecided');
const invalid = await scenario(null, { invalid: true });
assert.equal(invalid.requests, 0);
console.log('Enquiry checks passed: acknowledgement, HTTP/provider/JSON/network failures, duplicate prevention, validation and plan selection. No network requests sent.');
