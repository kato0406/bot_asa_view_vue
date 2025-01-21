<script setup>
import { axios } from '@/utils/axios.js'
import { onBeforeMount, ref } from 'vue'
import {dayjs} from '@/utils/day.js'

const users = ref([])
const issueCountLogs = ref([])
const date = ref(dayjs().lastMonday().format('YYYY-MM-DD'))

const getIssueLogs = async () => {
  const response = await axios.get('', {
    params: {
      route: 'issue_count_logs.date',
      date: date.value,
    },
  })

  issueCountLogs.value = response.data.issue_count_logs
}

onBeforeMount(async () => {
  const response = await axios.get('', {
    params: {
      route: 'users',
    },
  })

  users.value = response.data.users
})
</script>

<template>
  <div class="row mb-3">
    <div class="col-4">
      <label for="date" class="form-label">日付</label>
      <input id="date" type="date" class="form-control" v-model="date" />
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-4 offset-4 text-center">
      <button type="button" @click="getIssueLogs" class="btn btn-primary">表示</button>
    </div>
  </div>

    <table v-if="issueCountLogs.length" class="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th class="text-center" colspan="4">定点観測</th>
          <th class="text-center border-start" colspan="3">差分観測</th>
        </tr>
        <tr>
          <th>担当者名</th>
          <th>担当チケット</th>
          <th>今週期限</th>
          <th>処理済み</th>
          <th>期限切れ</th>
          <th class="border-start">期限日変更</th>
          <th>追加</th>
          <th>消化</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(issueLog, index) in issueCountLogs" :key="index">
          <th>{{ issueLog.name }}</th>
          <td>{{ issueLog.assign_count }}</td>
          <td>{{ issueLog.due_week_count }}</td>
          <td>{{ issueLog.resolve_count }}</td>
          <td>{{ issueLog.expire_count }}</td>
          <td class="border-start">{{ issueLog.change_count }}</td>
          <td>{{ issueLog.add_count }}</td>
          <td>{{ issueLog.close_count }}</td>
        </tr>
      </tbody>
    </table>
</template>
