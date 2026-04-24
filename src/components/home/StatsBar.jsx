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

  // Only verifiable facts — members, partners, department count.
  // No invented percentages, no inflated years.
  const items = [
    { icon: 'groups', target: 70, suffix: '+', label: t('stats.members', lang === 'en' ? 'Members' : 'Nariai') },
    { icon: 'handshake', target: 15, suffix: '+', label: t('stats.partners', lang === 'en' ? 'Partners' : 'Partneriai') },
    { icon: 'hub', target: 6, suffix: '', label: lang === 'en' ? 'Departments' : 'Skyriai' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400 text-[10px]">
          {lang === 'en' ? 'BY THE NUMBERS' : 'SKAIČIAIS'}
        </span>
      </div>
      <h2 className="display-headline text-white text-4xl sm:text-5xl lg:text-6xl mb-12 max-w-2xl font-light">
        {lang === 'en' ? <>Our <span className="text-brand-400">impact</span></> : <>Mūsų <span className="text-brand-400">poveikis</span></>}
      </h2>

      <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="readout rounded-xl p-6 relative overflow-hidden group hover:border-brand-400/40 transition-colors"
          >
            <span className="material-symbols-outlined text-brand-400/70 text-[20px] mb-3 block">
              {it.icon}
            </span>
            <div className="font-light text-white text-4xl sm:text-5xl tracking-tight leading-none mb-2">
              <CountUp target={it.target} suffix={it.suffix} />
            </div>
            <div className="mono-label text-[10px]">{it.label}</div>

            {/* corner LED */}
            <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-400 group-hover:shadow-[0_0_10px_rgba(250,143,49,0.9)] transition-shadow" />
          </div>
        ))}
      </div>
    </section>
  );
}
