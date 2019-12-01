import * as chai from "chai";
import ResponseMapper from "../mappers/ResponseMapper";
const expect = chai.expect;

describe("Response Mapper", () => {
  describe("Spotify", () => {
    it("maps artist filter", () => {
      const filter = "artist";
      const results = {
        artists: {
          items: [
            {
              name: "Spotify_1",
              type: "Artist_1"
            },
            {
              name: "Spotify_2",
              type: "Artist_2"
            }
          ]
        }
      };

      const result = ResponseMapper.mapSpotifyResults(results)
        .to(filter)
        .value();
        
      expect(result[0].title).to.equal(results.artists.items[0].name);
      expect(result[0].subtitle).to.equal(results.artists.items[0].type);
      expect(result[1].title).to.equal(results.artists.items[1].name);
      expect(result[1].subtitle).to.equal(results.artists.items[1].type);
    });
  });
});
