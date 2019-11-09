import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import HelloWorld from './components/HelloWorld.vue';
import store from './store/store';
import { sync } from 'vuex-router-sync';

import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import MusicServices from "./components/MusicServices.vue";
import Dashboard from "./components/Dashboard.vue";


Vue.config.productionTip = false;
Vue.use(VueRouter);

const accessToken = localStorage.getItem("access_token");

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = accessToken;
}

const router = new VueRouter({
  routes: [
    { path: '/', component: HelloWorld },
    { name: "register", path: '/register', component: Register, props: true },
    { name: "login", path: '/login', component: Login, props: true },
    { name: "MusicServices", path: '/services', component: MusicServices, props: true},
    { name: "Dashboard", path: '/dashboard', component: Dashboard, props: true}
  ]
});

sync(store, router);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
