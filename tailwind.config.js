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
        background: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        surface: {
          DEFAULT: '#f9fafb',
          dark: '#1f2937',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#374151',
        },
        text: {
          DEFAULT: '#111827',
          dark: '#f3f4f6',
        },
        muted: '#6b7280',
        primary: {
          DEFAULT: '#0ea2e9',
          hover: '#0288d1',
        },
      },
    },
  },
  plugins: [],
}