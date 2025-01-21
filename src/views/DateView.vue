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
  close_count: null,
})

const backlogUrl =
  'https://valeur.backlog.jp/FindIssueAllOver.action?allOver=true&assignerId=?&limit=20&offset=0&order=false&projectId=48115&projectId=90404&projectId=92327&projectId=104575&projectId=106799&projectId=107506&projectId=111843&projectId=111905&projectId=125699&projectId=127836&projectId=127937&projectId=139380&projectId=143275&projectId=151827&projectId=154956&projectId=155794&projectId=162798&projectId=164065&projectId=167758&projectId=171237&projectId=180138&projectId=181438&projectId=181478&projectId=182111&projectId=193241&projectId=198448&projectId=200798&projectId=204913&simpleSearch=false&sort=LIMIT_DATE&startDate.unspecified=false&statusId=1&statusId=2&statusId=31203&statusId=31202&statusId=12560&statusId=31235&statusId=31217&statusId=31215&statusId=12586&statusId=31231&statusId=31213&statusId=6742&statusId=31229&statusId=13187&statusId=31233&statusId=31205&statusId=31211&statusId=11614&statusId=14696&statusId=31207&statusId=25109&statusId=25110&statusId=25108&statusId=25148&statusId=16364&statusId=31220&statusId=23368&statusId=25086&statusId=25088&statusId=31219&statusId=31237&statusId=27987&statusId=31367&statusId=32299&statusId=32747&statusId=32974&statusId=38629&statusId=43848&statusId=48521&statusId=50223&statusId=53166&statusId=51607&statusId=43839'

const getIssueLogs = async () => {
  const response = await axios.get('', {
    params: {
      route: 'issue_count_logs.date',
      date: date.value,
    },
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
    resolve_count: null,
  }
  sorts.value[column] = isDesc
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
      <tr v-for="(issueCountLog, index) in issueCountLogs" :key="index">
        <th>{{ issueCountLog.name }}</th>
        <td><a target="_blank" :href="backlogUrl.replace('assignerId=?', `assignerId=${issueCountLog.user_id}`)">{{ issueCountLog.assign_count }}</a></td>
        <td>{{ issueCountLog.due_week_count }}</td>
        <td>{{ issueCountLog.resolve_count }}</td>
        <td>{{ issueCountLog.expire_count }}</td>
        <td class="border-start">{{ issueCountLog.change_count }}</td>
        <td>{{ issueCountLog.add_count }}</td>
        <td>{{ issueCountLog.close_count }}</td>
      </tr>
    </tbody>
  </table>
</template>
