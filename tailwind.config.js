import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display: rounded, open, geometric — matches the team wordmark logo
        display: ['"Exo 2"', 'ui-sans-serif', 'system-ui'],
        // Body / narrative
        body: ['"Exo 2"', 'ui-sans-serif', 'system-ui'],
        // Telemetry readouts
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        dot: ['"NType82Mono"', '"JetBrains Mono"', 'monospace']
      },
      colors: {
        // Deep ink canvas — true monochrome base matching the team's logo
        ink: {
          950: '#050608',
          900: '#0A0B0E',
          800: '#101216',
          700: '#171A20',
          600: '#20242C',
          500: '#2B303A',
          400: '#3B414D'
        },
        // Brand — racing orange, the team's signature warm accent
        brand: {
          DEFAULT: '#FA8F31',
          50: '#FFF4E8',
          100: '#FFE2C1',
          200: '#FFCD91',
          300: '#FFB466',
          400: '#FA8F31',
          500: '#F16D26',
          600: '#D8581A',
          700: '#AA1811',
          800: '#7C1715'
        },
        // Bolt — Perkūnas thunder yellow, used only for the logo glow
        bolt: {
          DEFAULT: '#FDD835',
          400: '#FDD835',
          500: '#F9A825'
        },
        // Steel carbon — for readout surfaces
        steel: {
          900: '#0D0F13',
          800: '#151820',
          700: '#1E222B'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glow-brand': '0 0 22px rgba(250,143,49,0.45)',
        'glow-bolt': '0 0 18px rgba(253,216,53,0.55)'
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'dot-grid-brand': 'radial-gradient(rgba(250,143,49,0.15) 1px, transparent 1px)',
        'carbon': 'repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.018) 0 2px, transparent 2px 6px)',
        'sector-grid': 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)'
      },
      backgroundSize: {
        'dot-sm': '16px 16px',
        'dot-md': '24px 24px',
        'sector': '80px 80px'
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 3.6s ease-in-out infinite'
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' }
        },
        marquee: {
          to: { transform: 'translateX(-50%)' }
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '48%': { opacity: '1' },
          '50%': { opacity: '0.65' },
          '52%': { opacity: '1' }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        'perkunas-dark': {
          extend: 'dark',
          colors: {
            background: '#050608',
            foreground: '#F4F4F6',
            primary: {
              50: '#FFF4E8',
              100: '#FFE2C1',
              200: '#FFCD91',
              300: '#FFB466',
              400: '#FA8F31',
              500: '#F16D26',
              600: '#D8581A',
              700: '#AA1811',
              800: '#7C1715',
              900: '#5C100F',
              DEFAULT: '#FA8F31',
              foreground: '#050608'
            },
            focus: '#FA8F31',
            content1: '#0D0D10',
            content2: '#131317',
            content3: '#1A1A1F',
            content4: '#222228',
            default: {
              50: '#131317',
              100: '#1A1A1F',
              200: '#222228',
              300: '#2D2D34',
              400: '#3D3D45',
              500: '#555562',
              600: '#7A7A87',
              700: '#9E9EA9',
              800: '#C4C4CB',
              900: '#F4F4F6',
              DEFAULT: '#1A1A1F',
              foreground: '#F4F4F6'
            }
          },
          layout: {
            radius: {
              small: '8px',
              medium: '12px',
              large: '18px'
            }
          }
        }
      }
    })
  ]
};
