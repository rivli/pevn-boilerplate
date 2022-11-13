<template>
  <div id="appbar" class="filler">
    <rn-icon icon="logo" height="55" width="80" />

    <div id="nav">
      <template v-for="(route, index) in routes" :key="index">
        <router-link
          :to="route.to"
          :title="route.title"
          active-class="active"
          >{{ route.title }}</router-link
        >
      </template>
    </div>

    <rn-btn icon text>
      <rn-icon
        :icon="theme !== 'light' ? 'sun' : 'moon'"
        @click="toggleTheme"
      />
    </rn-btn>
    <rn-icon icon="rnlogo" height="40" width="60" />
  </div>
</template>

<script setup>
import themeState from "../state/theme";

const { state, toggleTheme } = themeState();
const { theme } = state;

defineProps({
  routes: Array,
});
</script>
