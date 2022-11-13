<script setup>
import { onMounted } from "vue";

const props = defineProps({
  icons: Array,
  vertical: Boolean,
});
</script>

<template>
  <div class="iconsBar" :class="{ iconsBar__vertical: vertical }">
    <slot />
    <rn-icon
      v-for="icon in icons"
      :left="!vertical"
      v-bind="typeof icon === 'object' ? icon : { icon }"
    />
  </div>
</template>

<style lang="scss" scoped>
.iconsBar {
  display: flex;
  min-width: 24px;

  &.iconsBar__vertical {
    flex-direction: column;
  }
}
</style>
