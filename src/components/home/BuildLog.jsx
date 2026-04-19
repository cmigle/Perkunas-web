import { useTranslation } from 'react-i18next';

// TODO: replace with real build-log entries (you can feed this from a CMS later).
const ENTRIES = [
  {
    date: '2026-01-08',
    type: 'design',
    lt: { title: 'Priekinės pakabos CAD v4', body: 'Sumažintas svoris 180 g · padidinta kaster kampas +0.6°.' },
    en: { title: 'Front suspension CAD v4', body: '180 g lighter · caster angle increased +0.6°.' }
  },
  {
    date: '2026-01-03',
    type: 'test',
    lt: { title: 'Dynos stendas · variklio stumdymas', body: 'Pasiektas 121 AG · pikas 7400 RPM · lambda stabili.' },
    en: { title: 'Engine dyno pull', body: 'Peak 121 HP @ 7400 RPM · lambda stable.' }
  },
  {
    date: '2025-12-28',
    type: 'part',
    lt: { title: 'Gautas SKF diferencialas', body: 'LSD užrakto procentas 45/65 · montavimas sausio 10 d.' },
    en: { title: 'SKF LSD differential arrived', body: 'Lock 45/65 · install scheduled Jan 10.' }
  },
  {
    date: '2025-12-20',
    type: 'milestone',
    lt: { title: 'Rėmo kasybos kompletacija', body: 'Visos 214 vamzdinių jungčių suvirintos · paruošta šlifavimui.' },
    en: { title: 'Chassis welding complete', body: 'All 214 tube joints welded · ready for stress relief.' }
  }
];

const TYPE_STYLES = {
  design: { bg: 'bg-brand-400/15 text-brand-400 border-brand-400/30', icon: 'draw' },
  test:   { bg: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', icon: 'science' },
  part:   { bg: 'bg-white/5 text-white/70 border-white/15', icon: 'package_2' },
  milestone: { bg: 'bg-brand-400/25 text-brand-300 border-brand-400/50', icon: 'flag' }
};

function fmt(dstr, lang) {
  const d = new Date(dstr);
  const months = lang === 'en'
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    : ['Sau','Vas','Kov','Bal','Geg','Bir','Lie','Rgp','Rgs','Spa','Lap','Grd'];
  return `${String(d.getDate()).padStart(2,'0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function BuildLog() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">BUILD LOG</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-2xl">
          {lang === 'en'
            ? 'Every week, a few steps closer.'
            : 'Kas savaitę — keli žingsniai arčiau.'}
        </h2>
        <div className="mono-label">
          {lang === 'en' ? 'LAST UPDATE · 2 DAYS AGO' : 'PASKUTINIS · PRIEŠ 2 DIENAS'}
        </div>
      </div>

      <div className="matte rounded-3xl p-1 sm:p-2">
        <ol className="divide-y divide-white/5">
          {ENTRIES.map((e) => {
            const s = TYPE_STYLES[e.type];
            return (
              <li key={e.date} className="grid grid-cols-[auto_1fr] sm:grid-cols-[140px_auto_1fr] gap-4 items-start p-4 sm:p-5 hover:bg-white/[0.015] transition-colors">
                <div className="mono-tag text-white/60 whitespace-nowrap pt-1">
                  {fmt(e.date, lang)}
                </div>
                <span className={`mono-tag text-[9px] px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 w-fit ${s.bg}`}>
                  <span className="material-symbols-outlined text-[12px]">{s.icon}</span>
                  {e.type.toUpperCase()}
                </span>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-white font-semibold mb-1 leading-tight">{e[lang].title}</div>
                  <div className="text-white/55 text-sm leading-relaxed">{e[lang].body}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
