<script setup>
import { axios } from '@/utils/axios.js'
import { onBeforeMount, ref } from 'vue'
import { dayjs } from '@/utils/day.js'
import UpArrowIcon from '@/components/UpArrowIcon.vue'
import DownArrowIcon from '@/components/DownArrowIcon.vue'

const users = ref([])
const issueCountLogs = ref([])
const date = ref(dayjs().lastMonday().format('YYYY-MM-DD'))
const sorts = ref({
  assign_count: null,
  resolve_count: null,
  expire_count: null,
  change_count: null,
  add_count: null,
  close_count: null
})

const getIssueLogs = async () => {
  const response = await axios.get('', {
    params: {
      route: 'issue_count_logs.date',
      date: date.value
    }
  })

  issueCountLogs.value = response.data.issue_count_logs
}

const sort = (column, isDesc) => {
  issueCountLogs.value = issueCountLogs.value.sort((a, b) => {
    if (isDesc) {
      return b[column] - a[column]
    }

    return a[column] - b[column]
  })

  sorts.value = {
    assign_count: null,
    resolve_count: null
  }
  sorts.value[column] = isDesc
}

onBeforeMount(async () => {
  const response = await axios.get('', {
    params: {
      route: 'users'
    }
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
        <th>
          担当チケット&nbsp;
          <DownArrowIcon v-if="sorts.assign_count" @click="sort('assign_count', false)" />
          <UpArrowIcon v-else @click="sort('assign_count', true)" />
        </th>
        <th>
          今週期限&nbsp;
          <DownArrowIcon v-if="sorts.due_week_count" @click="sort('due_week_count', false)" />
          <UpArrowIcon v-else @click="sort('due_week_count', true)" />
        </th>
        <th>
          処理済み&nbsp;
          <DownArrowIcon v-if="sorts.resolve_count" @click="sort('resolve_count', false)" />
          <UpArrowIcon v-else @click="sort('resolve_count', true)" />
        </th>
        <th>
          期限切れ&nbsp;
          <DownArrowIcon v-if="sorts.expire_count" @click="sort('expire_count', false)" />
          <UpArrowIcon v-else @click="sort('expire_count', true)" />
        </th>
        <th class="border-start">
          期限日変更&nbsp;
          <DownArrowIcon v-if="sorts.change_count" @click="sort('change_count', false)" />
          <UpArrowIcon v-else @click="sort('change_count', true)" />
        </th>
        <th>
          追加&nbsp;
          <DownArrowIcon v-if="sorts.add_count" @click="sort('add_count', false)" />
          <UpArrowIcon v-else @click="sort('add_count', true)" />
        </th>
        <th>
          消化&nbsp;
          <DownArrowIcon v-if="sorts.close_count" @click="sort('close_count', false)" />
          <UpArrowIcon v-else @click="sort('close_count', true)" />
        </th>
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
