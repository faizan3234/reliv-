/**
 * RELIV JOURNEY — INTERACTIVE SCROLL STORY CONTROLLER
 * Grab&Go Fluid Curved Physics + Lando Norris Editorial Choreography
 */

'use strict';

(function() {
  const $ = id => document.getElementById(id);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const formatTitle = s => esc(s).replace(/\*([^*]+)\*/g, '<em class="serif">$1</em>');

  // DOM Elements
  const story         = $('story');
  const stopsRoot     = $('stops');
  const svg           = $('flow-svg');
  const traveler      = $('traveler');
  const travImg       = $('traveler-img');
  const travBadge     = $('traveler-badge');
  const rail          = $('rail');
  const topProgress   = $('top-progress');
  const modeIndicator = $('status');
  const statusText    = $('status-text');
  const introHeadline = $('intro-headline');
  const introLead     = $('intro-lead');
  const outroTitle    = $('outro-title');
  const btnHealth     = $('btn-route-health');
  const btnKits       = $('btn-route-kits');
  const replayBtn     = $('replay-btn');

  // State
  let activeRoute    = 'health';
  let routeRendered  = false;
  let anchors        = [];
  let paths          = [];
  let currentSegment = -1;
  let rafId          = null;
  let rectCache      = null;
  let observer       = null;
  let recalcTimer    = null;

  /**
   * Render the selected route (Health Checkup or Health Kits)
   */
  function renderRoute(nextRoute) {
    if (nextRoute === activeRoute && routeRendered) return;

    story.classList.add('is-switching');
    activeRoute = nextRoute;
    routeRendered = true;
    const config = JOURNEY[activeRoute];

    // Update Header Route Buttons
    if (btnHealth) {
      btnHealth.classList.toggle('active', activeRoute === 'health');
      btnHealth.setAttribute('aria-selected', activeRoute === 'health');
    }
    if (btnKits) {
      btnKits.classList.toggle('active', activeRoute === 'kits');
      btnKits.setAttribute('aria-selected', activeRoute === 'kits');
    }

    // Update Editorial Intro & Outro
    if (introHeadline) introHeadline.innerHTML = formatTitle(config.headline);
    if (introLead)     introLead.textContent   = config.intro;
    if (outroTitle)    outroTitle.innerHTML    = formatTitle(config.outro);

    // Reset Elements
    stopsRoot.replaceChildren();
    rail.replaceChildren();
    svg.replaceChildren();
    traveler.style.opacity = '0';
    currentSegment = -1;

    // Build Stops
    config.stops.forEach((stop, i) => {
      const section = document.createElement('section');
      section.className = 'stop';
      section.dataset.index = i;
      section.id = `stop-${i}`;

      // Campus toggle buttons inside Stop 1 copy
      const campusOptionsHtml = stop.art === 'campus' ? `
        <div class="campus-options-bar" role="group" aria-label="Select Journey Route">
          <button class="campus-btn" data-switch-route="health" type="button" aria-pressed="${activeRoute === 'health'}">
            ● Health Checkup
          </button>
          <button class="campus-btn" data-switch-route="kits" type="button" aria-pressed="${activeRoute === 'kits'}">
            Health Kits
          </button>
        </div>
      ` : '';

      // Sleek Companion Action inside Stop 5 (Phone Companion) - No Bloat / No Redundant Download Box
      const companionActionHtml = stop.art === 'person_phone' ? `
        <div class="stop-companion-box">
          <a href="https://reliv7.vercel.app/" target="_blank" rel="noopener" class="btn btn-primary app-cta-btn" id="stop5-auto-download" data-auto-install="true" data-install-trigger="true">
            <span class="auto-install-text">Open Reliv App</span>
            <span class="btn-arrow">&nearr;</span>
          </a>
          <span class="companion-telemetry-pill">STANDALONE PWA // ZERO STORAGE OVERHEAD</span>
        </div>
      ` : '';

      section.innerHTML = `
        <div class="stop-inner">
          <div class="stop-card">
            <span class="card-crosshair top-left" aria-hidden="true">+</span>
            <span class="card-crosshair bottom-right" aria-hidden="true">+</span>

            <div class="stop-copy">
              <div class="card-telemetry-row">
                <div class="chapter-badge">
                  <span class="badge-index">[ ${stop.step} // 05 ]</span>
                  <span class="badge-sep">—</span>
                  <span class="badge-label">${esc(stop.chapter).toUpperCase()}</span>
                </div>
                <div class="card-serial-tag">${esc(stop.serial || '')}</div>
              </div>
              <h2 class="stop-title">${formatTitle(stop.title)}</h2>
              <p class="stop-lead">${esc(stop.lead)}</p>
              ${campusOptionsHtml}
              ${companionActionHtml}
              <div class="stop-handoff">
                <span class="handoff-icon">&darr;</span>
                <span>${esc(stop.handoff)}</span>
              </div>
            </div>

            <div class="stop-media" role="group" aria-label="${esc(stop.chapter)} stage visual">
              <span class="edge-tag">${esc(stop.tag)}</span>
              <img class="stop-art"
                   src="${IMAGES[stop.art]}"
                   alt="${esc(stop.title)}"
                   loading="${i < 2 ? 'eager' : 'lazy'}"
                   decoding="async"/>
              <div class="pin-anchor" style="left: ${stop.pin[0]}%; top: ${stop.pin[1]}%;"></div>
            </div>
          </div>
        </div>
      `;

      // Wire campus buttons inside Stop 1
      const healthBtn = section.querySelector('[data-switch-route="health"]');
      const kitsBtn   = section.querySelector('[data-switch-route="kits"]');
      if (healthBtn) healthBtn.addEventListener('click', () => renderRoute('health'));
      if (kitsBtn)   kitsBtn.addEventListener('click',   () => renderRoute('kits'));

      stopsRoot.appendChild(section);

      // Build Progress Rail Dot
      const railItem = document.createElement('button');
      railItem.type = 'button';
      railItem.className = 'rail-item';
      railItem.setAttribute('aria-label', `Navigate to ${stop.chapter}`);
      railItem.innerHTML = `
        <span class="rail-label">${stop.step} · ${esc(stop.chapter)}</span>
        <span class="rail-dot"></span>
      `;
      railItem.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      rail.appendChild(railItem);

      // Build Calibrated Runway between stops (clean, spacious corridor for the flight)
      if (i < config.stops.length - 1) {
        const runway = document.createElement('div');
        runway.className = 'runway';
        stopsRoot.appendChild(runway);
      }
    });

    // IntersectionObserver to animate stops into view
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    document.querySelectorAll('.stop').forEach(el => observer.observe(el));

    // Listen to images load for geometry recalculation
    const images = [...stopsRoot.querySelectorAll('img')];
    images.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', () => scheduleRecalc(), { once: true });
      }
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => story.classList.remove('is-switching'));
    });

    setTimeout(recalculate, 60);
    setTimeout(recalculate, 400);
    configureAutoInstallButtons();
  }

  /**
   * Measure absolute anchor positions relative to story container
   */
  function getAnchorPosition(el) {
    const storyRect = story.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - storyRect.left + elRect.width / 2,
      y: elRect.top - storyRect.top + elRect.height / 2
    };
  }

  /**
   * Recalculate Bézier curves connecting pin anchors with Grab&Go geometry
   */
  function recalculate() {
    const anchorElements = [...document.querySelectorAll('.pin-anchor')];
    if (anchorElements.length < 2) return;

    anchors = anchorElements.map(getAnchorPosition);

    const w = story.clientWidth;
    const h = story.scrollHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.style.width  = w + 'px';
    svg.style.height = h + 'px';
    svg.replaceChildren();
    paths = [];

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);

    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i];
      const b = anchors[i + 1];
      const dy = b.y - a.y;

      // Grab&Go elegant sweeping S-curve with alternating subtle lateral sway
      const sway = (i % 2 === 0 ? 1 : -1) * Math.min(SETTINGS.curveSway || 60, dy * 0.12);
      const c1x = a.x + sway;
      const c1y = a.y + dy * 0.38;
      const c2x = b.x - sway * 0.45;
      const c2y = b.y - dy * 0.38;

      const d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;

      // Base muted dashed path
      const basePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      basePath.setAttribute('d', d);
      basePath.setAttribute('class', 'flow-path-base');
      svg.appendChild(basePath);

      // Highlight vibrant orange path
      const hiPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hiPath.setAttribute('d', d);
      hiPath.setAttribute('class', 'flow-path-highlight');
      svg.appendChild(hiPath);

      const len = basePath.getTotalLength();

      // SVG ClipPath to illuminate the highlight line in real time
      const clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
      const clipId = `reliv-clip-${i}`;
      clip.setAttribute('id', clipId);
      clip.setAttribute('clipPathUnits', 'userSpaceOnUse');

      const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      clipRect.setAttribute('x', '0');
      clipRect.setAttribute('y', String(a.y));
      clipRect.setAttribute('width', String(w));
      clipRect.setAttribute('height', '0');
      clip.appendChild(clipRect);
      defs.appendChild(clip);

      hiPath.setAttribute('clip-path', `url(#${clipId})`);

      paths.push({
        path: basePath,
        hi: hiPath,
        len,
        a,
        b,
        clipRect
      });
    }

    rectCache = {
      top: story.getBoundingClientRect().top + window.scrollY,
      height: story.scrollHeight
    };

    scheduleScroll();
  }

  /**
   * Scroll handler: updates traveler position, tangent banking, and trail illumination
   */
  function scrollUpdate() {
    rafId = null;
    if (!rectCache || !paths.length || anchors.length < 2) return;

    // Viewport center in coordinates relative to story container
    const focusY = (window.scrollY + window.innerHeight * 0.50) - rectCache.top;
    const config = JOURNEY[activeRoute];

    // Find active segment between anchors
    let seg = -1;
    for (let i = 0; i < paths.length; i++) {
      if (focusY >= paths[i].a.y && focusY < paths[i].b.y) {
        seg = i;
        break;
      }
    }

    // Active Rail Dot
    let activeDot = 0;
    for (let j = 0; j < anchors.length; j++) {
      if (focusY >= anchors[j].y - 80) activeDot = j;
    }
    const railItems = rail.querySelectorAll('.rail-item');
    railItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === activeDot);
    });

    // Top Progress Line
    const firstAnchor = anchors[0];
    const lastAnchor  = anchors[anchors.length - 1];
    const overallProgress = clamp((focusY - firstAnchor.y) / (lastAnchor.y - firstAnchor.y), 0, 1);
    topProgress.style.width = (overallProgress * 100).toFixed(2) + '%';

    // Update SVG Path Clip Rects
    paths.forEach((p, idx) => {
      if (idx < seg) {
        // Fully traveled: keep illuminated
        p.clipRect.setAttribute('height', String(Math.max(0, p.b.y - p.a.y + 12)));
      } else if (idx === seg) {
        // Active flight: illuminate up to current position
        const fraction = clamp((focusY - p.a.y) / (p.b.y - p.a.y), 0, 1);
        const point = p.path.getPointAtLength(p.len * fraction);
        p.clipRect.setAttribute('height', String(Math.max(0, point.y - p.a.y)));
      } else {
        // Not yet reached: hidden
        p.clipRect.setAttribute('height', '0');
      }
    });

    // Inactive outside journey range
    if (seg < 0) {
      traveler.style.opacity = '0';
      currentSegment = -1;
      if (focusY < firstAnchor.y) {
        statusText.textContent = 'Scroll to follow your health data';
        modeIndicator.style.opacity = '1';
        modeIndicator.style.transform = 'translateY(0)';
        modeIndicator.style.pointerEvents = 'auto';
      } else {
        statusText.textContent = activeRoute === 'health'
          ? 'Your Reliv care journey continues on mobile'
          : 'Your Health Kit is collected and verified';
        // Auto-fade status indicator when user reaches Outro to leave full view for action buttons
        if (focusY > lastAnchor.y + 80) {
          modeIndicator.style.opacity = '0';
          modeIndicator.style.transform = 'translateY(24px)';
          modeIndicator.style.pointerEvents = 'none';
        } else {
          modeIndicator.style.opacity = '1';
          modeIndicator.style.transform = 'translateY(0)';
          modeIndicator.style.pointerEvents = 'auto';
        }
      }
      return;
    }

    // Ensure status is visible during active journey
    modeIndicator.style.opacity = '1';
    modeIndicator.style.transform = 'translateY(0)';
    modeIndicator.style.pointerEvents = 'auto';

    // Active Traveler Motion
    const activePath = paths[seg];
    const fraction = clamp((focusY - activePath.a.y) / (activePath.b.y - activePath.a.y), 0, 1);
    const point = activePath.path.getPointAtLength(activePath.len * fraction);

    const asset = config.transfers[seg];
    if (currentSegment !== seg) {
      travImg.src = IMAGES[asset.img];
      travBadge.textContent = asset.badge || asset.name;
      currentSegment = seg;
    }

    // Responsive size
    const isMobile = window.innerWidth <= 720;
    const baseSize = asset.size || 220;
    const displaySize = isMobile ? Math.max(120, Math.min(baseSize * 0.65, 170)) : baseSize;
    traveler.style.setProperty('--traveler-size', displaySize + 'px');

    // Tangent calculation for Grab&Go banking tilt
    const sampleDelta = 4;
    const ptAhead  = activePath.path.getPointAtLength(Math.min(activePath.len, activePath.len * fraction + sampleDelta));
    const ptBehind = activePath.path.getPointAtLength(Math.max(0, activePath.len * fraction - sampleDelta));
    const angleRad = Math.atan2(ptAhead.x - ptBehind.x, ptAhead.y - ptBehind.y);
    const angleDeg = (angleRad * 180 / Math.PI);
    const tilt = clamp(angleDeg * 0.72, -15, 15);

    // Scale & Elevation physics
    let scale = 1.05;
    if (fraction < 0.14) {
      scale = 0.75 + 0.30 * (fraction / 0.14);
    } else if (fraction > 0.86) {
      scale = 1.05 - 0.28 * ((fraction - 0.86) / 0.14);
    }

    // Opacity: fade in upon liftoff, fade out upon docking
    let opacity = 1;
    if (fraction < 0.06) {
      opacity = fraction / 0.06;
    } else if (fraction > 0.94) {
      opacity = (1 - fraction) / 0.06;
    }

    traveler.style.opacity = clamp(opacity, 0, 1).toFixed(3);
    traveler.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;

    // Update Status Pill
    const fromStop = config.stops[seg].tag;
    const toStop   = config.stops[seg + 1].tag;
    statusText.textContent = `${asset.name}  ·  ${fromStop} → ${toStop}`;
  }

  function scheduleScroll() {
    if (rafId === null) rafId = requestAnimationFrame(scrollUpdate);
  }

  function scheduleRecalc() {
    clearTimeout(recalcTimer);
    recalcTimer = setTimeout(recalculate, 80);
  }

  // Wire Controls
  if (btnHealth) btnHealth.addEventListener('click', () => renderRoute('health'));
  if (btnKits)   btnKits.addEventListener('click',   () => renderRoute('kits'));
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Hide floating status indicator cleanly when Outro is visible
  if ('IntersectionObserver' in window) {
    const outroObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          modeIndicator.style.opacity = '0';
          modeIndicator.style.pointerEvents = 'none';
          modeIndicator.style.transform = 'translateY(24px)';
        } else {
          modeIndicator.style.opacity = '1';
          modeIndicator.style.pointerEvents = 'auto';
          modeIndicator.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08 });
    const outroEl = $('outro');
    if (outroEl) outroObs.observe(outroEl);
  }

  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleRecalc, { passive: true });

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => scheduleRecalc());
    ro.observe(story);
  }

  // Smart Multi-Platform Device Detection for Direct App Installation
  function configureAutoInstallButtons() {
    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isMobile = isAndroid || isIOS || window.innerWidth <= 768;
    const isMac = /Macintosh/i.test(ua);

    let deviceLabel = 'Open Reliv App';

    if (isAndroid) {
      deviceLabel = 'Open on Android';
    } else if (isIOS) {
      deviceLabel = 'Open on iPhone';
    } else if (isMobile) {
      deviceLabel = 'Open Reliv App';
    } else if (isMac) {
      deviceLabel = 'Open on Mac';
    } else {
      deviceLabel = 'Open on Laptop';
    }

    document.querySelectorAll('[data-auto-install="true"]').forEach(btn => {
      btn.href = 'https://reliv7.vercel.app/';
      btn.removeAttribute('download');
      const txt = btn.querySelector('.auto-install-text');
      if (txt) txt.textContent = deviceLabel;
    });
  }

  // Handle direct PWA installation when supported by browser
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
  });

  document.addEventListener('click', async e => {
    const trigger = e.target.closest('[data-install-trigger]');
    if (trigger && deferredPrompt) {
      e.preventDefault();
      deferredPrompt.prompt();
      try {
        const choice = await deferredPrompt.userChoice;
        console.log('App install choice:', choice.outcome);
      } catch (err) {
        console.log('Install prompt error:', err);
      }
      deferredPrompt = null;
    }
  });

  // Initial Route Render
  renderRoute('health');
  configureAutoInstallButtons();
})();
