import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipFlix2SharedModule } from 'app/shared';
import {
    BrowseComponent,
    BrowseDetailComponent,
    BrowseUpdateComponent,
    BrowseDeletePopupComponent,
    BrowseDeleteDialogComponent,
    browseRoute,
    browsePopupRoute
} from './';

const ENTITY_STATES = [...browseRoute, ...browsePopupRoute];

@NgModule({
    imports: [ZipFlix2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BrowseComponent, BrowseDetailComponent, BrowseUpdateComponent, BrowseDeleteDialogComponent, BrowseDeletePopupComponent],
    entryComponents: [BrowseComponent, BrowseUpdateComponent, BrowseDeleteDialogComponent, BrowseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2BrowseModule {}
