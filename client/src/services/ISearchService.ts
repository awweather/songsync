import SearchResult from "../models/SearchResult";

interface ISearchService {
    search(searchText: string, searchType: string) : Promise<Array<SearchResult>>
}

export default ISearchService;
