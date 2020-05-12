/**
 * Usage:
 * 
 * <bar-chart :chartdata="chartData" :options="chartOptions"/>
 */

import { Bar } from 'vue-chartjs'
import colors from 'vuetify/es5/util/colors'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: () => ({
        labels: [
          'Month 1',
          'Month 2',
          'Month 3',
          'Month 4',
        ],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: colors.deepOrange.darken2,
            data: [
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
            ]
          },
          {
            label: 'Leads',
            backgroundColor: colors.blue.lighten3,
            data: [
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
            ]
          }
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