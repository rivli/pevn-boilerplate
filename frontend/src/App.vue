<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Theme from "./composables/theme";

const { state, toggleTheme } = Theme();
const { theme } = state;

defineProps({
  routes: Array,
});

const navigation = ref([
  {
    to: "/",
    title: "Main",
  },
  {
    to: "/about",
    title: "About",
  },
]);
</script>

<template>
  <pine-app>
    <pine-app-bar logo="vue-icon">
      Title

      <div class="nav">
        <template v-for="(route, index) in navigation" :key="index">
          <router-link
            :to="route.to"
            :title="route.title"
            active-class="active"
          >
            {{ route.title }}
          </router-link>
        </template>
      </div>
      <pine-btn>
        <pine-icon
          :icon="theme !== 'light' ? 'sun' : 'moon'"
          @click="toggleTheme"
        />
      </pine-btn>
    </pine-app-bar>
    <div class="workpart light-bg">
      <RouterView />
    </div>
  </pine-app>
</template>

<style scoped>
.nav {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
}
</style>
