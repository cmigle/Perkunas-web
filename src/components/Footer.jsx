import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BoltLogo from './BoltLogo';

const SOCIALS = [
  { href: 'https://www.instagram.com/perkunas_racing_ktu/', label: 'Instagram', icon: 'photo_camera' },
  { href: 'https://www.linkedin.com/company/perkunasrt/', label: 'LinkedIn', icon: 'work' },
  { href: 'https://www.facebook.com/profile.php?id=61575797945434', label: 'Facebook', icon: 'thumb_up' },
  { href: 'https://www.tiktok.com/@perknasrt_ktu', label: 'TikTok', icon: 'music_note' }
];

const LINKS = [
  { to: '/about', key: 'nav.about' },
  { to: '/team', key: 'nav.team' },
  { to: '/partners', key: 'nav.partners' },
  { to: '/join', key: 'nav.join' },
  { to: '/support', key: 'nav.support' },
  { to: '/contact', key: 'nav.contact' }
];

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-white/6 bg-ink-950/70 backdrop-blur-xl relative overflow-hidden">
      {/* Livery diagonal accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(250,143,49,0.5) 50%, transparent)' }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <BoltLogo size={26} />
              <span className="wordmark text-white text-base leading-none tracking-[0.2em] font-light">
                PERKŪNAS
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed mb-4">
              The first Formula Student team at Kaunas University of Technology.
              Founded 2025. Named after the Baltic god of thunder.
            </p>
            {/* Lithuanian flag accent */}
            <div className="flex h-1.5 w-20 rounded-sm overflow-hidden">
              <div className="flex-1 bg-[#FDB913]" />
              <div className="flex-1 bg-[#006A44]" />
              <div className="flex-1 bg-[#C1272D]" />
            </div>
          </div>

          <div>
            <div className="mono-label mb-3 text-[10px]">Navigate</div>
            <ul className="space-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="text-white/65 hover:text-brand-400 transition-colors">
                    {t(l.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono-label mb-3 text-[10px]">Connect</div>
            <div className="flex gap-2 mb-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-brand-400 hover:border-brand-400/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                </a>
              ))}
            </div>
            <p className="mono-tag text-white/35 text-[10px]">© 2025 KTU PERKŪNAS RACING TEAM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
