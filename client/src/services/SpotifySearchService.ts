import axios from "axios";
import { __exportStar } from "tslib";
import ISearchService from "./ISearchService";
import SearchResult from "../models/SearchResult";

const url = "https://api.spotify.com/v1/search?";

// Token is hardcoded - to get a new one, click the "Link Spotify" and login, should return an accessToken in the URL
var api = axios.create({
  baseURL: url,
  headers: {"Authorization":"Bearer BQCfjq70x8JC1_uOmn_EUQC9npRkK-d-nJ8Rw5jz-Fhr7PVU6wnq1Ism8myC8Vb8TEAGCLLsmLMA9I-iShtqN3kK6DSXWUCQBrk7Vg2vX6RtT01XxLYQFZYYJWcR2ZKtrzEknP3td53J4jvi_p8fOttrxWB-DmcgNA" }
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
