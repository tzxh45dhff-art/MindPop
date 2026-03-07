/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f48c25",
        "background-light": "#f8f7f5",
        "background-dark": "#221910",
        "neobeige": "#F5F5DC",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      borderWidth: {
        "3": "3px",
        "4": "4px",
      }
    },
  },
  plugins: [],
}
