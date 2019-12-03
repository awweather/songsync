class SearchResult {
    public title: string;
    public subtitle: string; 
    public image: string;
    
    constructor(data: any) {
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.image = data.image;

    }


}

export default SearchResult