/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        red: {
          600: "#dc2626",
        },
      
      },
    },
  },
  plugins: [],
}
