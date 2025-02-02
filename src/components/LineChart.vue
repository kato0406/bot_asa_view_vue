<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
)

const colors = [
  'rgba(255, 0, 0, ?)',
  'rgba(0, 255, 0, ?)',
  'rgba(0, 0, 255, ?)',
  'rgba(255, 255, 0, ?)',
  'rgba(0, 255, 255, ?)',
  'rgba(255, 0, 255, ?)',
  'rgba(255, 165, 0, ?)',
  'rgba(128, 0, 128, ?)',
  'rgba(0, 128, 128, ?)',
  'rgba(255, 215, 0, ?)',
  'rgba(220, 20, 60, ?)',
  'rgba(127, 255, 0, ?)',
  'rgba(30, 144, 255, ?)',
  'rgba(0, 0, 0, ?)',
  'rgba(128, 128, 0, ?)',
  'rgba(106, 90, 205, ?)',
  'rgba(0, 255, 127, ?)',
  'rgba(160, 82, 45, ?)',
  'rgba(230, 230, 250, ?)',
  'rgba(245, 245, 245, ?)',
]

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const canvasRef = ref(null)

onMounted(() => {
  new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.data.labels,
      datasets: props.data.datasets.map((dataset, index) => {
        return {
          ...dataset,
          ...{
            borderColor: colors[index].replace('?', '.5'),
            backgroundColor: colors[index].replace('?', '.2'),
          },
        }
      }),
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  })
})
</script>

<template>
  <canvas ref="canvasRef" />
</template>
