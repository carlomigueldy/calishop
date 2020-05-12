/**
 * Usage:
 * 
 * <doughnut-chart :chartdata="chartData" :options="chartOptions"/>
 */

import { Doughnut } from 'vue-chartjs'
import colors from 'vuetify/es5/util/colors'

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: () => ({
        labels: [
          'Active',
          'Inactive'
        ],
        datasets: [
          {
            backgroundColor: [colors.amber.accent1, colors.deepPurple.accent4],
            data: [
              generateNumber(),
              generateNumber(),
            ]
          },
        ]
      })
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}

const generateNumber = () => Math.round((Math.random() * 100))