<template>
  <div v-if="isRole" class="m-2 bg-white shadow rounded p-5 md:p-4 col-span-3 row-span-8">
    <Bar v-if="chartData && chartData.labels.length" :data="chartData" :options="chartOptions" />
    <p v-else>Carregando gráfico...</p>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { AcessAPI } from '../boot/API'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Bar
  },

  setup() {
    return {
      isRole:
        localStorage.getItem('role') === 'undefined' ||
        localStorage.getItem('role') === 'Funcionario'
          ? false
          : true
    }
  },

  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Gráficos de Entradas por Mês (Boleto, Bolepix, PixIn)'
          }
        }
      }
    }
  },
  created() {
    this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await AcessAPI.get(
          'https://api.fastgivemoney.com/consolidation/transactions/sales-per-month-group-month'
        )
        this.chartData = response.data
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error)
      }
    }
  }
}
</script>