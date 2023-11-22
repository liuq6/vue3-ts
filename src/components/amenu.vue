<template>
  <div>
    <template v-for="item in props.list">
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :key="item.path" :index="item.path" :popper-append-to-body="false">
          <template #title>
            <el-icon class="svg-wh" v-if="item?.icon">
              <component v-if="item.icon" :is="item.icon"></component>
            </el-icon>
            <span slot="title"> {{$t(item.title) }}</span>
          </template>
          <amenu :list="item.children" />
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :key="item.path" :index="item.path" :popper-append-to-body="false" @click.native="select(item.name)">
          <el-icon class="svg-wh" v-if="item?.icon">
            <component v-if="item.icon" :is="item.icon"></component>
          </el-icon>
          <span slot="title"> {{$t(item.title) }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
     
<script lang="ts" setup name="amenu">
import { useRouter, useRoute } from "vue-router";
import { getCurrentInstance, onMounted } from "vue";
import { useTabBarStore } from "@/stores/tab";
import { findRouteForPath } from "@/utils/comm";

const store = useTabBarStore();
// const proxy = getCurrentInstance()?.proxy;
const router = useRouter();
const route = useRoute();
const proxy = getCurrentInstance()?.proxy;
const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => [],
  },
});
onMounted(() => {
  //  初始化首页
  let name = route.name;
  console.log('初始化首页');
  
  if (route.path === "/home") {
    name = "home";
  }
  select(name as string);
});
// store.addTabs(proxy,)
const select = (name: string) => {
  const route = findRouteForPath(props.list, name);
  if (!route) return;

  store.addTabs(proxy, route);
};
</script>
     