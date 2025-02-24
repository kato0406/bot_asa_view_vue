<script setup>
import { ref } from 'vue'
import DateView from '@/views/DateView.vue'
import UserView from '@/views/UserView.vue'
import StatusView from '@/views/StatusView.vue'
import SettingView from '@/views/SettingView.vue'

const currentTab = ref(1)
</script>

<template>
  <div class="container my-5">
    <header>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            @click="currentTab = 1"
            type="button"
            class="nav-link"
            :class="{ active: currentTab === 1 }"
            >日付指定</button>
        </li>
        <li class="nav-item">
          <button
            @click="currentTab = 2"
            type="button"
            class="nav-link"
            :class="{ active: currentTab === 2 }"
            >項目フィルタ</button>
        </li>
        <li class="nav-item">
          <button
            @click="currentTab = 3"
            type="button"
            class="nav-link"
            :class="{ active: currentTab === 3 }"
          >担当者フィルタ</button>
        </li>
        <li class="nav-item">
          <button
            @click="currentTab = 4"
            type="button"
            class="nav-link"
            :class="{ active: currentTab === 4 }"
          >設定</button>
        </li>
      </ul>
    </header>

    <main class="my-3">
      <div v-show="currentTab === 1">
        <DateView />
      </div>
      <div v-show="currentTab === 2">
        <StatusView />
      </div>
      <div v-show="currentTab === 3">
        <UserView />
      </div>
      <div v-show="currentTab === 4">
        <SettingView />
      </div>
    </main>
  </div>
</template>
