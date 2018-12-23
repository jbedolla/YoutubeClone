/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ZipFlix2TestModule } from '../../../test.module';
import { SearchResultDeleteDialogComponent } from 'app/entities/search-result/search-result-delete-dialog.component';
import { SearchResultService } from 'app/entities/search-result/search-result.service';

describe('Component Tests', () => {
    describe('SearchResult Management Delete Component', () => {
        let comp: SearchResultDeleteDialogComponent;
        let fixture: ComponentFixture<SearchResultDeleteDialogComponent>;
        let service: SearchResultService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [SearchResultDeleteDialogComponent]
            })
                .overrideTemplate(SearchResultDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchResultDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchResultService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
