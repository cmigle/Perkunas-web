import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    <section className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 pt-2 pb-6">
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-ink-950">
        {/* Team + car backdrop — real photo of the team at KTU */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/team-with-car.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
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

        {/* Top strip — identity bar */}
        <div className="relative z-10 flex items-center gap-4 px-5 sm:px-8 py-3 border-b border-white/8 bg-black/45 backdrop-blur-sm">
          <span className="mono-tag text-brand-400 text-[10px]">
            {lang === 'en' ? 'EST. 2025 · KTU KAUNAS' : 'ĮKURTA 2025 · KTU KAUNAS'}
          </span>
          <span className="flex-1" />
          <span className="mono-tag text-white/50 text-[10px] flag-tag">
            {lang === 'en' ? 'FORMULA STUDENT LITHUANIA' : 'FORMULA STUDENT LIETUVA'}
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-4 sm:px-8 md:px-10 lg:px-14 2xl:px-20 pt-8 sm:pt-12 md:pt-14 lg:pt-16 pb-8 sm:pb-10 md:pb-12">
          <div className="grid lg:grid-cols-[1.25fr_minmax(260px,0.75fr)] gap-8 lg:gap-10 items-end">
            {/* LEFT — wordmark, tagline */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="mono-tag text-brand-400 text-[10px]">KTU · EST. 2025</span>
                <span className="h-px w-8 sm:w-10 bg-white/20 hidden sm:inline-block" />
                <span className="mono-tag text-white/45 text-[10px]">
                  {lang === 'en' ? 'INAUGURAL SEASON' : 'PIRMASIS SEZONAS'}
                </span>
              </div>

              {/* Main wordmark — clamp + responsive tracking keep "PERKŪNAS"
                  on a single line from phones up through ultrawides. The
                  upper bound is conservative so small laptops (≈1280-1440px)
                  don't wrap — they get the lg tracking but a tamer size. */}
              <h1 className="wordmark text-white text-[clamp(2rem,7.5vw,6rem)] xl:text-[6.5rem] 2xl:text-[7.5rem] leading-[0.95] font-light whitespace-nowrap tracking-[0.06em] sm:tracking-[0.1em] lg:tracking-[0.14em] xl:tracking-[0.18em]">
                PERKŪNAS
              </h1>
              <div className="wordmark text-white/55 text-[clamp(0.85rem,1.8vw,1.4rem)] mt-2 sm:mt-3 mb-6 sm:mb-7 font-light tracking-[0.2em] sm:tracking-[0.3em]">
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

              {/* CTAs — full-width at small, auto at sm+ */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-7 sm:mt-9">
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 h-11 sm:h-12 rounded-md bg-brand-400 hover:bg-brand-300 text-ink-950 text-[14px] sm:text-[15px] font-semibold tracking-wide shadow-glow-brand transition-colors"
                >
                  <span>{lang === 'en' ? 'Join the team' : 'Prisijunk'}</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 h-11 sm:h-12 rounded-md border border-white/20 hover:border-brand-400/70 text-white hover:text-brand-400 text-[14px] sm:text-[15px] font-semibold tracking-wide transition-colors"
                >
                  {lang === 'en' ? 'Our story' : 'Mūsų istorija'}
                </Link>
              </div>
            </div>

            {/* RIGHT — countdown + season badge. Max-width removed so it
                fills the right column on large screens, and stays tidy on
                mobile where it stacks below the left column. */}
            <div className="flex flex-col items-stretch lg:items-end gap-4 sm:gap-5 w-full min-w-0">
              <div className="readout w-full lg:max-w-sm rounded-lg px-4 sm:px-5 py-3 sm:py-4">
                {/* Header stacks on its own row, so the label and date never collide */}
                <div className="mb-3">
                  <div className="readout-label">
                    {lang === 'en' ? 'FIRST RACE' : 'PIRMOS VARŽYBOS'}
                  </div>
                  <div className="mono-tag text-white/50 text-[10px] mt-1">TBD · 2026</div>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { v: d, l: 'D' },
                    { v: h, l: 'H' },
                    { v: m, l: 'M' },
                    { v: s, l: 'S' }
                  ].map((u) => (
                    <div key={u.l} className="text-center">
                      <div className="font-light text-white text-[26px] sm:text-[30px] tabular-nums tracking-tight leading-none">
                        {String(u.v).padStart(2, '0')}
                      </div>
                      <div className="mono-label mt-1 text-[9px]">{u.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Season badge */}
              <div className="flex items-center gap-3 readout rounded-lg px-4 py-3 w-full lg:max-w-sm">
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

        {/* Bottom stats row — approachable numbers only (team size + car basics) */}
        <div className="relative z-10 grid grid-cols-3 border-t border-white/8 bg-black/55 backdrop-blur-sm divide-x divide-white/8">
          {[
            { v: '70+', l: lang === 'en' ? 'MEMBERS' : 'NARIAI' },
            { v: '120', l: lang === 'en' ? 'HORSEPOWER' : 'ARKL. GALIOS' },
            { v: '<300', l: lang === 'en' ? 'KG WEIGHT' : 'KG SVORIS' }
          ].map((st) => (
            <div key={st.l} className="px-4 sm:px-5 py-3 sm:py-4">
              <div className="font-light text-white text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none">
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
