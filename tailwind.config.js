/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto-Italic-VariableFont_wdth,wght.ttf', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

