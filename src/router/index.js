import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/home/index.vue";
import CatalogPage from "../pages/catalog/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/catalog",
    name: "catalog",
    component: CatalogPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
