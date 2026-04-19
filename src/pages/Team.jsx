import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { TEAM_MEMBERS } from '../data/images';

const DEPARTMENTS = [
  { id: 'all', lt: 'Visa komanda', en: 'All', icon: 'groups' },
  { id: 'engineering', lt: 'Inžinerija', en: 'Engineering', icon: 'engineering' },
  { id: 'business', lt: 'Verslas', en: 'Business', icon: 'business_center' },
  { id: 'operations', lt: 'Operacijos', en: 'Operations', icon: 'settings' }
];

export default function Team() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [dept, setDept] = useState('all');

  const filtered = dept === 'all' ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.dept === dept);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">OUR PEOPLE</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
          {lang === 'en' ? 'The Team' : 'Komanda'}
        </h1>
        <p className="text-white/60 max-w-2xl text-lg">
          {lang === 'en'
            ? 'Students from KTU and partner universities building a racecar from the ground up.'
            : 'KTU ir kitų universitetų studentai, statantys bolidą nuo nulio.'}
        </p>
      </div>

      {/* Department chips */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-white/5 pb-6">
        {DEPARTMENTS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDept(d.id)}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all',
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

      {/* Members grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((m, i) => (
          <Card key={m.name + i} className="glass overflow-hidden group" shadow="none">
            <CardBody className="p-0">
              <div className="aspect-square bg-ink-800 overflow-hidden relative">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 mono-tag text-[9px] bg-ink-950/70 backdrop-blur px-2 py-1 rounded-full border border-white/15 text-white/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-5">
                <div className="text-white font-bold text-lg leading-tight mb-1">{m.name}</div>
                <div className="mono-label text-brand-400 mb-3">{m.role[lang]}</div>
                {m.specialties?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {m.specialties.map((s) => (
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
        ))}
      </div>

      {/* Join hint */}
      <Card className="glass mt-14" shadow="none">
        <CardBody className="p-7 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-brand-400 text-[26px]">rocket_launch</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="mono-label mb-1">RECRUITING</div>
            <div className="text-white font-bold text-lg">
              {lang === 'en' ? 'Want your photo on this page?' : 'Nori atsidurti šioje nuotraukoje?'}
            </div>
          </div>
          <a
            href="/join"
            className="px-5 py-2.5 rounded-full bg-brand-400 text-ink-950 font-bold hover:brightness-110 transition-all"
          >
            {lang === 'en' ? 'Join the team' : 'Prisijunk'}
          </a>
        </CardBody>
      </Card>
    </div>
  );
}
