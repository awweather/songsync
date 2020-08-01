<template>
  <div>
    <header class="header">
      <div class="overlay"></div>
      <div class="hero-container">
        <div class="heroContent">
          <p class="brand">
            Hi, Welcome to SongSync. 
          </p>
          <p class="description">
            Query any music service.
          </p>
        </div>
      </div>
    </header>
    <v-container>
      hello world
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Landing extends Vue {}
</script>
