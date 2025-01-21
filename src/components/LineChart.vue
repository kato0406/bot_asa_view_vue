<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart,
  Colors,
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
  // Colors,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
)

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const canvasRef = ref(null)

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, ?)`;
}

onMounted(() => {
  new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.data.labels,
      datasets: props.data.datasets.map(dataset => {
        const color = getRandomColor()

        return { ...dataset, ...{
            borderColor: color.replace('?', '.5'),
            backgroundColor: color.replace('?', '.2')
          }}
      })
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  })
})
</script>

<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
