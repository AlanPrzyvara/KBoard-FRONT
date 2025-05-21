import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-card': '#2d2d2d',
        'dark-border': '#404040',
        'dark-text': '#e5e5e5',
        'dark-text-secondary': '#a3a3a3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 