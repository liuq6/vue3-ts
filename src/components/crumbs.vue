<template>
  <el-breadcrumb separator="/">
    <template v-for="(item, index) in list" :key="index">
      <el-breadcrumb-item>
        <router-link :to="item.path"> {{$t(item.title) }}</router-link>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template> 

<script setup lang="ts" name="crumbs">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { routeDisposeCrumb } from "@/utils/comm";
const route = useRoute();
const router = useRouter();
let list = ref<Array<object>>(routeDisposeCrumb(route.matched));
//在每次路由跳转后，更新面包屑的数据
router.afterEach((to, from) => {
  //不知道为什么，进入页面时，会有两次路由跳转，route.name为空
  if (!route.name) return;
  list.value = routeDisposeCrumb(route.matched);
});
</script>

<style scoped>
</style>