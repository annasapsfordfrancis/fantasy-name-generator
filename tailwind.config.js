module.exports = {
  purge: [
    './templates/index.html',
    './templates/layout.html',
    './app.py'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'body': ['Alegreya','serif'],
      'ui': ['Alegreya SC', 'serif']
    },
    extend: {
      colors: {
        violetb: {
          extralight: '#e3dde2',
          light: "#cfbecc",
          medium: "#8f5983",
          dark: '#602e56',
        }
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
