<template>
    <el-dialog v-model="visible" title="Shipping address" :before-close="close">
        <slot />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close('')">关闭</el-button>
                <el-button type="primary" @click="close('load')">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, watch, ref } from 'vue'
const props = defineProps({
    show: Boolean,
})
// emit 方法
const emit = defineEmits<{
    (e: 'change', r: string): void // 具名元组语法
}>()
// 弹框显隐
let visible = ref<boolean>(false)
// 监听弹框显隐藏
watch(() => props.show, (count) => {
    visible.value = count
})
// 关闭弹框
const close = (r: string) => {
    emit('change', r)
    visible.value = false
}
</script>

<style scoped></style>