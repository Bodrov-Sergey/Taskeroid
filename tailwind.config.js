module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,tsx}'],
  theme: {
    boxShadow: {
      DEFAULT: '0px 2px 15px rgba(213, 213, 213, 0.4)',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      desktop: '1350px',
    },
    extend: {
      colors: {
        green: {
          DEFAULT: '#EB484B',
          dim: '#AA2142',
          light: '#EE6266',
          hover: '#382C63',
        },
        teal: {
          DEFAULT: '#6DC4DE',
          dim: '#DEF3DB',
        },
        dark: {
          DEFAULT: '#382C63',
        },
        gray: {
          DEFAULT: '#8B8B8B',
          light: '#F0F4EF',
          bg: '#F2F2F2',
          border: '#E0E0E0',
        },
        blue: {
          DEFAULT: '#2F80ED',
          light: '#F1F9F7',
        },
        red: {
          DEFAULT: '#EB484B',
          light: '#EB484B',
          dim: '#EB484B',
        },
      },
      fontSize: {
        sm: ['.875rem', '120%'],
        base: ['1rem', '120%'],
        lg: '1.125rem',
        xl: ['1.25rem', '120%'],
        '2xl': ['1.5rem', '140%'],
      },
      width: {
        fit: 'fit-content',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
