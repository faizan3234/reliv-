/* =========================================================
   RELIV VIDEO PLAYERS + APP GUIDE TABS
   - Custom play overlay for every .video-shell
   - Only one video plays at a time
   - iPhone / Android tabs with auto-detection + #iphone / #android deep links
   ========================================================= */
(function () {
  'use strict';

  var shells = Array.prototype.slice.call(document.querySelectorAll('.video-shell'));
  var videos = shells.map(function (s) { return s.querySelector('video'); }).filter(Boolean);

  function track(name, label) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, { video_title: label }); } catch (e) {}
  }

  shells.forEach(function (shell) {
    var video = shell.querySelector('video');
    var btn = shell.querySelector('.video-play');
    if (!video) return;
    var frame = shell.closest('.phone-frame');
    var label = video.getAttribute('title') || 'Reliv video';

    function setPlaying(on) {
      shell.classList.toggle('is-playing', on);
      if (frame) frame.classList.toggle('is-playing', on);
    }

    if (btn) {
      btn.addEventListener('click', function () {
        video.setAttribute('controls', '');
        video.muted = false;
        var p = video.play();
        if (p && p.catch) p.catch(function () { setPlaying(false); });
      });
    }

    video.addEventListener('play', function () {
      setPlaying(true);
      video.setAttribute('controls', '');
      videos.forEach(function (other) { if (other !== video && !other.paused) other.pause(); });
      track('video_play', label);
    });
    video.addEventListener('ended', function () {
      setPlaying(false);
      track('video_complete', label);
    });
  });

  // Pause everything when the tab is hidden (saves data + battery on phones)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) videos.forEach(function (v) { if (!v.paused) v.pause(); });
  });

  // Any link/button with data-play-target="#id" scrolls to and plays that video
  Array.prototype.forEach.call(document.querySelectorAll('[data-play-target]'), function (el) {
    el.addEventListener('click', function (e) {
      var target = document.querySelector(el.getAttribute('data-play-target'));
      if (!target) return;
      e.preventDefault();
      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      var shell = target.closest('.video-shell');
      var btn = shell && shell.querySelector('.video-play');
      setTimeout(function () { if (btn) btn.click(); else target.play(); }, reduced ? 0 : 450);
    });
  });

  // ---- iPhone / Android tabs ----
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-os-tab]'));
  if (!tabs.length) return;

  function selectOS(os, focus) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-os-tab') === os;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = !on;
        if (!on) Array.prototype.forEach.call(panel.querySelectorAll('video'), function (v) { v.pause(); });
      }
      if (on && focus) tab.focus();
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectOS(tab.getAttribute('data-os-tab')); });
    tab.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      selectOS(next.getAttribute('data-os-tab'), true);
    });
  });

  var hash = (location.hash || '').replace('#', '').toLowerCase();
  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var initial = hash === 'iphone' || hash === 'android' ? hash : (isIOS ? 'iphone' : 'android');
  selectOS(initial);
  if (hash === 'iphone' || hash === 'android') {
    var guide = document.getElementById('app');
    if (guide) setTimeout(function () { guide.scrollIntoView(); }, 60);
  }

  window.addEventListener('hashchange', function () {
    var h = (location.hash || '').replace('#', '').toLowerCase();
    if (h === 'iphone' || h === 'android') {
      selectOS(h);
      var g = document.getElementById('app');
      if (g) g.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
