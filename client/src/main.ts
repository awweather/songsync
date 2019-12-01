import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/store";
import axios from "axios";
import router from "./router";

Vue.prototype.$http = axios;

//sync(store, router);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
