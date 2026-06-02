/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',   // آبی آسمانی (اصلی)
          600: '#0284c7',   // آبی تیره‌تر برای دکمه‌ها
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'accent': {
          500: '#8b5cf6',   // بنفش ملایم برای هایلایت
          600: '#7c3aed',
        }
      },
      fontFamily: {
        'sans': ['Tahoma', 'Segoe UI', 'IranSans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}