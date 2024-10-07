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
        darkerblue: "#04111d",
      },
      screens: {
        xxxs: "377px",
        xxs: "398px",
        xs: "500px",
        smaller: "549px",
        /*  test: "630px", */
      },
      fontSize: {
        xxs: "0.625rem", // 10px, typically small for mobile like Facebook
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar") /* require("tailwind-scrollbar-hide") */,
  ],
};
