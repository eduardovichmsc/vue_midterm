import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/home/index.vue";
import CatalogPage from "../pages/catalog/index.vue";
import BookPage from "../pages/book/index.vue";

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
  {
    path: "/favorites",
    name: "favorites",
    component: CatalogPage,
  },
  {
    path: "/book",
    name: "book",
    component: BookPage,
  },
  {
    path: "/book/:id",
    name: "book-details",
    component: BookPage,
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
