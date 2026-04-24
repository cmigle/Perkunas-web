import { useTranslation } from 'react-i18next';

// TODO: replace these with real spec values + real partner attribution as the build firms up.
// `by` is optional — shown as a tiny "made with <partner>" credit line.
const DNA = [
  { code: 'CHS', label: { lt: 'Karkasas', en: 'Chassis' }, value: { lt: 'Plieno erdvinis', en: 'Steel spaceframe' }, by: 'Iremas' },
  { code: 'SUS', label: { lt: 'Pakaba', en: 'Suspension' }, value: { lt: 'Dvigubos šakos · Push-rod', en: 'Double wishbone · Push-rod' }, by: null },
  { code: 'PWR', label: { lt: 'Variklis', en: 'Powertrain' }, value: { lt: '4-cil. turbo · 120 AG', en: '4-cyl turbo · 120 HP' }, by: 'Injector Dynamics' },
  { code: 'AER', label: { lt: 'Aerodinamika', en: 'Aerodynamics' }, value: { lt: 'Dvielemenčiai sparnai', en: 'Dual-element wings' }, by: 'Ansys' },
  { code: 'ECU', label: { lt: 'Valdymas', en: 'Control' }, value: { lt: 'Atvira ECU', en: 'Open-source ECU' }, by: 'Nuke Performance' },
  { code: 'WHL', label: { lt: 'Ratai', en: 'Wheels' }, value: { lt: '13" Mg lydinys', en: '13" Mg alloy' }, by: 'SKF' }
];

export default function CarDNA() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400 text-[10px]">
          {lang === 'en' ? 'SPEC SHEET' : 'SPECIFIKACIJOS'}
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <h2 className="display-headline text-4xl sm:text-5xl lg:text-6xl text-white max-w-2xl font-light">
          {lang === 'en'
            ? <>Six numbers that <br/><span className="text-brand-400">define the build.</span></>
            : <>Šeši skaičiai, <br/><span className="text-brand-400">apibrėžiantys bolidą.</span></>}
        </h2>
        <span className="mono-tag text-white/40 text-[10px]">
          {lang === 'en' ? 'ROOKIE SEASON · 2025/26' : 'DEBIUTINIS SEZONAS · 2025/26'}
        </span>
      </div>

      {/* Six-cell grid — telemetry readout style */}
      <div className="readout rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/6">
          {DNA.map((d, i) => (
            <div
              key={d.code}
              className="bg-ink-900 px-5 py-6 relative group transition-colors hover:bg-ink-800"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="mono-tag text-brand-400 text-xs tracking-[0.2em]">{d.code}</span>
                <span className="mono-tag text-white/35 text-[9.5px]">0{i + 1} / 0{DNA.length}</span>
              </div>
              <div className="mono-label text-[10px] mb-1.5">{d.label[lang]}</div>
              <div className="text-white font-semibold text-xl leading-tight mb-3">
                {d.value[lang]}
              </div>
              {d.by && (
                <div className="text-white/45 text-[11px] font-mono">
                  {lang === 'en' ? 'supplied by' : 'tiekėjas'}{' '}
                  <span className="text-brand-400/90">{d.by}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
