/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
    },
    fontFamily:{
      'poppins' : [Poppins],
    },
    backgroundImage: {
      "hero-img": "url('./public/assets/home-background.png')",
  },
  plugins: [],
}
};
