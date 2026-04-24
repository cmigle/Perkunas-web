import { useTranslation } from 'react-i18next';

// TODO: replace these with real live-status data when you have it.
// Keep the shape the same — the component auto-formats.
const STATUS = {
  designing: { lt: 'Priekinės pakabos geometrija', en: 'Front suspension geometry' },
  next: { lt: 'Karkaso bandymas · 2026-01-15', en: 'Chassis test · Jan 15, 2026' },
  target: { lt: 'FS Čekija · 2026 rugpjūtis', en: 'FS Czech Republic · Aug 2026' },
  hoursThisWeek: 412
};

export default function RightNow() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  const items = [
    { label: lang === 'en' ? 'NOW DESIGNING' : 'DABAR KURIAMA', value: STATUS.designing[lang], icon: 'draw' },
    { label: lang === 'en' ? 'NEXT MILESTONE' : 'KITAS ETAPAS', value: STATUS.next[lang], icon: 'flag' },
    { label: lang === 'en' ? 'TARGET RACE' : 'TIKSLAS', value: STATUS.target[lang], icon: 'trophy' },
    { label: lang === 'en' ? 'TEAM HOURS / WK' : 'VAL. KOMANDOS / SAV', value: `${STATUS.hoursThisWeek}`, icon: 'schedule' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="readout rounded-2xl overflow-hidden">
        {/* Live header strip — pit-wall style */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-white/10 bg-black/40">
          <span className="led-dot" />
          <span className="mono-tag text-brand-400 text-[10px]">
            {lang === 'en' ? 'GARAGE · LIVE' : 'DIRBTUVĖS · TIESIOGIAI'}
          </span>
          <span className="flex-1" />
          <span className="mono-tag text-white/40 text-[10px] hidden sm:inline">
            {lang === 'en' ? 'ROOKIE SEASON 2025/26' : 'DEBIUTINIS SEZONAS 2025/26'}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {items.map((it) => (
            <div key={it.label} className="bg-ink-900 px-5 py-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-brand-400 text-[16px]">{it.icon}</span>
                <span className="mono-label text-[10px]">{it.label}</span>
              </div>
              <div className="text-white font-semibold text-base leading-snug">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
