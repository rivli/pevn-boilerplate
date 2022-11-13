<script setup>
defineProps({
  text: {
    default: false,
    type: Boolean,
  },
  icon: Boolean,
  outlined: Boolean,
  color: String,
});
</script>

<template>
  <div
    class="btn"
    :class="{
      btn__text: text,
      btn__icon: icon,
      btn__outlined: outlined,
      ['btn--' + color]: color,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.btn {
  cursor: pointer;
  padding: 5px 10px;
  display: inline-block;
  font-weight: 600;
  text-transform: uppercase;
  box-sizing: content-box;

  &__outlined {
    border: 2px solid;
  }

  &__block {
    display: block;
  }

  &__icon {
    display: inline-flex;
  }
}
</style>
