/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#f6f8fa',
        border: '#d0d7de',
        dark: {
          bg: '#1a1b1e',
          card: '#2c2e33',
          border: '#3e4147',
          text: '#e4e6eb',
          'text-secondary': '#b0b3b8',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 