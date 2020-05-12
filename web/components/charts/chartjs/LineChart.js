/**
 * Usage:
 * 
 * <line-chart :chartdata="chartData" :options="chartOptions"/>
 */

import { Line } from 'vue-chartjs'
import colors from 'vuetify/es5/util/colors'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: () => ({
        labels: [
          'Week 1',
          'Week 2',
          'Week 3',
          'Week 4',
          'Week 5',
          'Week 6',
          'Week 7',
          'Week 8',
          'Week 9',
          'Week 10',
        ],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#f87979',
            data: [
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
            ]
          },
          {
            label: 'Leads',
            backgroundColor: 'blue',
            data: [
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
              generateNumber(),
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