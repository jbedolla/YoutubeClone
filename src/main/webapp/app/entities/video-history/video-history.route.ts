import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VideoHistory } from 'app/shared/model/video-history.model';
import { VideoHistoryService } from './video-history.service';
import { VideoHistoryComponent } from './video-history.component';
import { VideoHistoryDetailComponent } from './video-history-detail.component';
import { VideoHistoryUpdateComponent } from './video-history-update.component';
import { VideoHistoryDeletePopupComponent } from './video-history-delete-dialog.component';
import { IVideoHistory } from 'app/shared/model/video-history.model';

@Injectable({ providedIn: 'root' })
export class VideoHistoryResolve implements Resolve<IVideoHistory> {
    constructor(private service: VideoHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VideoHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VideoHistory>) => response.ok),
                map((videoHistory: HttpResponse<VideoHistory>) => videoHistory.body)
            );
        }
        return of(new VideoHistory());
    }
}

export const videoHistoryRoute: Routes = [
    {
        path: 'video-history',
        component: VideoHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.videoHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-history/:id/view',
        component: VideoHistoryDetailComponent,
        resolve: {
            videoHistory: VideoHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.videoHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-history/new',
        component: VideoHistoryUpdateComponent,
        resolve: {
            videoHistory: VideoHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.videoHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-history/:id/edit',
        component: VideoHistoryUpdateComponent,
        resolve: {
            videoHistory: VideoHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.videoHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const videoHistoryPopupRoute: Routes = [
    {
        path: 'video-history/:id/delete',
        component: VideoHistoryDeletePopupComponent,
        resolve: {
            videoHistory: VideoHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipFlix2App.videoHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
