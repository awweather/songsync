class ResponseMapper {
  constructor() {
    this.mapSpotifyResults = function(results) {
      return {
        to: function(type) {
          if (type === "artist") {
            return results["artists"].items.map((item) => {
                return {
                    title: item.name,
                    subtitle: item.type
                }
            });
          }
        }
      };
    };
  }
}

module.exports = new ResponseMapper();
