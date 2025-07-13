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
        //mainDarkBlue: "#1e1e1e", experimenting
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
        "md-plus": "880px",
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

      animation: {
        "pulse-lg": "pulse-lg 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-sm": "pulse-sm 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scaleInOut: "scaleInOut 0.65s ease-in-out forwards",
        "show-me-pulse": "show-me-pulse 4.3s ease-in-out infinite",
        wave: "wave 8s ease-in-out infinite",
        "wave-click": "waveClick 1s ease-in-out",
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
          "0%, 45%, 100%": { transform: "rotate(0deg)" },
          "46%": { transform: "rotate(6deg)" },
          "47%": { transform: "rotate(-4deg)" },
          "48%": { transform: "rotate(6deg)" },
          "49%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(0deg)" },
        },

        waveClick: {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(14deg)" },
          "30%": { transform: "rotate(-8deg)" },
          "45%": { transform: "rotate(14deg)" },
          "60%": { transform: "rotate(-4deg)" },
          "75%": { transform: "rotate(10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-textshadow")],
};
