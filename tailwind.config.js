/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Ground scale — deepest to most elevated. Neutrals carry a faint blue
           bias so the near-blacks read as considered rather than switched-off,
           and so the warm accent has something to sit against. */
        paper: {
          50: '#060608', // deepest well
          100: '#08080B',
          200: '#0B0B0F', // page background
          300: '#131318', // elevated section block
          400: '#24242C', // hairline
          500: '#35353F', // stronger divider
        },
        /* Foreground scale — brightest to dimmest. Same class names as the
           light build, so `text-ink-900` still means "the loudest text". */
        ink: {
          900: '#F5F5F7',
          800: '#E6E6EA',
          700: '#C6C6CF',
          600: '#9C9CA8',
          500: '#7C7C88',
          400: '#6B6B78',
        },
        // Terracotta lifted until it holds its own against near-black
        accent: '#D2733F',
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
