import { useTranslation } from 'react-i18next';
import { Card, CardBody, Button } from '@heroui/react';
import { Link } from 'react-router-dom';

const TRACKS = [
  {
    icon: 'precision_manufacturing',
    key: 'engineering',
    lt: { t: 'Inžinerija', d: 'Rėmas, aerodinamika, pakaba, varomoji sistema ir elektronika.' },
    en: { t: 'Engineering', d: 'Chassis, aero, suspension, powertrain, electronics.' }
  },
  {
    icon: 'developer_mode',
    key: 'software',
    lt: { t: 'Programinė įranga', d: 'Duomenų rinkimas, ECU, telemetrija ir valdiklių logika.' },
    en: { t: 'Software', d: 'Data acquisition, ECU tuning, telemetry, control logic.' }
  },
  {
    icon: 'campaign',
    key: 'business',
    lt: { t: 'Verslas ir komunikacija', d: 'Partnerystės, biudžetas, viešieji ryšiai ir renginiai.' },
    en: { t: 'Business & PR', d: 'Partnerships, budget, communications, events.' }
  },
  {
    icon: 'handyman',
    key: 'fabrication',
    lt: { t: 'Gamyba', d: 'Surinkimas, virinimas, kompozitai ir CNC apdirbimas.' },
    en: { t: 'Fabrication', d: 'Assembly, welding, composites, CNC operation.' }
  }
];

const FAQ = [
  {
    lt: {
      q: 'Kiek laiko reikės skirti per savaitę?',
      a: 'Vidutiniškai nuo 5 iki 15 valandų. Tikslus laikas priklauso nuo Jūsų vaidmens komandoje ir sezono etapo. Artėjant varžyboms tempas natūraliai didėja, o sezono pradžioje yra ramiau. Kartu aptarsime, kiek realiai galite skirti, kad derinimas su studijomis būtų patogus.'
    },
    en: {
      q: 'How much time will I need to commit each week?',
      a: 'Roughly 5 to 15 hours a week, depending on your role and the time of season. Things get busier as competitions approach and quieter early on. We will work out a realistic time commitment with you so it fits around your studies.'
    }
  },
  {
    lt: {
      q: 'Ar reikia turėti ankstesnės patirties?',
      a: 'Visai ne. Svarbiausia yra smalsumas ir noras mokytis. Komandoje yra ir pradedančiųjų, ir patyrusių narių, tad visuomet turėsite iš ko mokytis ir su kuo pasitarti. Įgūdžiai augs kartu su projektu.'
    },
    en: {
      q: 'Do I need prior experience?',
      a: 'No. What matters most is curiosity and a willingness to learn. The team mixes complete beginners with more experienced engineers, so there is always someone to ask. Your skills will grow with the project.'
    }
  },
  {
    lt: {
      q: 'Ar reikia studijuoti KTU?',
      a: 'Pirmenybė teikiama KTU studentams, nes komanda yra įsikūrusi būtent čia ir formaliai susijusi su universitetu. Tačiau mielai vertiname ir kitų universitetų studentų paraiškas. Jei Jūsų interesai bei įgūdžiai atitinka komandos poreikius, parašykite ir aptarsime galimybes.'
    },
    en: {
      q: 'Do I need to study at KTU?',
      a: 'KTU students get priority because the team is based here and formally tied to the university. We still welcome applications from students at other universities. If your interests and skills match what we need, get in touch and we will figure something out.'
    }
  },
  {
    lt: {
      q: 'Ar tai apmokama veikla?',
      a: 'Perkūnas Racing Team yra studentų iniciatyva, todėl atlygio forma kiek kitokia. Įgyjate realios inžinerinės patirties, vertingą projektą savo aplankui, tarptautinių varžybų patirties, ryšių su pramonės partneriais ir komandą, kuri auga kartu su Jumis. Daugeliui narių ši patirtis tampa tvirtu pagrindu pradedant profesinę karjerą.'
    },
    en: {
      q: 'Is this a paid role?',
      a: 'No. Perkūnas Racing Team is a student-led project, so the payoff is different. You walk away with real engineering experience, a serious project for your CV, international competition exposure and direct contact with industry partners. For many members it has been their first step into a professional engineering job.'
    }
  }
];

const STEPS = [
  { n: '01', lt: 'Užpildykite formą kontaktų puslapyje', en: 'Fill the form on the Contact page' },
  { n: '02', lt: 'Pokalbis su skyriaus vadovu', en: 'Interview with the department lead' },
  { n: '03', lt: 'Bandomasis projektas', en: 'Trial project' },
  { n: '04', lt: 'Oficialus prisijungimas prie komandos', en: 'Officially join the team' }
];

export default function Join() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">{lang === 'en' ? 'RECRUITING' : 'IEŠKOME NARIŲ'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-[0.95]">
          {lang === 'en' ? (
            <>Build a<br /><span className="text-brand-400">racecar.</span></>
          ) : (
            <>Statyk<br /><span className="text-brand-400">bolidą.</span></>
          )}
        </h1>
        <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
          {lang === 'en'
            ? 'Apply engineering knowledge on hardware that actually runs. Work in a team of 70+. Compete internationally.'
            : 'Pritaikykite inžinerinį mąstymą realiai technikai. Dirbkite daugiau nei 70 žmonių komandoje. Varžykitės tarptautiniu lygiu.'}
        </p>
      </div>

      {/* Tracks */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">{lang === 'en' ? 'TRACKS' : 'KRYPTYS'}</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">{TRACKS.length}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {TRACKS.map((t, i) => (
            <Card key={t.key} className="glass" shadow="none">
              <CardBody className="p-7 flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-brand-400 text-[26px]">{t.icon}</span>
                </div>
                <div>
                  <div className="mono-label mb-1">0{i + 1}</div>
                  <h3 className="text-white font-bold text-xl mb-2">{t[lang].t}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t[lang].d}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Process steps */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">{lang === 'en' ? 'PROCESS' : 'PROCESAS'}</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">{STEPS.length}</span>
        </div>
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
            <div className="hidden md:block absolute top-6 left-10 right-10 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative pt-2">
                <div className="w-12 h-12 rounded-xl bg-brand-400/15 border border-brand-400/30 text-brand-400 font-black text-lg flex items-center justify-center mb-3 relative z-10 bg-ink-900">
                  {s.n}
                </div>
                <div className="text-white font-semibold text-sm leading-tight">{s[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">FAQ</span>
          <span className="flex-1 h-px bg-white/10" />
          <span className="mono-label">{FAQ.length}</span>
        </div>
        <Card className="glass" shadow="none">
          <CardBody className="p-2 sm:p-4">
            <ul>
              {FAQ.map((f, i) => (
                <li
                  key={i}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <details className="group">
                    <summary className="no-glow flex items-center gap-3 py-4 px-2 cursor-pointer list-none text-white font-semibold text-base select-none">
                      <span className="mono-tag text-brand-400 w-8 shrink-0">0{i + 1}</span>
                      <span className="flex-1">{f[lang].q}</span>
                      <span
                        className="material-symbols-outlined text-white/50 text-[20px] transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      >
                        expand_more
                      </span>
                    </summary>
                    <div className="text-white/65 text-sm pb-4 pl-12 pr-2 leading-relaxed">
                      {f[lang].a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </section>

      {/* CTA */}
      <Card className="glass" shadow="none">
        <CardBody className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="mono-label mb-2">{lang === 'en' ? 'NEXT STEP' : 'KITAS ŽINGSNIS'}</div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {lang === 'en' ? 'Ready to apply?' : 'Pasiruošę kandidatuoti?'}
            </h3>
            <p className="text-white/60">
              {lang === 'en' ? 'Reach out. We reply within 48 hours.' : 'Parašykite. Atsakome per 48 val.'}
            </p>
          </div>
          <Button
            as={Link}
            to="/contact"
            color="primary"
            size="lg"
            radius="full"
            className="font-bold"
            endContent={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
          >
            {lang === 'en' ? 'Apply now' : 'Kandidatuoti'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
