import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRating } from 'app/shared/model/rating.model';
import { AccountService } from 'app/core';
import { RatingService } from './rating.service';

@Component({
    selector: 'jhi-rating',
    templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit, OnDestroy {
    ratings: IRating[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ratingService: RatingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ratingService.query().subscribe(
            (res: HttpResponse<IRating[]>) => {
                this.ratings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRatings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRating) {
        return item.id;
    }

    registerChangeInRatings() {
        this.eventSubscriber = this.eventManager.subscribe('ratingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
