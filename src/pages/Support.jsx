import { useTranslation } from 'react-i18next';
import { Card, CardBody, Button } from '@heroui/react';
import { Link } from 'react-router-dom';

const TIERS = [
  {
    name: 'Bronze',
    lt: 'Bronzinis',
    amount: '€ 500+',
    perks: {
      lt: ['Logotipas interneto svetainėje', 'Socialinių tinklų paminėjimas'],
      en: ['Logo on website', 'Social media mention']
    },
    color: 'border-white/10'
  },
  {
    name: 'Silver',
    lt: 'Sidabrinis',
    amount: '€ 1500+',
    perks: {
      lt: ['Visi bronzos privalumai', 'Logotipas ant bolido', 'Dirbtuvių apsilankymas'],
      en: ['All Bronze perks', 'Logo on car', 'Workshop visit']
    },
    color: 'border-white/25'
  },
  {
    name: 'Gold',
    lt: 'Auksinis',
    amount: '€ 5000+',
    perks: {
      lt: ['Visi sidabro privalumai', 'Pagrindinis logotipas ant bolido', 'Varžybų pakvietimas', 'Pasirinktinė talentų programa'],
      en: ['All Silver perks', 'Primary logo on car', 'Race day invitation', 'Custom talent program']
    },
    color: 'border-brand-400/60 shadow-[0_0_32px_rgba(250,143,49,0.18)]',
    featured: true
  }
];

const WAYS = [
  { icon: 'payments', lt: { t: 'Finansinė parama', d: 'Tiesioginis finansinis indėlis.' }, en: { t: 'Financial support', d: 'Direct financial contribution.' } },
  { icon: 'inventory_2', lt: { t: 'Medžiagos ir dalys', d: 'Komponentai, įrankiai, medžiagos.' }, en: { t: 'Materials & parts', d: 'Components, tools, materials.' } },
  { icon: 'school', lt: { t: 'Žinios', d: 'Konsultacijos, mokymai, mentorystė.' }, en: { t: 'Knowledge', d: 'Consulting, training, mentorship.' } },
  { icon: 'precision_manufacturing', lt: { t: 'Gamyba', d: 'CNC apdirbimas, 3D spauda, virinimas.' }, en: { t: 'Manufacturing', d: 'CNC machining, 3D printing, welding.' } }
];

export default function Support() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">SUPPORT US</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-5 leading-[0.95]">
          {lang === 'en' ? (
            <>Back the<br /><span className="text-brand-400">next build.</span></>
          ) : (
            <>Paremk<br /><span className="text-brand-400">kitą bolidą.</span></>
          )}
        </h1>
        <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
          {lang === 'en'
            ? 'A racecar is built by students but paid for by partners. Here\'s how you can help — and what you get back.'
            : 'Bolidą stato studentai, o finansuoja partneriai. Štai kaip gali prisidėti — ir ką gauni mainais.'}
        </p>
      </div>

      {/* Ways to help */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">WAYS TO HELP</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">{WAYS.length}</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {WAYS.map((w, i) => (
            <Card key={w.icon} className="glass" shadow="none">
              <CardBody className="p-6">
                <div className="w-12 h-12 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-brand-400 text-[22px]">{w.icon}</span>
                </div>
                <div className="mono-label mb-1">0{i + 1}</div>
                <h3 className="text-white font-bold text-base mb-1.5">{w[lang].t}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{w[lang].d}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">SPONSORSHIP TIERS</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">{TIERS.length}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={['glass border relative', tier.color, tier.featured ? 'md:-translate-y-3' : ''].join(' ')}
              shadow="none"
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-400 text-ink-950 mono-tag text-[10px]">
                  FEATURED
                </div>
              )}
              <CardBody className="p-7">
                <div className="mono-label mb-2">{tier.name.toUpperCase()}</div>
                <div className="text-white font-black text-4xl tracking-tight mb-1">{tier.amount}</div>
                <div className="text-white/50 text-sm mb-6">{lang === 'en' ? tier.name : tier.lt}</div>
                <ul className="space-y-3 mb-6">
                  {tier.perks[lang].map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-white/75">
                      <span className="material-symbols-outlined text-brand-400 text-[18px] shrink-0">check_circle</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  as={Link}
                  to="/contact"
                  color={tier.featured ? 'primary' : 'default'}
                  variant={tier.featured ? 'solid' : 'bordered'}
                  radius="full"
                  className={['w-full font-bold', !tier.featured && 'text-white border-white/15 hover:border-brand-400/50'].filter(Boolean).join(' ')}
                >
                  {lang === 'en' ? 'Get in touch' : 'Susisiekti'}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <Card className="glass" shadow="none">
        <CardBody className="p-8 sm:p-10 grid md:grid-cols-[auto_1fr] gap-8">
          <div>
            <div className="mono-label mb-3">WHY IT MATTERS</div>
            <div className="text-8xl font-black text-brand-400 leading-none">€</div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              {lang === 'en'
                ? 'Your support builds engineers, not just cars.'
                : 'Tavo parama kuria inžinierius, ne tik bolidus.'}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {lang === 'en'
                ? 'Every euro goes toward materials, machining time, competition entry fees, and travel. In return, you get access to a pipeline of Lithuanian engineering talent that has already shipped real hardware.'
                : 'Kiekvienas euras skirtas medžiagoms, apdirbimui, varžybų mokesčiams ir kelionėms. Mainais — prieiga prie Lietuvos inžinerinio talento, kuris jau pristatė veikiančią techniką.'}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
