/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ZipFlix2TestModule } from '../../../test.module';
import { BrowseUpdateComponent } from 'app/entities/browse/browse-update.component';
import { BrowseService } from 'app/entities/browse/browse.service';
import { Browse } from 'app/shared/model/browse.model';

describe('Component Tests', () => {
    describe('Browse Management Update Component', () => {
        let comp: BrowseUpdateComponent;
        let fixture: ComponentFixture<BrowseUpdateComponent>;
        let service: BrowseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipFlix2TestModule],
                declarations: [BrowseUpdateComponent]
            })
                .overrideTemplate(BrowseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BrowseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrowseService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Browse(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.browse = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Browse();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.browse = entity;
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
