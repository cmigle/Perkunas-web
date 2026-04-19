/* Modern UI interactions: scroll progress, bento hover tracking,
   tech tabs, navbar scroll, back-to-top, count-up stats.
   No dependencies. */

(function () {
  'use strict';

  // ---------- Scroll progress bar ----------
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // ---------- Back to top button ----------
  const topBtn = document.createElement('button');
  topBtn.className = 'back-to-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '<span class="material-icons">arrow_upward</span>';
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(topBtn);

  // ---------- Navbar scroll effect ----------
  const nav = document.querySelector('.pill-menu');

  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (y / h) * 100 : 0;
    progressBar.style.width = pct + '%';

    if (nav) {
      if (y > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }

    if (y > 500) topBtn.classList.add('visible');
    else topBtn.classList.remove('visible');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Bento tile mouse tracking glow ----------
  document.querySelectorAll('.bento-tile').forEach((tile) => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tile.style.setProperty('--mx', x + '%');
      tile.style.setProperty('--my', y + '%');
    });
  });

  // ---------- Tech tabs ----------
  const tabs = document.querySelectorAll('.tech-tab');
  const panels = document.querySelectorAll('.tech-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === target));
    });
  });

  // ---------- Hero CTA button ripple ----------
  document.querySelectorAll('.cta-button').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255,255,255,0.35);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
      `;
      btn.style.position = btn.style.position || 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ripple keyframes
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes rippleEffect {
      to { transform: scale(2.4); opacity: 0; }
    }
  `;
  document.head.appendChild(styleEl);

  // ---------- Keyboard shortcut: press "/" to focus nav ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const first = document.querySelector('.pill-menu .nav-links a');
      if (first) first.focus();
    }
  });
})();
