<template>
  <div>
    <v-toolbar color="transparent" dark flat>
      <v-toolbar-title>
        <h2>Dashboard</h2>
      </v-toolbar-title>
    </v-toolbar>
    
    <v-row justify="center" align="center">
      <v-col lg="11" md="11" sm="12" cols="12">
        <v-row>
          <v-col>
            <Count 
              title="Users"
              border-color="cyan" 
              :value="103"
            />
          </v-col>
          <v-col>
            <Count 
              title="Leads"
              border-color="red" 
              format="money"
              :value="45155"
            />
          </v-col>
          <v-col>
            <Count 
              title="Sales"
              border-color="orange" 
              format="money"
              :value="80445"
            />
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col lg="12" md="12" sm="12" cols="12">
            <CardChart 
              type="line" 
              storeMethod="sales/fetchAll" 
              title="Monthly Sales"
              subtitle="The total amount of sales per month"
              :chartData="monthlySalesData"
            />
          </v-col>
        </v-row>

        <v-divider class="mb-10"></v-divider>

        <v-row class="mb-10">
          <v-col lg="6" md="6" sm="12" cols="12">
            <CardChart 
              type="doughnut" 
              storeMethod="users/fetchAll" 
              title="Monthly Users"
              subtitle="The total number of active monthly users"
              :chartData="userStatusData"
            />
          </v-col>
          <v-col lg="6" md="6" sm="12" cols="12">
            <CardChart 
              type="line" 
              storeMethod="users/fetchAll" 
              title="Monthly Users"
              subtitle="The total number of active monthly users"
              :chartData="monthlyUsersData"
            />
          </v-col>
        </v-row>

        <v-divider class="mb-10"></v-divider>

        <v-row class="mb-10">
          <v-col>
            <Map />
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import Count from '@/components/reporting/Count'
import LineChart from '@/components/charts/chartjs/LineChart.js'
import BarChart from '@/components/charts/chartjs/BarChart.js'
import PieChart from '@/components/charts/chartjs/PieChart.js'
import DoughnutChart from '@/components/charts/chartjs/DoughnutChart.js'
import CardChart from '@/components/charts/CardChart'
import Map from '@/components/leaflet/Map'
import colors from 'vuetify/es5/util/colors'

export default {
  head () {
    return {
      title: 'Nuxt Admin | Dashboard',
    }
  },
  
  components: {
    Count,
    LineChart,
    BarChart,
    PieChart,
    DoughnutChart,
    CardChart,
    Map
  },

  data: () => ({
    monthlyUsersData: {
      labels: [
        'Month 1',
        'Month 2',
        'Month 3',
        'Month 4',
        'Month 5',
        'Month 6',
        'Month 7',
        'Month 8',
        'Month 9',
        'Month 10',
      ],
      datasets: [
        {
          label: 'Active',
          backgroundColor: colors.blue.darken2, 
          data: [103, 105, 115, 122, 112, 104, 90, 108, 111, 106]
        },
        {
          label: 'Inactive',
          backgroundColor: colors.grey.darken2,
          data: [3, 5, 5, 22, 2, 4, 9, 8, 5, 6]
        }
      ]
    }, 

    userStatusData: {
      labels: ['Active', 'Inactive'],
      datasets: [
        {
          backgroundColor: [colors.blue.darken2, colors.grey.darken2],
          data: [1024, 18]
        },
      ]
    },

    monthlySalesData: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Sales',
          backgroundColor: colors.green.lighten1,
          data: [1033, 5105, 6115, 6122, 6112, 5104, 4590, 4108, 4111, 5106, 6599, 7855]
        },
      ]
    },
  })
}
</script>