<template>
  <v-card outlined tile>
    <v-simple-table>
      <thead>
        <tr>
          <th>ITEM</th>
          <th>QUANTITY</th>
          <th>PRICE</th>
          <th>TOTAL</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(item, i) in products">
          <td>
            <v-card 
              class="ma-5"
              max-width="300" 
              max-height="300" 
              flat 
              tile>
              <v-img class="align-end" src="/aws.png">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0 primary"
                    align="center"
                    justify="center">
                    <v-progress-circular 
                      indeterminate 
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
                <v-card-title>
                  <v-chip label>
                    {{ item.name }}
                  </v-chip>
                </v-card-title>
              </v-img>
            </v-card>
          </td>
          <td>
            <v-text-field
              type="number"
              v-model="item.quantity"
              hide-details
              dense
              outlined
            ></v-text-field>
          </td>
          <td v-text="moneyFormat(item.price)"></td>
          <td v-text="moneyFormat(item.quantity * item.price)"></td>
          <td>
            <v-btn icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    products: [
      {
        name: "Wooden Gymnastic Rings",
        quantity: 3,
        price: 1500
      },
      {
        name: "Wooden Paralletes",
        quantity: 1,
        price: 750
      },
      {
        name: "Magnesium Chalk",
        quantity: 5500,
        price: 30
      }
    ]
  })
}
</script>

<style scoped>
.v-text-field--outlined {
  border-radius: 0;
}
</style>