import axios from "axios";
import { __exportStar } from "tslib";
import ISearchService from "./ISearchService";
import SearchResult from "../models/SearchResult";

const url = "search/spotify"
var service = axios.create({ });

class SpotifySearchService implements ISearchService {
  async search(searchText: string, searchType: string) : Promise<Array<SearchResult>> {
    return new Promise<Array<SearchResult>>(async (resolve, reject) => {
      try {
        const res = await service.post(url, { text: searchText, type: searchType });
        
        const items = res.data.results;
        resolve(items);
        
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default SpotifySearchService;
