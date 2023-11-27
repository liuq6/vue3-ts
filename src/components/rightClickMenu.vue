<template>
  <div>
    <div :id="random" @contextmenu.prevent="open" style="display:flex;align-items:center">
      <slot />
    </div>
    <!-- 通过右击获取到的坐标定位 -->
    <ul class="context-menu" v-show="visible" :style="{ left: left + 'px', top: top + 'px' }">
      <li v-for="item in menus" :key="item.icon" class="context-menu-item" @click.stop="menuClick(item.icon)">
        <el-icon class="svg-wh" v-if="item?.icon">
          <component v-if="item.icon" :is="item.icon"></component>
        </el-icon>
        {{$t(item.title)}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  getCurrentInstance,
  watch,
  onMounted,
  defineProps,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTabBarStore } from "@/stores/tab";
import { rightClickMenu, type menuInf } from "@/utils/dataSource";
const router = useRouter();
const route = useRoute();
const store = useTabBarStore();

let top = ref<number>(0);
let left = ref<number>(0);
let visible = ref<boolean>(false);
let menuList = ref<menuInf>(rightClickMenu);
const random = ref<string>(Date.now() + "");

const props = defineProps({
  isCurrent: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
const menus = computed(() => {
  const list = JSON.parse(JSON.stringify(menuList.value));
  if (props.index === 1) {
    return [menuList.value[0]];
  } else if (props.index === props.length) {
    list.splice(3, 1);
  } else if (props.index === 2) {
    list.splice(2, 1);
  }
  return list;
});
onMounted(() => {
  document.addEventListener("contextmenu", JudgmentElement);
  document.addEventListener("click", JudgmentElement);
});
const JudgmentElement = (event) => {
  if (event.target.id !== random.value) return (visible.value = false);
};

const open = (event) => {
  top.value = event.clientY;
  left.value = event.clientX + 10;
  visible.value = true;
};
const menuClick = (type: string) => {
  switch (type) {
    case "RefreshRight":
      router.go(0);
      break;
    case "Close":
      store.closeTabs("current", props.path, router);
      break;
    case "ArrowLeft":
      store.closeTabs("left", props.path, router);
      break;
    case "ArrowRight":
      store.closeTabs("right", props.path, router);
      break;
    case "Bottom":
      store.closeTabs("other", props.path, router);
      break;
    case "Minus":
      store.closeTabs("all", props.path, router);
      break;

    default:
      break;
  }
  visible.value = false
};
</script>

<style lang="scss" scoped>
.context-menu {
  color: $fontBlackColor;
  background: $white;
  border-radius: 4px;
  box-shadow: 0 2px 8px #00000026;
  padding: 10px 15px;
  position: fixed;
  white-space: nowrap;
  font-size: 13px;
  z-index: 99;
  .context-menu-item {
    height: 30px;
    max-width: 120px;
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 10px;
    }
    &:hover {
      color: $themeColor;
    }
  }
}
</style>