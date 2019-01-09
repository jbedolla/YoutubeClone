import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBrowse } from 'app/shared/model/browse.model';

@Component({
    selector: 'jhi-browse-detail',
    templateUrl: './browse-detail.component.html'
})
export class BrowseDetailComponent implements OnInit {
    browse: IBrowse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ browse }) => {
            this.browse = browse;
        });
    }

    previousState() {
        window.history.back();
    }
}
