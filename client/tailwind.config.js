/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "#E33439",
          black: "#373435",
        },
        secondary: { green: "#147257" },
        "dark-grey": "#727376",
        "light-grey": "#96989A",
        "neutral-white": "#FEFEFE",
        stroke: "#D9D9D9",
      }
    },
  },
  plugins: [],
}

