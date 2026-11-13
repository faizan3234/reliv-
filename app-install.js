// Reliv App Direct Install & PWA trigger
(function() {
  'use strict';

  let deferredInstallPrompt = null;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Capture native browser PWA installation prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    document.querySelectorAll('[data-install-trigger="true"]').forEach(el => {
      el.setAttribute('data-pwa-ready', 'true');
    });
  });

  // Handle click on any install button
  function handleInstallClick(e) {
    if (deferredInstallPrompt) {
      e.preventDefault();
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          document.querySelectorAll('[data-install-trigger="true"]').forEach(btn => {
            btn.innerHTML = 'App Installed <svg class="ri ri-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>';
          });
        }
        deferredInstallPrompt = null;
      });
      return;
    }

    // On iOS Safari, show modal with native Add to Home Screen instructions
    if (isIOS) {
      e.preventDefault();
      const iosModal = document.getElementById('iosInstallModal');
      if (iosModal && typeof iosModal.showModal === 'function') {
        iosModal.showModal();
        return;
      }
    }

    // Default behavior opens the direct PWA gateway https://reliv7.vercel.app/
  }

  function bindInstallButtons() {
    document.querySelectorAll('[data-install-trigger="true"]').forEach(btn => {
      btn.removeEventListener('click', handleInstallClick);
      btn.addEventListener('click', handleInstallClick);
    });
  }

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    document.querySelectorAll('[data-install-trigger="true"]').forEach(btn => {
      btn.innerHTML = 'App Installed <svg class="ri ri-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>';
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindInstallButtons);
  } else {
    bindInstallButtons();
  }
})();

