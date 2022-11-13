<script setup>
import { ref } from "vue";
const isShown = ref(false);

defineProps({
  width: {
    default: "auto",
    type: String,
  },
});
</script>

<template>
  <div class="menu__block">
    <slot
      name="activator"
      :isShown="isShown"
      :activate="() => (isShown = !isShown)"
    ></slot>
    <template v-if="isShown">
      <div class="menu__closer" @click="() => (isShown = false)" />

      <div class="menu__wrapper">
        <div class="menu" :style="{ width }">
          <slot></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.menu__block {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
}
.menu__closer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
}
.menu__wrapper {
  position: fixed;
  display: flex;
  justify-content: center;

  .menu {
    z-index: 1;
    position: absolute;
    overflow: auto;
    max-height: 500px;
  }
}
</style>
