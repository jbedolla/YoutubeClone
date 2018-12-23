import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISearchResult } from 'app/shared/model/search-result.model';
import { SearchResultService } from './search-result.service';

@Component({
    selector: 'jhi-search-result-update',
    templateUrl: './search-result-update.component.html'
})
export class SearchResultUpdateComponent implements OnInit {
    searchResult: ISearchResult;
    isSaving: boolean;

    constructor(protected searchResultService: SearchResultService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ searchResult }) => {
            this.searchResult = searchResult;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.searchResult.id !== undefined) {
            this.subscribeToSaveResponse(this.searchResultService.update(this.searchResult));
        } else {
            this.subscribeToSaveResponse(this.searchResultService.create(this.searchResult));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISearchResult>>) {
        result.subscribe((res: HttpResponse<ISearchResult>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
