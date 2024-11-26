/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "corporate", "business"],
    //make disabled button text color to be gray-400
  },
  plugins: [require("daisyui")],
};
