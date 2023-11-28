<template>
  <div class="l-sidebar">
    {{value}}
    <el-menu v-model="value" class="el-menu-vertical-demo" text-color="#fff" unique-opened router :default-active="route.path"
      :collapse="store.isCollapseIng">
      <amenu :list="list" />
    </el-menu>
    <div class="l-sidebar-switch">
      <Fold v-show="!store.isCollapseIng" style="width: 20px; height: 20px;color:#409eff" @click="switchIsCollapse" />
      <Expand v-show="store.isCollapseIng" style="width: 20px; height: 20px;color:#409eff" @click="switchIsCollapse" />
    </div>
  </div>
</template>
   
<script lang="ts" setup name="MenuTree">
import { routeDisposeMens } from "@/utils/comm";
import { useRouter, useRoute } from "vue-router";
import { onMounted, reactive, ref, nextTick, watch,getCurrentInstance } from "vue";
import { useIndexStore } from "@/stores/index";
import { findRouteForPath } from "@/utils/comm";
import { useTabBarStore } from "@/stores/tab";

const value = ref("");
const route = useRoute();
const router = useRouter();
// 获取 store
const store = useIndexStore();
const tabStore = useTabBarStore();
const proxy = getCurrentInstance()?.proxy;

const list = reactive(routeDisposeMens(router.options.routes));
// watch(router.currentRoute.value, (newValue, oldValue) => {
//     console.log('watch 已触发', newValue,oldValue)
//     console.log(newValue,'newValue');

// }, { immediate: true })
watch(
  () => router.currentRoute.value,
  (newValue) => {
    const routeC = findRouteForPath(list, newValue.name);
    if (!routeC) return;
    tabStore.addTabs(proxy, routeC);
  },
  { immediate: true }
);

const switchIsCollapse = () => {
  store.switchIsCollapse();
};
</script>
   
<style scoped lang="scss">
</style>