import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "reflect-metadata"

createApp(App).use(router).mount("#app");
