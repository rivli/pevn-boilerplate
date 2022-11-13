<script setup>
const props = defineProps({
  modelValue: Boolean,
  label: String,
  color: String,
});
</script>

<template>
  <div class="checkbox">
    <div
      class="checkbox__item"
      :style="'color: ' + props.color"
      @change="(e) => emits('update:modelValue', e.target.value)"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="6"
          height="6"
          rx="1"
          transform="matrix(-1 0 0 1 10 4)"
          :fill="props.modelValue ? props.color : '#D9DBDA'"
        />
        <rect
          width="12"
          height="12"
          rx="1"
          transform="matrix(-1 0 0 1 13 1)"
          stroke="#D9DBDA"
        />
      </svg>
      {{ props.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  // justify-content: space-evenly;
  flex-wrap: wrap;
  cursor: pointer;

  .checkbox__item {
    font-size: 10px;
    display: flex;
    cursor: pointer;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
    margin-right: 5px;

    svg {
      margin-right: 10px;
    }
  }
}
</style>
