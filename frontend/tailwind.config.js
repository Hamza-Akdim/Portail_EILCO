/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'login-bg': 'rgb(241 245 249 / 1)',
        'eilco-blue': '#004f8b', 
      },

      colors: {
        'eilco-blue': '#004f8b', 
      },
   
      boxShadow: {
        'login-sh': '1px 1px 10px rgba(0,0,0,0.3)',
      },

    },
  },
  plugins: [],
}

