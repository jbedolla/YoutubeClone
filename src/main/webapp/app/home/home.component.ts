import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { SearchResultService } from 'app/entities/search-result';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ISearchResult } from 'app/shared/model/search-result.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    topTrendingResults: ISearchResult[];

    constructor(
        private searchResultService: SearchResultService,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.getTopTrending();
        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getTopTrending() {
        this.searchResultService
            .topTrending()
            .subscribe(
                (res: HttpResponse<ISearchResult[]>) => this.addResults(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    private addResults(data: ISearchResult[]) {
        console.log('Houston we have data : ' + data);
        this.topTrendingResults = data;
        console.log('*** top trending ***' + this.topTrendingResults);
    }
}
