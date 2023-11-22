<template>
    <div>
        <eleDialog :show="show" @change="change">
            <el-form>
                <el-form-item label="账号：" :label-width="formLabelWidth">
                    <el-select v-model="roles" multiple placeholder="Select" >
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
        </eleDialog>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, reactive, toRefs, getCurrentInstance } from 'vue'
import { updateRole } from "@/request/user";
// 获取公共数据
const proxy = getCurrentInstance()?.proxy
const props = defineProps<{
    show: boolean,
    data: roleObj
}>()
// 表单数据
const state = reactive<{
    roles: number[],
    options: roleListsItf[]
}>({
    roles: [],
    options: []
})
// 表单label宽度
let formLabelWidth = ref<string>('120px')
// 监听显隐
watch(() => props.show, (value) => {
    if (!value) return
    roles.value = JSON.parse(JSON.stringify( props.data.userList))
    options.value = props.data.roleLists
})
// emit 方法
const emit = defineEmits<{
    change: [r: string] // 具名元组语法
}>()
// 弹框显隐
const change = (r: string = '') => {
    if (r === 'load') {
        updateRole({
            adminId: props.data.id,
            roleIds:roles.value.join()
        }).then(res => {
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
let { roles, options } = toRefs(state)
</script>

<style scoped></style>