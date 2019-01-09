import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBrowse } from 'app/shared/model/browse.model';
import { BrowseService } from './browse.service';

@Component({
    selector: 'jhi-browse-update',
    templateUrl: './browse-update.component.html'
})
export class BrowseUpdateComponent implements OnInit {
    browse: IBrowse;
    isSaving: boolean;

    constructor(protected browseService: BrowseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ browse }) => {
            this.browse = browse;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.browse.id !== undefined) {
            this.subscribeToSaveResponse(this.browseService.update(this.browse));
        } else {
            this.subscribeToSaveResponse(this.browseService.create(this.browse));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBrowse>>) {
        result.subscribe((res: HttpResponse<IBrowse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
