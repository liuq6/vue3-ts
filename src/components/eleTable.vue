<template>
    <!-- 
      此处 可以 拓展 （elplus table 的特殊 表格props属性 ） 
      比如：树状表格、内容居中、表尾内容、固定行列等
      :header-cell-style="{'text-align':`${true}?'center':'auto'`}"
      :cell-style="{'text-align':`${true}?'center':'auto'`}"
    -->
    <!-- :data="tableData" 绑定表格数据 -->
    <el-table 
      :data="tableData" 
      border 
      style="width: 100%"
      >
      <!-- 多选（可选） -->
      <el-table-column :align="center?'center':''" type="selection" width="50" v-if="selected"/>
      <!-- 序号（应该可选才对-目前没有） -->
      <el-table-column :align="center?'center':''" type="index" label="编号" width="55"/>
      <!-- 接受 传值 渲染 表头 -->
      <!-- 表头数据的 单独控制tableController -->
      <!-- 可控制宽度 -->
      <el-table-column :align="center?'center':''"
          v-for="t in tableController"
          :prop="t.value"
          :label="t.key"
          :width="t.width ? t.width : ''"
      >
        <!-- 预留插槽 （可选）-->
        <!-- #default="scope" 作用域插槽 使用子组件内部数据 -->
        <template #default="scope" v-if="t.type === 'template'">
          <slot :name="t.value" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 （可选） -->
    <div class="pager-box" v-if="pager">
      <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          background
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  
  </template>
  
  <script lang="ts" setup>
import { ref, defineEmits,defineProps } from 'vue'

  // 接收 分页器的分页操作处理函数
  const emit = defineEmits(['pagerFresh'])
  // 接收 所有 props 传值
  defineProps({
    // 表格数据
    tableData: {
      type: Array,
      default: []
    },
    // 表头数据
    tableController: {
      type: Array,
      default: []
    },
    // 分页所属--总数据条数
    total: {
      type: Number,
      default: 10
    },
    // 是否加载分页器
    pager: {
      type: Boolean,
      default: true
    },
    // 是否加载多选
    selected: {
      type: Boolean,
      default: true
    },
    // 内容居中
    center: {
      type: Boolean,
      default: true
    },
  })
  // 分页器 默认数据
  let queryParams = ref({pageNum: 1, pageSize: 10})
  
  // 分页器处理函数
  // 单页数据条数改变
  function handleSizeChange(ev) {
    queryParams.value.pageSize = ev;
    emit('pagerFresh', JSON.parse(JSON.stringify(queryParams.value)))
  }
  // 页数改变
  function handleCurrentChange(ev) {
    queryParams.value.pageNum = ev;
    emit('pagerFresh', JSON.parse(JSON.stringify(queryParams.value)))
  }
  </script>
  
  <style lang="scss" scoped>
  // 内容居中
  .text-center{
    text-align:center;
  }
  
  // 分页器位置
  .pager-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }
  </style>
  
  