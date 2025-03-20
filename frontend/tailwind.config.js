/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "letter-fade": "letterFade 0.5s ease-in-out forwards",
        "bouncy-shake-once": "bouncyShake 1.5s ease-in-out 1.6",
      },
      keyframes: {
        letterFade: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bouncyShake: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateY(-5px) rotate(-2deg)",
          },
          "20%, 40%, 60%, 80%": { transform: "translateY(5px) rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
};
