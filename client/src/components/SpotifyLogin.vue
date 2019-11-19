<template>
  <modal @close="dialog=false" v-bind:dialog="dialog" v-bind:title="title">
    <template v-slot:activator>
      <v-list-item-title color="red lighten-2" dark @click.stop="dialog=true">Spotify</v-list-item-title>
    </template>
    <template v-slot:actions>
      <a @click.stop="dialog=false" class="v-list-item_title" :href="'auth/spotify'" target="_self">Connect</a>
    </template>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "../components/Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class SpotifyLogin extends Vue {
  dialog: boolean = false;
  password: string = "";
  username: string = "";
  title: string = "Log in with Spotify";
}
</script>

<style>
</style>
