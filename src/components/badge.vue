<template>
  <div style="transform: translateY(4px)">
    <el-popover placement="bottom-start" :width="400" trigger="click">
      <template #reference>
        <el-badge :value="13" :max="99" class="item">
          <BellFilled style="width: 20px; height: 30px" />
        </el-badge>
      </template>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane v-for="item in list" :label="item.name" :name="item.name" :key="item.name">

          <div v-if="item.name.includes('通知')" class="inform">
            <div v-for="i in item.list" :key="i.icon">
              <Icon :icon="i.icon" />
              <div>
                <span>{{ proxy.$day(i.time).fromNow()  }}</span>
                <span>{{i.title}}</span>
              </div>
            </div>
          </div>

        </el-tab-pane>

      </el-tabs>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { getAdminMsg } from "@/request/login";
import {
  computed,
  ref,
  getCurrentInstance,
  watch,
  onMounted,
  defineProps,
} from "vue";
const proxy = getCurrentInstance()?.proxy;

const list = ref<
  {
    name: String;
  }[]
>([]);
const activeName = ref<String>("");
getAdminMsg().then((res) => {
  console.log(res, "RSSSS");
  list.value = res.list;
  activeName.value = list.value[0].name;
});
</script>

<style scoped lang="scss">
.inform {
  .iconfont {
  }
  > div {
    height: 50px;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 10px;
    }
    div {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>