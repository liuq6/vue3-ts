<template>
  <div class="setting">
    <el-icon @click="drawer = true">
      <Setting style="width:30px; height:30px" />
    </el-icon>
    <el-drawer v-model="drawer" title="" :with-header="false" size="300px">
      <div class="drawer">
        <div class="drawer-top">
          <span>项目配置</span>
          <el-icon @click="drawer = false">
            <Close />
          </el-icon>
        </div>
        <div class="drawer-nav">
          <el-divider> <span class="title">主题</span> </el-divider>
          <switchTopic />
        </div>
        <div class="drawer-nav">
          <el-divider> <span class="title">导航栏模式</span> </el-divider>
         <div class="imgs">
          <img src="@/assets/img/layout/left.png" alt="">
          <img src="@/assets/img/layout/center.png" alt="">
          <img src="@/assets/img/layout/right.png" alt="">
         </div>
        </div>
        <div class="drawer-nav">
          <el-divider> <span class="title">主题色</span> </el-divider>
          <ul class="cp">
            <li v-for="val,key in store.colorList" :style="{ background: val.themeColor }" :key="val.themeColor"
            @click="store.changeDefaultTheme(key)">
              <el-icon v-show="key===store.defaultTheme" :style="{color:key==='light'?'#000':'#FFFFFF'}">
                <Check />
              </el-icon>
            </li>
          </ul>
        </div>
      </div>

    </el-drawer>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useColorThemeStore } from "@/stores/colotTheme";
const drawer = ref<boolean>(false);
const store = useColorThemeStore();
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
    .title {
      font-weight: 600;
      font-size: 18px;
    }
  }
  .drawer-nav {
    min-height: 80px;
    line-height: 60px;
    text-align: center;
    li {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 2px;
      margin-right: 5px;
      position: relative;

      &:nth-child(2) {
        border: 1px solid #ccc;
      }
      .el-icon {
        position: absolute;
        left: 0px;
        top: 2px;
      }
    }
    .imgs{
      display: flex;
      img{
        // width: 50px;
        // height: 50px;
        margin-right: 10px;
      }
    }
  }
}

::v-deep .el-drawer__body {
  padding: 0;
}
</style>