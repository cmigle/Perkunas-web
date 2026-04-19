import { useTranslation } from 'react-i18next';
import { Card, CardBody } from '@heroui/react';

const STEPS = [
  { n: '01', key: 'step1', status: 'live' },
  { n: '02', key: 'step2', status: 'live' },
  { n: '03', key: 'step3', status: 'current' },
  { n: '04', key: 'step4', status: 'next' }
];

const STATUS_STYLES = {
  live: 'bg-brand-400/15 text-brand-300 border-brand-400/40',
  current: 'bg-brand-400/30 text-white border-brand-400/60 shadow-[0_0_18px_rgba(250,143,49,0.4)]',
  next: 'bg-white/5 text-white/50 border-white/10'
};

const STATUS_LABEL = {
  live: { lt: 'ATLIKTA', en: 'COMPLETE' },
  current: { lt: 'VYKSTA', en: 'IN PROGRESS' },
  next: { lt: 'KITAS', en: 'UPCOMING' }
};

export default function Timeline() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">PROCESS</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-12 max-w-2xl">
        {t('timeline.title', lang === 'en' ? 'Development Journey' : 'Kūrimo kelionė')}
      </h2>

      <div className="relative">
        {/* horizontal line on desktop */}
        <div className="hidden md:block absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

        <div className="grid md:grid-cols-4 gap-4">
          {STEPS.map((s, idx) => (
            <Card
              key={s.n}
              className="glass rounded-2xl overflow-visible"
              shadow="none"
            >
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2',
                      s.status === 'current'
                        ? 'bg-brand-400 text-ink-950 border-brand-400'
                        : s.status === 'live'
                        ? 'bg-brand-400/10 text-brand-400 border-brand-400/40'
                        : 'bg-white/5 text-white/40 border-white/10'
                    ].join(' ')}
                  >
                    {s.n}
                  </div>
                  <span
                    className={`mono-tag text-[9px] px-2 py-1 rounded-full border ${STATUS_STYLES[s.status]}`}
                  >
                    {STATUS_LABEL[s.status][lang]}
                  </span>
                </div>
                <h3 className="font-bold text-white text-[15px] mb-1.5">
                  {t(`timeline.${s.key}.title`)}
                </h3>
                <p className="text-white/55 text-[13px] leading-relaxed">
                  {t(`timeline.${s.key}.desc`)}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
