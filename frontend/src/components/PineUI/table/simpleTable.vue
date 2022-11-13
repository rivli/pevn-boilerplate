<script setup>
const props = defineProps({
  fixedHeader: {
    default: false,
    type: Boolean,
  },
  height: {
    default: "auto",
    type: String,
  },
});
</script>

<template>
  <div class="rntable__wrapper" :style="{ maxHeight: height }">
    <table class="rntable" :class="{ rntable__fixed: fixedHeader }">
      <slot></slot>
    </table>
  </div>
</template>

<style lang="scss">
.rntable__wrapper {
  border: 1px solid var(--borderColor);
}
.rntable {
  border-collapse: collapse;
  width: 100%;

  &.rntable__fixed {
    thead {
      tr {
        th {
          position: sticky;
          top: -1px;
          background-color: var(--backgroundColorLight);
          border: 1px solid var(--borderColor);
        }
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 0 16px;
        text-align: center;
        border: 1px solid var(--borderColor);
      }
      &:nth-child(odd) {
        background: var(--backgroundColor);
      }
      &:hover {
        background-color: rgba(var(--primaryColorRGB), 0.1);
      }
    }
  }
}
</style>
