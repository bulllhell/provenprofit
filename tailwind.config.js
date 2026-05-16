/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#7C3AED',
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        orange: {
          DEFAULT: '#F97316',
          50:  '#FFF7ED',
          100: '#FFEDD5',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA6C0A',
          700: '#C2560B',
        },
        // Neutral surface & text tokens
        surface: {
          DEFAULT: '#F8F7FF',   // page background
          card:    '#FFFFFF',   // card background
          border:  '#E2D9F3',   // subtle purple-tinted border
          muted:   '#C4B5E8',   // muted border / dividers
        },
        text: {
          DEFAULT: '#1E1B2E',   // near-black with a purple undertone
          muted:   '#4B4669',   // secondary body copy
          dim:     '#94A3B8',   // placeholders / captions
        },
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        // Brand gradients (purple → orange)
        'brand-gradient':    'linear-gradient(135deg, #7C3AED 0%, #F97316 100%)',
        'brand-gradient-r':  'linear-gradient(135deg, #F97316 0%, #7C3AED 100%)',
        // Light-mode ambient mesh
        'light-mesh':        'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.07) 0%, transparent 60%)',
        'hero-mesh':         'radial-gradient(ellipse at 10% 60%, rgba(124,58,237,0.12) 0%, transparent 50%), radial-gradient(ellipse at 90% 10%, rgba(249,115,22,0.10) 0%, transparent 55%)',
        'card-gradient':     'linear-gradient(145deg, rgba(124,58,237,0.04) 0%, rgba(249,115,22,0.04) 100%)',
        // Purple-only subtle tint for sections
        'section-tint':      'linear-gradient(180deg, #F5F3FF 0%, #F8F7FF 100%)',
      },
      boxShadow: {
        'purple-glow': '0 0 30px rgba(124,58,237,0.22)',
        'orange-glow': '0 0 30px rgba(249,115,22,0.22)',
        'card':        '0 4px 24px rgba(30,27,46,0.08)',
        'card-hover':  '0 8px 40px rgba(124,58,237,0.14)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient':   'gradient 8s ease infinite',
        'ticker':     'ticker 30s linear infinite',
        'spin-slow':  'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};