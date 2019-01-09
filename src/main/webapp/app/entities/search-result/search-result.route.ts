import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchResult } from 'app/shared/model/search-result.model';
import { SearchResultService } from './search-result.service';
import { SearchResultComponent } from './search-result.component';
import { SearchResultDetailComponent } from './search-result-detail.component';
import { SearchResultUpdateComponent } from './search-result-update.component';
import { SearchResultDeletePopupComponent } from './search-result-delete-dialog.component';
import { ISearchResult } from 'app/shared/model/search-result.model';

@Injectable({ providedIn: 'root' })
export class SearchResultResolve implements Resolve<ISearchResult> {
    constructor(private service: SearchResultService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchResult> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SearchResult>) => response.ok),
                map((searchResult: HttpResponse<SearchResult>) => searchResult.body)
            );
        }
        return of(new SearchResult());
    }
}

export const searchResultRoute: Routes = [
    {
        path: 'search-result/:searchTerm',
        component: SearchResultComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'zipFlix2App.searchResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-result/:id/view',
        component: SearchResultDetailComponent,
        resolve: {
            searchResult: SearchResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.searchResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-result/new',
        component: SearchResultUpdateComponent,
        resolve: {
            searchResult: SearchResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.searchResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-result/:id/edit',
        component: SearchResultUpdateComponent,
        resolve: {
            searchResult: SearchResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.searchResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const searchResultPopupRoute: Routes = [
    {
        path: 'search-result/:id/delete',
        component: SearchResultDeletePopupComponent,
        resolve: {
            searchResult: SearchResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.searchResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
