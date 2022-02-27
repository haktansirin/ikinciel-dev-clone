import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: () =>
      import(/* webpackChunkName: "newPost" */ "../views/NewPostView.vue"),
  },
  {
    path: "/product/:id/:slug",
    name: "ProductDetail",
    component: () =>
      import(
        /* webpackChunkName: "productDetail" */ "../views/ProductDetailView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoginned = store.getters.isLoginned;
  const pages = ["Profile", "NewPost"];
  if (pages.indexOf(to.name) !== -1 && !isLoginned) next({ name: "Login" });
  if (to.name === "Login" && isLoginned) next({ name: "Home" });
  else next();
});

export default router;
