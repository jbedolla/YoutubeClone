import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Browse } from 'app/shared/model/browse.model';
import { BrowseService } from './browse.service';
import { BrowseComponent } from './browse.component';
import { BrowseDetailComponent } from './browse-detail.component';
import { BrowseUpdateComponent } from './browse-update.component';
import { BrowseDeletePopupComponent } from './browse-delete-dialog.component';
import { IBrowse } from 'app/shared/model/browse.model';

@Injectable({ providedIn: 'root' })
export class BrowseResolve implements Resolve<IBrowse> {
    constructor(private service: BrowseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Browse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Browse>) => response.ok),
                map((browse: HttpResponse<Browse>) => browse.body)
            );
        }
        return of(new Browse());
    }
}

export const browseRoute: Routes = [
    {
        path: 'browse/:category',
        component: BrowseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'browse/:id/view',
        component: BrowseDetailComponent,
        resolve: {
            browse: BrowseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'browse/new',
        component: BrowseUpdateComponent,
        resolve: {
            browse: BrowseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'browse/:id/edit',
        component: BrowseUpdateComponent,
        resolve: {
            browse: BrowseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const browsePopupRoute: Routes = [
    {
        path: 'browse/:id/delete',
        component: BrowseDeletePopupComponent,
        resolve: {
            browse: BrowseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.browse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
