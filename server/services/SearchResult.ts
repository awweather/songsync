class SearchResult {
    public title: string;
    public subtitle: string;
    
    constructor(result) {
        this.title = result.title;
        this.subtitle = result.subtitle;
    }
    
}

export default SearchResult;