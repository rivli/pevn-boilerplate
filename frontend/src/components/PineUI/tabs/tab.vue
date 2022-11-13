<script setup>
const props = defineProps({
  isActive: Boolean,
  class: String,
  title: String,
  vertical: Boolean,
  backgroundColor: String,
  preIcon: String,
  postIcon: String,
});
</script>

<template>
  <div
    class="tab"
    :class="{ active: isActive, [props.class]: props.class }"
    :style="{
      background:
        isActive && vertical
          ? `linear-gradient(90deg,${backgroundColor} 43.33%, var(--backgroundColorLight) 92.92%)`
          : `linear-gradient(90deg,${backgroundColor} 43.33%, ${backgroundColor})`,
    }"
  >
    <rn-icon
      v-if="preIcon"
      left
      :icon="preIcon"
      color="#168ADE"
      style="margin-left: 5px"
      size="13px"
      v-bind="typeof preIcon === 'object' ? preIcon : { icon: preIcon }"
    />
    <div>{{ title }}</div>
    <rn-icon
      v-if="postIcon"
      right
      :icon="postIcon"
      color="#EF7F1A"
      size="13px"
      style="margin-right: 5px"
      v-bind="typeof postIcon === 'object' ? postIcon : { icon: postIcon }"
    />
  </div>
</template>

<style>
.tabSlot {
  margin-bottom: 1rem;
  align-items: center;
  padding: 5px 10px;
  width: 100%;
}
</style>
