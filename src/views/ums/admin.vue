<template>
    <div>
        <ele-table :tableData="tableData" :tableController="tableController" :total="total" @pagerFresh="pagerFresh">
            <template #createTime="{ row }">
                {{ row.createTime && proxy.$day(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
            <template #loginTime="{ row }">
                {{ row.loginTime && proxy.$day(row.loginTime).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
            <template v-slot:status="{ row }">
                <el-switch v-model="row.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    :active-value="1" :inactive-value="0" />
            </template>
            <template #opts="{ row }">
                <el-button key="primary" type="primary" text @click="allocation(row)">分配角色</el-button>
                <el-button key="primary" type="primary" text @click="editRow(row)">编辑</el-button>
            </template>
        </ele-table>
        <editAdmin :show="editShow" :row="rowData" @change="editChange" />
        <allocationRoles :show="allocationShow" :data="allocationData" @change="allocationChange" />
    </div>
</template>
  
<script lang="ts" setup>
import { getAdminList, getRoleList, getRoleById } from "@/request/user";
import { reactive, toRefs, getCurrentInstance } from 'vue'
import editAdmin from "./components/editAdmin.vue";
import allocationRoles from "./components/allocationRoles.vue";
import type {
    adminListReq,
} from '@/types/user'
// 获取公共数据
const proxy = getCurrentInstance()?.proxy

interface stateItf {
    tableData: {}[],
    query: adminListReq,
    tableController: {}[],
    total: number,
    editShow: boolean
    rowData: object,
    allocationShow: boolean,
    allocationData: roleObj,
}
const state = reactive<stateItf>({
    tableData: [],
    query: {
        keyword: '',
        pageNum: 1,
        pageSize: 10,
    },
    tableController: [
        { value: 'username', key: '账号' },
        { value: 'email', key: '邮箱' },
        { value: 'createTime', key: '添加时间', type: 'template' },
        { value: 'loginTime', key: '最后登录', type: 'template' },
        { value: 'status', key: '是否启用', type: 'template' },
        { value: 'opts', key: '操作', type: 'template' },
    ],
    total: 10,
    editShow: false,
    rowData: {},
    allocationShow: false,
    allocationData: { roleLists: [], userList: [], id: 0 }
})
const { tableData, query, tableController, total, editShow, rowData, allocationShow, allocationData } = toRefs(state)

// 表格更新
const pagerFresh = (value: { pageNum: number, pageSize: number }) => {
    query.value.pageNum = value.pageNum
    query.value.pageSize = value.pageSize
    getTableData()
}
// 打开新增、编辑弹框
const editRow = (row: {}) => {
    rowData.value = row
    editShow.value = true
}

// 分配角色
const allocation = (row: { id: number }) => {
    allocationData.value.id = row.id
    getRoleById(row.id).then(res => {
        allocationData.value.userList = res.map(d => d.id)
        allocationShow.value = true
    })
}
// 打开新增、编辑弹框显隐
const editChange = (r: string) => {
    if (r) {
        getTableData()
    }
    editShow.value = false
}
// 打开新增、编辑弹框显隐
const allocationChange = (r: string) => {
    if (r) {
        getTableData()
    }
    allocationShow.value = false
}
// 获取表格数据
const getTableData = () => {
    getAdminList(query.value).then(res => {
        tableData.value = res.list
        total.value = res.total
    })
}
// 获取所有角色列表
const getRoleListAll = () => {
    getRoleList().then(res => {
        allocationData.value.roleLists = res
    })

}
getTableData()
getRoleListAll()
</script>
  