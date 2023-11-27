<template>
  <div class="cephalosome">
    <div>
      <crumbs />
    </div>
    <div class="right-c">
      <badge />
      <switchLanguage />
      <div>
        <el-dropdown>
          <div class="avatar-name cp"><el-avatar size="small"> </el-avatar>{{store.userInfo.userName}}</div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">
                <SwitchButton style="width: 1em; height: 1em; margin-right: 8px" />
                {{$t('login.loginOutTxt') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <setting/>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import { removeUserToken } from "@/utils/user";
import { useRouter } from "vue-router";

// 获取 store
const store = useIndexStore();
const router = useRouter();
const loginOut = () => {
  router.push("/login");
  removeUserToken();
};
</script>

<style lang="scss" scoped>
.cephalosome {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .right-c {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // width: 150px;
    .avatar-name {
      display: flex;
      align-items: center;
      .el-avatar {
        margin-right: 5px;
      }
    }
    .el-dropdown{
      margin-left:20px;
    }
  }
}
</style>