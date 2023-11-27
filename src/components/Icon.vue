<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#'+fontClass"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed,defineProps } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
const fontClass = computed(() => {
  return props.icon;
});
</script>

<style scoped>
.icon {
  width: 24px;
  height: 26px;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
</style>