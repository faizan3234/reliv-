// =========================================================
// Reliv - Fullscreen Editorial Navigation & Photo Preview
// Inspired by Lando Norris (landonorris.com)
// =========================================================

(function() {
  'use strict';

  function initNavDrawer() {
    const drawer = document.getElementById('navDrawer');
    const backdrop = document.getElementById('navDrawerBackdrop');
    const openBtns = document.querySelectorAll('.left-nav-btn, #leftNavBtn, [data-open-drawer]');
    const closeBtns = document.querySelectorAll('#navDrawerClose, .nav-drawer-close');
    let previousFocus = null;

    if (!drawer || !backdrop) return;
    // Offscreen links must not remain keyboard-focusable when the drawer is closed.
    drawer.inert = true;

    const isSub = window.location.pathname.includes("/Reliv_Dotted_Scroll_Journey") || window.location.pathname.includes("Reliv_Dotted_Journey");
    const rootPrefix = isSub ? "../../" : "";

    // Build the live photo preview stage inside drawer on desktop
    let previewContainer = drawer.querySelector('.drawer-preview-stage');
    if (!previewContainer) {
      previewContainer = document.createElement('div');
      previewContainer.className = 'drawer-preview-stage';
      previewContainer.setAttribute('aria-hidden', 'true');
      previewContainer.innerHTML = `
        <div class="drawer-preview-frame">
          <img id="drawerPreviewImg" src="${rootPrefix}assets/reliv-health-kiosk-transparent.png" alt="Reliv Preview" loading="lazy">
        </div>
        <div class="drawer-preview-caption">
          <span id="drawerPreviewTitle">Reliv Smart Health Kiosk</span>
          <small id="drawerPreviewMeta">DPIIT Certified MedTech · Kolkata</small>
        </div>
      `;
      const drawerBody = drawer.querySelector('.nav-drawer-body');
      if (drawerBody) drawerBody.appendChild(previewContainer);
    }

    const previewImg = document.getElementById('drawerPreviewImg');
    const previewTitle = document.getElementById('drawerPreviewTitle');
    const previewMeta = document.getElementById('drawerPreviewMeta');

    const previewMap = {
      'Reliv_Dotted_Journey_Editable_Source/index.html': { src: 'Reliv_Dotted_Scroll_Journey_Editable_Code_Images/Reliv_Dotted_Journey_Editable_Source/assets/images/campus.webp', title: 'Experience the Connected Journey', meta: 'Interactive Downward Scroll · Lando Norris Polish' },
      'index.html': { src: 'assets/reliv-health-kiosk-kolkata.jpg', title: 'Reliv Smart Health Kiosk', meta: 'First Official Station · Kolkata, India' },
      '#vitals': { src: 'assets/reliv-health-kiosk-transparent.png', title: '5-Sensor Kiosk Architecture', meta: 'Height · BP · SpO₂ · Eyes · Temp' },
      'about.html': { src: 'assets/about-reliv-ecosystem.jpg', title: 'Reliv Preventive Health Ecosystem', meta: 'DPIIT Recognised Startup · DIPP287544' },
      'how-it-works.html': { src: 'assets/videos/reliv-explainer-poster.jpg', title: 'How Reliv Works (Explainer Film)', meta: 'Autonomous 3-Minute Screening Guide' },
      'locations.html': { src: 'assets/reliv-smart-health-atm-india.jpg', title: 'Live Kiosk Locations', meta: 'IEM Gurukul Campus, Salt Lake Sector V' },
      'organisations.html': { src: 'assets/reliv-wellness-kiosk-for-colleges.jpg', title: 'Host & Earn (For Spaces)', meta: 'Outright Buy, Monthly Rental & 0-Risk Sharing' },
      'careers.html': { src: 'assets/reliv-medical-kiosk-body-parameter-check.jpg', title: 'Careers & Student Internships', meta: 'Join Reliv Medical Innovation Team' },
      'health-kiosk.html': { src: 'assets/reliv-health-kiosk-kolkata.jpg', title: 'Smart Health Kiosk (Health ATM)', meta: 'DPIIT Certified Hardware · 3-Minute Screening' },
      'health-atm.html': { src: 'assets/screens/reliv-health-atm-user-experience.webp', title: 'What is a Health ATM? (Guide)', meta: 'Understanding Self-Service Health ATMs in India' }
    };

    function openDrawer() {
      previousFocus = document.activeElement;
      drawer.inert = false;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';
      openBtns.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'true');
      });
      const closeButton = drawer.querySelector('#navDrawerClose, .nav-drawer-close');
      if (closeButton) closeButton.focus();
    }

    function closeDrawer(restoreFocus = true) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.removeAttribute('aria-modal');
      drawer.inert = true;
      document.body.style.overflow = '';
      openBtns.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
      if (restoreFocus && previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
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
      if (!drawer.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
      } else if (e.key === 'Tab') {
        const items = Array.from(drawer.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(function(el) { return el.getClientRects().length > 0; });
        if (!items.length) { e.preventDefault(); return; }
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Close when clicking any link inside the drawer (unless target="_blank")
    drawer.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (!link.getAttribute('target') || link.getAttribute('target') !== '_blank') {
          closeDrawer(false);
        }
      });
    });

    // Hover-driven live preview on desktop
    drawer.querySelectorAll('.drawer-link').forEach(function(link) {
      const href = link.getAttribute('href');
      link.addEventListener('mouseenter', function() {
        if (!previewImg || !href) return;
        const key = Object.keys(previewMap).find(k => href.endsWith(k) || href === k);
        const target = key ? previewMap[key] : null;
        if (target) {
          previewImg.style.opacity = '0.35';
          previewImg.style.transform = 'scale(0.96)';
          setTimeout(function() {
            let targetSrc = target.src;
          if (isSub) {
            if (targetSrc.startsWith('Reliv_Dotted_Scroll_Journey_Editable_Code_Images/Reliv_Dotted_Journey_Editable_Source/')) {
              targetSrc = targetSrc.replace('Reliv_Dotted_Scroll_Journey_Editable_Code_Images/Reliv_Dotted_Journey_Editable_Source/', '');
            } else {
              targetSrc = rootPrefix + targetSrc;
            }
          }
          previewImg.src = targetSrc;
            if (previewTitle) previewTitle.textContent = target.title;
            if (previewMeta) previewMeta.textContent = target.meta;
            previewImg.style.opacity = '1';
            previewImg.style.transform = 'scale(1)';
          }, 110);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavDrawer);
  } else {
    initNavDrawer();
  }
})();
