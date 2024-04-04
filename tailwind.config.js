/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "secondary": "#8C0014"
      },
      fontFamily: {
        "Estedad": "Estedad",
        "EstedadBlack": "EstedadBlack",
        "EstedadBold": "EstedadBold",
        "EstedadMedium": "EstedadMedium",
        "EstedadLight": "EstedadLight",
        "EstedadThin": "EstedadThin",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        }
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
    }
  ],
}

