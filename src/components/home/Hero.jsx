import { useTranslation } from 'react-i18next';
import { Button, Chip } from '@heroui/react';
import { Link } from 'react-router-dom';
import CarSchematic from '../car/CarSchematic';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-4">
      {/* ---------- Heading block ---------- */}
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center mb-14">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="led-dot" />
            <span className="mono-tag text-white/70">
              {t('hero.subtitle', 'Formula Student · Lithuania')}
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98] text-white mb-6">
            {t('hero.title')}
          </h1>

          <p className="text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              as={Link}
              to="/join"
              color="primary"
              size="lg"
              radius="full"
              className="font-bold px-7"
              endContent={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            >
              {t('hero.cta')}
            </Button>
            <Button
              as={Link}
              to="/about"
              variant="bordered"
              size="lg"
              radius="full"
              className="text-white/90 border-white/15 hover:border-brand-400/50 hover:text-white font-semibold"
            >
              {t('nav.about')}
            </Button>
          </div>

          {/* Quick stats row — Nothing-style mono labels */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/5 max-w-md">
            {[
              { value: '70+', label: t('stats.members', 'Members') },
              { value: '120', label: 'HP · kW 89' },
              { value: '< 4s', label: '0-100 km/h' }
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {s.value}
                </div>
                <div className="mono-label mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Car schematic on the right */}
        <div>
          <CarSchematic />
        </div>
      </div>
    </section>
  );
}
