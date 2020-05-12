<template>
  <div>
    <v-card :loading="loading" flat>
      <v-toolbar color="transparent" flat>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          label="Filter by characters"
          solo
          flat
          single-line
          hide-details
          clearable
        ></v-text-field>
        
        <!-- START date filter -->
        <v-dialog
          ref="dialog"
          v-model="dateFilter.dialog"
          :return-value.sync="dateFilter.dates"
          persistent
          width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              prepend-inner-icon="mdi-calendar"
              hide-details
              single-line
              v-model="dateFilterRangeText"
              label="Filter by dates"
              solo
              clearable
              readonly
              flat
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateFilter.dates" range scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateFilter.dialog = false">CANCEL</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(dateFilter.dates)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <!-- END date filter -->
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- START create user button -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn 
              text
              v-on="on"
              class="primary--text"
              v-if="showCreateBtn"
              outlined
              large>
              <v-icon small left>mdi-plus-circle-outline</v-icon>
              Create User
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="createDialog = !createDialog">
              <v-list-item-title>
                Quick create
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push({ name: 'users-create' })">
              <v-list-item-title>
                Go to create form
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- END create user button -->

        <v-btn 
          @click="reload()"
          :loading="refreshing" 
          icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <!-- START Others -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-card tile>
            <v-list dense>
              <slot name="actions" :selected-text="selectedText">
                <v-subheader>Actions {{ selectedText }}</v-subheader>
                <v-list-item-group>
                  <v-list-item @click="clearAllFilter()">
                    <v-list-item-content>
                      <v-list-item-title>Activate all selected</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="clearAllFilter()">
                    <v-list-item-content>
                      <v-list-item-title>Deactivate all selected</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="clearAllFilter()">
                    <v-list-item-content>
                      <v-list-item-title>Delete all selected</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </slot>

              <v-subheader>Export</v-subheader>
              <v-list-item-group>
                <v-list-item
                  @click="exportToCSV(items, title)">
                  <v-list-item-content>
                    <v-list-item-title>Export to CSV</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

              <v-subheader>Others</v-subheader>
              <v-list-item-group>
                <v-list-item @click="clearAllFilter()">
                  <v-list-item-content>
                    <v-list-item-title>Clear Filters</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
        <!-- END Others -->
      </v-toolbar>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :search="search"
        :items="items"
        :loading="refreshing"
        multi-sort
        show-select>
        <template v-slot:item.role.name="{ item }">
          <v-chip 
            dark
            label
            :color="item.role.color"
            v-text="capitalize(item.role.name)"
          ></v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn :to="{ name: `${route}-id`, params: { id: item.id } }" icon>
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn @click="remove(item.id)" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- START dialog quick create form -->
    <v-dialog 
      v-model="createDialog" 
      max-width="450"
      scrollable>
      <v-form @submit.prevent="$store.dispatch('users/create')
        .then(() => createDialog = !createDialog)">
        <v-card flat>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Create a User</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="createDialog = !createDialog" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <UserQuickFields />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              @click="createDialog = !createDialog"
              color="primary"
              text>
              CANCEL
            </v-btn>
            <v-btn 
              color="primary"
              type="submit" 
              text>
              SUBMIT
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- END dialog quick create form -->

    <!-- START nav drawer quick create form -->
    <v-navigation-drawer 
      :width="
        $vuetify.breakpoint.xl
        ? '700' 
        : $vuetify.breakpoint.lg || $vuetify.breakpoint.md 
        ? '450' 
        : '100%'"
      :right="true"
      :temporary="true"
      :touchless="true"
      app>
      <v-form @submit.prevent="$store.dispatch('users/create')
        .then(() => createDialog = !createDialog)">
        <v-card flat>
          <v-toolbar color="transparent" flat>
            <v-toolbar-title>Create a User</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="createDialog = !createDialog" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <UserQuickFields />
            <v-btn 
              class="text-uppercase mb-3"
              @click="createDialog = !createDialog"
              color="primary"
              block
              large
              text>
              Cancel
            </v-btn>
            <v-btn 
              block
              large
              class="text-uppercase"
              color="primary"
              type="submit" 
              depressed>
              Submit
            </v-btn>
          </v-card-text>
        </v-card>
      </v-form>
    </v-navigation-drawer>
    <!-- END nav drawer quick create form -->

    <!-- START delete dialog -->
    <v-dialog 
      v-model="deleteDialog" 
      max-width="350" 
      scrollable>
      <v-card>
        <v-toolbar color="transparent" flat>
          <v-toolbar-title 
            class="font-weight-regular">
            Delete Confirmation
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = !deleteDialog" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          Are you sure want to delete this user?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            class="red--text"
            @click="$store.dispatch('users/destroy', id)
            .then(() => deleteDialog = !deleteDialog )" 
            text>
            CONFIRM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- END delete dialog -->
  </div>
</template>

<script>
import UserQuickFields from '@/components/users/UserQuickFields'

export default {
  components: {
    UserQuickFields
  },
  
  props: {
    title: {
      type: String,
      default: () => 'Resource',
    },

    route: {
      type: String,
      default: () => 'users',
    },

    refreshAction: {
      type: String,
      default: () => 'users/fetchAll'
    },
    
    items: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: () => false,
    },

    showCreateBtn: {
      type: Boolean,
      default: () => false,
    }
  },

  computed: {
    dateFilterRangeText () {
      return this.dateFilter.dates.join(' ~ ')
    },

    selectedText () {
      return this.selected.length > 0 ? `(${this.selected.length} selected)` : ''
    }
  },

  data: () => ({
    id: null,
    deleteDialog: false,
    createDialog: false,
    refreshing: false,
    dateFilter: {
      dates: [],
      dialog: false,
    },
    maxDate: null,
    search: null,
    selected: [],
    headers: [
      {
        text: '#',
        value: 'id'
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Role',
        value: 'role.name',
      },
      {
        text: 'Created',
        value: 'created_at',
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
      },
    ],
    options: [
      {
        ref: 'pdf',
        title: 'Export to PDF',
        icon: 'mdi-file-pdf-outline',
      },
      {
        ref: 'csv',
        title: 'Export to CSV',
        icon: 'mdi-file-pdf-outline',
      },
      {
        ref: 'json',
        title: 'Export to JSON',
        icon: 'mdi-file-pdf-outline',
      },
    ],
  }),

  methods: {
    async reload() {
      this.refreshing = true
      await this.$store.dispatch(this.refreshAction)
      await setTimeout(async () => {
        this.refreshing = false
      }, 1000)
    },
    
    clearAllFilter() {
      this.search = null
      this.minDate = null
      this.maxDate = null
    },
    
    clearDateFilter() {
      this.minDate = null
      this.maxDate = null
    },

    remove(id) {
      this.id = id
      this.deleteDialog = !this.deleteDialog
    }    
  },
}
</script>