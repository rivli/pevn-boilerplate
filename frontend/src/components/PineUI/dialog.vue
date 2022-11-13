<script setup>
import { ref } from "vue";
const isShown = ref(false);

defineProps({
  width: String,
});
</script>

<template>
  <slot
    name="activator"
    :isShown="isShown"
    :activate="() => (isShown = !isShown)"
  ></slot>
  <template v-if="isShown">
    <div class="dialog__wrapper">
      <div class="dialog__closer" @click="() => (isShown = false)" />
      <div class="dialog" :style="{ width: width + 'px' }">
        <slot></slot>
      </div>

      <div class="actions">
        <rn-icon
          icon="close"
          class="action"
          @click.stop="() => (isShown = false)"
        />
        <rn-icon icon="save" class="action" />
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.dialog__wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  z-index: 5;

  .dialog__closer {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(70, 69, 69, 0.507);
    cursor: pointer;
  }

  .dialog {
    max-height: calc(100vh - 80px);
    z-index: 1;
    margin-top: 40px;
    min-height: 90px;
    position: relative;
    overflow: auto;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-self: start;
    margin-top: 40px;
    margin-left: -2px;
    z-index: 1;

    .action {
      margin: 10px;
      cursor: pointer;
    }
  }
}
</style>
