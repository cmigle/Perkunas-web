import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody } from '@heroui/react';
import { Link } from 'react-router-dom';
import { PARTNERS_DATA, CATEGORY_LABELS } from '../data/partners';

const TIER_STYLES = {
  gold:   { ring: 'border-brand-400/50', badge: 'bg-brand-400 text-ink-950', label: { lt: 'Auksinis', en: 'Gold' }, order: 0 },
  silver: { ring: 'border-white/25',     badge: 'bg-white/90 text-ink-950', label: { lt: 'Sidabrinis', en: 'Silver' }, order: 1 },
  bronze: { ring: 'border-white/10',     badge: 'bg-white/15 text-white/85 border border-white/20', label: { lt: 'Bronzinis', en: 'Bronze' }, order: 2 }
};

export default function Partners() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    const list = filter === 'all'
      ? PARTNERS_DATA
      : PARTNERS_DATA.filter((p) => p.category === filter);
    return [...list].sort((a, b) => TIER_STYLES[a.tier].order - TIER_STYLES[b.tier].order);
  }, [filter]);

  // Build only the filters that actually have partners under them
  const activeFilters = ['all', ...new Set(PARTNERS_DATA.map((p) => p.category))];

  const goldCount = PARTNERS_DATA.filter((p) => p.tier === 'gold').length;
  const totalCount = PARTNERS_DATA.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">NETWORK</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-5 leading-[0.95]">
          {lang === 'en' ? (
            <>Our<br /><span className="text-brand-400">partners.</span></>
          ) : (
            <>Mūsų<br /><span className="text-brand-400">partneriai.</span></>
          )}
        </h1>
        <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
          {lang === 'en'
            ? 'Every bolt, every simulation licence, every welded seam exists because someone chose to invest in student engineering. These are the companies that make it possible.'
            : 'Kiekviena sąvarža, kiekviena licencija, kiekviena suvirinta siūlė egzistuoja, nes kažkas nusprendė investuoti į studentų inžineriją. Štai jie.'}
        </p>

        {/* Meta stats strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-md">
          {[
            { v: totalCount, l: lang === 'en' ? 'PARTNERS' : 'PARTNERIAI' },
            { v: goldCount, l: lang === 'en' ? 'GOLD TIER' : 'AUKSINIAI' },
            { v: '2023', l: lang === 'en' ? 'SINCE' : 'NUO' }
          ].map((s) => (
            <div key={s.l} className="matte rounded-2xl px-4 py-3">
              <div className="text-white font-black text-2xl tracking-tight leading-none">{s.v}</div>
              <div className="mono-label mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {activeFilters.map((c) => {
          const label = CATEGORY_LABELS[c];
          if (!label) return null;
          const count = c === 'all' ? totalCount : PARTNERS_DATA.filter((p) => p.category === c).length;
          const active = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all',
                active
                  ? 'bg-brand-400 text-ink-950 border-brand-400'
                  : 'text-white/70 border-white/10 hover:border-brand-400/50 hover:text-white matte'
              ].join(' ')}
            >
              <span className="material-symbols-outlined text-[16px]">{label.icon}</span>
              {label[lang]}
              <span className={`mono-tag text-[10px] ${active ? 'text-ink-950/60' : 'text-white/40'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Partner cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const tier = TIER_STYLES[p.tier];
          return (
            <Card
              key={p.name}
              className={`matte ${tier.ring} border transition-all hover:border-brand-400/60 hover:-translate-y-1`}
              shadow="none"
            >
              <CardBody className="p-0">
                {/* Logo panel — forced-white monochrome to match the page */}
                <a
                  href={p.url === '#' ? undefined : p.url}
                  target={p.url === '#' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="block relative aspect-[5/2] bg-ink-900 border-b border-white/5 overflow-hidden group/logo"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={p.logo}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      data-bg={/\.jpe?g($|\?)/i.test(p.logo) ? 'jpg' : undefined}
                      className="max-w-full max-h-full object-contain logo-mono transition-[filter,opacity] duration-300"
                    />
                  </div>
                  {/* Tier chip top-left */}
                  <span className={`absolute top-3 left-3 mono-tag text-[9px] px-2 py-1 rounded-full ${tier.badge}`}>
                    {tier.label[lang].toUpperCase()}
                  </span>
                  {/* since top-right */}
                  <span className="absolute top-3 right-3 mono-label">
                    {lang === 'en' ? 'SINCE' : 'NUO'} {p.since}
                  </span>
                </a>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-white font-bold text-lg leading-tight">{p.name}</h3>
                    {p.url !== '#' && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-brand-400 transition-colors shrink-0 ml-2"
                        aria-label={`Visit ${p.name}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                      </a>
                    )}
                  </div>

                  <div className="mono-label text-brand-400/90 mb-3">
                    {CATEGORY_LABELS[p.category]?.[lang].toUpperCase()}
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    {p.supplies[lang]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((tg) => (
                      <span
                        key={tg}
                        className="mono-tag text-[9px] px-2 py-1 rounded-full bg-white/5 text-white/55 border border-white/10"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>

                  {/* Story / micro case-study — only if we have one */}
                  {p.story && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <div className="mono-label mb-1.5">{lang === 'en' ? 'WHAT WE BUILT' : 'KĄ SUKŪRĖME'}</div>
                      <p className="text-white/55 text-[13px] italic leading-snug">
                        "{p.story[lang]}"
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/40">
          <div className="mono-label mb-2">NO MATCHES</div>
          <p>{lang === 'en' ? 'No partners in this category yet.' : 'Šioje kategorijoje kol kas nėra partnerių.'}</p>
        </div>
      )}

      {/* Become a partner CTA */}
      <Card className="matte mt-14" shadow="none">
        <CardBody className="p-8 sm:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="mono-label mb-2">BECOME A PARTNER</div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
              {lang === 'en'
                ? 'Put your logo on a working racecar.'
                : 'Patalpink savo logotipą ant važiuojančio bolido.'}
            </h3>
            <p className="text-white/60">
              {lang === 'en'
                ? 'See tiers, perks and benefits on the support page.'
                : 'Žiūrėk tiek pakopas, tiek privalumus paramos puslapyje.'}
            </p>
          </div>
          <Button
            as={Link}
            to="/support"
            color="primary"
            size="lg"
            radius="full"
            className="font-bold"
            endContent={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
          >
            {lang === 'en' ? 'See partnership tiers' : 'Pakopos ir privalumai'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
