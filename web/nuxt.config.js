import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
    color: colors.lightBlue.darken4,
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
    // baseURL: 'https://cors-anywhere.herokuapp.com/https://childcare-management-system.herokuapp.com/'
    baseURL: 'http://api.dynuxtify.io/',
    // baseURL: 'http://api.hefesto.site/',
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
          logout: { url: '/api/auth/logout', method: 'get' },
          user: { url: '/api/auth/user', method: 'get', propertyName: false }
        },
        tokenType: 'Bearer',
        autoFetchUser: true
      }
    },

    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/dashboard',
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
        light: {
          primary: colors.red.darken4,
          // primary: colors.deepPurple.darken2,
          accent: colors.lightBlue.darken4,
          secondary: colors.grey.darken3,
          info: colors.blue,
          warning: colors.orange.darken1,
          error: colors.red.accent2,
          success: colors.green
        },
        dark: {
          primary: colors.red.darken4,
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
