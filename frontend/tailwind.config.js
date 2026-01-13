export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8c2bee",
        "accent-lime": "#bef264",
        "background-light": "#f7f6f8",
        "background-dark": "#050505",
        "glass-bg": "rgba(25, 16, 34, 0.6)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
