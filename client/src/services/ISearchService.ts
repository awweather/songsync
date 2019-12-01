import SearchResult from "../models/SearchResult";
import ServiceProviders from '@/enums/ServiceProviders';

interface ISearchService {
    provider: string
    search(searchText: string, searchType: string, service: string) : Promise<Array<SearchResult>>
}

export default ISearchService;
