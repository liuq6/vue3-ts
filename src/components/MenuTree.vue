<template>
  <div class="l-sidebar">
    <el-menu v-model="value" active-text-color="#ffd04b" background-color="#001529" class="el-menu-vertical-demo" text-color="#fff" unique-opened router
      :default-active="route.path" :collapse="store.isCollapseIng">
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
import { reactive,ref } from "vue";
import { useIndexStore } from "@/stores/index";
const value =ref('')
const route = useRoute();
const router = useRouter();
// 获取 store
const store = useIndexStore();
const list = reactive(routeDisposeMens(router.options.routes));
console.log(list,'listlistlistlistlistlist');

const switchIsCollapse = () => {
  store.switchIsCollapse();
};
</script>
   
<style scoped lang="scss">
</style>