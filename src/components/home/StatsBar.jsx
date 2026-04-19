import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function CountUp({ target, suffix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
              const p = Math.min((now - start) / duration, 1);
              setValue(Math.floor(target * p));
              if (p < 1) requestAnimationFrame(step);
              else setValue(target);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  const items = [
    { icon: 'groups', target: 70, suffix: '+', label: t('stats.members', lang === 'en' ? 'Members' : 'Nariai') },
    { icon: 'event', target: 3, suffix: '+', label: t('stats.years', lang === 'en' ? 'Years' : 'Metai') },
    { icon: 'local_fire_department', target: 100, suffix: '%', label: lang === 'en' ? 'Commitment' : 'Atsidavimas' },
    { icon: 'handshake', target: 15, suffix: '+', label: t('stats.partners', lang === 'en' ? 'Partners' : 'Partneriai') }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">BY THE NUMBERS</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-12 max-w-2xl">
        {lang === 'en' ? 'Our Impact' : 'Mūsų poveikis'}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-brand-400/40 transition-colors"
          >
            <span className="material-symbols-outlined text-brand-400/60 text-[20px] mb-3 block">
              {it.icon}
            </span>
            <div className="text-white font-black text-4xl sm:text-5xl tracking-tight leading-none mb-2">
              <CountUp target={it.target} suffix={it.suffix} />
            </div>
            <div className="mono-label">{it.label}</div>

            {/* corner LED */}
            <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-400 group-hover:shadow-[0_0_8px_rgba(250,143,49,0.8)] transition-shadow" />
          </div>
        ))}
      </div>
    </section>
  );
}
