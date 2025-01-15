import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury': {
          gold: '#C6A87D',
          'gold-light': '#D4BC94',
          'gold-dark': '#B89A6C',
          black: '#1A1A1A',
          'black-light': '#2A2A2A',
          'off-white': '#F5F5F5',
          'cream': '#FDFBF7',
        },
        'luxury-cream': '#FDFBF7',
        'luxury-gold': '#D4AF37',
        'luxury-black': '#1A1A1A',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
      },
    },
  },
  plugins: [],
}

export default config
