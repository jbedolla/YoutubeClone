import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipFlix2SharedModule } from 'app/shared';
import {
    SearchResultComponent,
    SearchResultDetailComponent,
    SearchResultUpdateComponent,
    SearchResultDeletePopupComponent,
    SearchResultDeleteDialogComponent,
    searchResultRoute,
    searchResultPopupRoute
} from './';

const ENTITY_STATES = [...searchResultRoute, ...searchResultPopupRoute];

@NgModule({
    imports: [ZipFlix2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SearchResultComponent,
        SearchResultDetailComponent,
        SearchResultUpdateComponent,
        SearchResultDeleteDialogComponent,
        SearchResultDeletePopupComponent
    ],
    entryComponents: [
        SearchResultComponent,
        SearchResultUpdateComponent,
        SearchResultDeleteDialogComponent,
        SearchResultDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2SearchResultModule {}
