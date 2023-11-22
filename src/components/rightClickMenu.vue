<template>
  <div>
    <div :id="random" @contextmenu.prevent="open" style="display:flex;align-items:center">
      <slot />
    </div>
    <!-- 通过右击获取到的坐标定位 -->
    <ul class="context-menu" v-show="visible" :style="{ left: left + 'px', top: top + 'px' }">
      <li v-for="item in menuList" :key="item.icon" class="context-menu-item">
        <el-icon class="svg-wh" v-if="item?.icon">
          <component v-if="item.icon" :is="item.icon"></component>
        </el-icon>
        {{$t(item.title)}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, watch, onMounted } from "vue";
import { rightClickMenu, type menuInf } from "@/utils/dataSource";

let top = ref<number>(0);
let left = ref<number>(0);
let visible = ref<boolean>(false);
let menuList = ref<menuInf>(rightClickMenu);
const random = ref<string>(Date.now() + "");
// const menus = computed(function () {
//   return firstName.value + "-" + lastName.value;
// });
onMounted(() => {
  document.addEventListener("contextmenu",JudgmentElement);
  document.addEventListener("click",JudgmentElement);
});
const JudgmentElement = (event) => {
  if (event.target.id !== random.value) return (visible.value = false);
};

const open = (event) => {
  top.value = event.clientY;
  left.value = event.clientX + 10;
  visible.value = true;
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