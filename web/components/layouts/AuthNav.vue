<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :color="color"
      :dark="dark"
      fixed
      app>
      <v-list>
        <v-list-item
          v-for="(item, i) in pages"
          :key="i"
          :to="{ name: item.route }"
          link>
          <v-list-item-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-btn
          class="ml-2"
          icon
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :color=toolbarColor
      :elevate-on-scroll="true"
      :dark="toolbarDark"
      fixed
      dense
      app>
      <v-btn
        icon
        @click="drawer = !drawer">
        <v-icon 
          v-text="drawer ? 'mdi-menu' : 'mdi-menu-open'"
        ></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />

      <v-spacer />

      <v-chip 
        v-if="$nuxt.isOffline"
        color="red darken-2"
        label 
        dark>
        <v-icon small left>mdi-alert-circle-outline</v-icon>
        You are offline
      </v-chip>

			<v-btn 
        v-if="!toggleSearch"
        @click="toggleSearch = !toggleSearch" 
        icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
      <v-col 
        v-else
        lg="5"
        md="6"
        sm="4"
        cols="6">
        <v-text-field
          placeholder="Search"
          @blur="toggleSearch = !toggleSearch"
          append-icon="mdi-magnify"
          hide-details
          clearble
        ></v-text-field>
      </v-col>

      <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn @click="notifDrawer = !notifDrawer" icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
			<v-menu style="z-index: 500" max-height="500" offset-y>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" icon>
						<v-avatar size="35">
							<v-img :src="avatar" />
						</v-avatar>
					</v-btn>
				</template>
				<v-card width="300">
					<v-list>
						
						<v-list-item>
							<v-list-item-content>
								<div class="text-center">
									<v-avatar size="90">
										<v-img :src="avatar"></v-img>
									</v-avatar>
                  <div v-if="$auth.loggedIn">
                    <div class="mt-5 title font-weight-regular">
                      {{ $auth.user.name || 'Not Specified' }}
                    </div>
                    <div class="subtitle-2 font-weight-regular">
                      {{ $auth.user.email || 'Not Specified' }}
                    </div>
                  </div>
                  <div v-else>
                    <div class="mt-5 title font-weight-regular">
                      You are not authenticated.
                    </div>
                  </div>
								</div>
							</v-list-item-content>
						</v-list-item>
						
						<v-divider></v-divider>

            <v-list-item 
              @click="$router.push({ name: item.route })"
              v-for="(item, i) in subpages" :key="i">
              <v-list-item-action>
                <v-icon small v-text="item.icon"></v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
						
						<v-list-item @click="logout()">
							<v-list-item-action>
								<v-icon small>mdi-logout</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>Logout</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
      
    </v-app-bar>

    <v-navigation-drawer
      v-model="notifDrawer"
      width="400"
      temporary
      right
      app>
      <v-toolbar 
        color="primary" 
        dark 
        dense>
        <v-toolbar-title>Alerts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          icon
          @click="notifDrawer = !notifDrawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    color: {
      type: String,
      default: () => 'blue-grey darken-4',
    },

    dark: {
      type: Boolean,
      default: () => true,
    },

    toolbarColor: {
      type: String,
      default: () => 'primary',
    },

    toolbarDark: {
      type: Boolean,
      default: () => true,
    }
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()

        await this.$helpers.notify({
          type: 'info',
          message: 'You have logged out.'
        })
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    ...mapGetters({
      user: 'GET_AUTH_USER'
    })
  },
  
	data: () => ({
		title: 'Management System',
		avatar: 'https://ui-avatars.com/api/?name=Carlo+Doe',
    clipped: false,
    drawer: true,
    miniVariant: false,
    toggleSearch: false,
    notifDrawer: false,
    pages: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        route: 'dashboard'
      },
      {
        icon: 'mdi-account-multiple',
        title: 'Users',
        route: 'users'
      },
      {
        icon: 'mdi-calendar-multiselect',
        title: 'Calendar',
        route: 'calendar',
      },
      {
        icon: 'mdi-chart-bell-curve',
        title: 'Reporting',
        route: 'reporting'
      },
      {
        icon: 'mdi-language-javascript',
        title: 'Playground',
        route: 'tinker'
      },
    ],
    subpages: [
      {
        icon: 'mdi-cog-outline',
        title: 'Settings',
        route: 'settings'
      },
    ],
  })
}
</script>