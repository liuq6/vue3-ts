<template>
  <div class="tab-bar cp">
    <div :class="{'tag-tab':true,'activate-tab': store.currentR ===tab.path }" v-for="tab in store.tabLists" :key="tab.path"
      @click="tabClick(tab.path)">
      <rightClickMenu>
        {{$t(tab.title)}}
        <el-icon v-if="!tab.noClose" @click.stop="closeTabs('current',tab.path)">
          <Close />
        </el-icon>
      </rightClickMenu>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useTabBarStore } from "@/stores/tab";
import { useRouter,useRoute } from "vue-router";
import { ref, getCurrentInstance, watch,nextTick  } from "vue";

const store = useTabBarStore();
const router = useRouter();

// let currentRoute = ref<string>("");
// watch(
//   () => router.currentRoute.value,
//   (route) => {
//     console.log(1,router.currentRoute.value,store.currentR);
//     store.addTabs(proxy, route);
//   },
//   { immediate: true, deep: true }
// );
// watch(
//   () => route,
//   (route) => {
//     console.log(2,route);
//     store.addTabs(proxy, route);
//   },
//   { immediate: true, deep: true }
// );
const tabClick = (path: string) => {
  router.push(path);
  store.setActiveTab(path)
};
const closeTabs = (type: string, path: string) => {
  store.closeTabs(type, path,router);
};
</script>
