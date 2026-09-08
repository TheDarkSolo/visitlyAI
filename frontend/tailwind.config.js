/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF8EE",
          100: "#FFEED2",
          200: "#FFDCA6",
          300: "#FFC26E",
          400: "#F9A94F",
          500: "#F6A94D",
          600: "#E8863A",
          700: "#C0430F",
          800: "#9A3410",
          900: "#7A2A0F",
        },
        ink: {
          50: "#F5F5F6",
          100: "#E8E9EB",
          200: "#C8CAD0",
          300: "#9CA0AB",
          400: "#6B707D",
          500: "#4A4F5C",
          600: "#383C47",
          700: "#2D3038",
          800: "#262A33",
          900: "#1A1D24",
          950: "#121318",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FBF3E7",
          200: "#F6E6CE",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(38, 42, 51, 0.06), 0 12px 32px -12px rgba(38, 42, 51, 0.12)",
        card: "0 1px 2px rgba(38, 42, 51, 0.04), 0 8px 24px -8px rgba(38, 42, 51, 0.10)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F9A94F 0%, #C0430F 100%)",
      },
    },
  },
  plugins: [],
};
