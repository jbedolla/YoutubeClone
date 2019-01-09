/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ZipFlix2TestModule } from '../../../test.module';
import { BrowseComponent } from 'app/entities/browse/browse.component';
import { BrowseService } from 'app/entities/browse/browse.service';
import { Browse } from 'app/shared/model/browse.model';

describe('Component Tests', () => {
    describe('Browse Management Component', () => {
        let comp: BrowseComponent;
        let fixture: ComponentFixture<BrowseComponent>;
        let service: BrowseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [BrowseComponent],
                providers: []
            })
                .overrideTemplate(BrowseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BrowseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrowseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Browse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.browses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
