/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#116885',
        primaryLight: '#1a8fb5',
        primaryDark: '#0c4d62',
        accent: '#00e5ff',
        dark: '#080e14',
        dark2: '#0d1821',
        surface: '#0f1e2d',
        surface2: '#162535',
        textMuted: '#7ba3b8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
