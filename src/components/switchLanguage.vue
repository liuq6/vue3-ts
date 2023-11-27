<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <Icon icon="icon-zhongyingwenqiehuan-zhongwen"/>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :class="{'active':local==='zh'}" @click="change('zh')">简体中文</el-dropdown-item>
        <el-dropdown-item :class="{'active':local==='en'}" @click="change('en')">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from "vue";

let $this = getCurrentInstance()?.appContext.config.globalProperties as any;
const state = reactive({
  local: localStorage.getItem("lang") || "zh",
});
const change = (key) => {
  $this.$i18n.locale = key;
  localStorage.setItem("lang", key);
  state.local = key;
};
let { local } = toRefs(state);
</script>

<style lang="scss" scoped>
.icon-zhongyingwenqiehuan-zhongwen {
  font-size: 30px;
}
::v-deep .el-dropdown-menu__item.active {
  background: $themeColor !important;
  color: $white;
}
</style>