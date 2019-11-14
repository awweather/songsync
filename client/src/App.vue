<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Song</span>
        <span class="font-weight-light">Sync</span>
      </v-toolbar-title>
      <v-btn text to="/dashboard" v-if="$store.state.isUserLoggedIn">
        Browse
      </v-btn>
      <v-btn text to="/services" v-if="$store.state.isUserLoggedIn">
        Add Music Services
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.isUserLoggedIn" text to="/register">
        <span class="mr-2">Sign Up</span>
      </v-btn>
      <v-btn text to="/login" v-if="!$store.state.isUserLoggedIn">
        <span class="mr-2">Log In</span>
      </v-btn>
      <v-btn text to="/login" @click="logout" v-if="$store.state.isUserLoggedIn">
        <span class="mr-2">Log out</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceProvidersEnum from "./enums/ServiceProviders";

export default Vue.extend({
  name: "App",
  components: {
    //HelloWorld
  },
  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({ name: "login" });
    }
  },
  created() {
  }
});
</script>
