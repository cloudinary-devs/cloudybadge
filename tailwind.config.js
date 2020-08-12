module.exports = {
  purge: {
    //enable remove unused CSS only in production
    enabled: process.env.NODE_ENV === "production",
    //any file that may contain the reference of CSS styles by class name.
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js",
    ],
  },
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        cloudinary: {
          default: "#0246b2",
          gray: "#333",
          darker: "#a3b0c9",
          darkest: "#002671",
          light: "#e9f2ff",
          black: "#00194b",
          green: "#1f9d55",
          pale: "#38a89d",
          pink: "#eb5286",
          indigo: "#6574cd",
          sunny: "#faad63",
          orange: "#DB8226",
          sea: "#6cb2eb",
          "indigo-dark": "#402861",
          "sea-light": "#19bbbe",
          transparent: "#a0aec0bd",
        },
        secondary: {
          50: "#F3F5F7",
          100: "#E7EAEF",
          200: "#C3CBD6",
          300: "#9FACBD",
          400: "#566D8C",
          500: "#0E2F5A",
          600: "#0D2A51",
          700: "#081C36",
          800: "#061529",
          900: "#040E1B",
        },
        primary: {
          50: "#F2F8FC",
          100: "#E6F1F8",
          200: "#BFDCEE",
          300: "#99C6E3",
          400: "#4D9CCF",
          500: "#0071BA",
          600: "#0066A7",
          700: "#004470",
          800: "#003354",
          900: "#002238",
        },
        colorize: {
          yellow: "#ecc94b",
          orange: "#ed8936",
          red: "#f56565",
          pink: "#ed64a6",
          purple: "#9f7aea",
          indigo: "#667eea",
          blue: "#4299e1",
          green: "#48bb78",
        },
      },
      gridTemplateRows: {
        "grid-card": "50px 1fr 1fr",
      },
      gridTemplateColumns: {
        "1-3": "auto 1fr",
      },
      fontSize: {
        default: "14px",
        md: "16px",
        lg: "18px",
        title: "32px",
      },
      lineHeight: {
        title: "1.8",
      },
      height: {
        fit: "fit-content",
      },
      width: {
        fit: "fit-content",
      },
    },
    fontFamily: {
      display: ["Montserrat", "sans-serif"],
      code: ["Courier"],
    },
  },
  variants: {
    display: ["responsive"],
  },
  plugins: [],
};
