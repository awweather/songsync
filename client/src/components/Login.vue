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
          <v-toolbar-title>Log in</v-toolbar-title>
        </v-toolbar>
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="true"
        >
        <v-list>
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
        </v-list>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn @click="login" color="primary" :disabled="!valid">Login</v-btn>
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
export default class Login extends Vue {
  name: String = "Login";
  email: String = "";
  password: String = "";
  valid: Boolean = false;
  emailRules: Array<any> = [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'];
  nameRules: Array<any> = [v => !!v || 'Username is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters'];
  passwordRules: Array<any> = [v => !!v || 'Password is required', v => (v && v.length >= 8) || 'Password must be at least 8 characters'];
  
  async login(e: any) {
    e.preventDefault();
    let info = {
      email: this.email,
      password: this.password
    };
    await this.$store.dispatch('login', info);

    if (this.$store.getters.isUserLoggedIn){
      this.$router.push('Dashboard');
    }
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
