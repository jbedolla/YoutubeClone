/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ZipFlix2TestModule } from '../../../test.module';
import { SearchResultUpdateComponent } from 'app/entities/search-result/search-result-update.component';
import { SearchResultService } from 'app/entities/search-result/search-result.service';
import { SearchResult } from 'app/shared/model/search-result.model';

describe('Component Tests', () => {
    describe('SearchResult Management Update Component', () => {
        let comp: SearchResultUpdateComponent;
        let fixture: ComponentFixture<SearchResultUpdateComponent>;
        let service: SearchResultService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [SearchResultUpdateComponent]
            })
                .overrideTemplate(SearchResultUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SearchResultUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchResultService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SearchResult(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.searchResult = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SearchResult();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.searchResult = entity;
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
