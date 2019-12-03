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

    it("maps and sorts artist filter", () => {
      const filter = "artist";
      const results = {
        artists: {
          items: [
            {
              id: "1",
              name: "Spotify_1",
              type: "Artist_1",
              popularity: "5"
            },
            {
              id: "2",
              name: "Spotify_2",
              type: "Artist_2",
              popularity: "80"
            },
            {
              id: "3",
              name: "Spotify_3",
              type: "Artist_3",
              popularity: "40"
            }
          ]
        }
      };

      const result = ResponseMapper.mapSpotifyResults(results)
        .to(filter)
        .sortBy("popularity")
        .value();

      expect(result[0].id).to.equal("2");
      expect(result[1].id).to.equal("3");
      expect(result[2].id).to.equal("1");
    });
  });
});
