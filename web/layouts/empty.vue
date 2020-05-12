<template>
  <v-app>
    <nuxt />

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '@/components/alerts/Snackbar'

export default {
  components: {
    Snackbar,
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>