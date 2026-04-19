import { useTranslation } from 'react-i18next';

// TODO: replace these with real P-05 spec values + real partner attribution.
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
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">CAR DNA · P-05</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-2xl">
          {lang === 'en'
            ? 'Six numbers that define the build.'
            : 'Šeši skaičiai apibrėžia bolidą.'}
        </h2>
        <span className="mono-label">{lang === 'en' ? 'SPEC SHEET · 2026 SEASON' : 'SPEC. LAPAS · 2026 SEZONAS'}</span>
      </div>

      {/* Six-cell grid with matte separator look */}
      <div className="matte rounded-3xl overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
          {DNA.map((d, i) => (
            <div
              key={d.code}
              className="bg-[#0B0809] px-5 py-6 relative group transition-colors hover:bg-[#100B0C]"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="mono-tag text-brand-400 text-[11px]">{d.code}</span>
                <span className="mono-label">0{i + 1} / 0{DNA.length}</span>
              </div>
              <div className="mono-label mb-1">{d.label[lang]}</div>
              <div className="text-white font-bold text-xl leading-tight mb-3">
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
