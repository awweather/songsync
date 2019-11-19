import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/AuthService";
import OAuthService from "../services/OAuthService";
import axios from "axios";
import ServiceProvidersEnum from "../enums/ServiceProviders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: null,
    status: "",
    spotify: {
      token: null
    },
    pandora: {
      token: localStorage.getItem("pandora_token") || null
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
    link_account_success(state: any, result: any) {
      state[result.service].token = result.token;
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
        const resp = await AuthService.register(data);
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
    async linkAccount({commit}, service) {
      try {
        const resp = await OAuthService.linkAccount(service);
        const token = resp.data.accessToken;
        localStorage.setItem(service + "_token", token);
        commit("link_account_success", { token, service });
      } catch (err) {
        console.log(err);
      }
    },
  async linkPandoraAccount({commit}, data) {
      try {
        const resp = await OAuthService.linkPandora(data);
        const token = resp.data.accessToken;
        const service = ServiceProvidersEnum.Pandora;
        localStorage.setItem(service + "_token", token);
        commit("link_account_success", { token, service });
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    isUserLoggedIn: state => !!state.token,
    pandoraLinked: state => state[ServiceProvidersEnum.Pandora].token,
    authStatus: state => state.status
  }
});
