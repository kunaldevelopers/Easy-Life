/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e5",
          500: "#2e7d32",
          600: "#28a745",
          700: "#1b5e20",
        },
        secondary: {
          300: "#81c784",
          400: "#66bb6a",
          500: "#4caf50",
        },
        accent: {
          50: "#fffef7",
          100: "#fffbeb",
          200: "#fef3c7",
          300: "#fcd34d",
          400: "#F0C14B",
          500: "#FFD700",
          600: "#d97706",
        },
        gray: {
          50: "#f9f9f9",
          100: "#f5f5f5",
          200: "#e0e0e0",
          800: "#333333",
          900: "#1b1b1b",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "DM Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2e7d32, #66bb6a)",
        "gradient-accent": "linear-gradient(135deg, #FFD700, #F0C14B)",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.1)",
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        hover: "0 8px 25px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
