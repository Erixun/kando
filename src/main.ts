import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExpandAlt, faCompressAlt, faInbox, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faExpandAlt, faCompressAlt, faInbox, faCheckSquare);

createApp(App).use(router).component("fa-icon", FontAwesomeIcon).mount("#app");
