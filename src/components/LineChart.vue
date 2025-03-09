<template>
  <div v-if="isRole" :class="props.class">
    <div class="flex justify-between">
      <n-page-header title="Resumo Transações:" />
      <div class="flex justify-center items-center">
        <n-select class="h-4 w-32" v-model:value="selectedOption" :options="options" />
      </div>
    </div>
    <n-divider />
    <canvas id="chart"></canvas>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { AcessAPI } from '@/boot/API'
import Chart from 'chart.js/auto'
import moment from 'moment/moment'

const isRole =
  localStorage.getItem('role') === 'undefined' || localStorage.getItem('role') === 'Funcionario'
    ? false
    : true
const props = defineProps(['class'])
let chartInstance = null

const options = [
  { label: '7 Dias', value: '7' },
  { label: '1 Mês', value: '30' },
  { label: '1 Ano', value: '365' }
]

// Valor selecionado no select
const selectedOption = ref(options[0].value)

const loadChartData = async (days) => {
  const today = new Date()
  today.setDate(today.getDate() - days)
  const dataRequest = moment(today).format('y-M-D')
  const { data } = await AcessAPI.get(
    `consolidation/transactions/sales-per-month?start_date=${dataRequest}`
  )
  const ctx = document.getElementById('chart').getContext('2d')

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: 'Pix In',
          data: data.map((item) => item.balance_in),
          backgroundColor: '#da461a',
          borderColor: '#da461a',
          borderWidth: 3
        },
        {
          label: 'Saída',
          data: data.map((item) => item.balance_out),
          backgroundColor: '#486a14',
          borderColor: '#486a14',
          borderWidth: 3
        },
        {
          label: 'Boleto',
          data: data.map((item) => item.balance_boleto),
          backgroundColor: '#789fbe',
          borderColor: '#789fbe',
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            padding: 25
          }
        }
      }
    }
  })
}

// Carregar o gráfico quando o componente for montado
onMounted(() => {
  loadChartData(selectedOption.value)
})

watch(selectedOption, (newVal) => {
  loadChartData(newVal) // Atualizar gráfico com o novo valor selecionado
})

// Limpar o gráfico quando o componente for desmontado
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>