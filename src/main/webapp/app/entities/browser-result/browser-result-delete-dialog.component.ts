import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBrowserResult } from 'app/shared/model/browser-result.model';
import { BrowserResultService } from './browser-result.service';

@Component({
    selector: 'jhi-browser-result-delete-dialog',
    templateUrl: './browser-result-delete-dialog.component.html'
})
export class BrowserResultDeleteDialogComponent {
    browserResult: IBrowserResult;

    constructor(
        protected browserResultService: BrowserResultService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.browserResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'browserResultListModification',
                content: 'Deleted an browserResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-browser-result-delete-popup',
    template: ''
})
export class BrowserResultDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ browserResult }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BrowserResultDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.browserResult = browserResult;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
