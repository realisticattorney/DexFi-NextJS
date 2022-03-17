module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dexfi: {
          
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
