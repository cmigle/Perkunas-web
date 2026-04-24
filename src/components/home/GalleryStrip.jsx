import { useTranslation } from 'react-i18next';

// Photos pulled from perkunasrt.com (our own). The asymmetric span pattern
// gives a motorsport-magazine feel without the photos needing to match aspect.
const PHOTOS = [
  {
    src: '/images/team-ktu-full.jpg',
    alt: { lt: 'Visa komanda prie KTU', en: 'The full team at KTU' },
    tag: { lt: 'KOMANDA', en: 'TEAM' },
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    src: '/images/car-garage-cockpit.jpg',
    alt: { lt: 'Bolidas dirbtuvėse', en: 'Car in the garage' },
    tag: { lt: 'DIRBTUVĖS', en: 'GARAGE' },
    span: ''
  },
  {
    src: '/images/cfd-front-wing.jpg',
    alt: { lt: 'Aerodinamikos analizė · Ansys', en: 'Aero CFD · Ansys' },
    tag: { lt: 'ANSYS CFD', en: 'ANSYS CFD' },
    span: ''
  },
  {
    src: '/images/team-with-car.jpg',
    alt: { lt: 'Komanda ir bolidas', en: 'Team and car' },
    tag: { lt: 'LAUKE', en: 'OUTDOORS' },
    span: ''
  },
  {
    src: '/images/career-day.jpg',
    alt: { lt: 'Karjeros diena', en: 'Career day' },
    tag: { lt: 'RENGINYS', en: 'EVENT' },
    span: ''
  },
  {
    src: '/images/cad-onscreen.jpg',
    alt: { lt: 'Rėmo CAD', en: 'Chassis CAD' },
    tag: { lt: 'CAD', en: 'CAD' },
    span: 'md:col-span-2'
  },
  {
    src: '/images/team-at-event.jpg',
    alt: { lt: 'Komanda renginyje', en: 'Team at an event' },
    tag: { lt: 'VARŽYBOS', en: 'EVENT' },
    span: ''
  }
];

export default function GalleryStrip() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <span className="w-10 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400 text-[10px]">
          {lang === 'en' ? 'GLIMPSES' : 'AKIMIRKOS'}
        </span>
      </div>
      <h2 className="display-headline text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 sm:mb-10 max-w-3xl">
        {lang === 'en' ? (
          <>From the garage <br /><span className="text-brand-400">to the track.</span></>
        ) : (
          <>Nuo dirbtuvių <br /><span className="text-brand-400">iki trasos.</span></>
        )}
      </h2>

      {/* Grid steps: 1 col < 480px, 2 cols sm+, 4 cols md+. auto-rows
          grow on larger screens so images breathe on wide monitors. */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 auto-rows-[240px] min-[480px]:auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3">
        {PHOTOS.map((p) => (
          <div
            key={p.src}
            className={`relative overflow-hidden rounded-xl border border-white/8 bg-ink-900 group ${p.span}`}
          >
            <img
              src={p.src}
              alt={p.alt[lang]}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(6,7,10,0.85), transparent)' }}
              aria-hidden="true"
            />
            <span className="absolute top-3 left-3 mono-tag text-[9px] bg-ink-950/70 backdrop-blur px-2 py-1 rounded-full border border-white/15 text-brand-400">
              {p.tag[lang]}
            </span>
            <span className="absolute bottom-3 left-3 text-white/85 text-sm font-medium drop-shadow">
              {p.alt[lang]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
