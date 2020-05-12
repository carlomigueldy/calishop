<template>
  <v-card 
    dark
    tile 
    flat>
    <v-card-text>
      <v-container>
        <v-row 
          justify="center"
          align="center">
          <v-col>
            <div class="text-center">
              (C) 2020 - All rights reserved. 
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            lg="4"
            md="4"
            sm="12"
            cols="12">
            <v-list color="transparent">
              <v-list-item 
                :key="i" 
                v-for="(item, i) in social">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            lg="4"
            md="4"
            sm="12"
            cols="12">
            <v-list color="transparent">
              <v-list-item 
                :key="i" 
                v-for="(item, i) in sponsors">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            lg="4"
            md="4"
            sm="12"
            cols="12">
            <v-list color="transparent">
              <v-list-item 
                :key="i" 
                v-for="(item, i) in pages">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    social: [
      'Facebook',
      'Instagram',
      'Twitter',
      'Pinterest'
    ],

    sponsors: [
      'Patreon',
      'Bank de Oro',
      'Iligan Institute of Technology'
    ],

    pages: [
      'About',
      'Terms & Agreement'
    ]
  })
}
</script>