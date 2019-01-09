import { SafeUrl } from '@angular/platform-browser';

export interface ISearchResult {
    id?: number;
    videoId?: string;
    link?: string;
    thumbnail?: string;
    category?: string;
    url?: SafeUrl;
}

export class SearchResult implements ISearchResult {
    constructor(public id?: number, public videoId?: string, public link?: string, public thumbnail?: string, public category?: string) {
        this.link = this.getIframeSrc(videoId);
    }

    private getIframeSrc = function(src: string) {
        return 'https://www.youtube.com/embed/' + src;
    };
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
