<template>
  <div style="transform: translateY(4px)">
    <el-popover placement="bottom-start" :width="400" trigger="click" >
      <template #reference>
        <el-badge :value="13" :max="99" class="item">
          <BellFilled style="width: 20px; height: 30px" />
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="item in list" :label="item.name" :name="item.name" :key="item.name">
          <div class="inform">
            <div v-for="i,index in item.list" :key="i.icon" @mousemove="titleEnter($event,index)">
              <Icon v-if="i.icon" :icon="i.icon" />
              <div>
                <span v-show="!item.name.includes('待办')">{{ proxy.$day(i.time).fromNow()  }}</span>
                <span v-show="i.content">{{i.content}}</span>
                <el-popover placement="top-start" title="" :width="300" trigger="hover" :content="i.title" :disabled="popoverIsDisabled">
                  <template #reference>
                    <span class="ellipsis" :id="`index${index}`">{{i.title}}
                      <el-tag v-show="item.name.includes('待办')" :type="tagKeys[i.status]?.type">{{tagKeys[i.status]?.txt}}</el-tag>
                    </span>
                  </template>
                </el-popover>
              </div>
            </div>
          </div>

        </el-tab-pane>

      </el-tabs>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import {
  computed,
  ref,
  getCurrentInstance,
  watch,
  onMounted,
  defineProps,
  reactive,
} from "vue";
import { getAdminMsg } from "@/request/login";
// 获取 store
// const store = useIndexStore();
const proxy = getCurrentInstance()?.proxy;
const tagKeys = reactive<{
  [key: number]: {
    type: string;
    txt: string;
  };
}>({
  0: {
    type: "info",
    txt:"未开始"
  },
  1: {
    type: "danger",
    txt:"马上到期"
  },
  2: {
    type: "warning",
    txt:"进行中"
  },
});
const list = ref<
  {
    name: String;
  }[]
>([]);
// tab激活
const activeName = ref<String>("");
// 获取数据
getAdminMsg().then((res) => {
  console.log(res, "RSSSS");
  list.value = res.list;
  activeName.value = list.value[0].name;
});
// 文字popover是否禁用
const popoverIsDisabled = ref<boolean>(false);
// 判断文字是否有省略号
const titleEnter = (e, id) => {
  const target: HTMLElement = document.getElementById(`index${id}`);
  if (!target) return;
  popoverIsDisabled.value = !(target.scrollWidth > target.offsetWidth);
};
</script>

<style scoped lang="scss">
.inform {
  min-height: 250px;
  > div {
    min-height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    .icon {
      margin-right: 10px;
    }
    div {
      display: flex;
      flex-direction: column-reverse;
      width: calc(100% - 50px);
    }
  }
  .el-tag{
    float: right;
  }
}
</style>