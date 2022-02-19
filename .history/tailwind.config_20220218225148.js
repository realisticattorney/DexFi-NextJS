module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dexfi: {
          space_gray: '#27262C',
          sky: '#E6FDFF',
          violet: '#280D5F',
        },
        // deepoe_default: {
        //   black: '#302e2f',
        // },
      },
      fontSize: {
        xs: ' 0.625rem',
        lg2: '1.25rem',
        xl2: '2rem',
      },
      height: {
        120: '60rem',
        90: '22rem',
        140: '50rem',
        71: '17.75rem',
        70: '17rem',
        95: '23.625rem',
        100: '26rem',
        102: '27rem',
        105: '28rem',
        107: '30rem',
        110: '31.67rem',
        65: '16.25rem',
        66: '16.75rem',
        111: '33.67rem',
        133: '40.2rem',
        157: '55.94rem',
      },
      borderWidth: {
        DEFAULT: '0.8px',
        0: '0',
        1.5: '1.5px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
    },
  },
  plugins: [],
};
