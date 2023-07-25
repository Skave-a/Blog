export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPink: "rgba(240, 142, 128, 0.1)",
        hoverСolor: "#f08e80",
        menuСolor: "#f3aca1",
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
// font-family: Work Sans,sans-serif;