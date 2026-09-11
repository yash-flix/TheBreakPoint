/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Deep navy-black canvas
        ink: {
          950: '#04070d',
          900: '#070a12',
          850: '#0a0e17',
          800: '#10131c',
          700: '#171b26',
        },
        // Cool blue-grey type scale
        mist: {
          50: '#eef3f9',
          100: '#d5dbe6',
          300: '#b8c7d9',
          500: '#8595ab',
          700: '#5a6779',
        },
        // Ice-blue accent
        ice: {
          200: '#d3ecff',
          300: '#a6daff',
          400: '#7cc5f7',
          500: '#4ea6e6',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-3%,0) scale(1.06)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseline: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        drift: 'drift 18s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        pulseline: 'pulseline 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
