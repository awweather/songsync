import SearchResult from "../services/SearchResult";
import { stringify } from 'querystring';

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
            let imageUrl =
              item.images && item.images[0] ? item.images[0].url : "";
            return new SearchResult({
              id: item.id,
              title: item.name,
              subtitle: item.type,
              image: imageUrl,
              popularity: item.popularity
            });
          });
        }

        return this;
      },
      sortBy: function(field) {
        mappedResult.sort((a, b) => {
          return parseInt(b[field], 10) - parseInt(a[field], 10);
        });

        return this;
      },
      value: function(): Array<SearchResult> {
        console.log(mappedResult);
        return mappedResult;
      }
    };
  }
}

export default ResponseMapper;
