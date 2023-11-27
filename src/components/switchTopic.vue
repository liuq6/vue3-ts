<template>
  <el-switch inline-prompt v-model="store.isDark" @click="toggle">
  </el-switch>
</template>
 
<script setup lang="ts">
import { useIndexStore } from "@/stores/index";

// 获取 store
const store = useIndexStore();
const toggle =()=>{
  store.updateIsDark()
}
</script>
 