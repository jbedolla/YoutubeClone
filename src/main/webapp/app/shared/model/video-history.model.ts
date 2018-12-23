import { Moment } from 'moment';
import { IVideo } from 'app/shared/model//video.model';
import { IProfile } from 'app/shared/model//profile.model';

export interface IVideoHistory {
    id?: number;
    timestamp?: Moment;
    video?: IVideo;
    profile?: IProfile;
}

export class VideoHistory implements IVideoHistory {
    constructor(public id?: number, public timestamp?: Moment, public video?: IVideo, public profile?: IProfile) {}
}
