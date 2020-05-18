import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'CaliShop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An online shop selling Calisthenics gear and equipments.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
    height: '3px',
    color: colors.blue.darken2,
    throttle: 0,
    continuous: true,
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  // layoutTransition: {
  //   name: 'fade',
  //   mode: 'out-in'
  // },

  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/mdi' },
    { src: '@/plugins/main' },
    { src: '@/plugins/helpers' },
    { src: '@/plugins/vue-leaflet' },
    { src: '@/plugins/vue-apex-charts' },
    { src: '@/plugins/vue-number-animation' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://cors-anywhere.herokuapp.com/https://calishop.herokuapp.com/'
    // baseURL: 'http://api.calishop.io/',
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'post', propertyName: false }
        },
        tokenType: 'bearer',
        autoFetchUser: true
      }
    },

    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: false,
    }
  },

  router: {
    middleware: 'auth',
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.deepPurple.darken4,
          accent: colors.lightBlue.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
}
