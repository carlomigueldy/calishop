<template>
  <div>
    <v-parallax src="https://images.pexels.com/photos/931325/pexels-photo-931325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
      <v-overlay :value="true" absolute>
        <div class="text-center">
          <v-text-field
            label="What training equipment are you looking for?"
            append-icon="mdi-magnify"
            @keyup.enter="search()"
            @click:append="search()"
            clearable
            solo
            light
          ></v-text-field>
          <div class="display-2">Calisthenics / Gymnastics equipment available</div>
        </div>
      </v-overlay>
    </v-parallax>
    
    <v-container>
      <v-row>
        <v-col 
          lg="3"
          md="3"
          sm="12"
          cols="12"
          v-for="(item, i) in 12"
          :key="i">
          <Product />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Product from '@/components/products/Product'

export default {
  layout: 'buyer',

  components: {
    Product,
  },

  methods: {
    search () {
      return this.$helpers.notify({
        type: "info",
        message: "Search results ready"
      })
    }
  }
}
</script>