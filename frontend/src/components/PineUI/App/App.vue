<template>
  <div class="app_wrapper" ref="appWrapper">
    <div class="app">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import theme from "../../../composables/theme";

const { setAppDOMValue } = theme();
const appWrapper = ref(null);

onMounted(() => {
  setAppDOMValue(appWrapper.value);
});
</script>

<style lang="scss">
@import "../../../assets/scss/common";
</style>
