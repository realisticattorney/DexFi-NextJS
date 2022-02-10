module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dexfi: {
          cream: '#F5F3EE',
          chocolate: '#302E2F',
          pink: '#dfd0e1',
          teal: '#a6e0c7',
          mustard: '#fcdf50',
          moss: '#A8A425',
          tangerine: '#E9610E',
        },
        deepoe_default: {
          black: '#302e2f',
        },
      },
      fontSize: {
        xs: ' 0.625rem',
        lg2: '1.25rem',
        xl2: '2rem',
      },
    },
  },
  plugins: [],
};
