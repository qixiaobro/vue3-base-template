import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import wxApi from "@/utils/wxApi";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $wxApi: any;
  }
}

import Vconsole from "vconsole"; //生产环境需注释，不然还是会被引入。
if (process.env.NODE_ENV === "development") {
  new Vconsole();
}

const app = createApp(App);
app.use(wxApi);
app.use(store);
app.use(router);
app.mount("#app");
