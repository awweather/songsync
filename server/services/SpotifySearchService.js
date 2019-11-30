const request = require("request-promise");
const baseUrl = "https://api.spotify.com/v1/search?";
const ResponseMapper = require("../mappers/ResponseMapper");

class SpotifySearchService {
    constructor(token, type, text) {
        this.token = token;
        this.searchType = type;
        this.searchText = text;
    }

    getOptions() {
        return {
            method: "GET",
            url: baseUrl + `q=${this.searchText}&type=${this.searchType}`,
            headers: {
              "Authorization": `Bearer ${this.token}`
            },
            json: true
        }
    }

    async search() {
        const options = this.getOptions();

        const response = await request(options, (error, res, body) => {
            console.log("Service results: " + res.body);
        });

        return ResponseMapper.mapSpotifyResults(response).to(this.searchType);;
    }
}

module.exports = SpotifySearchService;