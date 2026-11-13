(() => {
  'use strict';

  const q = s => document.querySelector(s);
  const qa = s => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 801px)');

  /* ---------- Fullscreen Editorial Menu Dialog ---------- */
  const menu = q('#menu');
  const trigger = q('.menu-button');
  if (menu && trigger) {
    trigger.addEventListener('click', () => {
      menu.showModal();
      trigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
    const close = () => {
      if (menu.open) menu.close();
    };
    const closeBtn = q('.menu-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    menu.addEventListener('click', e => {
      if (e.target === menu) close();
    });
    menu.addEventListener('close', () => {
      trigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      trigger.focus();
    });
  }

  /* ---------- 5-Sensor Kiosk Architecture Explorer ---------- */
  const data = [
    ['Height & weight.', 'Start with the basics. Height and weight provide the inputs for your body mass index.', 'MEASUREMENT + CALCULATION', 1, 0, '46%', '50%'],
    ['Blood pressure.', 'Follow the on-screen instructions for the wrist cuff. Keep your wrist supported at heart level.', 'SYSTOLIC + DIASTOLIC', 1.35, 12, '54%', '46%'],
    ['Oxygen & pulse.', 'Rest your finger in the sensor and stay still while the kiosk takes your reading.', 'SpO₂ + HEART RATE', 1.3, 0, '56%', '55%'],
    ['Eye check.', 'Follow the optional on-screen eyesight screening at the distance instructed by the kiosk.', 'OPTIONAL SCREENING', 1.4, 15, '24%', '50%'],
    ['Temperature.', 'Use the contactless temperature sensor as guided on screen.', 'CONTACTLESS MEASUREMENT', 1.4, 22, '31%', '53%']
  ];

  let active = -1;
  let locked = false;
  let queued = false;
  const buttons = qa('[data-sensor]');

  function render(i) {
    if (active === i || !data[i]) return;
    active = i;
    const d = data[i];
    const titleEl = q('#sensor-title');
    const copyEl = q('#sensor-copy');
    const kindEl = q('#sensor-kind');
    const countEl = q('#sensor-count');
    const camEl = q('.kiosk-camera');
    const markerEl = q('.sensor-marker');

    if (titleEl) titleEl.textContent = d[0];
    if (copyEl) copyEl.textContent = d[1];
    if (kindEl) kindEl.textContent = d[2];
    if (countEl) countEl.textContent = `0${i + 1} / 05`;

    buttons.forEach((b, n) => {
      const pressed = n === i;
      b.setAttribute('aria-pressed', String(pressed));
      if (pressed && !wide.matches && b.scrollIntoView) {
        b.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      }
    });

    if (camEl) {
      camEl.style.transform = reduced.matches ? 'none' : `translateY(${d[4]}px) scale(${d[3]})`;
    }
    if (markerEl) {
      markerEl.style.top = d[5];
      markerEl.style.left = d[6];
    }
  }

  buttons.forEach((b, i) => {
    b.addEventListener('click', () => {
      locked = true;
      render(i);
      const resumeBtn = q('#resume-tour');
      if (resumeBtn) resumeBtn.hidden = false;
    });
  });

  const resumeBtn = q('#resume-tour');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      locked = false;
      resumeBtn.hidden = true;
      updateTour();
    });
  }

  function updateTour() {
    queued = false;
    const tourEl = q('.tour');
    if (!tourEl || locked || !wide.matches || reduced.matches) return;
    const r = tourEl.getBoundingClientRect();
    const idx = Math.min(4, Math.max(0, Math.floor((-r.top / Math.max(1, r.height - innerHeight)) * 5)));
    render(idx);
  }

  render(0);

  /* ---------- Reading Progress, Sticky Header & Back-to-Top ---------- */
  const header = q('.site-header');
  const progressBar = document.createElement('div');
  progressBar.className = 'reliv-scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  const topBtn = document.createElement('a');
  topBtn.className = 'back-top-fab';
  topBtn.href = '#main';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '<svg class="ri ri-up" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/></svg>';
  document.body.appendChild(topBtn);

  function updateChrome() {
    const y = window.scrollY || window.pageYOffset;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.min(1, Math.max(0, y / max));
    progressBar.style.transform = `scaleX(${pct})`;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    topBtn.classList.toggle('is-visible', y > 520);
  }

  addEventListener('scroll', () => {
    updateChrome();
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateTour);
    }
  }, { passive: true });
  addEventListener('resize', () => {
    updateChrome();
    updateTour();
  });
  updateChrome();

  /* ---------- Progressive Viewport Reveals ---------- */
  if (!reduced.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
    const targets = qa('.reliv-path, .world-card, .steps article, .place-list a, .discovery-card, .recognition a');
    targets.forEach((el, idx) => {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = `${(idx % 3) * 65}ms`;
    });
    const revealVisible = () => {
      const cutoff = window.innerHeight * 0.98;
      targets.forEach(el => {
        if (!el.classList.contains('is-revealed') && el.getBoundingClientRect().top <= cutoff) {
          el.classList.add('is-revealed');
          io.unobserve(el);
        }
      });
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 40px 0px', threshold: 0.01 });
    targets.forEach(el => io.observe(el));
    addEventListener('scroll', revealVisible, { passive: true });
    addEventListener('resize', revealVisible, { passive: true });
    requestAnimationFrame(revealVisible);
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
