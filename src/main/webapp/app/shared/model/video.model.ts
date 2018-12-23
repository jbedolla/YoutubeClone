export interface IVideo {
    id?: number;
    title?: string;
    description?: string;
    category?: string;
    link?: string;
    avgRating?: number;
}

export class Video implements IVideo {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public category?: string,
        public link?: string,
        public avgRating?: number
    ) {}
}
