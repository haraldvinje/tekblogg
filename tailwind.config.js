module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'computer-image': 'url("/background.jpg")',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
