<template>
  <v-app app>
    <AuthNav 
      :toolbarColor="pageTheme"
      :toolbarDark="isDark"
    />

    <v-content app>
      <div :class="`skewed ${pageTheme}`"></div>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <Snackbar />
  </v-app>
</template>

<script>
import AuthNav from '@/components/layouts/AuthNav'
import Snackbar from '@/components/alerts/Snackbar'

export default {
  components: {
    AuthNav,
    Snackbar
  },

  computed: {
    pageTheme() {
      const defaultTheme = 'primary'
      const theme = this.getTheme(this.$route.name)

      if (theme == null) {
        this.isDark = true
        return defaultTheme
      }

      return theme
    },
  },

  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  },

  data: () => ({
    isDark: false,
  }),

  methods: {
    getTheme (route) {
      let theme
      
      if (route == 'dashboard') {
        this.isDark = true
        theme = 'primary'
        return theme
      } 
      
      this.isDark = true
      theme = 'primary'

      return theme
    },
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

/* NAME: Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.app-background {
  width: 100%;
  height: 25rem;
  /* background-color: #1976d2; */
  position: absolute;
}

.skewed {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 40rem;
  /* background: #2c3e50; */
  z-index: 0;
  transform: skewY(10deg);
  transform-origin: top right;
}
</style>
