<template>
  <v-container>
    <v-toolbar color="transparent" flat>
      <v-toolbar-title>
        <h1>Shopping Cart</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        color="primary" 
        large 
        depressed 
        tile>
        CHECKOUT
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row>
      <v-col
        lg="8"
        md="8"
        cols="12"
        sm="12">
        <ShoppingCart />
      </v-col>
      <v-col
        lg="4"
        md="4"
        sm="12"
        cols="12">
        <v-card min-height="500" outlined tile>
          <v-card-text>
            Shet
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import ShoppingCart from '@/components/cart/ShoppingCart'

export default {
  auth: false,

  layout: 'buyer',
  
  components: {
    ShoppingCart
  }
}
</script>