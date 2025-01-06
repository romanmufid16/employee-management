/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00684A",
        secondary: "#3D4F58",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "serif"],
        ubuntu: ["Ubuntu", "serif"]
      }
    },
  },
  plugins: [],
}