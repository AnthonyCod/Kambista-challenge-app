/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D1B40',
        accent: '#00D4C8',
        accentDisabled: '#A8EDE9',
        blueInfo: '#EBF4FF',
        orangeWarning: '#FFF3EB',
        textPrimary: '#1A1A1A',
        textSecondary: '#666666',
        border: '#E0E0E0',
        background: '#F5F5F5',
      },
    },
  },
  plugins: [],
};
