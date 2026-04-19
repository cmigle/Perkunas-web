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
      <div className="matte rounded-3xl overflow-hidden">
        {/* Live header strip */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-white/5 bg-black/20">
          <span className="led-dot" />
          <span className="mono-tag text-brand-400">
            {lang === 'en' ? 'RIGHT NOW · LIVE FROM THE GARAGE' : 'DABAR · TIESIOGIAI IŠ DIRBTUVIŲ'}
          </span>
          <span className="flex-1" />
          <span className="mono-label hidden sm:inline">P-05 · BUILD CYCLE 02</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {items.map((it) => (
            <div key={it.label} className="bg-[#0B0809] px-5 py-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-brand-400 text-[16px]">{it.icon}</span>
                <span className="mono-label">{it.label}</span>
              </div>
              <div className="text-white font-bold text-base leading-snug">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
