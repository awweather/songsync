import ISearchService from "./ISearchService";
import SpotifySearchService from "./SpotifySearchService";
import ServiceProvidersEnum from "../enums/ServiceProviders";
class SearchServiceFactory {
    static getService(provider: string) : ISearchService{
        switch (provider){
            case ServiceProvidersEnum.Spotify:
                return new SpotifySearchService();
            default:
                throw new Error(provider + " is not a valid provider");

        }
    }
}

export default SearchServiceFactory;