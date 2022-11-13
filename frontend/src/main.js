import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PineUI from "./components/PineUI";

import axios from "./plugins/axios";

const app = createApp(App);

app.use(axios);
app.use(createPinia());
app.use(router);

Object.keys(PineUI).map((name) => {
  app.component("Pine" + name, PineUI[name]);
});

app.mount("#app");
