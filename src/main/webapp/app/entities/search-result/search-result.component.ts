import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ISearchResult } from 'app/shared/model/search-result.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { SearchResultService } from './search-result.service';

@Component({
    selector: 'jhi-search-result',
    templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit, OnDestroy {
    currentAccount: any;
    searchResults: ISearchResult[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected searchResultService: SearchResultService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.searchResultService
            .search('cats')
            .subscribe(
                (res: HttpResponse<ISearchResult[]>) => this.addResults(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/search-result'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/search-result',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSearchResults();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISearchResult) {
        return item.id;
    }

    registerChangeInSearchResults() {
        this.eventSubscriber = this.eventManager.subscribe('searchResultListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateSearchResults(data: ISearchResult[], headers: HttpHeaders) {
        console.log('data in the house: ' + data);
        // this.links = this.parseLinks.parse(headers.get('link'));
        // this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        // this.queryCount = this.totalItems;
        this.searchResults = data;
        console.log(this.searchResults);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    getMusic() {
        this.searchResultService
            .getByCategoryId('10')
            .subscribe(
                (res: HttpResponse<ISearchResult[]>) => this.paginateSearchResults(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    addResults(data: ISearchResult[]) {
        console.log('Data :' + data);
        this.searchResults = data;
        console.log('Search Results : ' + this.searchResults);
    }
}
