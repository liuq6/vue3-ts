<template>
  <div class="main">
    <el-container>
      <el-aside>
        <MenuTree />
      </el-aside>
      <el-container>
        <el-header>
          <cephalosome />
        </el-header>
        <tabBar />
        <el-main>
          <!-- <router-view></router-view> -->
          <transition name="fade-transform" mode="out-in">
            <router-view v-slot="{ Component }">
              <keep-alive nclude="button,animation">
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>
