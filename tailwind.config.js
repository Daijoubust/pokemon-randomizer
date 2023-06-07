/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        signature: ['Pacifico']
      },
      colors: {
        'pastelPurple': "#f4e6ff",
      }
    },
  },
  plugins: [],
}

