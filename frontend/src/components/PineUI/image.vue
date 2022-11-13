<template>
  <img :src="src" @click="zoomed = !zoomed" :title="title" :width="width" />
  <div
    v-if="zoomed"
    class="z-image imgImitation zoomed"
    @click="zoomed = !zoomed"
  >
    <img :src="src" :title="title" />
    <div v-if="!hideTitle" class="z-image__title">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  width: Number,
  src: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  hideTitle: {
    type: Boolean,
    default: false,
  },
});

const zoomed = ref(false);
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
.imgImitation {
  display: inline;
  background-color: rgba(83, 83, 83, 0.171);
  cursor: pointer;

  img {
    max-width: 100%;
  }
}
.zoomed {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  overflow: auto;
  width: 100vw !important;
  height: 100vh;
  padding: 10px;
  display: flex !important;
  justify-content: center;
  align-items: center;

  img {
    max-height: calc(100vh - 20px);
  }

  .z-image__title {
    position: absolute;
    bottom: 10px;
    text-align: center;

    span {
      padding: 0 10px;
      color: white;
      background-color: rgba(83, 83, 83, 0.425);
    }
  }
}
</style>
