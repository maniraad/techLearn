/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "primary":"#00806C"
      },
      fontFamily: {
        "Estedad": "Estedad",
        "EstedadBlack": "EstedadBlack",
        "EstedadBold": "EstedadBold",
        "EstedadMedium": "EstedadMedium",
        "EstedadLight": "EstedadLight",
        "EstedadThin": "EstedadThin",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
    }
  ],
}

