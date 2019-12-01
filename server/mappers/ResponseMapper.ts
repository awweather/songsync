import SearchResult from "../services/SearchResult";

/**
 * This class is intended to take the raw responses from external API's and map them
 * into POTO's that the app can use
 * It uses a builder pattern to allow multiple chainings/transformations
 */
class ResponseMapper {
  static mapSpotifyResults(results) {
    let mappedResult = [];
    return {
      to: function(type) {
        if (type === "artist") {
          mappedResult = results["artists"].items.map(item => {
            return new SearchResult({ title: item.name, subtitle: item.type });
          });
        }

        return this;
      },
      value: function() : Array<SearchResult> {
        return mappedResult;
      }
    };
  }
}

export default ResponseMapper;
