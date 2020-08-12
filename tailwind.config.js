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
          orange: "#f96726",
          sea: "#6cb2eb",
          "indigo-dark": "#402861",
          "sea-light": "#19bbbe",
          transparent: "#a0aec0bd",
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
