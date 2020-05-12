<template>
  <v-app dark>
    <AuthNav 
      toolbarColor="grey lighten-4"
      :toolbarDark="false"
    />

    <v-content class="grey lighten-4" app>
      <v-container >
        <nuxt keep-alive />
        <div class="mb-10 pb-10"></div>
      </v-container>
    </v-content>

    <!-- <v-footer
      :fixed="true"
      max-height="30"
      inset
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import AuthNav from '@/components/layouts/AuthNav'

export default {
  components: {
    AuthNav
  },
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.app-background {
  width: 100%;
  height: 25rem;
  background-color: #1976d2;
}
</style>
