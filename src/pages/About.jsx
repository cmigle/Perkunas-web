import { useTranslation } from 'react-i18next';
import { Card, CardBody } from '@heroui/react';

const VALUES = [
  { icon: 'bolt', lt: { t: 'Greitis', d: 'Greita iteracija, greitas sprendimas, greita mokymosi kreivė.' }, en: { t: 'Speed', d: 'Fast iteration, fast decisions, fast learning curves.' } },
  { icon: 'precision_manufacturing', lt: { t: 'Tikslumas', d: 'Inžinerinis tikslumas kiekvienoje sąvaržoje ir tekste.' }, en: { t: 'Precision', d: 'Engineering precision in every bolt and line of code.' } },
  { icon: 'handshake', lt: { t: 'Komanda', d: 'Jokių vienišų herojų — viskas yra komandinis sportas.' }, en: { t: 'Team', d: 'No lone heroes — everything is a team sport.' } },
  { icon: 'open_in_new', lt: { t: 'Atvirumas', d: 'Dalinamės tuo, ką išmokstame. Mokomės vieni iš kitų.' }, en: { t: 'Openness', d: 'We share what we learn. We learn from each other.' } }
];

const MILESTONES = [
  { year: '2025', lt: 'Komandos įkūrimas KTU', en: 'Team founded at KTU' },
  { year: '2025', lt: 'Departamentų surinkimas', en: 'Department leads assembled' },
  { year: '2026', lt: 'Pirmasis bolido dizainas', en: 'First car design frozen' },
  { year: '2026', lt: 'Pirmosios varžybos', en: 'First competition entry' }
];

export default function About() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">WHO WE ARE</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[0.95]">
          {lang === 'en' ? (
            <>We build<br /><span className="text-brand-400">engineers.</span></>
          ) : (
            <>Mes kuriame<br /><span className="text-brand-400">inžinierius.</span></>
          )}
        </h1>
        <p className="text-white/60 text-xl max-w-3xl leading-relaxed">
          {lang === 'en'
            ? 'Perkūnas Racing Team is the first-ever Formula Student team at Kaunas University of Technology, founded in 2025. We design, build and race a single-seater combustion racecar — and in doing so, we train the engineers Lithuanian industry needs.'
            : 'Perkūnas Racing Team — pirmoji Formula Student komanda Kauno technologijos universitete, įkurta 2025 m. Projektuojame, konstruojame ir lenktyniaujame vidaus degimo bolidu — taip ruošiame inžinierius, kurių reikia Lietuvos pramonei.'}
        </p>

        {/* Gallery strip — team + car photos, intentionally horizontal */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: '/images/team-ktu-full.jpg',       alt: 'Team at KTU',         ratio: 'aspect-[4/5]' },
            { src: '/images/team-selfie.webp',        alt: 'Team in the office',  ratio: 'aspect-[4/5]' },
            { src: '/images/car-garage-cockpit.jpg',  alt: 'Car in the garage',   ratio: 'aspect-[4/5]' },
            { src: '/images/team-with-car.jpg',       alt: 'Team with the car',   ratio: 'aspect-[4/5]' }
          ].map((img) => (
            <div key={img.src} className={`relative overflow-hidden rounded-xl border border-white/8 bg-ink-900 ${img.ratio}`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mission card — large */}
      <Card className="glass mb-16" shadow="none">
        <CardBody className="p-8 sm:p-12 grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div>
            <div className="mono-label mb-3">MISSION</div>
            <div className="text-8xl font-black text-brand-400 leading-none">01</div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              {lang === 'en'
                ? 'More than a car — a training ground.'
                : 'Daugiau nei bolidas — mokymosi aikštelė.'}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {lang === 'en'
                ? 'Every year we start from blank paper and finish with a running, roaring, driving competition car. The car is the outcome — but the real product is what it takes to build it: the coordination, the CAD, the negotiations with suppliers, the late nights, the failed prototypes, the working prototypes.'
                : 'Kasmet pradedame nuo tuščio popieriaus lapo ir baigiame veikiančiu, ūžiančiu, varžybose važiuojančiu bolidu. Bolidas — rezultatas. Tikrasis produktas yra tai, ko reikia, kad jis atsirastų: koordinacija, CAD, derybos su tiekėjais, vakarai dirbtuvėse, nepavykę bandymai, pavykę sprendimai.'}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Values grid */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">VALUES</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">04</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {VALUES.map((v, i) => (
            <Card key={v.icon} className="glass" shadow="none">
              <CardBody className="p-7 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-brand-400 text-[22px]">{v.icon}</span>
                </div>
                <div>
                  <div className="mono-label mb-1">0{i + 1}</div>
                  <h3 className="text-white font-bold text-xl mb-1.5">{v[lang].t}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{v[lang].d}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline — horizontal scrollable on mobile, evenly spaced on desktop */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">HISTORY</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">{MILESTONES.length}</span>
        </div>
        <div className="glass rounded-2xl p-6 sm:p-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 md:gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-5 relative">
            <div className="hidden md:block absolute top-5 left-4 right-4 h-px bg-gradient-to-r from-brand-400 via-brand-400/40 to-brand-400/10" />
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative pt-12 min-w-[140px]">
                <div className="absolute top-2 left-0 w-6 h-6 rounded-full bg-ink-950 border-2 border-brand-400 shadow-[0_0_12px_rgba(250,143,49,0.5)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand-400" />
                </div>
                <div className="mono-tag text-brand-400 mb-1">{m.year}</div>
                <div className="text-white font-semibold text-sm leading-tight">{m[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
