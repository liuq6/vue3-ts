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
          <router-view v-slot="{ Component,route  }">
            <transition name="fade-transform" mode="out-in">
            
              <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component" />
              </keep-alive>
              <component v-else :is="Component" />
            </transition>
          </router-view>
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
