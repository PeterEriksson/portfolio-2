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
        xxs: "420px",
        xs: "500px",
        smaller: "549px",
      },
      fontSize: {
        xxs: "0.625rem", // 10px, typically small for mobile like Facebook
        "mobile-small": [
          "0.875rem",
          {
            // 14px
            lineHeight: "1.25rem", // 20px
          },
        ],
        "mobile-base": [
          "1.1rem",
          {
            lineHeight: "1.7rem",
          },
        ],
        "mobile-medium": [
          "1.125rem",
          {
            // 18px
            lineHeight: "1.75rem", // 28px
          },
        ],
        "mobile-large": [
          "1.25rem",
          {
            // 20px
            lineHeight: "1.75rem", // 28px
          },
        ],
      },
      textShadow: {
        //test in Contact
        glow: "0 0 6px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.2), 0 0 18px rgba(0, 176, 255, 0.1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-textshadow")],
};
