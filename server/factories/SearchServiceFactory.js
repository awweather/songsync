const SpotifySearchService = require("../services/SpotifySearchService");

class SearchServiceFactory {
  constructor() {}

  getService(serviceProvider, token, searchType, searchText) {
    switch (serviceProvider) {
      case "spotify":
        return new SpotifySearchService(token, searchType, searchText);
    }
  }
}
module.exports = new SearchServiceFactory();
