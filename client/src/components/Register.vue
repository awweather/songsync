<template>
  <v-container>
    <v-layout text-center wrap>
    <v-row align="center">
       <v-card
        class="mx-auto"
        min-width="344"
        outlined
        >
        <v-toolbar class="primary" :dark="true" :flat="true">
          <v-toolbar-title>Sign up</v-toolbar-title>
        </v-toolbar>
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="true"
        >
        <v-list>
          <v-list-item>
            <v-text-field
              v-model="username"
              :counter="10"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              ref="password"
              type="password"

              label="Password"
              required
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="password2"
              :rules="password2Rules"
              ref="password"
              type="password"
              label="Re-enter password"
              required
            ></v-text-field>
          </v-list-item>        
        </v-list>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn @click="register" color="primary" :disabled="!valid">Create</v-btn>
        </v-card-actions>
      </v-card>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AuthService from "../services/AuthService";
import VeeValidate from "vee-validate";

@Component
export default class Register extends Vue {
  name: String = "Register";
  email: String = "";
  valid: Boolean = false;
  username: String = "";
  password: String = "";
  password2: String = "";
  emailRules: Array<any> = [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'];
  nameRules: Array<any> = [v => !!v || 'Username is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters'];
  passwordRules: Array<any> = [v => !!v || 'Password is required', v => (v && v.length >= 8) || 'Password must be at least 8 characters'];
  password2Rules: Array<any> = [v => !!v || 'Re-enter password', v => (v !== this.password) || 'Password does not match'];

  register(e: any) {
    e.preventDefault();
    let info = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    var self = this;
    AuthService.register(info).then(function(res) {
      self.$store.dispatch('setToken', res.data.token);
      self.$store.dispatch('setUser', res.data.user);
      self.$router.push({name: "Dashboard"});
    }).catch(function(err){
      console.log(err);
    })
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
