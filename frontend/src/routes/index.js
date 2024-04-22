import { createWebHistory, createRouter } from "vue-router";

import ViewHome from "../views/ViewHome.vue";

import ViewLogin from "../views/ViewLogin.vue";
import ViewRegister from "../views/ViewRegister.vue";
import ViewBookDetail from "../views/ViewBookDetail.vue";
import ViewBorrowBook from "../views/ViewBorrowBook.vue";
import ViewHome_Admin from "../views/ViewHome_Admin.vue";
import ViewPublisher_Admin from "../views/ViewPublisher_Admin.vue";
import ViewModify_Publisher from "../views/ViewModify_Publisher.vue";
import ViewUpdate_Publisher from "../views/ViewUpdate_Publisher.vue";
import ViewAddBook_Admin from "../views/ViewAddBook_Admin.vue";
import ViewUpdateBook_Admin from "../views/ViewUpdateBook_Admin.vue";
import ViewBorrowBook_Admin from "../views/ViewBorrowBook_Admin.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: ViewHome,
  },
  {
    path: "/login",
    name: "login",
    component: ViewLogin,
  },
  {
    path: "/register",
    name: "register",
    component: ViewRegister,
  },
  {
    path: "/:id",
    name: "book-detail",
    component: ViewBookDetail,
  },
  {
    path: "/borrow-book",
    name: "borrow-book",
    component: ViewBorrowBook,
  },
  {
    path: "/admin",
    name: "view-admin-home",
    component: ViewHome_Admin,
  },
  {
    path: "/admin/publisher",
    name: "view-admin-publisher",
    component: ViewPublisher_Admin,
  },
  {
    path: "/admin/publisher/create",
    name: "view-admin-publisher-create",
    component: ViewModify_Publisher,
  },
  {
    path: "/admin/publisher/:id",
    name: "view-admin-publisher-update",
    component: ViewUpdate_Publisher,
  },
  {
    path: "/admin/book/create",
    name: "view-admin-book-create",
    component: ViewAddBook_Admin,
  },
  {
    path: "/admin/book/:id",
    name: "view-admin-book-update",
    component: ViewUpdateBook_Admin,
  },
  {
    path: "/admin/borrow-book",
    name: "view-admin-borrow-book",
    component: ViewBorrowBook_Admin,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
