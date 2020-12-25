import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import wxApi from "@/utils/wxApi";

import Vconsole from "vconsole"; //生产环境需注释，不然还是会被引入。
if (process.env.NODE_ENV === "development") {
  new Vconsole();
}

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

App.config.globalProperties.$wxApi = wxApi;
