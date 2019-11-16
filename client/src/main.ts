import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import HelloWorld from './components/HelloWorld.vue';
import store from './store/store';
import { sync } from 'vuex-router-sync';
import axios from "axios";
import router from "./router";

Vue.config.productionTip = false;

//sync(store, router);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
