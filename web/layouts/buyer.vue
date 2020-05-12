<template>
  <v-app app>
    <v-app-bar app>
      <v-toolbar-title class="cursive">CaliShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Register</v-btn>
      <v-btn text>Sign In</v-btn>
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content app>
      <nuxt />
    </v-content>

    <Snackbar />

    <Footer />
  </v-app>
</template>

<script>
import Snackbar from '@/components/alerts/Snackbar'
import Footer from '@/components/layouts/Footer'

export default {
  components: {
    Snackbar,
    Footer
  },
  
  head: () => ({
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
      }
    ]
  })
}
</script>

<style scoped>
.cursive {
  font-family: 'Dancing Script', cursive;
}
</style>