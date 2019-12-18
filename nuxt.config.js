import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://widget.cloudinary.com/v2.0/global/all.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "./plugins/cloudinary"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.baseURL || 'http://localhost:3000'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    dir: 'public',
    extend(config, ctx) {
    }
  },
  generate: {
    dir: "public"
  },
  env: {
    uploadPreset: process.env.CLOUDYBADGE_UPLOAD_PRESET,
    uploadFolder: process.env.CLOUDYBADGE_UPLOAD_FOLDER,
    cloudName: process.env.CLOUDYBADGE_CLOUDNAME,
  }
}
