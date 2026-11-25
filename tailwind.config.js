/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EE',
        line: '#E7E0D3',
        ink: { DEFAULT: '#17140F', soft: '#3B362E', muted: '#6F685C', faint: '#A09887' },
        // Trinity Tech night + gold
        night: { DEFAULT: '#0F0D0A', 2: '#1A1712', 3: '#26211A', line: '#2E281F' },
        brand: { DEFAULT: '#B9771E', dark: '#965F14', soft: '#FBF1E0', ring: '#F0D3A0' },
        good: { DEFAULT: '#17784C', soft: '#E7F4EC' },
        bad: { DEFAULT: '#C2392C', soft: '#FBEBE8' },
        warn: { DEFAULT: '#A86A12', soft: '#FAF1DF' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        brand: ['Cinzel', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,20,15,0.04), 0 1px 1px rgba(23,20,15,0.03)',
        lift: '0 8px 24px -8px rgba(23,20,15,0.16), 0 2px 6px -2px rgba(23,20,15,0.06)',
      },
    },
  },
  plugins: [],
};
