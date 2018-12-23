import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IVideoHistory } from 'app/shared/model/video-history.model';
import { VideoHistoryService } from './video-history.service';
import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from 'app/entities/video';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';

@Component({
    selector: 'jhi-video-history-update',
    templateUrl: './video-history-update.component.html'
})
export class VideoHistoryUpdateComponent implements OnInit {
    videoHistory: IVideoHistory;
    isSaving: boolean;

    videos: IVideo[];

    profiles: IProfile[];
    timestampDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected videoHistoryService: VideoHistoryService,
        protected videoService: VideoService,
        protected profileService: ProfileService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ videoHistory }) => {
            this.videoHistory = videoHistory;
        });
        this.videoService.query().subscribe(
            (res: HttpResponse<IVideo[]>) => {
                this.videos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.profileService.query().subscribe(
            (res: HttpResponse<IProfile[]>) => {
                this.profiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.videoHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.videoHistoryService.update(this.videoHistory));
        } else {
            this.subscribeToSaveResponse(this.videoHistoryService.create(this.videoHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVideoHistory>>) {
        result.subscribe((res: HttpResponse<IVideoHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackVideoById(index: number, item: IVideo) {
        return item.id;
    }

    trackProfileById(index: number, item: IProfile) {
        return item.id;
    }
}
