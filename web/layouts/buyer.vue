<template>
  <v-app app>
    <v-app-bar color="white" dense app>
        <!-- @click="$router.push({ name: 'index' })"  -->
      <v-toolbar-title 
        @click="loggedInDialog = !loggedInDialog"
        class="cursive"
        style="cursor: pointer">
        CaliShop
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        @click="cart = !cart"
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
            <SignIn @loggedIn="loggedIn()" />
          </v-card>
        </v-menu>
      </span>
      <span v-else>
        <v-menu 
          :close-on-content-click="false"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-btn title="Account" v-on="on" icon>
              <v-avatar size="35">
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

    <v-dialog v-model="loggedInDialog" scrollable max-width="450">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn @click="loggedInDialog = !loggedInDialog" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="d-flex justify-center align-center fill-height">
          <v-img src="/shopping.svg" max-height="250" max-width="250"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="loggedInDialog = !loggedInDialog" color="primary" text>START SHOPPING</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      v-model="cart"
      :hide-overlay="true"
      :touchless="true"
      temporary
      width="500"
      right
      app>
      <v-card color="transparent" tile flat>
        <v-toolbar dense color="transparent" flat>
          <v-toolbar-title>Shopping Cart</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="cart = !cart" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <ShoppingCartSide />
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-center">
          <v-btn 
            color="primary" 
            depressed 
            tile 
            large 
            min-width="15rem">
            CHECKOUT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import ShoppingCartSide from '@/components/cart/ShoppingCartSide'
import Snackbar from '@/components/alerts/Snackbar'
import Footer from '@/components/layouts/Footer'
import SignIn from '@/components/auth/SignIn'

export default {
  components: {
    ShoppingCartSide,
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
    cart: false,
    loginMenu: false,
    loggedInDialog: false
  }),

  methods: {
    loggedIn () {
      this.loginMenu = !this.loginMenu
      this.loggedInDialog = true
    }
  }
}
</script>

<style scoped>
.cursive {
  font-family: 'Dancing Script', cursive;
}
</style>