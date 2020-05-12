<template>
  <div>
    <v-toolbar color="transparent" dark flat>
      <v-toolbar-title>
        <h2>Users</h2>
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
      <v-tab class="text-none">Active</v-tab>
      <v-tab class="text-none">Inactive</v-tab>
      <v-tab class="text-none">Archived</v-tab>
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
              <data-table-component 
                title="Active Users"
                route="users"
                refresh-action="users/fetchAll"
                :items="$store.getters['users/activeUsers']"
                :loading="loading"
                :show-create-btn="true"
              ></data-table-component>
            </v-tab-item>
            <v-tab-item>
              <data-table-component 
                title="Inactive Users"
                route="users"
                refresh-action="users/fetchAllDeactivated"
                :items="$store.getters['users/inactiveUsers']"
                :loading="loading"
              ></data-table-component>
            </v-tab-item>
            <v-tab-item>
              <data-table-component 
                title="Archived Users"
                route="users"
                refresh-action="users/fetchAllArchived"
                :items="$store.getters['users/archivedUsers']"
                :loading="loading">
                <template v-slot:actions="{ selectedText }">
                  <v-subheader>Actions {{ selectedText }}</v-subheader>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Permanently delete all selected</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </template>
              </data-table-component>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DataTableComponent from '@/components/users/DataTable'
import axios from 'axios'

export default {
  head () {
    return {
      title: 'Nuxt Admin | Users',
    }
  },

  components: {
    DataTableComponent,
  },

  created() {
    this.fetchAll()
  },

  methods: {
    async fetchAll() {
      this.loading = true
      
      await Promise.all([
        this.$store.dispatch('users/fetchAll'),
        this.$store.dispatch('users/fetchAllArchived')
      ])
      
      await setTimeout(async () => {
        this.loading = false
      }, 1000)
    }
  },

  data: () => ({
    tabs: 0,
    loading: false,
  }),
}
</script>