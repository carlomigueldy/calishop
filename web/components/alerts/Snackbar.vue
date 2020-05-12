<template>
  <div>
    <v-snackbar 
      :bottom="bottom"
      :top="top"
      :right="right"
      :left="left"
      :timeout="timeout"
      v-model="show">
      <v-icon
        size="32"
        :color="type == 'success' 
          ? 'success' 
          : type == 'error'
          ? 'error'
          : type == 'info' 
          ? 'blue' 
          : '' "
        v-text="type == 'success' 
          ? 'mdi-check-circle' 
          : type == 'error'
          ? 'mdi-alert-circle'
          : type == 'info' 
          ? 'mdi-alert-circle-outline' 
          : '' "
        left
      ></v-icon>
      {{ message }}
      <v-btn 
        dark 
        icon>
        <v-icon 
          small
          @click="show = false">
          mdi-close
        </v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
  computed: {
    ...mapFields('alerts', [
      'show',
      'message',
      'color',
      'type',
      'position.bottom',
      'position.top',
      'position.right',
      'position.left',
      'timeout',
    ])
  },
}
</script>