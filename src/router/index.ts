import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import TheKanbanBoard from "@/views/TheKanbanBoard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/board",
    name: "TheKanbanBoard",
    component: TheKanbanBoard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
