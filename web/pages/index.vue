<template>
  <div>
    <v-parallax src="https://images.pexels.com/photos/931325/pexels-photo-931325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
      <v-overlay :value="true" absolute>
        <v-container fluid>
          <v-row>
            <v-col>
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
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
    </v-parallax>
    
    <v-container>
      <v-row v-if="!fetching">
        <v-col 
          lg="3"
          md="3"
          sm="12"
          cols="12"
          v-for="(item, i) in products"
          :key="i">
          <product
            :src="item.img"
            :name="item.name"
            :subtitle="item.small_description"
            :price="item.price"
          ></product>
        </v-col>
      </v-row>
      <div v-else class="d-flex justify-center align-center fill-height" style="height: 30rem">
        <div class="text-center">
          <v-progress-circular 
            size="64"
            indeterminate 
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Product from '@/components/products/Product'

export default {
  layout: 'buyer',

  data: () => ({
    fetching: false,
    products: []
  }),

  async fetch() {
    this.fetching = true
    
    this.products = await this.$axios.$get('http://dev.carlomigueldy.io/products.json')

    await setTimeout(async () => {
      this.fetching = false
    }, 1500)
  },

  components: {
    Product,
  },

  methods: {
    async search () {
      this.fetching = true
      
      await setTimeout(async () => {
        this.fetching = false
      }, 3000)
      
      return await this.$helpers.notify({
        type: "info",
        message: "Search results ready"
      })
    }
  }
}
</script>