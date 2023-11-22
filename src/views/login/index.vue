<template>
  <div class="login">
    <div class="operation">
      <switchTopic/>
      <switchLanguage />
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <div class="login-title">{{$t('login.title') }}</div>
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" type="text" autocomplete="off">
          <template #prefix>
            <UserFilled style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="ruleForm.pwd" type="password" autocomplete="off">
          <template #prefix>
            <Lock style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <testCode v-model:value="codeValue" :startText="$t('sliding.title')" :successText="$t('sliding.successText')"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{$t('login.btnTxt') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref ,getCurrentInstance} from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { login } from "../../request/login";
import { setUserToken } from "@/utils/user";
import { useIndexStore } from "@/stores/index";
import testCode from "./testCode.vue";
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
let $this = getCurrentInstance()?.appContext.config.globalProperties as any;

// 获取 store
const store = useIndexStore();
// 获取route
import { useRouter } from "vue-router";
const router = useRouter();
const ruleForm = reactive({
  userName: "admin",
  pwd: "123456",
});
const codeValue = ref(false);
// 校验密码
const rules = reactive<FormRules<typeof ruleForm>>({
  pwd: [
    {
      validator: (
        rule: unknown,
        value: string,
        callback: (m?: string) => void
      ) => {
        if (!value) {
          callback("密码不能为空");
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  userName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
});
// 获取form dom对象
const ruleFormRef = ref<FormInstance>();
// 提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if(!codeValue.value) return $this.$message.warning($this.$t('sliding.title')); 
    if (valid) {
      login({
        username: ruleForm.userName,
        password: ruleForm.pwd,
      }).then((res) => {
        setUserToken(`${res.token}`);
        store.getAdminInfo();
        router.push("/index");
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: end;
  align-items: center;
  max-width: 100%;
  height: 100%;
  background: url("@/assets/img/login/bg.png");
  padding-right: 300px;
  .login-title {
    font-size: 26px;
    padding: 30px;
    text-align: center;
    font-weight: 600;
    color:#999
  }
  .el-form {
    width: 20%;
    .el-form-item {
      &:last-child {
        ::v-deep .el-form-item__content {
          justify-content: center;
        }
      }
    }
  }
  .operation {
    width: 100%;
    text-align: right;
    padding: 10px 50px;
    position: absolute;
    right: 0;
    top: 0;
    .icon-zhongyingwenqiehuan-zhongwen {
      font-size: 30px;
    }
  }
}
</style>