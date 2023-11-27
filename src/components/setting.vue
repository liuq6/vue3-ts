<template>
  <div class="setting">
    <el-icon @click="drawer = true">
      <Setting style="width:30px; height:30px" />
    </el-icon>
    <el-drawer v-model="drawer" title="" :with-header="false" size="400px">
      <div class="drawer">
        <div class="drawer-top">
          <span>项目配置</span>
          <el-icon @click="drawer = false">
            <Close />
          </el-icon>
        </div>
        <div class="drawer-nav">
          <el-divider> <span class="title">主题</span> </el-divider>
          <switchTopic/>
        </div>
      </div>

    </el-drawer>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref<boolean>(false);
</script>

<style scoped lang="scss">
.setting {
  margin-left: 10px;
  line-height: 0px;
  font-size: 18px; 
}
.drawer {
  padding: 0 10px;
  .drawer-top {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
        font-weight: 600;
        font-size: 18px;
    }
  }
  .drawer-nav{
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}

::v-deep .el-drawer__body {
  padding: 0;
}
</style>