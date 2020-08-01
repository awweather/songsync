import * as request from "request-promise";
import ResponseMapper from "../mappers/ResponseMapper";
import ISearchService from "./ISearchService";
import SearchResult from "./SearchResult";
const baseUrl = "https://www.pandora.com/v1/search/getStationRecommendations";

class PandoraSearchService implements ISearchService {
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
      url: baseUrl + `q=${this.searchText}&type=${this.searchType}`,
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

    return ResponseMapper.mapSpotifyResults(response)
      .to(this.searchType)
      .value();
  }
}

export default PandoraSearchService;
