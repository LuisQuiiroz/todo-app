/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      colors: {
        'gray-1': '#333',
        'gray-2': '#BDBDBD',
        'gray-3': '#828282',
        'blue-1': '#2F80ED'
      }
    },
    fontFamily: {
      raleway: ['Raleway', 'sans-serif']
    }
  },
  plugins: []
}
