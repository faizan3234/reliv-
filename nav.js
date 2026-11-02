// =========================================================
// Reliv - Left Navigation Button & Slide-Out Drawer Controller
// =========================================================

(function() {
  'use strict';

  function initNavDrawer() {
    const drawer = document.getElementById('navDrawer');
    const backdrop = document.getElementById('navDrawerBackdrop');
    const openBtns = document.querySelectorAll('.left-nav-btn, [data-open-drawer], .open-drawer-btn, #floatingLeftNav');
    const closeBtns = document.querySelectorAll('#navDrawerClose, .nav-drawer-close');

    if (!drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      openBtns.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'true');
      });
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      openBtns.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
    }

    openBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openDrawer();
      });
    });

    closeBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    });

    backdrop.addEventListener('click', function() {
      closeDrawer();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Close when clicking any link inside the drawer (unless target="_blank")
    drawer.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (!link.getAttribute('target') || link.getAttribute('target') !== '_blank') {
          closeDrawer();
        }
      });
    });

    // Hook mobile bottom nav "More" link if present
    const mobileMoreBtn = document.querySelector('.mobile-bottom-nav a[href*="organisations.html"], .mobile-bottom-nav a.mobile-nav-item:last-child');
    if (mobileMoreBtn) {
      mobileMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openDrawer();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavDrawer);
  } else {
    initNavDrawer();
  }
})();
