<template>
  <div>
    <v-card height="100%">
      <v-card-text>
        <line-chart 
          v-if="type === 'line'"
          :height="height" 
          :chartdata="chartData" 
        ></line-chart>
        <bar-chart 
          v-else-if="type === 'bar'"
          :height="height" 
          :chartdata="chartData" 
        ></bar-chart>
        <pie-chart 
          v-else-if="type === 'pie'"
          :height="height" 
          :chartdata="chartData" 
        ></pie-chart>
        <doughnut-chart 
          v-else-if="type === 'doughnut'"
          :height="height" 
          :chartdata="chartData" 
        ></doughnut-chart>
        <div v-else>No type was specified</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title 
        class="font-weight-regular">
        <span v-text="title"></span>
        <v-spacer></v-spacer>
        <v-btn 
          :disabled="loading"
          @click="refresh(storeMethod)" 
          icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="exportData()">
              <v-list-item-title>
                Export to PDF
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportData()">
              <v-list-item-title>
                Export to CSV
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportData()">
              <v-list-item-title>
                Export to JSON
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle
        v-text="subtitle"
      ></v-card-subtitle>

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
  </div>
</template>

<script>
import LineChart from '@/components/charts/chartjs/LineChart.js'
import BarChart from '@/components/charts/chartjs/BarChart.js'
import PieChart from '@/components/charts/chartjs/PieChart.js'
import DoughnutChart from '@/components/charts/chartjs/DoughnutChart.js'

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
    DoughnutChart
  },
  
  props: {
    // Card title
    title: {
      type: String,
      default: () => 'Overview'
    },

    // Card subtitle
    subtitle: {
      type: String,
      default: () => 'Monthly sales information'
    },

    // Chart type
    type: {
      type: String,
      default: () => 'line',
    },

    // Chart height
    height: {
      type: Number,
      default: () => 260
    },

    // Chart properties
    chartData: {
      type: Object,
      default: () => ({})
    },

    // Chart properties
    chartOptions: {
      type: Object,
      default: () => ({})
    },

    // Method name and namespace from vuex
    // e.g. 'users/fetchAll'
    storeMethod: {
      type: String,
      default: () => ''
    }
  },

  data: () => ({
    loading: false,
  }),

  methods: {
    async refresh(storeMethod) {
      if (storeMethod) {
        this.loading = true

        await this.$store.dispatch(storeMethod)
        await setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    },

    exportData() {
      // 
    }
  }
}
</script>