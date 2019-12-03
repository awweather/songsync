class SearchResult {
    public title: string;
    public subtitle: string;
    public image: string;
    public popularity: string;
    public id: string;

    constructor(result) {
        this.id = result.id;
        this.title = result.title;
        this.subtitle = result.subtitle;
        this.image = result.image;
        this.popularity = result.popularity;
    }
    
}

export default SearchResult;