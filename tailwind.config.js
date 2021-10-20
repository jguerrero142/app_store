module.exports = {
  prefix: '',

    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        red: {
          light: '#e43c26ec',
          DEFAULT: '#e43c26ec',
          dark: '#e43c26ec',
        }
      }
    },
    
  
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};