/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: '375px',
      },
      fontFamily: {
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui'],
        oxanium: ['Oxanium', 'ui-sans-serif', 'system-ui']
      },
    },
  },
  plugins: [],
};