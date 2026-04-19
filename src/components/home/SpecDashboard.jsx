import { useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { useTranslation } from 'react-i18next';

const CURRENT_SPECS = [
  { label: 'POWER', value: '120', unit: 'HP' },
  { label: 'TORQUE', value: '89', unit: 'kW' },
  { label: 'WEIGHT', value: '< 300', unit: 'kg' },
  { label: '0-100 KM/H', value: '< 4', unit: 's' },
  { label: 'TOP SPEED', value: '120+', unit: 'km/h' },
  { label: 'DRIVETRAIN', value: 'RWD', unit: '' }
];

const ROADMAP = [
  { year: '2026', phase: 'RESEARCH', desc: { lt: 'Elektrinių sistemų analizė ir planavimas.', en: 'EV systems research and architecture planning.' } },
  { year: '2027', phase: 'PROTOTYPE', desc: { lt: 'Pirmojo elektrinio bolido kūrimas.', en: 'First full electric prototype build.' } },
  { year: '2028', phase: 'COMPETE', desc: { lt: 'Formula Student Electric kategorija.', en: 'Formula Student Electric competition entry.' } }
];

export default function SpecDashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [tab, setTab] = useState('present');

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">ENGINEERING</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-2xl">
          {t('technology.title', lang === 'en' ? 'Technology Focus' : 'Technologijų fokusas')}
        </h2>

        <Tabs
          aria-label="Tech era"
          selectedKey={tab}
          onSelectionChange={setTab}
          variant="bordered"
          radius="full"
          classNames={{
            tabList: 'border-white/10 bg-ink-800/60 backdrop-blur',
            cursor: 'bg-brand-400/90',
            tab: 'px-5 py-2',
            tabContent: 'group-data-[selected=true]:text-ink-950 font-semibold'
          }}
        >
          <Tab key="present" title={<span className="mono-tag">PRESENT</span>} />
          <Tab key="future" title={<span className="mono-tag">FUTURE</span>} />
        </Tabs>
      </div>

      {tab === 'present' && (
        <div className="grid md:grid-cols-3 gap-4">
          {CURRENT_SPECS.map((s, i) => (
            <Card key={s.label} className="glass overflow-hidden" shadow="none">
              <CardBody className="p-5 flex flex-row items-center gap-4">
                <div className="mono-label text-brand-400 w-12">0{i + 1}</div>
                <div className="flex-1 border-l border-white/10 pl-4">
                  <div className="mono-label mb-1">{s.label}</div>
                  <div className="text-white font-black text-3xl tracking-tight">
                    {s.value}
                    {s.unit && <span className="text-sm text-white/40 ml-1.5">{s.unit}</span>}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {tab === 'future' && (
        <div className="relative pl-6">
          <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-400 via-brand-400/40 to-transparent" />
          {ROADMAP.map((r) => (
            <div key={r.year} className="relative mb-5">
              <div className="absolute -left-[22px] top-2 w-4 h-4 rounded-full bg-ink-950 border-2 border-brand-400 shadow-[0_0_12px_rgba(250,143,49,0.6)]" />
              <Card className="glass" shadow="none">
                <CardBody className="p-5 flex flex-row items-center gap-5">
                  <div>
                    <div className="mono-tag text-brand-400 text-sm">{r.year}</div>
                    <div className="mono-label mt-0.5">{r.phase}</div>
                  </div>
                  <div className="flex-1 border-l border-white/10 pl-5 text-white/75 text-sm leading-relaxed">
                    {r.desc[lang]}
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
