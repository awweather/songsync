<template>
  <v-navigation-drawer
    class="secondary-background"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-title>{{ $store.getters.userName }}</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-img
            width="20"
            contain
            :src="require('../../assets/Spotify_Icon_RGB_Green.png')"
          ></v-img>
          <v-img
            v-if="$store.getters.spotifyLinked"
            contain
            width="10"
            height="10"
            :src="require('../../assets/Green_Dot_Icon.png')"
          ></v-img>
        </v-list-item-icon>
        <v-list-item-content>
          <spotify-login></spotify-login>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-img
            width="20"
            :src="require('../../assets/Pandora_Icon.png')"
          ></v-img>
          <v-img
            v-if="$store.getters.pandoraLinked"
            contain
            width="10"
            height="10"
            :src="require('../../assets/Green_Dot_Icon.png')"
          ></v-img>
        </v-list-item-icon>
        <v-list-item-content>
          <pandora-connected
            v-if="$store.getters.pandoraLinked"
          ></pandora-connected>
          <pandora-login v-else></pandora-login>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-img width="20" :src="item.icon"></v-img>
        </v-list-item-icon>

        <v-list-item-content>
          <modal @close="dialog=false" v-bind:dialog="dialog"></modal>
           <v-list-item-title color="red lighten-2" dark @click.stop="dialog=true">{{item.title}}</v-list-item-title>
          <a class="v-list-item_title" :href="item.url" target="_self">{{ item.title }}</a>
    </v-list-item-content>-->
    <!-- </v-list-item> -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OAuthService from "../../services/OAuthService";
import ServiceProvidersEnum from "../../enums/ServiceProviders";
import Modal from "../../components/Modal.vue";
import PandoraLogin from "./modals/PandoraLogin.vue";
import SpotifyLogin from "./modals/SpotifyLogin.vue";
import PandoraConnected from "./modals/PandoraConnected.vue";

@Component({
  components: {
    Modal,
    PandoraLogin,
    PandoraConnected,
    SpotifyLogin
  }
})
export default class MusicServices extends Vue {
  dialog: boolean = false;
  name: String = "MusicServices";
  error: String = "";
  drawer: boolean = true;
  mini: boolean = true;
  // items: Array<any> = [
  //   {
  //     title: "Spotify",
  //     url: "auth/spotify",
  //     icon: require("../assets/Spotify_Icon_RGB_Green.png")
  //   },
  //   {
  //     title: "Pandora",
  //     url: "auth/pandora",
  //     icon: require("../assets/Pandora_Icon.png")
  //   }
  // ];
  providers: ServiceProvidersEnum = ServiceProvidersEnum.Spotify;

  async linkAccount(provider) {
    this.$store.dispatch("linkAccount", provider);
  }
}
</script>

<style scoped></style>
