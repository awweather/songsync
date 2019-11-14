import ISearchService from "./ISearchService";
import SpotifySearchService from "./SpotifySearchService";

class SearchServiceFactory {
    static getService(provider: string) : ISearchService{
        switch (provider){
            case "spotify":
                return new SpotifySearchService();
            default:
                throw new Error(provider + " is not a valid provider");

        }
    }
}

export default SearchServiceFactory;