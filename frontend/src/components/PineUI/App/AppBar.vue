<template>
  <div class="appbar">
    <pine-icon
      height="55"
      width="80"
      v-if="logo"
      :icon="logo"
      v-bind="typeof logo === 'object' ? logo : { icon: logo }"
    />

    <slot />
  </div>
</template>

<script setup>
defineProps({
  logo: [String, Object],
});
</script>

<style lang="scss">
.appbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 55px;
  border-bottom: 1px solid var(--borderColor);
  background-color: rgba(var(--backgroundColorLightRGB), 0.7);
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 5px 16px;

  a {
    padding: 3px 15px;
    text-decoration: none;
    color: var(--appBarTextColor);
    letter-spacing: 1rem;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0.0892857143em;
    font-family: Roboto, sans-serif;

    &.active {
      color: var(--primaryColor);
      border-bottom: 3px solid var(--primaryColor);
      padding-bottom: 0px;
      font-weight: 400;
    }
  }

  a:hover {
    color: var(--appBarTextColor);
    background-color: rgba(var(--primaryColorRGB), 0.5);
  }

  .logo {
    font-size: 1rem;
    font-weight: bold;
    height: 55px;
  }
}
</style>
