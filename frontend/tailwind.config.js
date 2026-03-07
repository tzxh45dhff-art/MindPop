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
        "primary": "#ec5b13",
        "accent-lime": "#bef264",
        "accent-blue": "#7dd3fc",
        "background-light": "#f8f6f6",
        "background-dark": "#221610",
        "neobeige": "#F5F5DC",
        // Neo-Brutalism Edition Colors
        'brutal-green': '#A3E635',
        'brutal-orange': '#FB923C',
        'brutal-purple': '#A855F7',
        'brutal-blue': '#60A5FA',
        'brutal-yellow': '#FDE047',
        'brutal-pink': '#F472B6',
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
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
