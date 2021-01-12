import { createWebHistory, createRouter } from "vue-router";
import TodoApp from "./components/TodoApp.vue";

const routes = [
  {
    path: "/active",
    name: "ActiveTodo",
    component: TodoApp,
  },
  {
    path: "/completed",
    name: "CompletedTodo",
    component: TodoApp,
  },
  {
    path: "/",
    name: "root",
    component: TodoApp,
  },
  {
    path: "/:d",
    redirect: '/'
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;