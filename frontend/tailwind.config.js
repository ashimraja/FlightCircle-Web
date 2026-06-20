import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#EF3E36',
          soft: '#FCE8E6',
          dark: '#8C1714',
        },
        surface: '#F8F8F8',
      },
      boxShadow: {
        soft: '0 24px 60px rgba(17, 24, 39, 0.08)',
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
