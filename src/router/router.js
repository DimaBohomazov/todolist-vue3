import { createWebHistory, createRouter } from "vue-router";
import AllTodo from "./filters/AllTodo.vue";
import ActiveTodo from "./filters/ActiveTodo.vue";
import CompletedTodo from "./filters/CompletedTodo.vue";

const routes = [
  {
    path: "/",
    name: "AllTodo",
    component: AllTodo,
  },
  {
    path: "/active",
    name: "ActiveTodo",
    component: ActiveTodo,
  },
  {
    path: "/completed",
    name: "CompletedTodo",
    component: CompletedTodo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;