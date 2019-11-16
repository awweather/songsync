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
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
