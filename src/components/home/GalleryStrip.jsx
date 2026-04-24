import { useTranslation } from 'react-i18next';

// Photos we actually have in /public/images. Captions are bilingual.
// The asymmetric span pattern gives a motorsport-magazine layout without
// the photos needing to be identical aspect ratios.
const PHOTOS = [
  {
    src: '/images/CarDriving.D2d2KQRs.gif',
    alt: { lt: 'Bolidas trasoje', en: 'On track' },
    tag: { lt: 'TRASA', en: 'TRACK' },
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    src: '/images/Competition.BN4d3-bd.jpg',
    alt: { lt: 'Varžybose', en: 'At competition' },
    tag: { lt: 'VARŽYBOS', en: 'COMPETITION' },
    span: ''
  },
  {
    src: '/images/TeamFromDrone.7kRmZBe6.png',
    alt: { lt: 'Komanda iš dronų', en: 'Team from above' },
    tag: { lt: 'KOMANDA', en: 'TEAM' },
    span: ''
  },
  {
    src: '/images/CarInGarage.BukR3Qsy.jpg',
    alt: { lt: 'Garaže', en: 'In the garage' },
    tag: { lt: 'DIRBTUVĖS', en: 'GARAGE' },
    span: ''
  },
  {
    src: '/images/Team.CC8i-R1_.png',
    alt: { lt: 'Komanda', en: 'The team' },
    tag: { lt: 'KOMANDA', en: 'TEAM' },
    span: ''
  }
];

export default function GalleryStrip() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400 text-[10px]">
          {lang === 'en' ? 'GLIMPSES' : 'AKIMIRKOS'}
        </span>
      </div>
      <h2 className="display-headline text-white text-4xl sm:text-5xl lg:text-6xl font-light mb-10 max-w-3xl">
        {lang === 'en' ? (
          <>From the garage <br /><span className="text-brand-400">to the track.</span></>
        ) : (
          <>Nuo dirbtuvių <br /><span className="text-brand-400">iki trasos.</span></>
        )}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3">
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
            {/* Gradient + caption */}
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
