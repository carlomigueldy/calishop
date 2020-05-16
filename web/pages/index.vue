<template>
  <div>
    <v-parallax id="parallax" src="https://images.pexels.com/photos/931325/pexels-photo-931325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
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
    
    <v-container id="container">
      <v-row v-if="!fetching">
        <v-col 
          lg="3"
          md="3"
          sm="6"
          cols="12"
          v-for="(item, i) in products.data"
          :key="i">
          <Product :item="item" />
        </v-col>
        <v-pagination
          v-model="page"
          :length="products.meta.last_page"
          @input="paginate($event)"
        ></v-pagination>
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
    page: 1,
    fetching: false,
    products: []
  }),

  async created() {
    await Promise.all([
      this.fetchProducts(),
      this.$store.dispatch('cart/fetchAll')
    ])
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
    },

    async fetchProducts (endpoint = '/api/products') {
      try {
        this.fetching = true
    
        this.products = await this.$axios.$get(endpoint)
        // this.products = await this.$axios.$get(window.location.href + 'products.json')

        this.fetching = false
        // await this.$vuetify.goTo('#parallax')
      } catch (error) {
        console.log(error)
        return await this.$helpers.notify({
          type: "error",
          message: "There is something wrong. It's the system not you."
        })
      }
    },

    paginate(e) {
      console.log(e)
      this.fetchProducts(`/api/products?page=${e}`)
    }
  }
}
</script>
