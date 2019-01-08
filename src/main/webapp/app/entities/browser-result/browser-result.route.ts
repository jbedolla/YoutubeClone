import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BrowserResult } from 'app/shared/model/browser-result.model';
import { BrowserResultService } from './browser-result.service';
import { BrowserResultComponent } from './browser-result.component';
import { BrowserResultDetailComponent } from './browser-result-detail.component';
import { BrowserResultUpdateComponent } from './browser-result-update.component';
import { BrowserResultDeletePopupComponent } from './browser-result-delete-dialog.component';
import { IBrowserResult } from 'app/shared/model/browser-result.model';

@Injectable({ providedIn: 'root' })
export class BrowserResultResolve implements Resolve<IBrowserResult> {
    constructor(private service: BrowserResultService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BrowserResult> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BrowserResult>) => response.ok),
                map((browserResult: HttpResponse<BrowserResult>) => browserResult.body)
            );
        }
        return of(new BrowserResult());
    }
}

export const browserResultRoute: Routes = [
    {
        path: 'browser-result',
        component: BrowserResultComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'zipFlix2App.browserResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'browser-result/:id/view',
        component: BrowserResultDetailComponent,
        resolve: {
            browserResult: BrowserResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browserResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'browser-result/new',
        component: BrowserResultUpdateComponent,
        resolve: {
            browserResult: BrowserResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browserResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'browser-result/:id/edit',
        component: BrowserResultUpdateComponent,
        resolve: {
            browserResult: BrowserResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browserResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const browserResultPopupRoute: Routes = [
    {
        path: 'browser-result/:id/delete',
        component: BrowserResultDeletePopupComponent,
        resolve: {
            browserResult: BrowserResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browserResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
