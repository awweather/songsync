<template>
  <div>
    <v-container>
      <v-layout text-center wrap>
        <v-row class="justify-center">
          <v-col lg="8">
            <v-card>
              <v-card-title
                >Find your favorite song, playlist, or artist.</v-card-title
              >
              <v-text-field
                class="padding-10"
                v-model="searchText"
                label="Search"
              ></v-text-field>
              <v-tabs dark centered>
                <v-tab
                  @click="tab.click(tab.text)"
                  v-for="(tab, i) in tabs"
                  :key="i"
                  >{{ tab.text }}</v-tab
                >
              </v-tabs>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col lg="8">
            <search
              :provider="serviceProviders.spotify"
              :searchText="searchText"
              :searchType="searchType"
            ></search>
          </v-col>
        </v-row>
      </v-layout>
      <!-- These should be componentized in an Alert component -->
      <v-alert dismissible v-model="pandoraAlert" type="success"
        >Pandora Linked successfully.</v-alert
      >
      <v-alert dismissible v-model="spotifyAlert" type="success"
        >Spotify Linked successfully.</v-alert
      >
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Search from "./Search.vue";
import ServiceProvidersEnum from "../enums/ServiceProviders";
import MusicServices from "./musicServices/MusicServices.vue";
import AuthService from "../services/AuthService";

@Component({
  components: {
    Search,
    MusicServices
  },
  created() {}
})
export default class Dashboard extends Vue {
  searchType: string = "artist";
  searchText: string = "";
  searchResults: Array<any> = [];
  dialog: boolean = false;
  pandoraAlert: boolean = false;
  spotifyAlert: boolean = false;
  serviceProviders = {
    spotify: ServiceProvidersEnum.Spotify,
    amazon: ServiceProvidersEnum.Amazon
  };

  async created() {
    let self = this;
    this.$store.watch(
      (state, getters) => getters.pandoraLinked,
      (newValue, oldValue) => {
        if (newValue && newValue !== oldValue) self.pandoraAlert = true;
      }
    );

    this.$store.watch(
      (state, getters) => getters.spotifyLinked,
      (newValue, oldValue) => {
        if (newValue && newValue !== oldValue) self.spotifyAlert = true;
      }
    );

    try {
      const user = await AuthService.getUser();
      console.log(user);
      this.$store.dispatch("linkAccounts", user.data.user.linkedAccounts);
    } catch (err) {
      this.$store.dispatch("logout");
      this.$router.push("login");
      console.log(err);
    }
  }

  tabs: Array<object> = [
    {
      text: "Artist",
      click: this.onSearchTypeClicked
    },
    {
      text: "Track",
      click: this.onSearchTypeClicked
    },
    {
      text: "Album",
      click: this.onSearchTypeClicked
    },
    {
      text: "Playlist",
      click: this.onSearchTypeClicked
    },
    {
      text: "Station",
      click: this.onSearchTypeClicked
    }
  ];

  spotifyLogoUrl: string = "../assets/Spotify_Logo_RGB_Green.png";
  onSearchTypeClicked(type) {
    this.searchType = type.toLowerCase();
  }
}
</script>

<style>
.ss-spotify-logo {
  width: 150px;
}

.padding-10 {
  padding: 10px;
}
</style>
