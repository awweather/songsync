import axios from "axios";
import { __exportStar } from "tslib";
import ISearchService from "./ISearchService";
import SearchResult from "../models/SearchResult";
import ServiceProviders from "@/enums/ServiceProviders";

const url = "search/";
var service = axios.create({});

class SearchService implements ISearchService {
  provider: string;
  constructor(provider: string) {
    this.provider = provider;
  }

  async search(
    searchText: string,
    searchType: string,
    serviceProvider: string
  ): Promise<Array<SearchResult>> {
    return new Promise<Array<SearchResult>>(async (resolve, reject) => {
      try {
        const res = await service.post(url + serviceProvider, {
          text: searchText,
          type: searchType
        });

        const items = res.data.results;
        resolve(items);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default SearchService;
