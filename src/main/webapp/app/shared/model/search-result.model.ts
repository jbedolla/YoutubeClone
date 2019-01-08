export interface ISearchResult {
    id?: number;
    videoId?: string;
    link?: string;
    thumbnail?: string;
    category?: string;
}

export class SearchResult implements ISearchResult {
    constructor(public id?: number, public videoId?: string, public link?: string, public thumbnail?: string, public category?: string) {}
}

// export interface ISearchResult {
//     id?: number;
//     title?: string;
//     videoId?: string;
// }
//
// export class SearchResult implements ISearchResult {
//     constructor(public id?: number, public title?: string, public videoId?: string) {}
// }
