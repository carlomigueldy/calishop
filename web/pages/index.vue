<template>
  <div>
    <span class="bg"></span>
    <v-app app>
      <v-navigation-drawer
        class="elevation-10"
        :width="
          $vuetify.breakpoint.xl
          ? '700' 
          : $vuetify.breakpoint.lg || $vuetify.breakpoint.md 
          ? '450' 
          : '100%'"
        :value="true"
        :touchless="true"
        permanent
        :right="true"
        app>
        <v-container fill-height>
          <v-row 
            justify="center" 
            align="stretch">
            <v-col>
              <SignIn />
            </v-col>
          </v-row>
        </v-container>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
import SignIn from '@/components/auth/SignIn'

export default {
  auth: 'guest',

  head () {
    return {
      title: 'Nuxt Admin | Login',
    }
  },
  
  layout: 'empty',
  
  components: {
    SignIn,
  },
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") no-repeat center center;
  /* background: url("https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") no-repeat center center; */
  background-size: cover;
  background-color: black;
}
</style>