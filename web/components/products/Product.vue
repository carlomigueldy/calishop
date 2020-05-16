<template>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      min-height="15rem"
      height="100%"
      flat
      tile
      @click="addToCart(item)"
      :elevation="hover ? '5' : ''">
      <v-img 
        :src="item.img || '/aws.png'" 
        :aspect-ratio="16/9"
        height="200"
        class="align-end"
        style="cursor: pointer">
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0 secondary"
            align="center"
            justify="center">
            <v-progress-circular 
              indeterminate 
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-card-title>
          <v-chip color="primary" dark label>
            {{ moneyFormat(item.price) }}
          </v-chip>
        </v-card-title>
      </v-img>
      <v-card-title>
        <v-list-item-title>{{ item.name || 'Not specified' }}</v-list-item-title>
      </v-card-title>
      <v-card-subtitle>
        <v-list-item-subtitle>{{ item.small_description || 'No description available' }}</v-list-item-subtitle>
      </v-card-subtitle>

      <v-overlay
        :absolute="true"
        :opacity="0.5"
        :value="loading"
        z-index="0">
        <v-progress-circular
          indeterminate
          color="white"
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    
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
    },

    price: {
      type: Number,
      default: () => 0
    }
  },

  data: () => ({
    loading: false
  }),

  methods: {
    async addToCart(item) {
      this.loading = true
      await this.$store.dispatch('cart/add', item)

      await setTimeout(async () => {
        this.loading = false
      }, 1500)
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