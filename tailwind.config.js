/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#FFF1E6',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#FB923C', // Secondary Orange
          500: '#F97316', // Primary Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        brand: {
          bg: '#FFFFFF',
          bgLight: '#FFFDF9',
          text: '#202020',
          textMuted: '#6B6B6B',
          border: '#EDEDED',
          success: '#22c55e'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'scan': 'scan 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '95%' },
        }
      }
    },
  },
  plugins: [],
}
