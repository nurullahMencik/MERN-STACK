/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'], // Google Fonts'tan
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        heartbeat: "heartbeat 1s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      colors: {
        love: "#ff69b4", // özel pembe tonu
        sweet: "#ffe4e1", // tatlı pastel arka plan
      },
    },
  },
  plugins: [],
}
