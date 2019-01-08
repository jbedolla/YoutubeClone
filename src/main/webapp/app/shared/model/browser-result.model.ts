export interface IBrowserResult {
    id?: number;
    videoId?: string;
    link?: string;
    thumbnail?: string;
    category?: string;
}

export class BrowserResult implements IBrowserResult {
    constructor(public id?: number, public videoId?: string, public link?: string, public thumbnail?: string, public category?: string) {}
}
