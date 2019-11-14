<template>
  <v-container>
    <v-layout text-center wrap>
      <v-btn>
        <a target="_self" href="/auth/spotify">Link Spotify</a>
      </v-btn>
      <v-btn>
        <a target="_self" href="/auth/google">Link Google</a>
      </v-btn>
      <v-btn>
        <a target="_self" href="/auth/amazon">Link Amazon</a>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OAuthService from "../services/OAuthService";

@Component
export default class MusicServices extends Vue {
  name: String = "MusicServices";
  posts: Array<object> = [];
  error: String = "";
  
}
</script>

