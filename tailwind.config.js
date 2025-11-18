/** @type {import('tailwindcss').Config} */
exports.default = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@midudev/tailwind-animations","tailwindcss-animate","tailwindcss-motion"),],
}

