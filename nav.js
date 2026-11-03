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

    if (!drawer || !backdrop) return;

    // Build the live photo preview stage inside drawer on desktop
    let previewContainer = drawer.querySelector('.drawer-preview-stage');
    if (!previewContainer) {
      previewContainer = document.createElement('div');
      previewContainer.className = 'drawer-preview-stage';
      previewContainer.setAttribute('aria-hidden', 'true');
      previewContainer.innerHTML = `
        <div class="drawer-preview-frame">
          <img id="drawerPreviewImg" src="assets/reliv-health-kiosk-transparent.png" alt="Reliv Preview" loading="lazy">
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
      'index.html': { src: 'assets/reliv-health-kiosk-kolkata.jpg', title: 'Reliv Smart Health Kiosk', meta: 'First Official Station · Kolkata, India' },
      '#sensors': { src: 'assets/reliv-health-kiosk-transparent.png', title: '5-Sensor Kiosk Architecture', meta: 'Height · BP · SpO₂ · Eyes · Temp' },
      'about.html': { src: 'assets/about-reliv-ecosystem.jpg', title: 'Reliv Preventive Health Ecosystem', meta: 'DPIIT Recognised Startup · DIPP287544' },
      'how-it-works.html': { src: 'assets/videos/reliv-explainer-poster.jpg', title: 'How Reliv Works (Explainer Film)', meta: 'Autonomous 3-Minute Screening Guide' },
      'locations.html': { src: 'assets/reliv-smart-health-atm-india.jpg', title: 'Live Kiosk Locations', meta: 'IEM Gurukul Campus, Salt Lake Sector V' },
      'organisations.html': { src: 'assets/reliv-wellness-kiosk-for-colleges.jpg', title: 'For Colleges & Enterprise Workplaces', meta: 'Zero-Capex Deployment & Wellness Packages' },
      'media.html': { src: 'assets/awards/medverse-oscars-of-healthcare-trophy.jpg', title: 'The Oscars of Healthcare Trophy', meta: 'Medverse 2026 Winner · Salem, Tamil Nadu' },
      'simulator.html': { src: 'assets/screens/reliv-digital-health-report.webp', title: 'Interactive Kiosk Simulator', meta: 'Experience Multilingual Vitals Screening' },
      'careers.html': { src: 'assets/reliv-medical-kiosk-body-parameter-check.jpg', title: 'Careers & Student Internships', meta: 'Join Reliv Medical Innovation Team' }
    };

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
            previewImg.src = target.src;
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
