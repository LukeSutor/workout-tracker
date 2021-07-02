const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'orange': '#FF6701'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
