<template>
  <v-app>
    <v-app-bar dark app class="indigo">
      <v-toolbar-title class="headline text-uppercase margin-right-5">
        <span>Song</span>
        <span class="font-weight-light">Sync</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.getters.isUserLoggedIn" text to="/register">
        <span class="mr-2">Sign Up</span>
      </v-btn>
      <v-btn text to="/login" v-if="!$store.getters.isUserLoggedIn">
        <span class="mr-2">Log In</span>
      </v-btn>
      <v-btn
        text
        to="/login"
        @click="logout"
        v-if="$store.getters.isUserLoggedIn"
      >
        <span class="mr-2">Log out</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <music-services
        class="float-left"
        v-if="$store.getters.isUserLoggedIn"
      ></music-services>
      <router-view></router-view>
    </v-content>
    <v-footer dark padless>
      <v-card
        flat
        tile
        class="full-width indigo lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Created by Anthony Weatherly</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceProvidersEnum from "./enums/ServiceProviders";
import MusicServices from "./components/musicServices/MusicServices.vue";

export default Vue.extend({
  name: "App",
  components: {
    MusicServices,
    //HelloWorld
  },
  data: () => ({
    icons: ["mdi-twitter"],
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  created() {},
});
</script>

<style lang="less">
@color-white: #ecebf3;
@color-green: #77bfa3;

.primary-background {
  background-color: #6d7275 !important;
}

.primary-background div,
.primary-background span {
  color: @color-white;
}

.secondary-background {
  background-color: @color-white !important;
}

.tertiary-background {
  background-color: @color-green;
}

.color-white {
  color: @color-white !important;
}
.margin-right-5 {
  margin-right: 5px;
}

.margin-top-60 {
  margin-top: 60px;
}

.float-left {
  float: left;
}

.full-width {
  width: 100%;
}

.header {
  position: relative;
  height: 500px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background: rgb(31, 187, 199);
  background: linear-gradient(
    90deg,
    rgba(31, 187, 199, 1) 0%,
    rgba(38, 232, 247, 1) 45%,
    rgba(31, 187, 199, 1) 100%
  );
  // background-image: url("../images/header-image.jpg");
}

.overlay {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.1;
}

.hero-content {
  position: absolute;
  // top: 35%;
  margin: 0;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
}

.hero-container {
  position: absolute;
  top: 50%;
  width: 100%;
}

.brand {
  margin: 0;
  padding: 0 0 10px;
  font-size: 48px;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 5.5px;
  text-align: center;

  a {
    color: #fff !important;
  }
}

.description {
  margin: 0;
  padding: 0 0 10px;
  font-size: 16px;
  // font-weight: 500;
  line-height: 1.5;
  letter-spacing: 3.5px;
  text-align: center;
  color: #fff;
}

.nav-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-list {
  margin: 0;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  padding: 0;
  list-style: none;

  li {
    letter-spacing: 0.05em;
    background: none;
    padding: 7px 14px 10px;
  }

  a {
    text-transform: uppercase;
    color: #fff;
    font-size: 12px;
    opacity: 0.7;

    &:hover {
      text-decoration: underline;
    }
  }
}

.avatar {
  max-width: 250px;
  max-height: 250px;

  img {
    border-radius: 50%;
  }
}

.site-footer {
  background-color: #000;
  color: #515151;
}
.container {
  margin: 0 auto;
  max-width: 750px;
  padding: 1rem;
}
</style>
