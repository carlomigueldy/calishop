<template>
  <v-app app>
    <v-app-bar dense app>
      <v-toolbar-title 
        @click="$router.push({ name: 'index' })" 
        class="cursive"
        style="cursor: pointer">
        CaliShop
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        :to="{ name: 'cart' }" 
        title="Your shopping cart" 
        icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <span v-if="!$auth.loggedIn">
        <v-menu 
          v-model="loginMenu"
          :close-on-content-click="false"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-btn title="Login to CaliShop" v-on="on" icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-card min-width="400">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn @click="loginMenu = !loginMenu" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <SignIn @loggedIn="loginMenu = !loginMenu" />
          </v-card>
        </v-menu>
      </span>
      <span v-else>
        <v-menu 
          :close-on-content-click="false"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-btn title="Account" v-on="on" icon>
              <v-avatar>
                <v-img src="/aws.png"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Settings
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$auth.logout().then(() => loginMenu = false)">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Logout
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </span>
    </v-app-bar>

    <v-content>
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
  }),

  data: () => ({
    loginMenu: false
  })
}
</script>

<style scoped>
.cursive {
  font-family: 'Dancing Script', cursive;
}
</style>