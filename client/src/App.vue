<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase margin-right-5">
        <span>Song</span>
        <span class="font-weight-light">Sync</span>
      </v-toolbar-title>
      <v-btn text to="/dashboard" v-if="$store.getters.isUserLoggedIn">Browse</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.getters.isUserLoggedIn" text to="/register">
        <span class="mr-2">Sign Up</span>
      </v-btn>
      <v-btn text to="/login" v-if="!$store.getters.isUserLoggedIn">
        <span class="mr-2">Log In</span>
      </v-btn>
      <v-btn text to="/login" @click="logout" v-if="$store.getters.isUserLoggedIn">
        <span class="mr-2">Log out</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <music-services class="float-left" v-if="$store.getters.isUserLoggedIn"></music-services>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceProvidersEnum from "./enums/ServiceProviders";
import MusicServices from "./components/musicServices/MusicServices.vue";

export default Vue.extend({
  name: "App",
  components: {
    MusicServices
    //HelloWorld
  },
  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  created() {}
});
</script>

<style scoped>
.margin-right-5 {
  margin-right: 5px;
}

.margin-top-60 {
  margin-top: 60px;
}

.float-left {
  float: left;
}

</style>