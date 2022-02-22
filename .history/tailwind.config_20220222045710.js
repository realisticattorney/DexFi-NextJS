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
          grayviolet: '#7A6EAA',
          other_gray: '#B8ADD2',
          lila: '#EEEAF4',
          moon: 
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
      spacing: {
        1.1: '0.2625rem',
        1.2: '0.275rem',
        1.3: ' 0.3rem',
        1.4: ' 0.35rem',
        1.7: ' 0.41rem',
        0.9: ' 0.23rem',
        0.8: ' 0.21rem',
        0.7: ' 0.19rem',
        0.5: ' 0.15rem',
        0.1: ' 0.04rem',
        2.7: ' 0.7rem',
      },
      borderWidth: {
        DEFAULT: '0.8px',
        0: '0',
        1.5: '1.7px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      fontSize: {
        xs: ' 0.625rem',
        xs1: '0.725rem',
        lg2: '1.25rem',
        xl2: '2rem',
      },
    },
  },
  plugins: [],
};
