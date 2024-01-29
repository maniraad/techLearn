/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "secondary":"#8C0014"
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
          lg: "0.625rem",
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

