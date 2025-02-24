<script setup>
import { axios } from '@/utils/axios.js'
import { onBeforeMount, ref } from 'vue'
import LineChart from '@/components/LineChart.vue'
import { dayjs } from '@/utils/day.js'
import _ from 'lodash'

const statuses = ['担当チケット', '今週期限', '処理済み', '期限切れ', '期限日変更', '追加', '消化']
const users = ref([])
const userName = ref()
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
      route: 'issue_count_logs.user',
      from_date: fromDate.value,
      to_date: toDate.value,
    },
  })

  const labels = []
  const datasets = []
  const issueCountLogs = response.data.issue_count_logs.filter(
    (issueCountLog) => issueCountLog.user_name === userName.value,
  )

  statuses.forEach((status) => {
    datasets.push({
      label: status,
      data: _.map(issueCountLogs, getStatusColumn(status)),
    })
  })

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
  const response = await axios
    .get('', {
      params: {
        route: 'users',
      },
    })
    .catch((error) => console.log(error))

  users.value = response.data.users
  userName.value = users.value[0].name

  await getIssueLogs()
})
</script>

<template>
  <div class="row mb-3">
    <div class="col-4">
      <label for="date" class="form-label">担当者</label>
      <select @change="getIssueLogs" class="form-control" v-model="userName">
        <option v-for="user in users" :key="user.id">{{ user.name }}</option>
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
      チケット件数の推移を確認し、件数が高いまま変わっていなかったり、上昇傾向にある場合は指摘する<br />
      ※チャートの上の項目を押すと対象のデータを非表示に出来ます
    </figcaption>
    <LineChart :key="chartData" :data="chartData" />
  </figure>
</template>
