<template>
  <div>
    <v-toolbar color="transparent" dark flat>
      <v-toolbar-title>
        <h2>Playground</h2>
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
    
    <v-row justify="center" align="center">
      <v-col lg="11" md="11" sm="12" cols="12">

        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-simple-table>
                  <thead>
                    <th>Primary</th>
                    <th>Info</th>
                    <th>Secondary</th>
                    <th>Warning</th>
                    <th>Error</th>
                    <th>Accent</th>
                  </thead>
                  <tbody>
                    <td>
                      <v-btn 
                        color="primary">
                        Primary
                      </v-btn>
                    </td>
                    <td>
                      <v-btn 
                        color="info">
                        Info
                      </v-btn>
                    </td>
                    <td>
                      <v-btn 
                        color="secondary">
                        Secondary
                      </v-btn>
                    </td>
                    <td>
                      <v-btn 
                        color="warning">
                        Warning
                      </v-btn>
                    </td>
                    <td>
                      <v-btn 
                        color="error">
                        Error
                      </v-btn>
                    </td>
                    <td>
                      <v-btn 
                        color="accent">
                        Accent
                      </v-btn>
                    </td>
                  </tbody>
                </v-simple-table>            
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="font-weight-regular">SNACKBAR</v-card-title>
              <v-card-text>
                <v-btn 
                  @click="snackbar = !snackbar" 
                  text>
                  Snackbar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
      </v-col>
    </v-row>

    <v-snackbar 
      v-model="snackbar"
      color="white"
      class="black--text"
      multi-line>
      <v-icon>mdi-check</v-icon>
      <span>
        The snackbar has been checked.
      </span>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Nuxt Admin | Playground',
    }
  },

  data: () => ({
    snackbar: false,
  })
}
</script>