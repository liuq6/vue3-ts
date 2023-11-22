<template>
    <div>
        <eleDialog :show="show" @change="change">
            <el-form :model="form">
                <el-form-item label="账号：" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名:" :label-width="formLabelWidth">
                    <el-input v-model="form.nickName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱：" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="备注：" :label-width="formLabelWidth">
                    <el-input v-model="form.note" autocomplete="off" />
                </el-form-item>
                <el-form-item label="是否启用：" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </eleDialog>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, reactive, toRefs, getCurrentInstance } from 'vue'
import { updateAdminInfo } from "@/request/user";
// 获取公共数据
const proxy = getCurrentInstance()?.proxy

const props = defineProps({
    show: Boolean,
    row: Object
})
// 表单数据
const state = reactive({
    form: reactive<{
        id?: number,
        nickName: string
    }>({
        nickName: ''
    })
})
// 表单label宽度
let formLabelWidth = ref<string>('120px')
// 监听显隐
watch(() => props.show, (value) => {
    if (!value) return
    form.value = JSON.parse(JSON.stringify(props.row))
})
// emit 方法
const emit = defineEmits<{
    change: [r: string] // 具名元组语法
}>()
// 弹框显隐
const change = (r: string = '') => {
    if (r === 'load') {
        updateAdminInfo(form.value.id, form.value).then(res => {
            console.log(res, 'res');
            if (res) {
                proxy.$message({
                    message: '修改成功',
                    grouping: true,
                    type: 'success',
                })
                emit('change', r)
            }
        })
    } else {
        emit('change', r)
    }
}
let { form } = toRefs(state)
</script>

<style scoped></style>