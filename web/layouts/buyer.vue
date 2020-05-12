<template>
  <v-app app>
    <v-app-bar app>
      <v-toolbar-title class="cursive">CaliShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn title="Your shopping cart" icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <span v-if="!$auth.loggedIn">
        <v-menu 
          :close-on-content-click="false"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-btn title="Login to CaliShop" v-on="on" icon>
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </template>
          <v-card min-width="400">
            <SignIn />
          </v-card>
        </v-menu>
      </span>
      <span v-else>
        Hello there user
      </span>
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
import SignIn from '@/components/auth/SignIn'

export default {
  components: {
    Snackbar,
    Footer,
    SignIn
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