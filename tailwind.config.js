module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'rubik': ["'Rubik'", "sans-serif"],
        'space-mono': ["'Space Mono'", "monospace"]
      },
      colors: {
        'editr-black': '#000000',
        'editr-dark-grey': '#B2B2B2',
        'editr-light-grey': '#E5E5E5',
        'editr-xl-grey': '#F5F5F5',
        'editr-white': '#FFFFFF',
        'editr-dark-blue' : '#1F2937'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
