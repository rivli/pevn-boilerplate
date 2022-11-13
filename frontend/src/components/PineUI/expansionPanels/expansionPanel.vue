<script setup>
import { computed, ref, onMounted } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
  standalone: Boolean,
  expanded: Boolean,
});

const isExpanded = ref(false);
onMounted(() => {
  isExpanded.value = props.expanded || false;
});

const isExpandedComputed = computed(() => {
  return props.standalone ? isExpanded.value : props.modelValue;
});

const toggle = () => {
  if (props.standalone) {
    isExpanded.value = !isExpanded.value;
  } else {
    emits("update:modelValue", !props.modelValue);
  }
};
</script>

<template>
  <div class="expansionPanel">
    <div
      class="expansionPanel__header"
      :class="{ active: isExpandedComputed }"
      @click="toggle"
    >
      <slot name="header"> dsa </slot>
      <rn-icon
        :icon="isExpandedComputed ? 'chevron-up' : 'chevron-down'"
        @click.stop="toggle"
      />
    </div>
    <div v-if="isExpandedComputed" class="expansionPanel__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.expansionPanel {
  .expansionPanel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--borderColor);
    padding: 5px;
    cursor: pointer;
  }

  .expansionPanel__content {
    border: 1px solid var(--borderColor);
    border-top: 0;
    background-color: var(--backgroundColor);
  }
}
</style>
