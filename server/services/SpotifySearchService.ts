import * as request from "request-promise";
import ResponseMapper from "../mappers/ResponseMapper";
import ISearchService from "../services/ISearchService";
import SearchResult from "./SearchResult";
const baseUrl = "https://api.spotify.com/v1/search?";

class SpotifySearchService implements ISearchService {
  token: string;
  searchType: string;
  searchText: string;

  constructor(token, type, text) {
    this.token = token;
    this.searchType = type;
    this.searchText = text;
  }

  getOptions() {
    return {
      method: "GET",
      url: baseUrl + `q=${this.searchText}&type=${this.searchType}&market=from_token`,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      json: true
    };
  }

  async search(): Promise<Array<SearchResult>> {
    const options = this.getOptions();

    const response = await request(options, (error, res, body) => {
      console.log("Service results: " + res.body);
    });

    // Currenty sorting by popularity, but that will need to be adjusted for supporting different types of searches
    console.log(response);
    return ResponseMapper.mapSpotifyResults(response)
      .to(this.searchType)
      .sortBy("popularity")
      .value();
  }
}

export default SpotifySearchService;
