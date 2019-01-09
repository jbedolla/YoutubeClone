export interface IBrowse {
    id?: number;
    videoId?: string;
    thumbnail?: string;
    category?: string;
}

export class Browse implements IBrowse {
    constructor(public id?: number, public videoId?: string, public thumbnail?: string, public category?: string) {}
}
