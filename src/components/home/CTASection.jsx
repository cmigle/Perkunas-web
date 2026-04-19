import { Card, CardBody, Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function CTASection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  const cards = [
    {
      badge: 'STUDENTS',
      icon: 'school',
      title: lang === 'en' ? 'For Students' : 'Studentams',
      desc: lang === 'en'
        ? 'Apply real engineering knowledge on a working racecar. Learn, grow, and build with us.'
        : 'Pritaikyk savo žinias realių projektų aplinkoje. Mokykis, augk ir kurk kartu su mumis.',
      to: '/join',
      button: lang === 'en' ? 'Join the team' : 'Prisijunk dabar'
    },
    {
      badge: 'PARTNERS',
      icon: 'handshake',
      title: lang === 'en' ? 'For Partners' : 'Partneriams',
      desc: lang === 'en'
        ? 'Support the next generation of engineers. Become part of our journey.'
        : 'Paremk naują kartą inžinierių. Tapk mūsų kelionės dalimi.',
      to: '/support',
      button: lang === 'en' ? 'Become a partner' : 'Tapk partneriu'
    },
    {
      badge: 'PRESS',
      icon: 'newsmode',
      title: lang === 'en' ? 'For Media' : 'Spaudai',
      desc: lang === 'en'
        ? 'Press kit, photos, team bio — everything you need to cover our program.'
        : 'Spaudos rinkinys, nuotraukos, komandos biografija — viskas ką reikia apie mus rašant.',
      to: '/contact',
      button: lang === 'en' ? 'Press kit' : 'Spaudos rinkinys'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-px bg-brand-400" />
        <span className="mono-tag text-brand-400">GET INVOLVED</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-12 max-w-2xl">
        {lang === 'en' ? 'Join the journey' : 'Prisijunk prie kelionės'}
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.badge} className="glass relative overflow-hidden group" shadow="none">
            <CardBody className="p-7">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-brand-400 text-[22px]">{c.icon}</span>
                </div>
                <span className="mono-tag text-[9px] px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                  {c.badge}
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{c.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6 min-h-[4.5rem]">{c.desc}</p>
              <Button
                as={Link}
                to={c.to}
                color="primary"
                variant="flat"
                radius="full"
                className="font-semibold"
                endContent={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              >
                {c.button}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
