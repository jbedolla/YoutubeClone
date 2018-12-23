import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IProfile } from 'app/shared/model//profile.model';

export interface IProfile {
    id?: number;
    username?: string;
    lastLoggedIn?: Moment;
    imageId?: string;
    user?: IUser;
    friends?: IProfile[];
}

export class Profile implements IProfile {
    constructor(
        public id?: number,
        public username?: string,
        public lastLoggedIn?: Moment,
        public imageId?: string,
        public user?: IUser,
        public friends?: IProfile[]
    ) {}
}
