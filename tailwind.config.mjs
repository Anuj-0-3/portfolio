/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  safelist: [
    'font-[var(--font-alfa-slab-one)]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
