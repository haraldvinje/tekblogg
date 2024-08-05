module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#252731',
        blue: '#2563eb'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      heading: ['Poppins', 'sans-serif']
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
