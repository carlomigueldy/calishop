<template>
  <div>
    <v-card color="transparent" flat>
      <v-card-title>
        Items
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="overflow-y: auto; height: 50vh">
        <div v-if="noItems > 0">
          <v-card
            :key="i"
            class="mb-5"
            v-for="(item, i) in cart_products">
            <v-card-text>
              <v-row>
                <v-col
                  lg="5"
                  md="5"
                  sm="5"
                  cols="5">
                  <div class="d-flex justify-center align-center fill-height">
                    <v-img :src="item.product_img">
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
                    </v-img>
                  </div>
                </v-col>
                <v-col
                  lg="7"
                  md="7"
                  sm="7"
                  cols="7">
                  <v-row justify="space-around">
                    <v-col
                      lg="9"
                      md="9"
                      sm="9"
                      cols="9">
                      <v-chip class="title mb-3" dark label>{{ moneyFormat(item.price) }}</v-chip>
                    </v-col>
                    <v-col
                      lg="3"
                      md="3"
                      sm="3"
                      cols="3">
                      <v-btn icon>
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <div class="subtitle-2 mb-3 black--text">{{ item.product_name }}</div>
                  <v-text-field
                    v-model="item.quantity"
                    label="Quantity"
                    type="number"
                    hide-details
                    outlined
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        Subtotal ({{ noItems > 1 ? `${noItems} items` : `${noItems} item` }}): <div class="ml-3 headline">{{ moneyFormat(subTotal) }}</div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapMultiRowFields } from 'vuex-map-fields'

export default {
  computed: {
    subTotal () {
      if ( !(this.noItems > 0) ) {
        return 0
      }
      
      return this.cart_products.map(item => item.price * item.quantity).reduce((a, b) => a + b)
    },

    noItems () {
      return this.cart_products != null ? this.cart_products.length : 0
    },
    
    ...mapMultiRowFields('cart', [
      'cart_products'
    ])
  }
}
</script>