import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBrowserResult } from 'app/shared/model/browser-result.model';

@Component({
    selector: 'jhi-browser-result-detail',
    templateUrl: './browser-result-detail.component.html'
})
export class BrowserResultDetailComponent implements OnInit {
    browserResult: IBrowserResult;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ browserResult }) => {
            this.browserResult = browserResult;
        });
    }

    previousState() {
        window.history.back();
    }
}
