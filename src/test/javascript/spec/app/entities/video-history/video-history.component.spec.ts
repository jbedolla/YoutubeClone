/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ZipFlix2TestModule } from '../../../test.module';
import { VideoHistoryComponent } from 'app/entities/video-history/video-history.component';
import { VideoHistoryService } from 'app/entities/video-history/video-history.service';
import { VideoHistory } from 'app/shared/model/video-history.model';

describe('Component Tests', () => {
    describe('VideoHistory Management Component', () => {
        let comp: VideoHistoryComponent;
        let fixture: ComponentFixture<VideoHistoryComponent>;
        let service: VideoHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [VideoHistoryComponent],
                providers: []
            })
                .overrideTemplate(VideoHistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VideoHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoHistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VideoHistory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.videoHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
