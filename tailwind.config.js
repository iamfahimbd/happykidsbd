/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#26BDFF",
        secondary: "#F74C83",
        accent: "#F9E553",

        text: "#374151",

        bg: "#F8FAFC",

        border: "#E5E7EB",
      },

      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },

      fontFamily: {
        sans: ["var(--font-nunito)"],
        bangla: ["var(--font-hind)"],
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,.08)",
        card: "0 10px 30px rgba(0,0,0,.08)",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
        },
        screens: {
          xl: "1440px",
        },
      },
    },
  },

  plugins: [],
};