<script setup>
import { axios } from '@/utils/axios.js'
import { onBeforeMount, ref } from 'vue'
import LineChart from '@/components/LineChart.vue'
import { dayjs } from '@/utils/day.js'
import _ from 'lodash'

const statuses = ['担当チケット', '今週期限', '処理済み', '期限切れ', '期限日変更', '追加', '消化']
const status = ref(statuses[0])
const fromDate = ref(dayjs().lastMonday().subtract(4, 'week').format('YYYY-MM-DD'))
const toDate = ref(dayjs().lastMonday().format('YYYY-MM-DD'))
const chartData = ref({})

const changeFromDate = () => {
  if (dayjs(fromDate.value).day() !== 1) {
    alert('月曜日を指定してください')

    return
  }

  getIssueLogs()
}

const changeToDate = () => {
  if (dayjs(toDate.value).day() !== 1) {
    alert('月曜日を指定してください')

    return
  }

  getIssueLogs()
}

const getIssueLogs = async () => {
  if (dayjs(fromDate.value).day() !== 1 && dayjs(toDate.value).day() !== 1) {
    return
  }

  const response = await axios.get('', {
    params: {
      route: 'issue_count_logs.status',
      from_date: fromDate.value,
      to_date: toDate.value,
    },
  })

  const labels = []
  const datasets = []
  const users = Object.groupBy(response.data.issue_count_logs, ({ user_name }) => user_name)
  const column = getStatusColumn(status.value)

  for (const userName in users) {
    const issueCountLogs = users[userName]

    datasets.push({
      label: userName,
      data: _.map(issueCountLogs, column),
    })
  }

  let current = fromDate.value
  while (current !== dayjs(toDate.value).add(1, 'week').format('YYYY-MM-DD')) {
    labels.push(current)

    current = dayjs(current).add(1, 'week').format('YYYY-MM-DD')
  }

  chartData.value = {
    labels,
    datasets,
  }
}

const getStatusColumn = (status) => {
  switch (status) {
    case '担当チケット':
      return 'assign_count'
    case '今週期限':
      return 'due_week_count'
    case '処理済み':
      return 'resolve_count'
    case '期限切れ':
      return 'expire_count'
    case '期限日変更':
      return 'change_count'
    case '追加':
      return 'add_count'
    case '消化':
      return 'close_count'
  }
}

onBeforeMount(async () => {
  await getIssueLogs()
})
</script>

<template>
  <div class="row mb-3">
    <div class="col-4">
      <label for="date" class="form-label">項目</label>
      <select @change="getIssueLogs" class="form-control" v-model="status">
        <option v-for="status in statuses" :key="status">{{ status }}</option>
      </select>
    </div>
    <div class="col-4">
      <label for="date" class="form-label">日付</label>
      <input @change="changeFromDate" id="date" type="date" class="form-control" v-model="fromDate" />
    </div>
    <div class="col-4">
      <label for="date" class="form-label">日付</label>
      <input @change="changeToDate" id="date" type="date" class="form-control" v-model="toDate" />
    </div>
  </div>

  <figure v-if="Object.keys(chartData).length !== 0" class="figure w-100">
    <figcaption class="figure-caption fs-6">
      チケット件数の推移を確認し、件数が高いまま変わっていなかったり、上昇傾向にある人が居たら指摘する<br />
      ※チャートの上の名前を押すと対象のデータを非表示に出来ます
    </figcaption>
    <LineChart :key="chartData" :data="chartData" />
  </figure>
</template>
