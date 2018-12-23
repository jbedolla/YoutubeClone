import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVideoHistory } from 'app/shared/model/video-history.model';

@Component({
    selector: 'jhi-video-history-detail',
    templateUrl: './video-history-detail.component.html'
})
export class VideoHistoryDetailComponent implements OnInit {
    videoHistory: IVideoHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ videoHistory }) => {
            this.videoHistory = videoHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
