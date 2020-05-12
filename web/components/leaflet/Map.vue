<template>
  <v-card 
    height="25rem">
    <l-map
      class="map"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-control position="topright" >
        <v-btn 
          icon
          @click="refresh()"
          :loading="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn 
              icon
              v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="refresh()">
              <v-list-item-title>
                Refresh
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </l-control>
    </l-map>

    <v-overlay
      :absolute="true"
      :opacity="0.5"
      :value="loading"
      z-index="0">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    zoom: 3,
    center: [47.413220, -1.219482],
    bounds: null
  }),

  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },

    async refresh() {
      this.loading = true

      await setTimeout(() => {
        this.loading = false
      }, 1500)
    },

    exportData() {
      // 
    }
  }
}
</script>

<style scoped>
.map {
  height: 100%; 
  width: 100%; 
  z-index: 0
}
</style>