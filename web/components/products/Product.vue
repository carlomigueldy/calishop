<template>
  <div>
    <v-hover v-slot:default="{ hover }">
        <!-- @click="show" -->
      <v-card 
        min-height="15rem"
        height="100%"
        flat
        tile
        @mouseover="overlay = true"
        @mouseleave="overlay = false"
        :elevation="hover ? '5' : ''">
        <v-img 
          :src="item.img || '/aws.png'" 
          :aspect-ratio="16/9"
          height="200"
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
            <v-chip color="secondary" dark label>
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
          :value="false"
          z-index="0">
          <v-progress-circular
            indeterminate
            color="white"
            size="64"
          ></v-progress-circular>
        </v-overlay>

        <v-overlay
          :absolute="true"
          :opacity="0.5"
          :value="overlay"
          z-index="0">
          <v-btn 
            :disabled="recentlyAdded"
            @click="addToCart(item)" 
            :loading="loading"
            width="175" 
            color="primary"
            depressed
            tile>
            ADD TO CART
          </v-btn>
        </v-overlay>
      </v-card>
    </v-hover>
    <v-menu 
      v-model="menu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y>
      <v-list>
        <v-list-item @click="addToCart(item)">
          <v-list-item-title>
            Add to cart
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Add to wishlist
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
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
    recentlyAdded: false,
    overlay: false,
    loading: false,
    menu: false,
    x: 0,
    y: 0
  }),

  methods: {
    show (e) {
      e.preventDefault()
      this.menu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.menu = true
      })
    },
    
    async addToCart(item) {
      this.loading = true
      await this.$store.dispatch('cart/add', item)

      await setTimeout(async () => {
        this.recentlyAdded = true
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