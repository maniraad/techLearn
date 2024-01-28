/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "primary":"#00806C"
      },
      fontFamily: {
        "IRANSans": "IRANSans",
        "IRANSansBlack": "IRANSansBlack",
        "IRANSansBold": "IRANSansBold",
        "IRANSansMedium": "IRANSansMedium",
        "IRANSansLight": "IRANSansLight",
        "IRANSansUltraLight": "IRANSansUltraLight",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
    }
  ],
}

