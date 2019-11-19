<template>
  <modal
    @close="dialog=false"
    v-bind:dialog="dialog"
    v-bind:title="title"
    v-bind:valid="valid"
    v-bind:action="action"
  >
    <template v-slot:activator>
      <v-list-item-title color="red lighten-2" dark @click.stop="dialog=true">Pandora</v-list-item-title>
    </template>
    <template v-slot:content>
      <v-form ref="form" v-model="valid">
        <v-list>
          <v-list-item>
            <v-text-field v-model="username" label="Username" :rules="nameRules" required></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="password"
              ref="password"
              type="password"
              label="Password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-list-item>
        </v-list>
      </v-form>
    </template>
    <template v-slot:actions="{action}">
      <v-btn @click.stop="dialog=false" :disabled="!valid" @click="connect">{{action.text}}</v-btn>
    </template>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "../components/Modal.vue";
import OAuthService from "../services/OAuthService";

@Component({
  components: {
    Modal
  }
})
export default class PandoraLogin extends Vue {
  dialog: boolean = false;
  password: string = "";
  username: string = "";
  valid: boolean = false;
  title: string = "Log in with Pandora";

  async connect() {
    await this.$store.dispatch('linkPandoraAccount', {username: this.username, password: this.password});
        
  }

  action: object = {
    text: "Connect",
    valid: this.valid,
    onClick: this.connect
  };
  emailRules: Array<any> = [
    v => !!v || "E-mail is required",
    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
  ];
  nameRules: Array<any> = [v => !!v || "Username is required"];
  passwordRules: Array<any> = [
    v => !!v || "Password is required",
    v => (v && v.length >= 8) || "Password must be at least 8 characters"
  ];
}
</script>

<style>
</style>
