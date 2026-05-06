/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dbe7ff',
          200: '#bcd2ff',
          300: '#8eb1ff',
          400: '#5a86ff',
          500: '#3563ff',
          600: '#1f44f5',
          700: '#1a35d8',
          800: '#1c2faf',
          900: '#1d2c89',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        ink: {
          900: '#0a1020',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
          500: '#64748b',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(2, 6, 23, 0.25)',
        card: '0 4px 20px -2px rgba(2, 6, 23, 0.10)',
        glow: '0 0 40px -8px rgba(53, 99, 255, 0.45)',
        'glow-lg': '0 0 80px -10px rgba(53, 99, 255, 0.55)',
        'glow-accent': '0 0 50px -10px rgba(217, 70, 239, 0.45)',
        'inner-glow': 'inset 0 0 20px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'mesh-light':
          'radial-gradient(at 0% 0%, rgba(53,99,255,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(217,70,239,0.16) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(56,189,248,0.16) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(99,102,241,0.16) 0px, transparent 50%)',
        'mesh-dark':
          'radial-gradient(at 0% 0%, rgba(53,99,255,0.25) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(217,70,239,0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(56,189,248,0.18) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(99,102,241,0.18) 0px, transparent 50%)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-15px) translateX(8px)' },
          '66%': { transform: 'translateY(8px) translateX(-8px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shimmer: {
          '0%': { 'background-position': '-1000px 0' },
          '100%': { 'background-position': '1000px 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%, 100%': { 'box-shadow': '0 0 20px -5px rgba(53,99,255,0.4)' },
          '50%': { 'box-shadow': '0 0 40px -5px rgba(53,99,255,0.8)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 500ms ease-out both',
        'fade-in-down': 'fade-in-down 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-left': 'slide-in-left 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'bounce-soft': 'bounce-soft 2.6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        tilt: 'tilt 6s ease-in-out infinite',
        'scroll-x': 'scroll-x 25s linear infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
