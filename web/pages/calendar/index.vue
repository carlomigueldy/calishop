<template>
  <div>
    <v-toolbar color="transparent" dark flat>
      <v-toolbar-title>
        <h2>Calendar</h2>
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

    <v-row
      justify="center"
      align="center">
      <v-col
        lg="11"
        md="11"
        sm="12"
        cols="12">
        <v-card>
          <v-card-text>
            <Calendar/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Calendar from '@/components/calendar/Calendar'

export default {
  head () {
    return {
      title: 'Nuxt Admin | Calendar',
    }
  },
  
  components: {
    Calendar,
  }
}
</script>

<style>

</style>