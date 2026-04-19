import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const el = document.documentElement;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    const onScroll = () => {
      const h = el.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.setProperty('--scroll-pct', pct + '%');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      bar.remove();
    };
  }, []);
  return null;
}
