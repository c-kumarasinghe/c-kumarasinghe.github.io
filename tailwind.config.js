/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm greige paper scale — not clinical white
        paper: {
          50: '#FDFCFA',
          100: '#F8F6F1',
          200: '#F2EFE9', // page background
          300: '#E9E5DC',
          400: '#DDD8CC', // hairline
          500: '#C9C2B3',
        },
        // Warm near-black neutral scale
        ink: {
          900: '#14120F',
          800: '#221F1A',
          700: '#3D3931',
          600: '#605B50',
          500: '#8A8478',
          400: '#ADA79A',
        },
        accent: '#A8502A',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(3.5rem, 10vw, 9.5rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        section: ['clamp(2.1rem, 5.5vw, 4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        display: ['clamp(1.5rem, 3vw, 2.4rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        shell: '90rem',
      },
    },
  },
  plugins: [],
};
