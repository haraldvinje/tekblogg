module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#1d1e2e',
        'dark-lighter': '#2d2e3e',
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
