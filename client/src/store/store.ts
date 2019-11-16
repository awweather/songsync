import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/AuthService";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: null,
    status: "",
    spotify: {
      token: null
    }
  },
  mutations: {
    auth_request(state: any) {
      state.status = "loading";
    },
    auth_success(state: any, result: any) {
      state.status = "success";
      state.token = result.token;
      state.user = result.user;
    },
    auth_error(state: any) {
      state.status = "error";
    },
    logout(state: any) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    async login({ commit }: any, data: any) {
      try {
        var resp = await AuthService.login(data);
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("token", token);

        // Add the following line:
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", { token, user });
      } catch (err) {
        commit("auth_error", err);
        localStorage.removeItem("token");
      }
    },
    logout({ commit }: any) {
      commit("logout");
      localStorage.removeItem("token");
    },
    async register({ commit }: any, data: any) {
      try {
        var resp = await AuthService.register(data);
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("token", token);

        // Add the following line:
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", { token, user });
      } catch (err) {
        commit("auth_error", err);
        localStorage.removeItem("token");
      }
    }
  },
  getters: {
    isUserLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});
