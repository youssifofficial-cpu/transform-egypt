/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E4C1',
          dark: '#9A7B1A',
          shimmer: '#E8D48A',
        },
        black: '#000000',
        ivory: '#F8F5F0',
        taupe: '#E8E1D8',
        'warm-grey': '#B9ADA1',
        charcoal: '#1a1a1a',
        'dark-card': '#0f0f0f',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem,6vw,4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem,4vw,3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.5rem,3vw,2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'section': 'clamp(5rem, 10vw, 9rem)',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 50%, #D4AF37 100%)',
        'gold-shimmer-animate': 'linear-gradient(135deg, #D4AF37 0%, #E8D48A 25%, #F4E4C1 50%, #E8D48A 75%, #D4AF37 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)',
        'card-hover': 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.8) 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 8px 40px rgba(212, 175, 55, 0.35)',
        'gold-xl': '0 12px 60px rgba(212, 175, 55, 0.45)',
        'luxury': '0 20px 60px rgba(0,0,0,0.3)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 40px rgba(0,0,0,0.16)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 175, 55, 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        'luxury': '2px',
      },
    },
  },
  plugins: [],
};
