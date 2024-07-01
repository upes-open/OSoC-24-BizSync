/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        poppins : ['Poppins']
      },
      backgroundImage: {
        'hero-img': "url('../public/img.png')",
        
      }
    },
  },
  plugins: [],
};
