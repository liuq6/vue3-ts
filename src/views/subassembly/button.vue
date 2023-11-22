<template>
  <div>
    按钮
    <el-input v-model="input" placeholder="Please input" />

  </div>
</template>

<script setup lang="ts" name="button">
import { ref } from "vue";

const input = ref("");
</script>

<style scoped>
</style>