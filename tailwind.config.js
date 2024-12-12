/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      container : {
        padding : {
          DEFAULT: 'var(--gutter-x)'
        }, 
        center : true
      },
      fontSize : {
        h1 : '2rem', 
        h2 : '1.5rem', 
        h3 : '1.17rem', 
        h4 : '1rem',
        h5 : '0.83rem',
        h6 : '0.67rem'
      }
    },
  },
  plugins: [],
  important : true
}

