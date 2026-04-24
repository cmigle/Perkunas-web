import { useTranslation } from 'react-i18next';

/**
 * Heritage + Competition strip.
 * Tells the "who" (Perkūnas — Baltic thunder god) and the "where"
 * (FS events we target). This is the identity differentiator — no other
 * FS team leans on Baltic thunder-god heritage.
 */

const EVENTS = [
  { code: 'FSCZ', name: 'FS Czech Republic', city: 'Most', date: 'AUG 2026', status: 'target' },
  { code: 'FSEA', name: 'FS East', city: 'Hungary', date: 'AUG 2026', status: 'target' },
  { code: 'FSA',  name: 'FS Alpe Adria',    city: 'Slovenia', date: 'JUL 2026', status: 'scouting' },
  { code: 'FSG',  name: 'Formula Student Germany', city: 'Hockenheimring', date: 'AUG 2027', status: 'dream' }
];

export default function Heritage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* Section marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400 text-[10px]">
          {lang === 'en' ? 'HERITAGE' : 'PAVELDAS'}
        </span>
      </div>

      {/* ======== Thunder god narrative ======== */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-10 mb-20 items-start">
        <div>
          <h2 className="display-headline text-white text-5xl sm:text-6xl lg:text-7xl mb-5 font-light">
            {lang === 'en' ? (
              <>Thunder of <br/><span className="text-brand-400">Lithuania</span></>
            ) : (
              <>Lietuvos <br/><span className="text-brand-400">griausmas</span></>
            )}
          </h2>
        </div>
        <div className="space-y-5 text-white/70 leading-relaxed font-body text-[15px] sm:text-base">
          <p>
            {lang === 'en' ? (
              <>
                <span className="text-white font-semibold">Perkūnas</span> is the Baltic god of thunder —
                the oldest name in our language, older than Lithuania itself. When he strikes, the
                sky splits and the earth shakes. That's the standard we hold ourselves to.
              </>
            ) : (
              <>
                <span className="text-white font-semibold">Perkūnas</span> — baltų griausmo dievas.
                Seniausias vardas mūsų kalboje, senesnis už pačią Lietuvą. Kai jis trenkia, dangus
                skyla, o žemė dreba. Tokio standarto ir laikomės patys.
              </>
            )}
          </p>
          <p>
            {lang === 'en' ? (
              <>
                We race under Lithuania's colors — yellow for the sun, green for our forests, red
                for the fire in the exhaust. Built in Kaunas. Raced wherever Formula Student goes.
              </>
            ) : (
              <>
                Lenktyniaujame po Lietuvos vėliava — geltona kaip saulė, žalia kaip mūsų miškai,
                raudona kaip ugnis išmetimo vamzdyje. Sukurta Kaune. Lenktyniauja visur, kur
                Formula Student.
              </>
            )}
          </p>

          {/* Lithuanian flag — real flag colors, not brand colors */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex h-2 w-24 rounded-sm overflow-hidden">
              <div className="flex-1 bg-[#FDB913]" />
              <div className="flex-1 bg-[#006A44]" />
              <div className="flex-1 bg-[#C1272D]" />
            </div>
            <span className="mono-tag text-white/45 text-[10px]">LIETUVOS RESPUBLIKA</span>
          </div>
        </div>
      </div>

      {/* ======== Competition targets — timing-tower style ======== */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400 text-[10px]">
          {lang === 'en' ? 'CAMPAIGN' : 'KAMPANIJA'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
        <h3 className="display-headline text-white text-3xl sm:text-4xl lg:text-5xl font-light">
          {lang === 'en' ? 'Where we race' : 'Kur lenktyniaujame'}
        </h3>
        <span className="mono-tag text-white/40 text-[10px]">
          {lang === 'en' ? 'TARGETS · ROOKIE SEASON' : 'TIKSLAI · DEBIUTINIS SEZONAS'}
        </span>
      </div>

      <div className="readout rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[60px_1fr_110px_90px_100px] sm:grid-cols-[80px_1fr_1fr_110px_120px] gap-3 px-4 sm:px-6 py-3 border-b border-white/6 bg-black/30">
          <span className="readout-label">CODE</span>
          <span className="readout-label">EVENT</span>
          <span className="readout-label hidden sm:inline">LOCATION</span>
          <span className="readout-label">DATE</span>
          <span className="readout-label text-right">STATUS</span>
        </div>

        {EVENTS.map((e, i) => (
          <div
            key={e.code}
            className={[
              'grid grid-cols-[60px_1fr_110px_90px_100px] sm:grid-cols-[80px_1fr_1fr_110px_120px] gap-3 items-center px-4 sm:px-6 py-4 transition-colors hover:bg-brand-400/5',
              i < EVENTS.length - 1 ? 'border-b border-white/5' : ''
            ].join(' ')}
          >
            <span className="mono-tag text-brand-400 text-[12px] tracking-[0.2em]">{e.code}</span>
            <span className="text-white font-semibold text-sm sm:text-base truncate">{e.name}</span>
            <span className="mono-tag text-white/55 text-[10px] hidden sm:inline truncate">{e.city}</span>
            <span className="mono-tag text-white/75 text-[10px]">{e.date}</span>
            <span className="text-right">
              <StatusPill status={e.status} lang={lang} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusPill({ status, lang }) {
  const map = {
    target:   { label: lang === 'en' ? 'TARGET'   : 'TIKSLAS',    color: 'text-brand-400 border-brand-400/40 bg-brand-400/10' },
    scouting: { label: lang === 'en' ? 'SCOUTING' : 'TIRIAME',    color: 'text-white/80 border-white/20 bg-white/5' },
    dream:    { label: lang === 'en' ? 'HORIZON'  : 'HORIZONTAS', color: 'text-white/50 border-white/10 bg-white/[0.02]' }
  };
  const s = map[status] || map.target;
  return (
    <span className={`inline-block mono-tag text-[9.5px] px-2 py-0.5 border rounded-sm ${s.color}`}>
      {s.label}
    </span>
  );
}
