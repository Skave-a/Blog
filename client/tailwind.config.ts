module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPink: "rgba(240, 142, 128, 0.1)",
        hoverСolor: "#f08e80",
        menuСolor: "#152035",
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