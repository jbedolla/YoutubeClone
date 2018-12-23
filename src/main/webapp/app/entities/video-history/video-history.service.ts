import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVideoHistory } from 'app/shared/model/video-history.model';

type EntityResponseType = HttpResponse<IVideoHistory>;
type EntityArrayResponseType = HttpResponse<IVideoHistory[]>;

@Injectable({ providedIn: 'root' })
export class VideoHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/video-histories';

    constructor(protected http: HttpClient) {}

    create(videoHistory: IVideoHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoHistory);
        return this.http
            .post<IVideoHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(videoHistory: IVideoHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoHistory);
        return this.http
            .put<IVideoHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVideoHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVideoHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(videoHistory: IVideoHistory): IVideoHistory {
        const copy: IVideoHistory = Object.assign({}, videoHistory, {
            timestamp:
                videoHistory.timestamp != null && videoHistory.timestamp.isValid() ? videoHistory.timestamp.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((videoHistory: IVideoHistory) => {
                videoHistory.timestamp = videoHistory.timestamp != null ? moment(videoHistory.timestamp) : null;
            });
        }
        return res;
    }
}
