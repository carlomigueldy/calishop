<template>
  <v-app app>
    <v-content class="primary" app>
      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col>
            <v-alert 
              border="left"
              colored-border
              type="error"
              elevation="2"
              color="red lighten-1">
              <v-card-text>
                <h1 v-if="error.statusCode === 404">
                  {{ pageNotFound }}
                </h1>
                <h1 v-else>
                  {{ otherError }}
                </h1>
              </v-card-text>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },

  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
