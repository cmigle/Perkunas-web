import { useTranslation } from 'react-i18next';
import { Card, CardBody, Button } from '@heroui/react';
import { Link } from 'react-router-dom';

const TRACKS = [
  {
    icon: 'precision_manufacturing',
    key: 'engineering',
    lt: { t: 'Inžinerija', d: 'Rėmas, aerodinamika, pakaba, varomoji sistema, elektronika.' },
    en: { t: 'Engineering', d: 'Chassis, aero, suspension, powertrain, electronics.' }
  },
  {
    icon: 'developer_mode',
    key: 'software',
    lt: { t: 'Programinė įranga', d: 'Duomenų rinkimas, ECU, telemetrija, valdiklių logika.' },
    en: { t: 'Software', d: 'Data acquisition, ECU tuning, telemetry, control logic.' }
  },
  {
    icon: 'campaign',
    key: 'business',
    lt: { t: 'Verslas ir komunikacija', d: 'Partnerystės, biudžetas, viešieji ryšiai, renginiai.' },
    en: { t: 'Business & PR', d: 'Partnerships, budget, communications, events.' }
  },
  {
    icon: 'handyman',
    key: 'fabrication',
    lt: { t: 'Gamyba', d: 'Surinkimas, virinimas, kompozitai, CNC.' },
    en: { t: 'Fabrication', d: 'Assembly, welding, composites, CNC operation.' }
  }
];

const FAQ = [
  {
    lt: { q: 'Kiek laiko per savaitę?', a: '5-15 valandų priklausomai nuo role ir sezonas.' },
    en: { q: 'How much time per week?', a: '5-15 hours depending on your role and the season.' }
  },
  {
    lt: { q: 'Ar reikia patirties?', a: 'Ne. Reikia noro mokytis. Mokomės kartu.' },
    en: { q: 'Do I need experience?', a: 'No. You need willingness to learn. We learn together.' }
  },
  {
    lt: { q: 'Ar reikia būti KTU?', a: 'Daugiausia iš KTU, bet priimame ir iš kitų universitetų.' },
    en: { q: 'Do I need to study at KTU?', a: 'Mostly KTU, but we accept students from other universities too.' }
  },
  {
    lt: { q: 'Ar moka už darbą?', a: 'Ne. Tai studentų organizacija. Mokiniesi realias įgūdžius.' },
    en: { q: 'Do you pay?', a: "No. It's a student organisation. You gain real industry skills." }
  }
];

const STEPS = [
  { n: '01', lt: 'Užpildyk formą kontaktuose', en: 'Fill the form on the Contact page' },
  { n: '02', lt: 'Pokalbis su departamentu', en: 'Interview with the department lead' },
  { n: '03', lt: 'Bandomasis projektas', en: 'Trial project' },
  { n: '04', lt: 'Oficialus prisijungimas', en: 'Officially join the team' }
];

export default function Join() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">RECRUITING</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-5 leading-[0.95]">
          {lang === 'en' ? (
            <>Build a<br /><span className="text-brand-400">racecar.</span></>
          ) : (
            <>Statyk<br /><span className="text-brand-400">bolidą.</span></>
          )}
        </h1>
        <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
          {lang === 'en'
            ? 'Apply engineering knowledge on hardware that actually runs. Work in a team of 70+. Compete internationally.'
            : 'Pritaikyk inžinerinį mąstymą realiai technikai. Dirbk 70+ žmonių komandoje. Varžykis tarptautiškai.'}
        </p>
      </div>

      {/* Tracks */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="mono-tag text-brand-400">TRACKS</span>
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
          <span className="mono-tag text-brand-400">PROCESS</span>
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
            <div className="mono-label mb-2">NEXT STEP</div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {lang === 'en' ? 'Ready to apply?' : 'Pasiruošęs kandidatuoti?'}
            </h3>
            <p className="text-white/60">
              {lang === 'en' ? 'Reach out — we reply within 48 hours.' : 'Parašyk — atsakome per 48 val.'}
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
