<script setup>
const props = defineProps({
  items: Array,
  modelValue: [Number, Boolean],
  listTitle: String,
});

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="rn_list">
    <div v-if="props.listTitle" class="list__title">
      {{ props.listTitle }}
    </div>
    <slot>
      <rn-list-item
        v-for="(item, i) in items"
        :item="item"
        :isActive="props.modelValue === i"
        @onClick="emits('update:modelValue', i)"
      />
    </slot>
  </div>
</template>

<style lang="scss">
.rn_list {
  .list__title {
    background-color: rgba(var(--primaryColorRGB), 0.2);
    color: var(--textColor);
    margin-top: 1rem;
    font-weight: bold;
    padding: 5px 10px;
    text-align: center;
  }

  .list__inner {
    & > div:not(.active) {
      color: var(--textColor);
    }
    .list__item:first-of-type {
      border-top: 0;
    }
  }

  .list__item {
    border: 1px solid var(--borderColor);
    display: flex;
    padding: 5px 10px;
    align-items: center;
    justify-content: space-between;

    .list__icons {
      display: flex;
      min-width: 24px;
    }

    &:last-of-type {
      border-bottom: 1px solid var(--borderColor);
    }

    &.active {
      background-color: var(--backgroundColor);
    }

    &:hover {
      color: var(--primaryColor);
      background-color: var(--backgroundColor);
      cursor: pointer;
    }
  }
}
</style>
