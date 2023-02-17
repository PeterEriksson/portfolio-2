/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainDarkBlue: "#091c29",
      },
      screens: {
        xxxs: "377px",
        xxs: "398px",
        xs: "500px",
        smaller: "545px",
        /*  test: "630px", */
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar") /* require("tailwind-scrollbar-hide") */,
  ],
};
