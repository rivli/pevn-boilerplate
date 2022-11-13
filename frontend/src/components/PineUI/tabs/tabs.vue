<script setup>
defineProps({
  items: Array,
  vertical: Boolean,
  modelValue: Number,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="rn_tabs" :class="{ rn_tabs_vertical: vertical }">
    <slot name="before" />

    <div class="tabsBlock">
      <slot>
        <rn-tab
          v-for="(tab, i) in items"
          v-bind="
            typeof tab === 'string'
              ? { title: tab, isActive: modelValue === i, vertical }
              : { ...tab, isActive: modelValue === i, vertical }
          "
          @click="emit('update:modelValue', i)"
        />
      </slot>
    </div>
    <slot name="after" />
  </div>
</template>

<style lang="scss">
.rn_tabs {
  border-bottom: 1px solid var(--primaryColor);
  display: flex;
  flex: 1 1 auto;
  padding: 5px 15px;

  .tabsBlock {
    display: flex;
  }

  .tab {
    border: 1px solid rgba(var(--backgroundColorLightRGB), 0);
    border-bottom: 1px solid var(--primaryColor);
    display: flex;
    justify-content: space-between;

    padding: 7px 15px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: -1px;
    color: var(--tabTextColor);
    &.active {
      color: var(--textColor);
      border: 1px solid var(--primaryColor);
      border-bottom: 1px solid rgba(var(--backgroundColorLightRGB), 1);
    }

    &:hover {
      background-color: var(--backgroundColor);
    }
  }

  &_vertical {
    flex-direction: column;
    padding: 15px 0;
    border: 0;
    border-right: 1px solid var(--primaryColor);
    height: 100%;

    .tabsBlock {
      flex-direction: column;
    }

    .tab {
      margin: 0;
      margin-right: -1px;
      border: 1px solid var(--borderColor);
      border-top: 0;
      border-right: 1px solid var(--primaryColor);
      color: var(--tabTextColor);

      &:first-of-type {
        border-top: 1px solid var(--borderColor);
      }

      &.active {
        border: 1px solid var(--primaryColor);
        border-bottom: 1px solid var(--primaryColor);
        border-right: 1px solid rgba(var(--backgroundColorLightRGB), 1);
        color: var(--textColor);
      }

      &:hover {
        background-color: rgba(var(--primaryColorRGB), 0.1) !important;
      }
    }
  }
}
</style>
