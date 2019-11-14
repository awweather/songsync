class SearchResult {
    public title: string;
    public subTitle: string; 

    constructor(data: any) {
        this.title = data.title;
        this.subTitle = data.subTitle;
    }


}

export default SearchResult