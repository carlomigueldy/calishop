<template>
  <div>
    <v-form @submit.prevent="login()">
      <v-card-text>
        <v-row justify="center" class="mb-5">
          <div class="text-center">
            <v-img 
              height="75"
              width="75"
              src="https://logo.clearbit.com/aws.com"
            ></v-img>
          </div>
        </v-row>
        <div class="title text-center mb-10">
          <div 
            class="font-weight-regular">
            Welcome to
          </div>
          <div class="display-2">
            CaliShop
          </div>
        </div>
        
        <v-text-field
          prepend-inner-icon="mdi-email-outline"
          :disabled="loggingIn"
          v-model="credentials.email"
          label="Email"
          solo
          flat
        ></v-text-field>
        <v-text-field
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          :disabled="loggingIn"
          v-model="credentials.password"
          type="password"
          solo
          flat
        ></v-text-field>

        <div class="text-center">
          <div 
            @click="$router.push({ name: 'register' })"
            class="mb-5 primary--text" 
            style="cursor: pointer">
            Forgot your password?
          </div>
          <div class="mb-2">
            <v-btn 
              @click="$router.push({ name: 'dashboard' })"
              width="250"
              :disabled="loggingIn"
              large
              depressed>
              Register
            </v-btn>
          </div>
          <div class="mb-2">
            <v-btn 
              type="submit"
              color="primary"
              width="250"
              :loading="loggingIn"
              large
              depressed>
              Sign In
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-form>
  </div>
</template>

<script>
import { getCartProducts } from '../../models/CartProduct'

export default {
  data: () => ({
    loggedIn: false,
    loggingIn: false,
    credentials: {
      email: '',
      password: '',
    },
  }),

  methods: {
    async login() {
      this.loggingIn = true
      try {
        await this.$auth.loginWith('local', {
          data: this.credentials
        })

        await this.$helpers.notify({
          type: 'success',
          message: 'You have logged in.',
        })
        
        this.loggingIn = false
        
        await this.$emit('loggedIn', true)
        await this.$store.dispatch('cart/fetchAll')

        if ( getCartProducts().length  > 0 ) {
          // sync the cart 
        }
      } catch (error) {
        console.log(error)
        this.loggingIn = false
      }
    },
  }
}
</script>