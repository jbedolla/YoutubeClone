/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ZipFlix2TestModule } from '../../../test.module';
import { BrowseDetailComponent } from 'app/entities/browse/browse-detail.component';
import { Browse } from 'app/shared/model/browse.model';

describe('Component Tests', () => {
    describe('Browse Management Detail Component', () => {
        let comp: BrowseDetailComponent;
        let fixture: ComponentFixture<BrowseDetailComponent>;
        const route = ({ data: of({ browse: new Browse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [BrowseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BrowseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BrowseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.browse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
