(() => {
  'use strict';
  const config = window.BRANOC_CONFIG || {};
  document.querySelectorAll('[data-link]').forEach(link => {
    const value = config[link.dataset.link];
    if (typeof value === 'string' && /^https:\/\//.test(value)) link.href = value;
  });
  document.querySelectorAll('[data-server]').forEach(node => {
    if (config.teamspeak) node.textContent = config.teamspeak;
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu?.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { mobileMenu.open = false; }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu?.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (mobileMenu?.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
  });
  const header = document.querySelector('.site-header');
  if (header && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
      document.documentElement.style.setProperty('--nav-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    }).observe(header);
  }
  let revealObserver;
  const revealTargets = document.querySelectorAll('.reveal, .offer-list li, .patch-line a, .staff-roles li, .rule-section, .cooperatives-steps > li');
  function startReveals() {
    if (!('IntersectionObserver' in window) || reducedMotion.matches) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });
    revealTargets.forEach(node => {
      if (node.parentElement.matches('.patch-line, .offer-list, .staff-roles')) {
        const index = Array.from(node.parentElement.children).indexOf(node);
        node.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 0.07}s`);
      }
      node.classList.add('will-reveal');
      revealObserver.observe(node);
    });
  }
  startReveals();
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      revealObserver?.disconnect();
      revealTargets.forEach(node => node.classList.add('is-visible'));
    }
  });
  const sectionLinks = document.querySelectorAll('.unit-index a, .rules-index nav a');
  if (sectionLinks.length && 'IntersectionObserver' in window) {
    const linkBySection = new Map();
    sectionLinks.forEach(link => {
      const id = link.getAttribute('href')?.slice(1);
      const section = id && document.getElementById(id);
      if (section && section.id !== 'contenido') linkBySection.set(section, link);
    });
    const activeSections = new Set();
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeSections.add(entry.target);
        else activeSections.delete(entry.target);
      });
      const active = Array.from(activeSections).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
      if (!active) return;
      linkBySection.forEach((link, section) => {
        if (section === active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    linkBySection.forEach((link, section) => spy.observe(section));
  }
  const progress = document.querySelector('.reading-progress');
  const backTop = document.querySelector('.back-top');
  let scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
      if (backTop) backTop.hidden = window.scrollY < 600;
      scheduled = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
  backTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth'}));
  let toastTimer;
  function toast(message) {
    const node = document.querySelector('.toast');
    node.textContent = message;
    node.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('visible'), 3500);
  }
  document.querySelector('.copy-server')?.addEventListener('click', async () => {
    const address = document.querySelector('[data-server]').textContent;
    try {
      await navigator.clipboard.writeText(address);
      toast('Dirección de TeamSpeak copiada.');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('[data-server]'));
      selection.removeAllRanges();
      selection.addRange(range);
      toast('Dirección seleccionada. Copia el texto con el menú de tu dispositivo.');
    }
  });
  const viewport = document.querySelector('#sheet-viewport');
  if (viewport) {
    const stage = document.querySelector('#sheet-stage');
    const output = document.querySelector('#zoom-value');
    const section = document.querySelector('.sheet-section');
    const fullButton = document.querySelector('#fullscreen-sheet');
    let scale = 1;
    let fitMode = true;
    const bounds = { min: 0.1, max: 2.5 };
    function setZoom(next, keepCenter = true) {
      const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / scale;
      const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / scale;
      scale = Math.max(bounds.min, Math.min(bounds.max, next));
      stage.style.width = `${1558 * scale}px`;
      stage.style.height = `${791 * scale}px`;
      output.value = `${Math.round(scale * 100)} %`;
      output.textContent = output.value;
      document.querySelector('[data-zoom="out"]').disabled = scale <= bounds.min;
      document.querySelector('[data-zoom="in"]').disabled = scale >= bounds.max;
      if (keepCenter) {
        viewport.scrollLeft = Math.max(0, centerX * scale - viewport.clientWidth / 2);
        viewport.scrollTop = Math.max(0, centerY * scale - viewport.clientHeight / 2);
      }
    }
    function fitSheet() {
      fitMode = true;
      setZoom(Math.min(1, viewport.clientWidth / 1558), false);
      viewport.scrollTo({ left: 0, top: 0 });
    }
    document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
      const action = button.dataset.zoom;
      if (action === 'fit') return fitSheet();
      fitMode = false;
      setZoom(action === 'actual' ? 1 : action === 'in' ? scale * 1.25 : scale / 1.25);
    }));
    viewport.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === '0') { event.preventDefault(); fitSheet(); }
      else if (['+', '=', '-'].includes(event.key)) {
        event.preventDefault();
        fitMode = false;
        setZoom(event.key === '-' ? scale / 1.25 : scale * 1.25);
      }
    });
    if (section.requestFullscreen && document.fullscreenEnabled) {
      fullButton.addEventListener('click', async () => {
        try {
          if (document.fullscreenElement === section) await document.exitFullscreen();
          else await section.requestFullscreen();
        } catch { toast('Tu navegador no permite pantalla completa. Usa los controles de zoom.'); }
      });
      document.addEventListener('fullscreenchange', () => {
        fullButton.textContent = document.fullscreenElement === section ? 'Salir de pantalla completa' : 'Pantalla completa';
        if (fitMode) fitSheet();
      });
    } else {
      fullButton.hidden = true;
    }
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { if (fitMode) fitSheet(); }).observe(viewport);
    } else window.addEventListener('resize', () => { if (fitMode) fitSheet(); }, { passive: true });
    fitSheet();
  }
})();
