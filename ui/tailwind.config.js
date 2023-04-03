/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'noto-serif': ['Noto Serif', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}