<template>
  <modal @close="dialog = false" v-bind:dialog="dialog" v-bind:title="title">
    <template v-slot:activator>
      <v-list-item-title color="red lighten-2" dark @click.stop="dialog = true"
        >Pandora</v-list-item-title
      >
    </template>
    <template v-slot:content>
      <v-flex>Connected!</v-flex>
    </template>
    <template v-slot:actions="{ action }">
      <v-btn class="secondary" @click.stop="dialog = false">Close</v-btn>
    </template>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "../../Modal.vue";
import OAuthService from "../../../services/OAuthService";

@Component({
  components: {
    Modal
  }
})
export default class PandoraLogin extends Vue {
  dialog: boolean = false;
  title: string = "Pandora";
  name: string = "PandoraConnected";
}
</script>

<style></style>
