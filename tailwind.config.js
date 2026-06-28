/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
        accent: {
          DEFAULT: "#F472B6",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
        },
        dark: {
          DEFAULT: "#0F172A",
          surface: "#1E293B",
          muted: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.25)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.25)",
        card: "0 4px 24px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 8px 40px rgba(15, 23, 42, 0.14)",
        float: "0 24px 64px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #E0F2FE 100%)",
        "violet-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
        "brand-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
        "brand-gradient-reverse":
          "linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
