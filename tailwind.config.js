/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        // static colors
        // dark: "#1C133C",
        "primary-500": "#6C4BF0",
        "primary-400": "#AE6EFF",
        "success-500": "#50B240",
        "success-400": "#7EFEAB",
        "primary": "#8262AA",

        // dynamic colors
        dtheme: "rgb(var(--color-theme) / <alpha-value>)",
        odtheme: "rgb(var(--color-theme-opposite) / <alpha-value>)",
        dsuccess: "rgb(var(--color-success) / <alpha-value>)",
        dwarning: "rgb(var(--color-warning) / <alpha-value>)",
        dsemiwarning: "rgb(var(--color-semi-warning) / <alpha-value>)",
        ddanger: "rgb(var(--color-danger) / <alpha-value>)",
        textColor: "#3B3B3B"
      },
      backgroundImage: {
        "brand-gradient": "var(--color-gradient)",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-15%)" },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 5s linear infinite alternate",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
