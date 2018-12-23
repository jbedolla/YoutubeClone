import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISearchResult } from 'app/shared/model/search-result.model';

type EntityResponseType = HttpResponse<ISearchResult>;
type EntityArrayResponseType = HttpResponse<ISearchResult[]>;

@Injectable({ providedIn: 'root' })
export class SearchResultService {
    public resourceUrl = SERVER_API_URL + 'api/search-results';

    constructor(protected http: HttpClient) {}

    create(searchResult: ISearchResult): Observable<EntityResponseType> {
        return this.http.post<ISearchResult>(this.resourceUrl, searchResult, { observe: 'response' });
    }

    update(searchResult: ISearchResult): Observable<EntityResponseType> {
        return this.http.put<ISearchResult>(this.resourceUrl, searchResult, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISearchResult>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchResult[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
