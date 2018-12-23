/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ZipFlix2TestModule } from '../../../test.module';
import { VideoHistoryDeleteDialogComponent } from 'app/entities/video-history/video-history-delete-dialog.component';
import { VideoHistoryService } from 'app/entities/video-history/video-history.service';

describe('Component Tests', () => {
    describe('VideoHistory Management Delete Component', () => {
        let comp: VideoHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<VideoHistoryDeleteDialogComponent>;
        let service: VideoHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [VideoHistoryDeleteDialogComponent]
            })
                .overrideTemplate(VideoHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VideoHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoHistoryService);
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
