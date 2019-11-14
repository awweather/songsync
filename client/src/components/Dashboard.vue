<template>
  <v-container>
    <v-layout text-center wrap>
      <v-row class="justify-center">
        <v-col lg="8">
          <v-card>
            <v-card-title>Find your favorite song, playlist, or artist.</v-card-title>
            <v-text-field class="padding-10" v-model="searchText" label="Search"></v-text-field>
            <v-tabs dark centered>
              <v-tab @click="tab.click(tab.text)" v-for="(tab, i) in tabs" :key="i">{{ tab.text }}</v-tab>
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
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Search from "./Search.vue";
import ServiceProvidersEnum from "../enums/ServiceProviders";

@Component({
  components: {
    Search
  }
})
export default class Dashboard extends Vue {
  searchType: string = "artist";
  searchText: string = "";
  searchResults: Array<any> = [];

  serviceProviders = {
    spotify: ServiceProvidersEnum.Spotify,
    amazon: ServiceProvidersEnum.Amazon
  };

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
