import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExpandAlt,
  faCompressAlt,
  faInbox,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue3TouchEvents from "vue3-touch-events";

library.add(faExpandAlt, faCompressAlt, faInbox, faCheck, faPlus);

createApp(App)
  .use(router)
  .use(Vue3TouchEvents)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
