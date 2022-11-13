<script setup>
const props = defineProps({
  cols: String,
  margin: {
    default: 0,
    type: Number,
  },
});
</script>

<template>
  <div
    class="col"
    :style="{ width: (100 * props.cols) / 12 + '%', margin: margin + 'px' }"
  >
    <slot></slot>
  </div>
</template>
