<template>
  <el-switch inline-prompt v-model="store.isDark" @click="toggle" :active-action-icon="Moon" :inactive-action-icon="Sunny">
  </el-switch>
</template>
 
<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import { Moon, Sunny } from '@element-plus/icons-vue'
// 获取 store
const store = useIndexStore();
const toggle =()=>{
  store.updateIsDark()
}
</script>
 