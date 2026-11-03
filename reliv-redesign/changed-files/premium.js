/* =========================================================
   RELIV — PREMIUM EXPERIENCE ENGINE
   Preloader · inertia scroll · reveals · split type · magnetic
   buttons · cursor · page transitions · scrollytelling.
   Progressive: the site is fully usable if this never runs.
   ========================================================= */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var lenis = null;

  if (!reduced) doc.classList.add('motion-ok');

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  // Lenis drives native scroll position, so window 'scroll' covers both modes.
  function onScroll(fn) { window.addEventListener('scroll', fn, { passive: true }); }
  function scrollY() { return window.scrollY || window.pageYOffset; }

  /* ---------- 1. Preloader (first visit per session) ---------- */
  function runPreloader(done) {
    var seen = false;
    try { seen = sessionStorage.getItem('reliv_pl') === '1'; } catch (e) {}
    if (seen || reduced) { done(); return; }
    try { sessionStorage.setItem('reliv_pl', '1'); } catch (e) {}

    var pl = document.createElement('div');
    pl.className = 'preloader';
    pl.setAttribute('aria-hidden', 'true');
    pl.innerHTML =
      '<div class="preloader-mark"><img src="icons/reliv-wordmark.svg" alt="" width="240" height="92"></div>' +
      '<div class="preloader-bar"><span></span></div>' +
      '<div class="preloader-meta"><span>Health, clearer</span><span class="pl-num">000</span></div>';
    document.body.appendChild(pl);

    var bar = $('.preloader-bar span', pl);
    var num = $('.pl-num', pl);
    var start = performance.now();
    var dur = 750;
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      pl.classList.add('done');
      done();
      setTimeout(function () { pl.remove(); }, 600);
    }

    var safety = setTimeout(finish, 1100);

    (function tick(now) {
      if (finished) return;
      var t = clamp((now - start) / dur, 0, 1);
      var e = 1 - Math.pow(1 - t, 3);
      bar.style.transform = 'scaleX(' + e + ')';
      num.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (t < 1) requestAnimationFrame(tick);
      else {
        clearTimeout(safety);
        setTimeout(finish, 60);
      }
    })(start);
  }

  /* ---------- 2. Inertia smooth scroll (Lenis) ---------- */
  function initLenis(cb) {
    if (reduced) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js';
    s.async = true;
    s.onload = function () {
      try {
        lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
        (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(performance.now());
        // Drawer: pause smooth scroll while open, allow inner scrolling
        var drawer = $('#navDrawer');
        if (drawer) {
          drawer.setAttribute('data-lenis-prevent', '');
          new MutationObserver(function () {
            drawer.classList.contains('is-open') ? lenis.stop() : lenis.start();
          }).observe(drawer, { attributes: true, attributeFilter: ['class'] });
        }
      } catch (e) { lenis = null; }
      cb();
    };
    s.onerror = function () { cb(); };
    document.head.appendChild(s);
  }

  /* In-page anchors glide with an offset for the floating header */
  function initAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.getElementById(id.slice(1));
      if (!t) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: -90, duration: 1.4 });
      else window.scrollTo({ top: t.getBoundingClientRect().top + scrollY() - 90, behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  }

  /* ---------- 3. Split headlines into masked words ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    var i = 0;
    var nodes = Array.prototype.slice.call(el.childNodes);
    var frag = document.createDocumentFragment();
    function wrap(node) {
      var outer = document.createElement('span');
      outer.className = 'sw';
      var inner = document.createElement('span');
      inner.style.setProperty('--i', i++);
      inner.appendChild(node);
      outer.appendChild(inner);
      return outer;
    }
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        var parts = n.textContent.split(/(\s+)/);
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' '));
          else frag.appendChild(wrap(document.createTextNode(p)));
        });
      } else if (n.nodeType === 1 && n.tagName === 'BR') {
        frag.appendChild(n);
      } else if (n.nodeType === 1) {
        frag.appendChild(wrap(n));
      }
    });
    el.innerHTML = '';
    el.appendChild(frag);
  }

  /* ---------- 4. Reveal on scroll ---------- */
  var AUTO_REVEAL = [
    'main .section-header', 'main .eyebrow', 'main p.body-lead', 'main p.body-secondary',
    'main .step-card', 'main .award-card', 'main .reliv-pillar-card', 'main .partner-associate-card',
    'main .platform-card', 'main .qr-card', 'main .proof-item', 'main .eco-pill', 'main article',
    'main .location-card-clean', 'main .watch-info', 'main .phone-stage', 'main .app-panel',
    'main .recog-card', 'main .ecosystem-hero-card', 'main .role-card', 'main [data-reveal]',
    '.footer-col', '.footer-brand', '.footer-mega'
  ];

  function initReveals() {
    if (reduced) return;

    // Headlines get the split-word treatment (excluding hero h1 so hero displays instantly without glitch)
    $$('main h2, [data-split]').forEach(function (h) {
      if (h.closest('.vitals-card') || h.closest('[data-no-split]') || h.closest('.hx')) return;
      if (h.querySelector('img, svg, a, button')) return;
      h.setAttribute('data-split', '');
      splitWords(h);
    });

    var els = [];
    AUTO_REVEAL.forEach(function (sel) {
      $$(sel).forEach(function (el) {
        if (el.closest('.vitals-sticky') || el.closest('.nav-drawer') || el.closest('.preloader') || el.closest('.hx')) return;
        if (els.indexOf(el) === -1) els.push(el);
      });
    });
    // Animate the outermost element only; nested matches ride along with their parent
    els = els.filter(function (el) {
      return !els.some(function (o) { return o !== el && o.contains(el); });
    });

    // Stagger siblings that share a parent
    var groups = new Map();
    els.forEach(function (el) {
      el.classList.add('rv');
      var p = el.parentElement;
      var n = groups.get(p) || 0;
      el.style.setProperty('--d', Math.min(n, 6) * 0.08 + 's');
      groups.set(p, n + 1);
    });

    $$('[data-reveal-img]').forEach(function (el) { el.classList.add('rv-img'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        // Hand transforms back to hover styles after the entrance
        if (el.classList.contains('rv')) {
          setTimeout(function () { el.classList.remove('rv', 'in'); el.style.removeProperty('--d'); }, 1700);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.concat($$('[data-split]'), $$('.rv-img')).forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Count-up numbers ---------- */
  function initCounters() {
    var items = $$('[data-count]');
    if (!items.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        if (reduced) { el.textContent = target; return; }
        var t0 = performance.now(), dur = 1600;
        (function step(now) {
          var t = clamp((now - t0) / dur, 0, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
          if (t < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. Header: hide on scroll down, show on up ---------- */
  function initHeader() {
    var header = $('header');
    if (!header) return;
    var last = 0;
    onScroll(function () {
      var y = scrollY();
      header.classList.toggle('is-scrolled', y > 20);
      if ($('#navDrawer.is-open')) return;
      if (y > 260 && y > last + 4) header.classList.add('is-hidden');
      else if (y < last - 4 || y < 260) header.classList.remove('is-hidden');
      last = y;
    });
  }

  /* ---------- 7. Scroll progress bar ---------- */
  function initProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? scrollY() / max : 0) + ')';
    }
    onScroll(update);
    update();
  }

  /* ---------- 8. Parallax ---------- */
  function initParallax() {
    if (reduced) return;
    var items = $$('[data-parallax]');
    if (!items.length) return;
    function update() {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var off = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
    }
    onScroll(update);
    update();
  }

  
  /* ---------- Card mouse spotlight (The Collective feel) ---------- */
  function initCardSpotlights() {
    if (!finePointer || reduced) return;
    var cards = $$('.step-card, .platform-card, .award-card, .recog-card, .partner-associate-card, .location-card-clean');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
  }

  /* ---------- 9. Magnetic buttons ---------- */
  function initMagnetic() {
    if (!finePointer || reduced) return;
    $$('.btn-primary, .btn-lg, .left-nav-btn, [data-magnetic]').forEach(function (el) {
      var strength = 0.28;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate3d(' + x * strength + 'px,' + y * strength * 1.2 + 'px,0)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        el.style.transform = '';
        setTimeout(function () { el.style.transition = ''; }, 700);
      });
    });
  }

  /* ---------- 10. Custom cursor ---------- */
  function initCursor() {
    if (!finePointer || reduced) return;
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    ring.innerHTML = '<span></span>';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var label = ring.firstChild;
    var mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    }, { passive: true });
    document.addEventListener('mouseleave', function () { doc.classList.add('cursor-hidden'); });
    document.addEventListener('mouseenter', function () { doc.classList.remove('cursor-hidden'); });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var labelled = e.target.closest('[data-cursor]');
      var hov = e.target.closest('a, button, [role="button"], summary, label, .recog-card, .platform-card');
      if (labelled) {
        label.textContent = labelled.getAttribute('data-cursor');
        ring.classList.add('has-label');
        ring.classList.remove('is-hover');
      } else {
        ring.classList.remove('has-label');
        ring.classList.toggle('is-hover', !!hov);
      }
    });
  }

  /* ---------- 11. Page transitions ---------- */
  function initTransitions() {
    var curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.appendChild(curtain);

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) doc.classList.remove('is-leaving');
    });

    if (reduced) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:\/\/(?!relivkiosk\.vercel\.app)|javascript:)/i.test(href)) return;
      if (/\.(pdf|jpe?g|png|webp|mp4|zip)(\?|#|$)/i.test(href)) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      doc.classList.add('is-leaving');
      setTimeout(function () { location.href = url.href; }, 560);
    });
  }

  /* ---------- 12. Footer signature ---------- */
  function initFooterMega() {
    var f = $('.minimal-footer .container');
    if (!f || $('.footer-mega')) return;
    var m = document.createElement('div');
    m.className = 'footer-mega';
    m.setAttribute('aria-hidden', 'true');
    m.textContent = 'Reliv';
    f.appendChild(m);
  }

  
  /* ---------- 14. Signature Sensor Explorer (Lando Norris style) ---------- */
  function initSensorExplorer() {
    var stage = document.getElementById('sensorStageBox');
    if (!stage) return;

    var kioskWrapper = document.getElementById('sensorKioskWrapper');
    var screenImg = document.getElementById('kioskScreenImg');
    var chapterCounter = document.getElementById('sensorChapterCounter');
    var detailTitle = document.getElementById('sensorDetailTitle');
    var metricBadge = document.getElementById('sensorMetricBadge');
    var detailDesc = document.getElementById('sensorDetailDesc');
    var lockBtn = document.getElementById('sensorLockBtn');

    var hotspots = Array.prototype.slice.call(stage.querySelectorAll('.sensor-hotspot'));
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.sensor-tab-btn'));

    var sensorsData = [
      {
        id: 0,
        title: "Height & Body Composition",
        metric: "BMI · Body Weight",
        desc: "Stand tall on the scale base. Overhead ultrasonic sensors measure precise height while the platform scale captures weight and computes Body Mass Index (BMI).",
        screen: "assets/screens/actual-1.png",
        transform: "scale(1.08) translateY(24px)"
      },
      {
        id: 1,
        title: "Blood Pressure & Pulse",
        metric: "118/76 mmHg · 72 BPM",
        desc: "Rest your arm in the automated cuff hanging on the side hook. Guided voice assistance inflates the cuff to measure Systolic & Diastolic pressure safely in 45 seconds.",
        screen: "assets/screens/actual-2.png",
        transform: "scale(1.15) translate(40px, -20px)"
      },
      {
        id: 2,
        title: "Blood Oxygen (SpO₂)",
        metric: "98% Saturation",
        desc: "Insert your index finger into the optical pulse oximeter on the front console. Dual-wavelength infrared light measures arterial blood oxygenation in seconds.",
        screen: "assets/screens/actual-3.png",
        transform: "scale(1.15) translate(-40px, -40px)"
      },
      {
        id: 3,
        title: "Snellen Eye Checkup",
        metric: "6/6 Visual Acuity",
        desc: "Stand at the marked floor footprint. The high-contrast touchscreen displays interactive directional Snellen optotypes to evaluate vision acuity.",
        screen: "assets/screens/actual-4.png",
        transform: "scale(1.12) translateY(-20px)"
      },
      {
        id: 4,
        title: "Contactless Temperature",
        metric: "36.7 °C Normal",
        desc: "Align your forehead with the medical-grade infrared sensor on the upper right canopy. Provides instant calibrated surface temperature without skin contact.",
        screen: "assets/screens/actual-5.png",
        transform: "scale(1.15) translate(-30px, 10px)"
      }
    ];

    var isLocked = false;

    function activateSensor(index) {
      var data = sensorsData[index];
      if (!data) return;

      if (chapterCounter) chapterCounter.textContent = "Chapter 0" + (index + 1) + " / 05";
      if (detailTitle) detailTitle.textContent = data.title;
      if (metricBadge) metricBadge.textContent = data.metric;
      if (detailDesc) detailDesc.textContent = data.desc;

      if (screenImg) {
        screenImg.style.opacity = '0.3';
        setTimeout(function() {
          screenImg.src = data.screen;
          screenImg.style.opacity = '1';
        }, 120);
      }

      if (kioskWrapper && !reduced) {
        kioskWrapper.style.transform = isLocked ? data.transform : data.transform;
      }

      hotspots.forEach(function(h) {
        h.classList.toggle('active', parseInt(h.getAttribute('data-sensor')) === index);
      });
      tabs.forEach(function(t) {
        var active = parseInt(t.getAttribute('data-sensor')) === index;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    hotspots.forEach(function(h) {
      h.addEventListener('click', function() {
        var idx = parseInt(h.getAttribute('data-sensor'));
        activateSensor(idx);
      });
    });

    tabs.forEach(function(t) {
      t.addEventListener('click', function() {
        var idx = parseInt(t.getAttribute('data-sensor'));
        activateSensor(idx);
      });
    });

    if (lockBtn) {
      lockBtn.addEventListener('click', function() {
        isLocked = !isLocked;
        lockBtn.innerHTML = isLocked ? '<span>🔓 Back to overview</span>' : '<span>🔒 Tap to lock focus</span>';
        if (!isLocked && kioskWrapper) {
          kioskWrapper.style.transform = '';
        }
      });
    }
  }

  /* ---------- 13. Scrollytelling: what Reliv checks ---------- */
  function initVitals() {
    var sec = $('.vitals');
    if (!sec) return;
    var data = [];
    try { data = JSON.parse($('#vitalsData').textContent); } catch (e) { return; }
    var items = $$('.vitals-list li', sec);
    var swap = $('.vc-swap', sec);
    var label = $('.vc-label', sec);
    var value = $('.vc-value', sec);
    var note = $('.vc-note', sec);
    var step = $('.vc-step', sec);
    var icon = $('.vc-icon', sec);
    var bar = $('.vc-ring .bar', sec);
    var current = -1;

    function show(i) {
      if (i === current) return;
      current = i;
      var d = data[i];
      items.forEach(function (li, k) { li.classList.toggle('on', k === i); });
      step.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(data.length).padStart(2, '0');
      bar.style.strokeDashoffset = String(302 - 302 * ((i + 1) / data.length));
      swap.classList.add('out');
      setTimeout(function () {
        label.textContent = d.label;
        value.innerHTML = d.value + (d.unit ? '<small>' + d.unit + '</small>' : '');
        note.textContent = d.note;
        icon.innerHTML = d.icon;
        swap.classList.remove('out');
      }, reduced ? 0 : 260);
    }

    function update() {
      var r = sec.getBoundingClientRect();
      var total = sec.offsetHeight - window.innerHeight;
      var p = clamp(-r.top / (total || 1), 0, 0.9999);
      show(Math.floor(p * data.length));
    }
    onScroll(update);
    window.addEventListener('resize', update);
    show(0);
    update();
  }

  /* ---------- Boot ---------- */
  function boot() {
    initFooterMega();
    initAnchors();
    initHeader();
    initProgress();
    initCounters();
    initVitals();
    initSensorExplorer();
    initTransitions();
    // Native cursor preserves immediate pointer feedback.
    initMagnetic();
    initCardSpotlights();
    initReveals();
    initParallax();
    // The product reveal replaces the blocking preloader.
    // Native scrolling preserves keyboard and touch behavior.
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
