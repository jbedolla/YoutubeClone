import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVideoHistory } from 'app/shared/model/video-history.model';
import { AccountService } from 'app/core';
import { VideoHistoryService } from './video-history.service';

@Component({
    selector: 'jhi-video-history',
    templateUrl: './video-history.component.html'
})
export class VideoHistoryComponent implements OnInit, OnDestroy {
    videoHistories: IVideoHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected videoHistoryService: VideoHistoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.videoHistoryService.query().subscribe(
            (res: HttpResponse<IVideoHistory[]>) => {
                this.videoHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVideoHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVideoHistory) {
        return item.id;
    }

    registerChangeInVideoHistories() {
        this.eventSubscriber = this.eventManager.subscribe('videoHistoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
