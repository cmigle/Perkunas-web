import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A short, silent, looping clip of the car in motion. Plays only when
 * scrolled into view (IntersectionObserver) so it costs nothing until
 * visible — respects reduced-motion as well.
 */
export default function MotionReel() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-ink-950 aspect-video">
        <video
          ref={videoRef}
          src="/videos/car-clip-1.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/car-garage-cockpit.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* gradient for caption legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,6,8,0.85), transparent)' }}
          aria-hidden="true"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="led-dot" />
          <span className="mono-tag text-brand-400 text-[10px]">
            {lang === 'en' ? 'IN MOTION' : 'JUDĖJIME'}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mono-label text-[10px] mb-1">
            {lang === 'en' ? 'CLIP · TESTING SESSION' : 'KLIPAS · BANDYMAI'}
          </div>
          <div className="text-white text-lg sm:text-xl font-medium drop-shadow">
            {lang === 'en' ? 'From the workshop to the asphalt.' : 'Nuo dirbtuvių iki asfalto.'}
          </div>
        </div>
      </div>
    </section>
  );
}
