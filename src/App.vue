<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="container my-5">
    <header>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'date' }"
            class="nav-link"
            :class="{ active: route.name === 'date' }"
            >日付指定</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'status' }"
            class="nav-link"
            :class="{ active: route.name === 'status' }"
            >項目フィルタ</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'user' }"
            class="nav-link"
            :class="{ active: route.name === 'user' }"
            >担当者フィルタ</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'setting' }"
            class="nav-link"
            :class="{ active: route.name === 'setting' }"
            >設定</RouterLink
          >
        </li>
      </ul>
    </header>

    <main class="my-3">
      <RouterView />
    </main>
  </div>
</template>
