<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  preIcon: [String, Object],
  postIcon: [String, Object],
});
</script>

<template>
  <div class="rn__input_label">
    {{ props.label }}
  </div>

  <div
    class="rn__input"
    :class="{ inputWithPreIcon: preIcon, inputWithPostIcon: postIcon }"
  >
    <rn-icon
      v-if="preIcon"
      left
      :icon="preIcon"
      v-bind="typeof preIcon === 'object' ? preIcon : { icon: preIcon }"
    />
    <input
      type="text"
      @change="(e) => emits('update:modelValue', e.target.value)"
      :placeholder="placeholder"
    />
    <rn-icon
      v-if="postIcon"
      right
      :icon="postIcon"
      v-bind="typeof postIcon === 'object' ? postIcon : { icon: postIcon }"
    />
  </div>
</template>

<style lang="scss" scoped>
.rn__input {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;

  input {
    width: 100%;
    color: rgba(var(--textColorRGB), 0.5);
  }
}

.rn__input_label {
  font-size: 0.9rem;
  line-height: 0.9rem;
}
</style>
