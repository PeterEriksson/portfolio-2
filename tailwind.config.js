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
        spotifyGreen: "#1DB954",
        spotifyBlack: "#191414",
        twitterBlue: "#1D9BF0",
        react: "#61DAFB",
      },
      screens: {
        xxxs: "377px",
        xxs: "420px",
        xs: "500px",
        smaller: "549px",
      },
      fontSize: {
        "xs-plus": ["0.9rem", { lineHeight: "1.5rem" }], // (approx between sm and base)
        kicker: "0.7rem",
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
      animation: {
        "pulse-lg": "pulse-lg 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-sm": "pulse-sm 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scaleInOut: "scaleInOut 0.65s ease-in-out forwards",
        "show-me-pulse": "show-me-pulse 4.3s ease-in-out infinite",
        wave: "wave 8s ease-in-out infinite",
      },
      keyframes: {
        "pulse-lg": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "pulse-sm": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
        scaleInOut: {
          "0% ": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "show-me-pulse": {
          "0%,40%, 60%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.042)" },
        },
        wave: {
          "0%, 5%, 100%": { transform: "rotate(0deg)" },
          "1%": { transform: "rotate(6deg)" },
          "2%": { transform: "rotate(-4deg)" },
          "3%": { transform: "rotate(6deg)" },
          "4%": { transform: "rotate(-2deg)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
    require("tailwindcss-textshadow"),
  ],
};
