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
        'brand-1': '#B1591E',
        'brand-2': '#8A5764',
        'brand-3': '#DDB176',
        'brand-4': '#006269',
        'brand-5': '#A5C9CA',
        'brand-6': '#634B7B',
      },
    },
  },
  plugins: [],
}