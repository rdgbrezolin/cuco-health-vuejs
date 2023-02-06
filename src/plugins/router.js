import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "",
    name: "list",
    component: () => import("../components/ClientList.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/ClientAdd.vue"),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../components/ClientEdit.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
