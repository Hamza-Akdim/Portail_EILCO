/** @type {import('tailwindcss').Config} */

export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundColor: {
        "login-bg": "rgb(241 245 249 / 1)",
        "eilco-blue": "#004f8b",
      },

      colors: {
        "eilco-blue": "#004f8b",
      },

      boxShadow: {
        "login-sh": "1px 1px 10px rgba(0,0,0,0.3)",
      },
      keyframes: {
        raindrop: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
        },
      },
      animation: {
        raindrop: "raindrop 2s linear infinite",
      },
    },
  },
  plugins: [],
};
