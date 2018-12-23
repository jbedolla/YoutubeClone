/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ZipFlix2TestModule } from '../../../test.module';
import { VideoHistoryDetailComponent } from 'app/entities/video-history/video-history-detail.component';
import { VideoHistory } from 'app/shared/model/video-history.model';

describe('Component Tests', () => {
    describe('VideoHistory Management Detail Component', () => {
        let comp: VideoHistoryDetailComponent;
        let fixture: ComponentFixture<VideoHistoryDetailComponent>;
        const route = ({ data: of({ videoHistory: new VideoHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [VideoHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VideoHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VideoHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.videoHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
