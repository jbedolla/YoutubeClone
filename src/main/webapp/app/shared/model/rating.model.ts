import { Moment } from 'moment';
import { IVideo } from 'app/shared/model//video.model';
import { IProfile } from 'app/shared/model//profile.model';

export interface IRating {
    id?: number;
    videoId?: string;
    viewerId?: string;
    timestamp?: Moment;
    rating?: number;
    video?: IVideo;
    profile?: IProfile;
}

export class Rating implements IRating {
    constructor(
        public id?: number,
        public videoId?: string,
        public viewerId?: string,
        public timestamp?: Moment,
        public rating?: number,
        public video?: IVideo,
        public profile?: IProfile
    ) {}
}
