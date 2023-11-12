import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */

export default {
  content: ['index.html', './src/**/*.jsx', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary-100": "#0070C0",
        "primary-200": "#004E86",
        "primary-300": "#6EC3FF",
        "accent-100": "#FFC000",
        "accent-200": "#B38600",
        "text-100": "#333333",
        "text-200": "#737373",
        "bg-100": "#F5F5F5",
        "bg-200": "#E9E9E9",
        "bg-300": "#FFFFFF",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

