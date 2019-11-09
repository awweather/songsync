<template>
  <v-container>
    <v-layout text-center wrap>
      <h3>Welcome to the dashboard!</h3>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dashboard extends Vue {
  name: String = "Dashboard";
}

</script>
