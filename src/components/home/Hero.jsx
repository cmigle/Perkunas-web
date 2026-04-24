import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';

// Target: first Formula Student competition of the rookie season.
// Placeholder — swap for the real confirmed event/date.
const RACE_TARGET = new Date('2026-08-03T09:00:00Z');

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export default function Hero() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const { d, h, m, s } = useCountdown(RACE_TARGET);

  return (
    <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 pt-2 pb-6">
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-ink-950">
        {/* Car photo backdrop */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/CarInSun.Cl8Zd13v.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            filter: 'contrast(1.05) saturate(0.85) brightness(0.6)'
          }}
          aria-hidden="true"
        />
        {/* Dark gradient wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(5,6,8,0.95) 0%, rgba(5,6,8,0.78) 38%, rgba(5,6,8,0.4) 68%, rgba(5,6,8,0.58) 100%)'
          }}
          aria-hidden="true"
        />
        {/* Subtle blue cage accent glow */}
        <div
          className="absolute -inset-32 opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px 360px at 75% 55%, rgba(31,168,255,0.14), transparent 70%)'
          }}
          aria-hidden="true"
        />

        {/* Top strip — sector data bar */}
        <div className="relative z-10 flex items-center gap-4 px-5 sm:px-8 py-3 border-b border-white/8 bg-black/45 backdrop-blur-sm">
          <span className="inline-flex items-center gap-2">
            <span className="led-dot" />
            <span className="mono-tag text-brand-400 text-[10px]">
              {lang === 'en' ? 'ROOKIE SEASON · 2025/26' : 'DEBIUTINIS SEZONAS · 2025/26'}
            </span>
          </span>
          <span className="hidden md:inline mono-tag text-white/40 text-[10px]">KAUNAS · 54.8985° N</span>
          <span className="flex-1" />
          <span className="mono-tag text-white/50 text-[10px] flag-tag">
            {lang === 'en' ? 'KTU · FORMULA STUDENT LITHUANIA' : 'KTU · FORMULA STUDENT LIETUVA'}
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-5 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-10 sm:pb-12">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-end">
            {/* LEFT — wordmark, tagline */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="mono-tag text-brand-400 text-[10px]">KTU · EST. 2025</span>
                <span className="h-px w-10 bg-white/20" />
                <span className="mono-tag text-white/45 text-[10px]">
                  {lang === 'en' ? 'INAUGURAL SEASON' : 'PIRMASIS SEZONAS'}
                </span>
              </div>

              {/* Main wordmark — matches the logo's open wide letterforms */}
              <h1 className="wordmark text-white text-[clamp(2.6rem,9vw,7rem)] leading-[0.95] font-light">
                PERKŪNAS
              </h1>
              <div className="wordmark text-white/55 text-[clamp(0.9rem,2vw,1.4rem)] mt-3 mb-7 font-light tracking-[0.3em]">
                RACING TEAM
              </div>

              {/* Real tagline from team's Facebook */}
              <p className="text-white/80 text-lg sm:text-xl max-w-xl leading-relaxed mb-2">
                {lang === 'en' ? (
                  <>
                    We're not just building a car —
                    <br className="hidden sm:block" />
                    <span className="text-brand-400">we're building a legacy.</span>
                  </>
                ) : (
                  <>
                    Mes ne tik kuriame bolidą —
                    <br className="hidden sm:block" />
                    <span className="text-brand-400">mes kuriame istoriją.</span>
                  </>
                )}
              </p>
              <p className="text-white/50 text-sm sm:text-base max-w-xl leading-relaxed mt-4">
                {lang === 'en'
                  ? 'The first-ever Formula Student team at Kaunas University of Technology. Founded 2025 by students, for students.'
                  : 'Pirmoji Formula Student komanda Kauno technologijos universiteto istorijoje. Įkurta 2025 metais studentų iniciatyva.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-9">
                <Button
                  as={Link}
                  to="/join"
                  color="primary"
                  size="lg"
                  radius="sm"
                  className="text-ink-950 font-semibold tracking-wide px-7 shadow-glow-brand"
                  endContent={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                >
                  {lang === 'en' ? 'Join the team' : 'Prisijunk'}
                </Button>
                <Button
                  as={Link}
                  to="/about"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  className="text-white border-white/20 hover:border-brand-400/60 hover:text-brand-400 font-semibold tracking-wide"
                >
                  {lang === 'en' ? 'Our story' : 'Mūsų istorija'}
                </Button>
              </div>
            </div>

            {/* RIGHT — countdown only (no fabricated car number) */}
            <div className="flex flex-col items-start lg:items-end gap-5">
              <div className="readout w-full max-w-sm rounded-lg px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="readout-label">{lang === 'en' ? 'FIRST RACE' : 'PIRMOS VARŽYBOS'}</span>
                  <span className="mono-tag text-white/55 text-[10px]">TBD · 2026</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { v: d, l: 'D' },
                    { v: h, l: 'H' },
                    { v: m, l: 'M' },
                    { v: s, l: 'S' }
                  ].map((u) => (
                    <div key={u.l} className="text-center">
                      <div className="font-light text-white text-3xl sm:text-4xl tabular-nums tracking-tight leading-none">
                        {String(u.v).padStart(2, '0')}
                      </div>
                      <div className="mono-label mt-1 text-[9px]">{u.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Season badge */}
              <div className="flex items-center gap-3 readout rounded-lg px-4 py-3 w-full max-w-sm">
                <div className="flex h-5 w-7 rounded-sm overflow-hidden shrink-0">
                  <div className="flex-1 bg-[#FDB913]" />
                  <div className="flex-1 bg-[#006A44]" />
                  <div className="flex-1 bg-[#C1272D]" />
                </div>
                <div className="min-w-0">
                  <div className="mono-label text-[9px]">
                    {lang === 'en' ? 'REPRESENTING' : 'ATSTOVAUJAME'}
                  </div>
                  <div className="text-white font-medium text-sm leading-tight truncate">
                    {lang === 'en' ? 'Lithuania · KTU Kaunas' : 'Lietuvą · KTU Kaunas'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom sidepod stats row */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 border-t border-white/8 bg-black/55 backdrop-blur-sm divide-x divide-white/8">
          {[
            { v: '70+', l: lang === 'en' ? 'MEMBERS' : 'NARIAI' },
            { v: '01', l: lang === 'en' ? 'SEASON' : 'SEZONAS' },
            { v: '120', l: 'HP · 89 kW' },
            { v: '<300', l: lang === 'en' ? 'KG DRY' : 'KG SAUSA' }
          ].map((st) => (
            <div key={st.l} className="px-5 py-4">
              <div className="font-light text-white text-3xl sm:text-4xl tracking-tight leading-none">
                {st.v}
              </div>
              <div className="mono-label mt-1.5 text-[9.5px]">{st.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
