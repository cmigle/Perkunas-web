import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Link
} from '@heroui/react';
import BoltLogo from './BoltLogo';

const NAV_ITEMS = [
  { to: '/about', key: 'nav.about' },
  { to: '/team', key: 'nav.team' },
  { to: '/partners', key: 'nav.partners' },
  { to: '/join', key: 'nav.join' },
  { to: '/support', key: 'nav.support' },
  { to: '/contact', key: 'nav.contact' }
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const toggleLang = () => {
    const next = i18n.language?.startsWith('en') ? 'lt' : 'en';
    i18n.changeLanguage(next);
    document.documentElement.lang = next;
  };

  return (
    <HeroNavbar
      isMenuOpen={isOpen}
      onMenuOpenChange={setIsOpen}
      maxWidth="xl"
      position="sticky"
      isBlurred
      classNames={{
        base: [
          'fixed top-3 left-1/2 -translate-x-1/2 transition-all duration-300',
          'w-[calc(100%-1.5rem)] max-w-5xl rounded-full px-2',
          scrolled
            ? 'bg-ink-900/85 border-white/10 shadow-lg'
            : 'bg-ink-900/50 border-white/5',
          'border backdrop-blur-xl'
        ].join(' '),
        wrapper: 'px-3 h-14',
        item: [
          'data-[active=true]:text-brand-400',
          'text-white/70 hover:text-white transition-colors text-[13px] font-medium tracking-wide'
        ]
      }}
    >
      {/* LOGO */}
      <NavbarContent justify="start" className="gap-2">
        <NavbarBrand as={NavLink} to="/" className="gap-2 cursor-pointer">
          <BoltLogo size={20} />
          <span className="mono-tag text-white/90 hidden sm:inline">PERKŪNAS</span>
        </NavbarBrand>
      </NavbarContent>

      {/* DESKTOP LINKS */}
      <NavbarContent className="hidden md:flex gap-1" justify="center">
        {NAV_ITEMS.map((item) => (
          <NavbarItem key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  'px-3 py-1.5 rounded-full text-[12.5px] font-semibold tracking-wide transition-all',
                  isActive
                    ? 'bg-brand-400/15 text-brand-300 ring-1 ring-brand-400/30'
                    : 'text-white/65 hover:text-white hover:bg-white/5'
                ].join(' ')
              }
            >
              {t(item.key)}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* LANG + MOBILE TOGGLE */}
      <NavbarContent justify="end" className="gap-1">
        <NavbarItem>
          <button
            onClick={toggleLang}
            className="glass rounded-full px-3 py-1.5 mono-tag text-white/80 hover:text-brand-300 hover:border-brand-400/40 transition-all"
            aria-label="Toggle language"
          >
            {i18n.language?.startsWith('en') ? 'EN' : 'LT'}
          </button>
        </NavbarItem>

        <NavbarMenuToggle
          aria-label="Toggle menu"
          className="md:hidden text-white"
        />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu className="bg-ink-950/98 backdrop-blur-2xl pt-8 gap-2">
        <div className="mono-label mb-3 px-4">Navigation</div>
        {NAV_ITEMS.map((item) => (
          <NavbarMenuItem key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center justify-between px-4 py-3 rounded-xl border transition-all',
                  isActive
                    ? 'bg-brand-400/10 border-brand-400/30 text-brand-300'
                    : 'border-white/5 text-white/80 hover:bg-white/5'
                ].join(' ')
              }
            >
              <span className="text-base font-semibold">{t(item.key)}</span>
              <span className="material-symbols-outlined text-lg opacity-60">
                arrow_forward
              </span>
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
