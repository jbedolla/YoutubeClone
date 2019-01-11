import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVideo } from 'app/shared/model/video.model';
import { AccountService } from 'app/core';
import { VideoService } from './video.service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-video',
    templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit, OnDestroy {
    videos: IVideo[];
    currentAccount: any;
    eventSubscriber: Subscription;
    url: SafeUrl;
    description: String;

    constructor(
        protected sanitizer: DomSanitizer,
        protected activatedRoute: ActivatedRoute,
        protected videoService: VideoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.setUrl();
    }

    extractVidId(): String {
        return this.activatedRoute.snapshot.paramMap.get('vidId');
    }

    setUrl() {
        const vidId = this.extractVidId();
        const link = 'https://www.youtube.com/embed/' + vidId;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVideos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVideo) {
        return item.id;
    }

    registerChangeInVideos() {
        this.eventSubscriber = this.eventManager.subscribe('videoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
