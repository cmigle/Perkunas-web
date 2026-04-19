import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { useTranslation } from 'react-i18next';

/**
 * Interactive SVG schematic of a formula car. Replaces the laggy 3D model.
 * Each hotspot is an HeroUI Popover -> click/tap to see specs.
 * Works on desktop (hover + click) and mobile (tap).
 */

const HOTSPOTS = [
  {
    id: 'frontWing',
    cx: 60,
    cy: 150,
    label: { lt: 'Priekinis sparnas', en: 'Front Wing' },
    spec: { lt: 'Spaudimo jėga · 45 kg prie 100 km/h', en: 'Downforce · 45 kg @ 100 km/h' },
    detail: {
      lt: 'Anglies pluošto sparnas sureguliuotas didžiausiai prikabinimui ratams posūkiuose.',
      en: 'Carbon-fibre wing tuned for maximum front grip in cornering.'
    }
  },
  {
    id: 'cockpit',
    cx: 260,
    cy: 125,
    label: { lt: 'Kabina', en: 'Cockpit' },
    spec: { lt: 'Individualus FIA sėdimas · 6-taškų diržai', en: 'FIA custom seat · 6-point harness' },
    detail: {
      lt: 'Ergonominė kabina, pritaikyta vairuotojui — saugos narvas iš plieno.',
      en: 'Ergonomic cockpit fitted to the driver — steel safety cage.'
    }
  },
  {
    id: 'engine',
    cx: 370,
    cy: 120,
    label: { lt: 'Variklis', en: 'Powertrain' },
    spec: { lt: '120 AG · 89 kW · RWD', en: '120 HP · 89 kW · RWD' },
    detail: {
      lt: 'Turbofilmas 4-cilindrų variklis su individualia ECU sistema.',
      en: 'Turbocharged 4-cylinder with custom ECU mapping.'
    }
  },
  {
    id: 'rearWing',
    cx: 500,
    cy: 120,
    label: { lt: 'Galinis sparnas', en: 'Rear Wing' },
    spec: { lt: 'Spaudimo jėga · 65 kg', en: 'Downforce · 65 kg' },
    detail: {
      lt: 'Dvipakopis galinis sparnas — balansas tarp spaudimo ir greičio.',
      en: 'Dual-element rear wing balancing downforce and top-end speed.'
    }
  },
  {
    id: 'wheelFL',
    cx: 120,
    cy: 210,
    label: { lt: 'Ratas', en: 'Wheel' },
    spec: { lt: '13" · Hoosier slikas', en: '13" · Hoosier slick' },
    detail: {
      lt: 'Lengvas magnio lydinio ratas — Formula Student specifikacija.',
      en: 'Lightweight magnesium-alloy wheel — Formula Student spec.'
    }
  },
  {
    id: 'suspension',
    cx: 320,
    cy: 220,
    label: { lt: 'Pakaba', en: 'Suspension' },
    spec: { lt: 'Dvigubos šakos · Push-rod', en: 'Double wishbone · Push-rod' },
    detail: {
      lt: 'Reguliuojama pakaba kiekvienai trasai — individualūs amortizatoriai.',
      en: 'Adjustable per-track geometry — bespoke damper tuning.'
    }
  },
  {
    id: 'wheelRR',
    cx: 460,
    cy: 210,
    label: { lt: 'Galinis ratas', en: 'Drive Wheel' },
    spec: { lt: 'Diferencialas · LSD', en: 'Limited-slip differential' },
    detail: {
      lt: 'Ribotos slydimo diferencialas — maksimalus traukos išgavimas.',
      en: 'Limited-slip diff for maximum traction out of corners.'
    }
  }
];

export default function CarSchematic() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [active, setActive] = useState(null);

  return (
    <div className="relative w-full">
      {/* Caption strip — top */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="led-dot" />
          <span className="mono-tag text-white/70">PERKŪNAS · P-05 SCHEMATIC</span>
        </div>
        <span className="mono-tag text-white/40 hidden sm:inline">
          {lang === 'en' ? 'TAP HOTSPOTS' : 'PALIESKITE TAŠKUS'}
        </span>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-10">
        <svg
          viewBox="0 0 600 280"
          className="w-full h-auto"
          role="img"
          aria-label="Formula car interactive schematic"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1A1A1F" />
              <stop offset="100%" stopColor="#222228" />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FA8F31" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FA8F31" stopOpacity="0.7" />
            </linearGradient>
            <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.08)" />
            </pattern>
          </defs>

          {/* Dot grid background */}
          <rect width="600" height="280" fill="url(#dots)" />

          {/* Guide rails */}
          <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />

          {/* ---- Car body (side view, stylised) ---- */}
          {/* Front wing */}
          <rect x="30" y="145" width="55" height="10" rx="2" fill="url(#bodyGrad)" stroke="rgba(250,143,49,0.4)" />
          {/* Nose cone */}
          <path
            d="M 85 150 L 150 110 L 230 110 L 230 160 L 85 160 Z"
            fill="url(#bodyGrad)"
            stroke="rgba(255,255,255,0.1)"
          />
          {/* Cockpit */}
          <path
            d="M 230 110 Q 250 90 285 90 L 320 90 Q 340 90 340 110 L 340 160 L 230 160 Z"
            fill="url(#bodyGrad)"
            stroke="rgba(255,255,255,0.1)"
          />
          {/* Cockpit opening (headrest) */}
          <rect x="260" y="88" width="50" height="12" rx="4" fill="#08080A" stroke="rgba(250,143,49,0.5)" />
          {/* Engine bay */}
          <path
            d="M 340 110 L 470 110 L 470 160 L 340 160 Z"
            fill="url(#bodyGrad)"
            stroke="rgba(255,255,255,0.1)"
          />
          {/* Engine accent detail */}
          <rect x="350" y="120" width="110" height="3" fill="url(#accentGrad)" />
          <rect x="350" y="128" width="110" height="3" fill="url(#accentGrad)" />
          {/* Rear wing */}
          <rect x="480" y="85" width="40" height="8" rx="2" fill="url(#bodyGrad)" stroke="rgba(250,143,49,0.4)" />
          <line x1="490" y1="93" x2="490" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="510" y1="93" x2="510" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <rect x="475" y="125" width="50" height="6" rx="1" fill="url(#bodyGrad)" stroke="rgba(250,143,49,0.4)" />

          {/* Wheels */}
          {[
            { cx: 120, cy: 210 },
            { cx: 460, cy: 210 }
          ].map((w, i) => (
            <g key={i}>
              <circle cx={w.cx} cy={w.cy} r="28" fill="#0D0D10" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <circle cx={w.cx} cy={w.cy} r="18" fill="#08080A" stroke="rgba(250,143,49,0.4)" />
              <circle cx={w.cx} cy={w.cy} r="4" fill="#FA8F31" />
              {/* spokes */}
              {[0, 60, 120, 240, 300].map((a) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <line
                    key={a}
                    x1={w.cx}
                    y1={w.cy}
                    x2={w.cx + Math.cos(rad) * 16}
                    y2={w.cy + Math.sin(rad) * 16}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>
          ))}

          {/* Suspension arms */}
          <line x1="140" y1="200" x2="220" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="140" y1="220" x2="220" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="440" y1="200" x2="360" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="440" y1="220" x2="360" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

          {/* ---- Hotspots ---- */}
          {HOTSPOTS.map((h) => (
            <Popover
              key={h.id}
              placement="top"
              showArrow
              backdrop="transparent"
              onOpenChange={(o) => setActive(o ? h.id : null)}
            >
              <PopoverTrigger>
                <g
                  className="cursor-pointer transition-all"
                  style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
                >
                  {/* outer pulse */}
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r={active === h.id ? 14 : 12}
                    fill="rgba(250,143,49,0.15)"
                    className="transition-all"
                  />
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r="6"
                    fill="#FA8F31"
                    className="drop-shadow-[0_0_6px_rgba(250,143,49,0.9)]"
                  />
                  <circle cx={h.cx} cy={h.cy} r="2" fill="#08080A" />
                </g>
              </PopoverTrigger>
              <PopoverContent className="bg-ink-900/95 border border-brand-400/40 backdrop-blur-xl p-0 max-w-[260px]">
                <div className="p-4">
                  <div className="mono-label mb-1">0{HOTSPOTS.indexOf(h) + 1} · COMPONENT</div>
                  <div className="font-bold text-white text-base mb-1">{h.label[lang]}</div>
                  <div className="text-brand-400 text-sm mono-tag mb-2">{h.spec[lang]}</div>
                  <div className="text-white/60 text-xs leading-relaxed">{h.detail[lang]}</div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </svg>

        {/* Legend chip row below */}
        <div className="flex flex-wrap gap-2 mt-6">
          {HOTSPOTS.map((h, idx) => (
            <button
              key={h.id}
              onClick={() => setActive(h.id)}
              className={[
                'px-3 py-1.5 rounded-full mono-tag text-[10px] border transition-all',
                active === h.id
                  ? 'bg-brand-400/20 text-brand-300 border-brand-400/50'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-brand-400/40 hover:text-white'
              ].join(' ')}
            >
              <span className="text-brand-400 mr-1.5">0{idx + 1}</span>
              {h.label[lang]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
