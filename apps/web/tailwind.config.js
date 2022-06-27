/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter',  'sans-serif'],
      },
      colors: {
        primary: '#0ea5e9',
      },
    },
  },
  plugins: [],
};
