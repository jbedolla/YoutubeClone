import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipFlix2SharedModule } from 'app/shared';
import {
    BrowserResultComponent,
    BrowserResultDetailComponent,
    BrowserResultUpdateComponent,
    BrowserResultDeletePopupComponent,
    BrowserResultDeleteDialogComponent,
    browserResultRoute,
    browserResultPopupRoute
} from './';

const ENTITY_STATES = [...browserResultRoute, ...browserResultPopupRoute];

@NgModule({
    imports: [ZipFlix2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BrowserResultComponent,
        BrowserResultDetailComponent,
        BrowserResultUpdateComponent,
        BrowserResultDeleteDialogComponent,
        BrowserResultDeletePopupComponent
    ],
    entryComponents: [
        BrowserResultComponent,
        BrowserResultUpdateComponent,
        BrowserResultDeleteDialogComponent,
        BrowserResultDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2BrowserResultModule {}
