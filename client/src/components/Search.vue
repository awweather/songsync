<template>
  <div>
    <v-card class="mx-auto" flat :loading="loading">
      <v-list dense class="ss-search-body">
        <v-list-item-group v-if="searchResults.length > 0">
          <v-list-item v-for="(result, i) in searchResults" :key="i">
            <v-list-item-avatar color="grey"> </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ result.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ result.subtlte }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <v-list-text v-else>No results</v-list-text>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ISearchService from "../services/ISearchService";
import SearchService from "../services/SearchService";
import SearchResult from "../models/SearchResult";

@Component
export default class Search extends Vue {
  @Prop() provider: string;
  @Prop() searchType: string;
  @Prop() searchText: string;

  filter: string = "";
  loading: boolean = false;
  searchResults: Array<SearchResult> = [];
  searchService: ISearchService = new SearchService(this.provider);

  @Watch("searchType")
  async onSearchTypeChanged(val: string, oldVal: string) {
    this.filter = val;
  }

  @Watch("searchText")
  async onSearchTextChanged(val: string, oldVal: string) {
    if (val) {
      this.loading = true;
      this.searchResults.length = 0;

      let results = await this.searchService.search(
        val,
        this.filter || "artist",
        this.provider
      );
      let searchResults = this.searchResults;
      results.forEach(function(i) {
        searchResults.push(i);
      });

      this.loading = false;
    } else {
      this.searchResults.length = 0;
    }
  }

  logos = {
    spotify: {
      icon: require("../assets/Spotify_Logo_RGB_Green.png")
    },
    amazon: {
      icon: require("../assets/Amazon_Prime-Music_Logo.png")
    }
  };
}
</script>

<style scoped>
.ss-search-logo {
  width: 150px;
}

.ss-search-body {
  max-height: 250px;
  min-height: 250px;
  font-size: 12px;
  overflow: scroll;
}
</style>
