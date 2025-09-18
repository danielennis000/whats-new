/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'asu-maroon': '#8C1D40',
        'asu-gold': '#FFC627',
        'dark-grey': '#484848',
        'light-grey': '#F0EDE9',
        'brand-1': '#8C1D40',
        'brand-2': '#FFC627',
        'brand-3': '#FFC627',
        'brand-4': '#006269',
        'brand-5': '#A5C9CA',
        'brand-6': '#634B7B',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}