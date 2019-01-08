import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBrowserResult } from 'app/shared/model/browser-result.model';
import { BrowserResultService } from './browser-result.service';

@Component({
    selector: 'jhi-browser-result-update',
    templateUrl: './browser-result-update.component.html'
})
export class BrowserResultUpdateComponent implements OnInit {
    browserResult: IBrowserResult;
    isSaving: boolean;

    constructor(protected browserResultService: BrowserResultService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ browserResult }) => {
            this.browserResult = browserResult;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.browserResult.id !== undefined) {
            this.subscribeToSaveResponse(this.browserResultService.update(this.browserResult));
        } else {
            this.subscribeToSaveResponse(this.browserResultService.create(this.browserResult));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBrowserResult>>) {
        result.subscribe((res: HttpResponse<IBrowserResult>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
