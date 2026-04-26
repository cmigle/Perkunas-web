import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import { TEAM_MEMBERS } from '../data/images';

const DEPARTMENTS = [
  { id: 'all', lt: 'Visa komanda', en: 'All', icon: 'groups' },
  { id: 'engineering', lt: 'Inžinerija', en: 'Engineering', icon: 'engineering' },
  { id: 'business', lt: 'Verslas', en: 'Business', icon: 'business_center' },
  { id: 'operations', lt: 'Operacijos', en: 'Operations', icon: 'settings' }
];

// `specialties` is either an array (legacy) or { lt, en } — normalise here.
function getSpecialties(m, lang) {
  if (!m.specialties) return [];
  if (Array.isArray(m.specialties)) return m.specialties;
  return m.specialties[lang] || [];
}

export default function Team() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [dept, setDept] = useState('all');

  const leads = TEAM_MEMBERS.filter((m) => m.lead);
  const rest = TEAM_MEMBERS.filter((m) => !m.lead);
  const filteredRest = dept === 'all' ? rest : rest.filter((m) => m.dept === dept);

  return (
    <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">{lang === 'en' ? 'OUR PEOPLE' : 'MŪSŲ ŽMONĖS'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
          {lang === 'en' ? 'The Team' : 'Komanda'}
        </h1>
        <p className="text-white/60 max-w-2xl text-lg">
          {lang === 'en'
            ? 'Students from KTU and partner universities building a racecar from the ground up.'
            : 'KTU ir kitų universitetų studentai, statantys bolidą nuo nulio.'}
        </p>
      </div>

      {/* ======== TEAM LEADS — above-the-fold, eager-loaded images ======== */}
      {leads.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="mono-tag text-brand-400">
              {lang === 'en' ? 'DEPARTMENT LEADS' : 'SKYRIŲ VADOVAI'}
            </span>
            <span className="flex-1 h-px bg-white/10" />
            <span className="mono-label">{leads.length}</span>
          </div>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
            {leads.map((m, i) => {
              const specs = getSpecialties(m, lang);
              return (
                <Card key={m.name + i} className="glass overflow-hidden group border border-brand-400/20" shadow="none">
                  <CardBody className="p-0">
                    <div className="aspect-[4/5] bg-ink-800 overflow-hidden relative">
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                        width="400"
                        height="500"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Photo gradient wash so name/role is readable overlaid */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(10,11,14,0.95), transparent)' }}
                        aria-hidden="true"
                      />
                      <span className="absolute top-3 left-3 mono-tag text-[9px] bg-brand-400 text-ink-950 px-2 py-1 rounded-full font-semibold">
                        {lang === 'en' ? 'LEAD' : 'VADOVAS'}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="text-white font-bold text-lg leading-tight">{m.name}</div>
                        <div className="mono-label text-brand-400 mt-0.5">{m.role[lang]}</div>
                      </div>
                    </div>
                    {specs.length > 0 && (
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {specs.map((s) => (
                            <span
                              key={s}
                              className="mono-tag text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/65 border border-white/10"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}

            {/* Recruiting CTA — fills the empty slot(s) at the end of the leads
                grid. Spans two columns at md (3-col grid: leaves 2 holes after
                7 leads) so it sits flush next to Vytautė. At 2xl (4-col grid:
                only 1 hole) it shrinks back to a single column. */}
            <Card
              as={Link}
              to="/join"
              className="glass overflow-hidden group border border-dashed border-brand-400/40 hover:border-brand-400 transition-colors min-[480px]:col-span-2 md:col-span-2 2xl:col-span-1"
              shadow="none"
            >
              <CardBody className="p-0 h-full">
                <div className="aspect-[4/5] md:aspect-auto md:min-h-full bg-ink-900/60 relative overflow-hidden flex flex-col items-center justify-center text-center p-8">
                  {/* Faux silhouette portrait */}
                  <div className="relative mb-5">
                    <div className="w-24 h-24 rounded-full bg-brand-400/10 border-2 border-dashed border-brand-400/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-brand-400/70 text-[56px]">person</span>
                    </div>
                  </div>
                  <span className="mono-tag text-[10px] text-brand-400 mb-2">
                    {lang === 'en' ? 'YOUR SPOT' : 'TAVO VIETA'}
                  </span>
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    {lang === 'en' ? 'Could be you.' : 'Galėtum būti tu.'}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
                    {lang === 'en'
                      ? 'We are recruiting for the next season. Engineering, software, business and fabrication roles are open.'
                      : 'Ieškome narių kitam sezonui. Atviros inžinerijos, programavimo, verslo ir gamybos pozicijos.'}
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-400 text-ink-950 font-bold group-hover:brightness-110 transition-all">
                    {lang === 'en' ? 'Join the team' : 'Prisijunk'}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </span>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
      )}

      {/* ======== REST OF THE TEAM ======== */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-6">
            <span className="mono-tag text-brand-400">
              {lang === 'en' ? 'THE WIDER TEAM' : 'VISA KOMANDA'}
            </span>
            <span className="flex-1 h-px bg-white/10" />
            <span className="mono-label">{filteredRest.length}</span>
          </div>

          {/* Department chips */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-6">
            {DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDept(d.id)}
                className={[
                  'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors',
                  dept === d.id
                    ? 'bg-brand-400 text-ink-950 border-brand-400'
                    : 'text-white/70 border-white/10 hover:border-brand-400/50 hover:text-white'
                ].join(' ')}
              >
                <span className="material-symbols-outlined text-[18px]">{d.icon}</span>
                {d[lang]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredRest.map((m, i) => {
              const specs = getSpecialties(m, lang);
              return (
                <Card key={m.name + i} className="glass overflow-hidden group" shadow="none">
                  <CardBody className="p-0">
                    <div className="aspect-square bg-ink-800 overflow-hidden relative">
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="400"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 mono-tag text-[9px] bg-ink-950/70 backdrop-blur px-2 py-1 rounded-full border border-white/15 text-white/80">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-white font-bold text-lg leading-tight mb-1">{m.name}</div>
                      <div className="mono-label text-brand-400 mb-3">{m.role[lang]}</div>
                      {specs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                          {specs.map((s) => (
                            <span
                              key={s}
                              className="mono-tag text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}
