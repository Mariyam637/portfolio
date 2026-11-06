/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finance: {
          midnight: '#10243A',
          deep: '#172F49',
          ivory: '#F7F6F2',
          white: '#FFFFFF',
          gold: '#B89A5A',
          goldLight: '#D4BC82',
          slate: '#64748B',
          slateDark: '#475569',
          border: '#E4E7EB',
          borderDark: '#CBD5E1',
          green: '#277A59',
          red: '#C44F4F',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'DM Sans', 'sans-serif'],
        editorial: ['DM Sans', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 36, 58, 0.05), 0 1px 2px 0 rgba(16, 36, 58, 0.03)',
        'premium': '0 4px 20px -2px rgba(16, 36, 58, 0.08), 0 2px 6px -1px rgba(16, 36, 58, 0.04)',
        'elevated': '0 12px 32px -4px rgba(16, 36, 58, 0.12), 0 4px 12px -2px rgba(16, 36, 58, 0.06)'
      }
    },
  },
  plugins: [],
}

