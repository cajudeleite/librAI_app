/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F8BA48",
        secondary: "#42484D",
        background: {
          light: "#F0EEE3",
          dark: "#B5AFA6",
        },
      },
    },
  },
  plugins: [],
};
