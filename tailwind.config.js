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
        display: ['"Exo 2"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        dot: ['"NType82Mono"', '"JetBrains Mono"', 'monospace']
      },
      colors: {
        // Nothing-inspired dark canvas: deep inky blacks, not pure black
        ink: {
          950: '#08080A',
          900: '#0D0D10',
          800: '#131317',
          700: '#1A1A1F',
          600: '#222228',
          500: '#2D2D34',
          400: '#3D3D45'
        },
        // Brand orange — used sparingly
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
        }
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glow-brand': '0 0 24px rgba(250,143,49,0.35)'
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'dot-grid-brand': 'radial-gradient(rgba(250,143,49,0.15) 1px, transparent 1px)'
      },
      backgroundSize: {
        'dot-sm': '16px 16px',
        'dot-md': '24px 24px'
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite'
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' }
        },
        marquee: {
          to: { transform: 'translateX(-50%)' }
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
            background: '#08080A',
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
              foreground: '#08080A'
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
