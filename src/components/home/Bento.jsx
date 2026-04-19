import { Card, CardBody } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Bento() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">BEYOND THE BUILD</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-12 max-w-2xl">
        {lang === 'en' ? 'Growing the next generation' : 'Auginame ateities lyderius'}
      </h2>

      <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:auto-rows-[220px]">
        {/* Tall */}
        <Card className="glass md:row-span-2 relative overflow-hidden" shadow="none">
          <CardBody className="p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-brand-400 text-[22px]">psychology</span>
              </div>
              <div className="mono-label mb-2">01</div>
              <h3 className="font-bold text-white text-xl mb-3">
                {lang === 'en' ? 'Engineering Excellence' : 'Inžinerijos tobulumas'}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {lang === 'en'
                  ? 'We apply cutting-edge engineering to real car design, manufacturing, and testing — hands-on learning with mentorship from industry.'
                  : 'Pritaikome pažangiausius inžinerijos principus realiam bolido projektavimui, gamybai ir testavimui su profesionalia mentoryste.'}
              </p>
            </div>
            <Link to="/about" className="inline-flex items-center gap-1.5 text-brand-400 font-semibold text-sm mt-4 hover:gap-2.5 transition-all">
              {lang === 'en' ? 'Read more' : 'Sužinoti daugiau'}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>

            {/* corner dot pattern accent */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-brand-400/10 blur-2xl" />
          </CardBody>
        </Card>

        {/* Wide */}
        <Card className="glass md:col-span-2" shadow="none">
          <CardBody className="p-7">
            <div className="w-12 h-12 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-brand-400 text-[22px]">business_center</span>
            </div>
            <div className="mono-label mb-2">02</div>
            <h3 className="font-bold text-white text-xl mb-2">
              {lang === 'en' ? 'Business Maturity' : 'Verslo subrendimas'}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {lang === 'en'
                ? 'We develop real business skills through sponsorship, budgeting and project organisation — running a team like a company.'
                : 'Verslo įgūdžiai per sponsorystę, biudžetų valdymą ir projekto organizavimą.'}
            </p>
          </CardBody>
        </Card>

        {/* Small */}
        <Card className="glass" shadow="none">
          <CardBody className="p-6">
            <div className="w-10 h-10 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-brand-400 text-[20px]">groups</span>
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {lang === 'en' ? 'United Team' : 'Vieninga komanda'}
            </h3>
            <p className="text-white/55 text-xs leading-relaxed">
              {lang === 'en'
                ? 'International Formula Student competition.'
                : 'Tarptautinės Formula Student varžybos.'}
            </p>
          </CardBody>
        </Card>

        {/* Small */}
        <Card className="glass" shadow="none">
          <CardBody className="p-6">
            <div className="w-10 h-10 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-brand-400 text-[20px]">school</span>
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {lang === 'en' ? 'Mentorship' : 'Mentorystė'}
            </h3>
            <p className="text-white/55 text-xs leading-relaxed">
              {lang === 'en' ? 'Experience from industry experts.' : 'Patirtis iš pramonės ekspertų.'}
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
