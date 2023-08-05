/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lg: "1024px",
      "2xl": "1536px",
    },
  },
  plugins: [],
  safelist: [{ pattern: /(bg|text|border)-./ }],
};
