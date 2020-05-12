<template>
  <v-alert 
    border="left"
    dense
    colored-border
    class="pa-0"
    :color="borderColor"
    elevation="2">
    <v-card color="transparent" flat>
      <v-card-title 
        class="font-weight-regular" 
        v-text="format === 'number'
          ? numberFormat(value) : 
          format === 'money' 
          ? moneyFormat(value) :
          null"
      ></v-card-title>
      <v-card-subtitle 
        v-if="!!title"
        v-text="title"
      ></v-card-subtitle>
    </v-card>
  </v-alert>
</template>

<script>
export default {
  props: {
    // Title of the card
    title: {
      type: String,
      default: () => 'Title',
    },

    // Subtitle of the card
    subtitle: {
      type: String,
    },
    
    // The value of the count
    value: {
      type: Number,
      default: () => 0,
    },

    // Border color for the card
    borderColor: {
      type: String,
      default: () => 'primary',
    },

    // Allows number and money format
    format: {
      type: String,
      default: () => 'number',
    },

    // Total time duration of the number animation
    duration: {
      type: Number,
      default: () => 1,
    },

    // The delay before the animation executes
    delay: {
      type: Number,
      default: () => 0,
    },
  },

  methods: {
    // The default format for the number animation component
    // Reference: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    numberFormat(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>