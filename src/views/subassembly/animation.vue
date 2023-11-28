<template>
  <div>
    动画
    <el-input v-model="input" placeholder="Please input" />
    <el-button type="primary">收到货</el-button>
  </div>
</template>

<script setup lang="ts" name="animation">
import { ref } from "vue";

const input = ref("");
</script>

<style scoped>
</style>