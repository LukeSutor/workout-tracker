const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'orange': '#FF6701',
        'blue': '#214dff',
        'blue-light': '#4066ff',
        'background': '#F4F4F4'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
