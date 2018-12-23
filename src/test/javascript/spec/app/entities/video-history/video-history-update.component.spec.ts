/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ZipFlix2TestModule } from '../../../test.module';
import { VideoHistoryUpdateComponent } from 'app/entities/video-history/video-history-update.component';
import { VideoHistoryService } from 'app/entities/video-history/video-history.service';
import { VideoHistory } from 'app/shared/model/video-history.model';

describe('Component Tests', () => {
    describe('VideoHistory Management Update Component', () => {
        let comp: VideoHistoryUpdateComponent;
        let fixture: ComponentFixture<VideoHistoryUpdateComponent>;
        let service: VideoHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [VideoHistoryUpdateComponent]
            })
                .overrideTemplate(VideoHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VideoHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoHistoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new VideoHistory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.videoHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new VideoHistory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.videoHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
