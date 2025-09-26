/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS variables for theme switching
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--color-bg-secondary-rgb) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary-rgb) / <alpha-value>)',
        'border': 'rgb(var(--color-border-rgb) / <alpha-value>)',
        'primary': 'rgb(var(--color-primary-rgb) / <alpha-value>)',
        'primary-hover': 'rgb(var(--color-primary-hover-rgb) / <alpha-value>)',
        'success': 'rgb(var(--color-success-rgb) / <alpha-value>)',
        'warning': 'rgb(var(--color-warning-rgb) / <alpha-value>)',
        'error': 'rgb(var(--color-error-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
}