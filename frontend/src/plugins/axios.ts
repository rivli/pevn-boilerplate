import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import type { App } from "vue";

export default (app: App, config: AxiosRequestConfig) => {
  const instance = axios.create(config);
  app.provide("axios", instance);
};
