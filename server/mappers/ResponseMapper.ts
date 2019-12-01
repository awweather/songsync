class ResponseMapper {
  static mapSpotifyResults(results) {
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
    }
  }
}

export default ResponseMapper;
