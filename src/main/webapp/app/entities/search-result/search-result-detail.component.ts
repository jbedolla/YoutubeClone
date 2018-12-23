import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISearchResult } from 'app/shared/model/search-result.model';

@Component({
    selector: 'jhi-search-result-detail',
    templateUrl: './search-result-detail.component.html'
})
export class SearchResultDetailComponent implements OnInit {
    searchResult: ISearchResult;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ searchResult }) => {
            this.searchResult = searchResult;
        });
    }

    previousState() {
        window.history.back();
    }
}
