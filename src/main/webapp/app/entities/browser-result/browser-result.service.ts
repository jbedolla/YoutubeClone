import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBrowserResult } from 'app/shared/model/browser-result.model';

type EntityResponseType = HttpResponse<IBrowserResult>;
type EntityArrayResponseType = HttpResponse<IBrowserResult[]>;

@Injectable({ providedIn: 'root' })
export class BrowserResultService {
    public resourceUrl = SERVER_API_URL + 'api/browser-results';

    constructor(protected http: HttpClient) {}

    create(browserResult: IBrowserResult): Observable<EntityResponseType> {
        return this.http.post<IBrowserResult>(this.resourceUrl, browserResult, { observe: 'response' });
    }

    update(browserResult: IBrowserResult): Observable<EntityResponseType> {
        return this.http.put<IBrowserResult>(this.resourceUrl, browserResult, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBrowserResult>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBrowserResult[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
