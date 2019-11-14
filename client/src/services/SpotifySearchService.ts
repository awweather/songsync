import axios from "axios";
import { __exportStar } from "tslib";
import ISearchService from "./ISearchService";
import SearchResult from "../models/SearchResult";

const url = "https://api.spotify.com/v1/search?";

// Token is hardcoded - to get a new one, click the "Link Spotify" and login, should return an accessToken in the URL
var api = axios.create({
  baseURL: url,
  headers: {"Authorization":"Bearer BQAv1hbkkP6DQkCJBoVJVyuECcoUsVnwXl5qzO7h9B-wyK8sqGell6C_zCF1OfZJqmgWW72ljy_iJ_E6cL_ZdQi81YTillhQdWcQyYZKw6jwATxSwJAIp-9V47yOnWHlLRtr44pyY7O4s6yj4aE1vNorh0FzgaKGww" }
})


class SpotifySearchService implements ISearchService {
  async search(searchText: string, searchType: string) : Promise<Array<SearchResult>> {
    return new Promise<Array<SearchResult>>(async (resolve, reject) => {
      try {
        const res = await api.get(url + `q=${searchText}&type=${searchType}`);
        if (res.data[searchType + "s"]){
          let items = res.data[searchType + "s"].items.map((item: any) => {
            return new SearchResult({ title: item.name, subTitle: item.artist });
          });

          resolve(items);
        }
          
        
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default SpotifySearchService;
