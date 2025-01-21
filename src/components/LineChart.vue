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
  Colors,
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

onMounted(() => {
  new Chart(canvasRef.value, {
    type: 'line',
    data: props.data,
  })
})
</script>

<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
