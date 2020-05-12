<template>
  <v-card flat>
    <v-toolbar-title>Overview</v-toolbar-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col
          lg="6"
          md="6"
          sm="12"
          cols="12">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ authorized ? 'Active' : 'Inactive' }}</v-list-item-title>
                <v-list-item-subtitle>Account Status</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
                <v-list-item-subtitle>Full Name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ email }}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ work_phone || 'Not specified' }}</v-list-item-title>
                <v-list-item-subtitle>Work Phone</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ home_phone || 'Not specified' }}</v-list-item-title>
                <v-list-item-subtitle>Home Phone</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ mobile_phone || 'Not specified' }}</v-list-item-title>
                <v-list-item-subtitle>Mobile Phone</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col
          lg="6"
          md="6"
          sm="12"
          cols="12">
          <v-checkbox
            label="Admin privileges"
            color="primary"
          ></v-checkbox>
          <v-checkbox
            label="Allow login"
            color="primary"
          ></v-checkbox>
          <v-checkbox
            label="Receive notifications"
            color="primary"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  computed: {
    ...mapFields('users', [
      'user.name',
      'user.email',
      'user.authorized',
      'user.work_phone',
      'user.home_phone',
      'user.mobile_phone'
    ])
  }
}
</script>