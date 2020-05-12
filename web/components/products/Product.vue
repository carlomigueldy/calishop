<template>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      min-height="15rem"
      :elevation="hover ? '10' : '3'">
      <v-img 
        :src="src" 
        :aspect-ratio="16/9"
        height="200"
        style="cursor: pointer"
        @click="$helpers.notify({
          type: 'info',
          message: 'v-card clicked'
        })">
      </v-img>
      <v-card-title>
        {{ name }}
        <v-spacer />
        <v-btn @click="$helpers.notify({
            type: 'info',
            message: 'v-btn clicked'
          })" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle v-text="subtitle"></v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text>Add to Cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: () => '/aws.png'
    },

    name: {
      type: String,
      default: () => 'Product Name'
    },

    subtitle: {
      type: String,
      default: () => 'A small description for the product.'
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>