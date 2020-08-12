import pkg from "./package";

export default {
  mode: "spa",
  components: true,
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
   ** Plugins to load before mounting the App
   */
  plugins: [
    "./plugins/vueToggle",
    "./plugins/vue-js-modal",
    "./plugins/global",
    "./plugins/vue-debounce",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "@nuxtjs/cloudinary",
    "nuxt-i18n",
    "nuxt-clipboard2",
  ],
  buildModules: ["@nuxtjs/tailwindcss"],
  toast: {
    position: "bottom-center",
    singleton: true,
    duration: 5000,
    containerClass: "font-display",
  },
  axios: {
    baseURL: process.env.baseURL,
  },
  cloudinary: {
    cloudName: process.env.CLOUDNAME,
    privateCDN: false,
  },
  i18n: {
    defaultLocale: "en",
    vueI18n: {
      locale: "en",

      // Set the fallback locale in case the current locale can't be found
      fallbackLocale: "en",

      // Associate each locale to a content file
      messages: {
        en: require("./locales/en.json"),
      },
    },
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
    fallback: "404.html",
  },
  purgeCSS: {
    whitelist: [
      "bg-cloudinary-pink",
      "bg-cloudinary-pale",
      "bg-cloudinary-indigo",
      "bg-cloudinary-sunny",
      "bg-cloudinary-sea",
    ],
  },
};
