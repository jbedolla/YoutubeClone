import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalService, AccountService, Account } from 'src/main/webapp/app/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-profiles-page',
    templateUrl: './profiles_page.html',
    styleUrls: ['profiles_page.scss']
})
export class Profiles_PageComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
