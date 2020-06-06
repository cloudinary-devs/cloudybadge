import pkg from "./package";
const path = require("path");

export default {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href:
          "http://res.cloudinary.com/cloudinary/image/upload/f_auto,q_auto/v1/logo/for_black_bg/cloudinary_icon_for_black_bg",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap",
      },
    ],
    script: [
      { src: "https://widget.cloudinary.com/v2.0/global/all.js", body: true },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  // css: [
  //   '~/assets/css/tailwind.css'
  // ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "./plugins/vueToggle",
    "./plugins/cloudinary",
    "./plugins/vue-js-modal",
    "./plugins/i18n",
    "./plugins/global",
    "./plugins/vue-debounce",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/toast", "@nuxtjs/tailwindcss"],
  toast: {
    position: "bottom-center",
    singleton: true,
    duration: 5000,
    containerClass: "font-display",
  },
  axios: {
    baseURL: process.env.baseURL,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    dir: "dist",
    extractCSS: true,
    extend(config, ctx) {},
  },
  generate: {
    fallback: true,
  },
};
