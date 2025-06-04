/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accenture: {
          purple: '#A100FF',
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: 'rgb(var(--accenture-gray-50) / <alpha-value>)',
            100: 'rgb(var(--accenture-gray-100) / <alpha-value>)',
            200: 'rgb(var(--accenture-gray-200) / <alpha-value>)',
            300: 'rgb(var(--accenture-gray-300) / <alpha-value>)',
            400: 'rgb(var(--accenture-gray-400) / <alpha-value>)',
            500: 'rgb(var(--accenture-gray-500) / <alpha-value>)',
            600: 'rgb(var(--accenture-gray-600) / <alpha-value>)',
            700: 'rgb(var(--accenture-gray-700) / <alpha-value>)',
            800: 'rgb(var(--accenture-gray-800) / <alpha-value>)',
            900: 'rgb(var(--accenture-gray-900) / <alpha-value>)',
          },
          success: '#25D366',
          warning: '#FFC107',
          error: '#DC3545',
          info: '#0DCAF0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'accenture': '0 4px 14px 0 rgb(var(--shadow-color) / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};