/* Preserve enquiries on failure; a provider acknowledgement is not email delivery. */
(function () {
  'use strict';
  const form = document.getElementById('orgForm');
  const status = document.getElementById('orgFormStatus');
  if (!form || !status) return;
  const plans = {
    purchase: 'Outright Purchase',
    monthly: 'Monthly Plan',
    franchise: 'Buy a Franchise',
    share: 'Revenue Partnership',
    institution: 'Outright Purchase',
    student: 'Student / Public Venue Request'
  };
  const types = {
    franchise: 'Franchise Partner / Entrepreneur',
    institution: 'College/University',
    student: 'Student / Public Place Request',
    personal: 'Franchise Partner / Entrepreneur'
  };
  const params = new URLSearchParams(window.location.search);
  const requestedPlan = params.get('plan');
  const requestedType = params.get('who');
  if (plans[requestedPlan] && form.elements.model) form.elements.model.value = plans[requestedPlan];
  if (types[requestedType] && form.elements.type) form.elements.type.value = types[requestedType];
  else if (types[requestedPlan] && form.elements.type) form.elements.type.value = types[requestedPlan];
  if (typeof document.querySelectorAll === 'function') {
    const orgInput = document.getElementById('orgName');
    const orgLabel = typeof document.querySelector === 'function' ? document.querySelector('label[for="orgName"]') : null;
    const notesInput = document.getElementById('message');
    const syncTrackHighlight = (modelVal) => {
      document.querySelectorAll('[data-track-card]').forEach((card) => {
        card.classList.toggle('is-selected-track', card.getAttribute('data-select-model') === modelVal);
      });
    };
    if (plans[requestedPlan]) syncTrackHighlight(plans[requestedPlan]);
    document.querySelectorAll('[data-select-model], [data-select-type]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const selectedModel = trigger.getAttribute('data-select-model');
        if (selectedModel && form.elements.model) {
          form.elements.model.value = selectedModel;
          syncTrackHighlight(selectedModel);
        }
        const selectedType = trigger.getAttribute('data-select-type');
        if (selectedType && form.elements.type) {
          form.elements.type.value = selectedType;
        }
        const orgPrompt = trigger.getAttribute('data-org-label');
        if (orgPrompt && orgLabel) orgLabel.textContent = orgPrompt;
        const orgPlaceholder = trigger.getAttribute('data-org-placeholder');
        if (orgPlaceholder && orgInput) orgInput.placeholder = orgPlaceholder;
        const notesPlaceholder = trigger.getAttribute('data-notes-placeholder');
        if (notesPlaceholder && notesInput) notesInput.placeholder = notesPlaceholder;
      });
    });
  }
  const button = form.querySelector('button[type="submit"]');
  const originalLabel = button.textContent;
  let pending = false;
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    pending = true;
    button.disabled = true;
    button.textContent = 'Sending your enquiry…';
    form.setAttribute('aria-busy', 'true');
    status.hidden = false;
    status.textContent = 'Sending your enquiry. Please keep this page open.';
    status.className = 'enquiry-status';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/relivcustomercare.in@gmail.com', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal
      });
      if (!response.ok) throw new Error('Provider rejected request');
      const data = await response.json();
      if (data.success !== true && data.success !== 'true') throw new Error('Missing provider acknowledgement');
      // Never interpolate visitor input into HTML or open another service automatically.
      status.textContent = 'Thank you. The form service accepted your enquiry for Reliv. If you need to follow up, use the phone or email below. Keep a copy of your details until the team replies.';
      status.className = 'enquiry-status enquiry-status--success';
      button.textContent = 'Enquiry accepted';
      status.focus();
    } catch (error) {
      status.textContent = 'We could not confirm your enquiry was accepted. Your details are still here. Please contact Reliv using the phone or email below, or retry. If the connection timed out, check with the team before sending again.';
      status.className = 'enquiry-status enquiry-status--error';
      button.disabled = false;
      button.textContent = originalLabel;
      pending = false;
      status.focus();
    } finally {
      clearTimeout(timeout);
      form.removeAttribute('aria-busy');
    }
  });
})();
