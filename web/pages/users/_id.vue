<template>
  <div>
    <v-toolbar color="transparent" dark flat>
      <v-btn @click="$router.go(-1)" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        <h2>User Details</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small v-on="on" icon>
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Help</v-card-title>
          <v-card-text>
            Some help
          </v-card-text>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-tabs 
      background-color="primary" 
      dark
      show-arrows
      v-model="tabs">
      <v-tab class="text-none">Profile</v-tab>
      <v-tab class="text-none">Media</v-tab>
      <v-tab class="text-none">Settings</v-tab>
    </v-tabs>
    <v-divider class="mb-10"></v-divider>

    <v-row 
      justify="center" 
      align="center">
      <v-col 
        lg="11" 
        md="11" 
        sm="12" 
        cols="12">
        <v-card min-height="30rem">
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <UserProfile />
            </v-tab-item>
            <v-tab-item>
              <UserMedia />
            </v-tab-item>
            <v-tab-item>
              <UserSettings />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserProfile from '@/components/users/UserProfile'
import UserMedia from '@/components/users/UserMedia'
import UserSettings from '@/components/users/UserSettings'

export default {
  head () {
    return {
      title: 'Nuxt Admin | User Details',
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('users/fetch', { 
      id: params.id 
    })
  },

  components: {
    UserProfile,
    UserMedia,
    UserSettings
  },

  data: () => ({
    tabs: 0,
    loading: false,
  }),
}
</script>