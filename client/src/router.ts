import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import MusicServices from "./components/MusicServices.vue";
import Landing from "./components/Landing.vue";
import Dashboard from "./components/Dashboard.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import store from "./store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { name: "landing", path: "/", component: Landing, props: true },
    { name: "register", path: "/register", component: Register, props: true },
    { name: "login", path: "/login", component: Login, props: true },
    {
      name: "Dashboard",
      path: "/dashboard",
      component: Dashboard,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isUserLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
