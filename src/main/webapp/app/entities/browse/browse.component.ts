import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBrowse } from 'app/shared/model/browse.model';
import { AccountService } from 'app/core';
import { BrowseService } from './browse.service';
import { SearchResultService } from '../search-result/search-result.service';
import { ISearchResult } from 'app/shared/model/search-result.model';

@Component({
    selector: 'jhi-browse',
    templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnInit, OnDestroy {
    browses: IBrowse[];
    browseResults: ISearchResult[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected searchResultService: SearchResultService,
        protected browseService: BrowseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute
    ) {}

    loadAll() {
        this.browse();
    }

    browse(): void {
        const category = this.activatedRoute.snapshot.paramMap.get('category');
        this.searchResultService
            .getByCategoryId(category)
            .subscribe(
                (res: HttpResponse<ISearchResult[]>) => this.addResults(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBrowses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBrowse) {
        return item.id;
    }

    registerChangeInBrowses() {
        this.eventSubscriber = this.eventManager.subscribe('browseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    addResults(data: ISearchResult[]) {
        // const el = angular.element(document.querySelector('#value'));
        // this.browseResults(result => result.category = )
        this.browseResults = data;
        console.log('Browsing By Category : ' + this.browseResults);
    }
}
